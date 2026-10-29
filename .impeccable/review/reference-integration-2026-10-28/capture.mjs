import { chromium } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const out='.impeccable/review/reference-integration-2026-10-28';
await mkdir(out,{recursive:true});
const browser=await chromium.launch();
const report=[];
for (const width of [1440,768,390,320]) {
 const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'}); const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:4180/');await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:`${out}/top-${width}.png`});
 if(width===1440 || width===390) await page.screenshot({path:`${out}/${width===1440?'desktop':'mobile'}.png`,fullPage:true});
 for(const [name,selector] of [['services','#servicos'],['process','#processo'],['contact','#contato']]) {
  await page.evaluate(selector=>window.scrollTo(0,document.querySelector(selector).offsetTop-document.querySelector('.site-header').offsetHeight-24),selector);
  await page.screenshot({path:`${out}/${name}-${width}.png`});
 }
 const layout=await page.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,services:getComputedStyle(document.querySelector('.service-catalog')).gridTemplateColumns,cta:document.querySelector('.hero-actions .button').getBoundingClientRect().toJSON()}));
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21a','wcag21aa']).analyze();
 report.push({width,errors,layout,violations:axe.violations});await context.close();
}
await writeFile(`${out}/inspection.json`,JSON.stringify(report,null,2));
console.log(JSON.stringify(report.map(r=>({width:r.width,errors:r.errors,layout:r.layout,violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))})),null,2));
await browser.close();
