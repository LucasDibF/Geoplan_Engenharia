import { afterEach, expect, it, vi } from 'vitest';
import { initEquipmentCarousels } from '../../js/carousel.js';
afterEach(()=>document.body.replaceChildren());
it('mantém scroll nativo e não exige uma galeria na página',()=>{
 expect(()=>initEquipmentCarousels()()).not.toThrow();
});
it('navega por botões, teclado, scroll e remove listeners ao desmontar',()=>{
 document.body.innerHTML='<div data-equipment-carousel><div data-carousel-viewport><figure></figure><figure></figure></div><div data-carousel-controls hidden><button data-carousel-prev></button><span data-carousel-status></span><button data-carousel-next></button></div></div>';
 const viewport=document.querySelector('[data-carousel-viewport]');
 Object.defineProperty(viewport,'clientWidth',{value:100,configurable:true});
 viewport.scrollTo=vi.fn(({left})=>{viewport.scrollLeft=left;});
 const cleanup=initEquipmentCarousels();
 const status=document.querySelector('[data-carousel-status]');
 const next=document.querySelector('[data-carousel-next]');
 const previous=document.querySelector('[data-carousel-prev]');
 next.click();expect(status.textContent).toBe('Foto 2 de 2');
 next.click();expect(status.textContent).toBe('Foto 1 de 2');
 previous.click();expect(status.textContent).toBe('Foto 2 de 2');
 for(const [key,expected] of [['Home',1],['End',2],['ArrowLeft',1],['ArrowRight',2],['Tab',2]]){
  viewport.dispatchEvent(new KeyboardEvent('keydown',{key,cancelable:true}));
  expect(status.textContent).toBe(`Foto ${expected} de 2`);
 }
 viewport.scrollLeft=-100;viewport.dispatchEvent(new Event('scroll'));expect(status.textContent).toBe('Foto 1 de 2');
 viewport.scrollLeft=1000;viewport.dispatchEvent(new Event('scroll'));expect(status.textContent).toBe('Foto 2 de 2');
 Object.defineProperty(viewport,'clientWidth',{value:0});viewport.dispatchEvent(new Event('scroll'));
 cleanup();expect(document.querySelector('[data-carousel-controls]').hidden).toBe(true);
 const calls=viewport.scrollTo.mock.calls.length;next.click();expect(viewport.scrollTo).toHaveBeenCalledTimes(calls);
});
