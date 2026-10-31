import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { readFile, writeFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { publicFiles } from '../../scripts/public-files.mjs';
import { monitorBrowserHealth,browserHealthProblems,criticalAssets,galleryAssets,fontExpectations,inspectLoadedFonts,fontHealthProblems } from '../helpers/browser-health.js';

const monitors=new WeakMap();
test.beforeEach(async({page})=>{
 monitors.set(page,monitorBrowserHealth(page));await page.goto('/');await page.evaluate(()=>document.fonts.ready);
 await expect.poll(()=>browserHealthProblems(monitors.get(page).snapshot(),page.url())).toEqual([]);
 expect(fontHealthProblems(await page.evaluate(inspectLoadedFonts,fontExpectations))).toEqual([]);
});
test.afterEach(async({page})=>{
 for(const slide of await page.locator('.equipment-image').all()){
  await slide.scrollIntoViewIfNeeded();await expect.poll(()=>slide.locator('img').evaluate(i=>i.complete&&i.naturalWidth>0)).toBe(true);
 }
 expect(browserHealthProblems(monitors.get(page).snapshot(),page.url(),[...criticalAssets,...galleryAssets])).toEqual([]);
 monitors.get(page).dispose();
});

test('conteúdo literal e composição da pasta, com seis serviços e sobre restaurado',async({page})=>{
 await expect(page.locator('h1')).toHaveText('Conhecer o solo é construir com segurança.');
 await expect(page.locator('#titulo-sobre')).toHaveText('O terreno conta uma história. A gente sabe ouvir.');
 await expect(page.locator('.service-entry h3')).toHaveText(['SPT','Sondagem a Trado','Percolação','Resistividade','Investigações especiais','Consultoria geotécnica']);
 await expect(page.locator('.process-track h3')).toHaveText(['Proposta','Assinatura','Mobilização','Execução','Entrega']);
 await expect(page.locator('.process-track li').last()).toContainText('Relatório técnico, perfil geotécnico e ART quando solicitada.');
 await expect(page.locator('#titulo-contato')).toHaveText('Solicite seu orçamento.');
 await expect(page.locator('#hero-react img')).toHaveCount(0);
 await expect(page.locator('.gallery-wordmark,.numbers,.differences,.standards,.faq')).toHaveCount(0);
 await expect(page.locator('.site-header')).toHaveCSS('position','absolute');
 await expect(page.locator('h1')).toHaveCSS('font-family', /Cormorant Garamond/);
 await expect(page.locator('body')).toHaveCSS('font-family', /DM Sans/);
});

test('fontes e composição responsiva sem overflow de 320 a 1600',async({page})=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const width of [320,390,640,768,1024,1280,1440,1600]){
  await page.setViewportSize({width,height:1000});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow em ${width}`).toBe(true);
  const columns=await page.locator('.service-catalog').evaluate(n=>getComputedStyle(n).gridTemplateColumns.split(' ').length);
  expect(columns).toBe(width>=1024?3:width>=640?2:1);
  const fields=await page.locator('input,select,textarea').evaluateAll(nodes=>nodes.map(n=>parseFloat(getComputedStyle(n).fontSize)));
  expect(fields.every(n=>n>=16)).toBe(true);
  if(width>=1024){
   await expect(page.locator('.hero-territory')).toBeVisible();
   const hero=await page.locator('.hero').boundingBox();expect(hero.height).toBeGreaterThanOrEqual(810);
   await expect(page.locator('h1')).toHaveCSS('font-size','88px');
  }
 }
});

test('teclado, âncoras e menu mobile funcionais',async({page},info)=>{
 await page.keyboard.press('Tab');await expect(page.getByRole('link',{name:'Pular para o conteúdo'})).toBeFocused();
 await page.keyboard.press('Enter');await expect(page.locator('main')).toBeFocused();
 if(info.project.name==='mobile'){
  const toggle=page.getByRole('button',{name:/^(Abrir|Fechar) menu$/});await toggle.click();await expect(toggle).toHaveAttribute('aria-expanded','true');
  await page.keyboard.press('Escape');await expect(toggle).toBeFocused();await expect(toggle).toHaveAttribute('aria-expanded','false');
  await toggle.click();await page.locator('#menu-mobile a[href="#sobre"]').click();await expect(page.locator('#titulo-sobre')).toBeFocused();await expect(page.locator('#menu-mobile')).toBeHidden();
 }else{
  await page.locator('.desktop-nav a[href="#sobre"]').click();await expect(page.locator('#titulo-sobre')).toBeFocused();
 }
 await page.locator('.hero-actions a[href="#contato"]').click();await expect(page.locator('#titulo-contato')).toBeFocused();
});

test('formulário da referência valida e prepara e-mail sem transmitir',async({page})=>{
 await page.evaluate(()=>document.querySelector('form').addEventListener('geoplan:email-ready',event=>{event.preventDefault();window.__mailto=event.detail.url;}));
 const form=page.locator('form');await form.scrollIntoViewIfNeeded();
 await form.getByRole('button',{name:'Solicitar orçamento'}).click();await expect(page.locator('#nome')).toBeFocused();
 await page.locator('#nome').fill('Ana Silva');await page.locator('#telefone').fill('63999999999');await page.locator('#email').fill('inválido');await page.locator('#mensagem').fill('Orçamento para terreno em Palmas');
 await form.getByRole('button',{name:'Solicitar orçamento'}).click();await expect(page.locator('#email')).toHaveAttribute('aria-invalid','true');
 await page.locator('#email').fill('ana@example.com');await form.getByRole('button',{name:'Solicitar orçamento'}).click();
 await expect(page.locator('#form-feedback')).toHaveAttribute('data-state','prepared');await expect(page.locator('#nome')).toHaveValue('Ana Silva');
 const url=new URL(await page.evaluate(()=>window.__mailto));expect(url.protocol).toBe('mailto:');expect(url.pathname).toBe('geoplanengenharia.to@gmail.com');expect(url.searchParams.get('body')).toContain('Orçamento para terreno em Palmas');
});

test('carrossel autorizado funciona por botão, teclado e scroll',async({page})=>{
 const gallery=page.locator('[data-equipment-carousel]');await gallery.scrollIntoViewIfNeeded();
 await expect(gallery.locator('img').first()).toHaveAttribute('src','assets/equipment-field.jpg');
 await page.getByRole('button',{name:'Próxima foto'}).click();await expect(page.locator('[data-carousel-status]')).toHaveText('Foto 2 de 2');
 const viewport=page.locator('[data-carousel-viewport]');await viewport.focus();await page.keyboard.press('ArrowRight');await expect(page.locator('[data-carousel-status]')).toHaveText('Foto 1 de 2');
 await page.keyboard.press('End');await expect(page.locator('[data-carousel-status]')).toHaveText('Foto 2 de 2');
 await page.getByRole('button',{name:'Foto anterior'}).click();await expect(page.locator('[data-carousel-status]')).toHaveText('Foto 1 de 2');
});

test('fundo animado preserva a referência e pausa por preferência e visibilidade',async({page})=>{
 const root=page.locator('.hero-composition');await expect(root).toHaveAttribute('data-background-running','true');
 const transform=()=>page.locator('.hero-orbits').evaluate(n=>getComputedStyle(n).transform);const initial=await transform();await expect.poll(transform).not.toBe(initial);
 await page.getByRole('button',{name:'Pausar animação do fundo'}).click();await expect(root).toHaveAttribute('data-background-running','false');
 await expect(page.locator('.hero-orbits')).toHaveCSS('animation-play-state','paused');
 await page.getByRole('button',{name:'Retomar animação do fundo'}).click();await expect(root).toHaveAttribute('data-background-running','true');
 await page.locator('#servicos').scrollIntoViewIfNeeded();await expect(root).toHaveAttribute('data-background-running','false');
 await page.emulateMedia({reducedMotion:'reduce'});await expect(page.locator('.hero-orbits')).toHaveCSS('animation-name','none');
 expect(await page.evaluate(()=>document.getAnimations().filter(a=>a.playState==='running').length)).toBe(0);
});

test('HTML pré-renderizado e contato continuam acessíveis sem JavaScript',async({browser})=>{
 const context=await browser.newContext({javaScriptEnabled:false,baseURL:'http://127.0.0.1:4173'});const page=await context.newPage();await page.goto('/');
 await expect(page.locator('h1')).toBeVisible();await expect(page.locator('.service-entry')).toHaveCount(6);
 await expect(page.locator('#form-contato')).toBeHidden();await expect(page.locator('noscript a')).toHaveAttribute('href','mailto:geoplanengenharia.to@gmail.com');
 await page.locator('.equipment-gallery').scrollIntoViewIfNeeded();await expect(page.locator('.equipment-image')).toHaveCount(2);
 expect(await page.locator('.hero-orbits').evaluate(n=>getComputedStyle(n).animationPlayState)).toBe('paused');await context.close();
});

test('build restrito à allowlist e nenhum documento interno publicado',async({request})=>{
 const walk=async(dir,prefix='')=>(await Promise.all((await readdir(dir,{withFileTypes:true})).map(x=>x.isDirectory()?walk(join(dir,x.name),prefix+x.name+'/'):prefix+x.name))).flat();
 expect((await walk('dist')).filter(x=>!x.split('/').some(p=>p==='.DS_Store'||p.startsWith('._'))).sort()).toEqual([...publicFiles].sort());
 for(const path of ['/PRODUCT.md','/DESIGN.md','/.git/config','/package.json','/tests/fixtures/approved-reference-page.tsx'])expect((await request.get(path)).status()).toBe(404);
});

test('auditoria semântica e registro transparente do contraste literal da referência',async({page},info)=>{
 await page.emulateMedia({reducedMotion:'reduce'});
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
 await info.attach('axe-reference',{body:JSON.stringify(result,null,2),contentType:'application/json'});
 // A referência usa cobre/texto branco pequeno e cinzas de baixa opacidade.
 // Registrar esses achados, sem certificar contraste AA nem mudar a paleta aprovada silenciosamente.
 const contrast=result.violations.filter(v=>v.id==='color-contrast');
 await info.attach('reference-contrast-limitations',{body:JSON.stringify(contrast,null,2),contentType:'application/json'});
 expect(result.violations.filter(v=>v.id!=='color-contrast')).toEqual([]);
});
