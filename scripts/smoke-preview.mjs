// Inspeção da prévia atual, sem publicar, fazer build ou abrir aplicativos externos.
import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
import { fontExpectations, inspectLoadedFonts, fontHealthProblems } from '../tests/helpers/browser-health.js';

const url=process.env.PREVIEW_URL || 'http://127.0.0.1:4180/';
const output='.impeccable/review/preview-reference';
await mkdir(output,{recursive:true});
const browser=await chromium.launch();
const result={url,viewports:[],errors:[],contrastAA:false};
try {
 for(const width of [1440,390]){
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
  const page=await context.newPage();page.on('pageerror',e=>result.errors.push(e.message));
  await page.goto(url);await page.evaluate(()=>document.fonts.ready);
  expect(fontHealthProblems(await page.evaluate(inspectLoadedFonts,fontExpectations))).toEqual([]);
  await expect(page.locator('h1')).toHaveText('Conhecer o solo é construir com segurança.');
  await expect(page.locator('.service-entry')).toHaveCount(6);
  await expect(page.locator('.process-track li')).toHaveCount(5);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:`${output}/hero-${width}.png`});
  await page.locator('.equipment-gallery').scrollIntoViewIfNeeded();
  await page.getByRole('button',{name:'Próxima foto'}).click();
  await expect(page.locator('[data-carousel-status]')).toHaveText('Foto 2 de 2');
  await page.evaluate(()=>document.querySelector('form').addEventListener('geoplan:email-ready',event=>event.preventDefault()));
  await page.locator('#nome').fill('Teste de prévia');await page.locator('#email').fill('preview@example.com');
  await page.locator('#telefone').fill('63999999999');await page.locator('#mensagem').fill('Mensagem de teste local, sem envio.');
  await page.getByRole('button',{name:'Enviar mensagem'}).click();
  await expect(page.locator('#form-feedback')).toHaveAttribute('data-state','prepared');
  const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
  expect(axe.violations.filter(v=>v.id!=='color-contrast')).toEqual([]);
  result.viewports.push({width,contrastViolations:axe.violations.filter(v=>v.id==='color-contrast')});
  await context.close();
 }
 expect(result.errors).toEqual([]);result.passed=true;
} finally {
 await writeFile(`${output}/result.json`,JSON.stringify(result,null,2));await browser.close();
}
console.log('Prévia conferida em desktop e mobile; limitações de contraste da referência registradas.');
