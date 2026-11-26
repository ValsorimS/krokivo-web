'use strict';
const products=[{"id":"apple","name":"Jablko","price":5,"art":"<svg viewBox=\"0 0 120 90\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M60 26C35 7 11 33 25 62c10 23 24 24 35 17 11 7 25 6 35-17C109 33 85 7 60 26Z\" fill=\"#c94d3b\" stroke=\"#8c352a\" stroke-width=\"3\"/><path d=\"M60 26c-2-12 3-17 8-20\" stroke=\"#654934\" stroke-width=\"5\" stroke-linecap=\"round\" fill=\"none\"/><path d=\"M64 16Q80-3 93 9Q85 24 64 16Z\" fill=\"#6d9d4c\"/></svg>"},{"id":"roll","name":"Rohlík","price":10,"art":"<svg viewBox=\"0 0 120 90\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M12 63C15 32 41 13 78 19c25 4 35 20 26 39C86 43 51 35 12 63Z\" fill=\"#d9a153\" stroke=\"#9e682c\" stroke-width=\"3\" stroke-linejoin=\"round\"/><path d=\"M37 39l7 10M57 28l7 13M79 28l4 14\" stroke=\"#f4d59d\" stroke-width=\"5\" stroke-linecap=\"round\"/></svg>"},{"id":"milk","name":"Mléko","price":20,"art":"<svg viewBox=\"0 0 120 90\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M34 22l13-16h36l12 16v61H34Z\" fill=\"#f3f5f2\" stroke=\"#667b88\" stroke-width=\"3\"/><path d=\"M34 22h61M47 6l12 16v61\" stroke=\"#667b88\" stroke-width=\"3\" fill=\"none\"/><path d=\"M35 44h59v28H35Z\" fill=\"#8bb7de\"/><path d=\"M70 46q-15 17 0 20q15-3 0-20\" fill=\"#fff\"/><path d=\"M47 6h36\" stroke=\"#3b729f\" stroke-width=\"5\"/></svg>"}];
const coins=[1,2,5,10,20];
function payment(price,values,mode){
 if(![5,10,20].includes(price)||!['single','multiple'].includes(mode)||!Array.isArray(values)||values.some(v=>![1,2,5,10,20].includes(v))||(mode==='single'&&values.length>1))throw Error('Invalid payment');
 const total=values.reduce((sum,v)=>sum+v,0);
 return {total,remaining:Math.max(price-total,0),over:Math.max(total-price,0),exact:total===price};
}
const $=id=>document.getElementById(id);
let mode='single',selected=null,values=[],finished=false;
const fmt=n=>n+' Kč';
function announce(text,kind=''){const el=$('feedback');el.textContent=text;el.className='shop-feedback'+(kind?' '+kind:'');}
function update(){
 const s=payment(selected.price,values,mode);
 $('total').textContent=fmt(s.total);
 $('basket').textContent=values.length?'Vybráno: '+values.map(fmt).join(' + '):'Zatím žádné peníze.';
 $('undo').hidden=mode==='single';
 $('undo').disabled=finished||!values.length;
 $('clear').disabled=finished||!values.length;
 $('check').disabled=finished||!values.length;
 document.querySelectorAll('.coin').forEach(b=>b.disabled=finished||(mode==='multiple'&&values.length>=20));
 $('again').hidden=!finished;
}
function choose(id){
 selected=products.find(p=>p.id===id);if(!selected)return;
 values=[];finished=false;
 $('selection').hidden=true;$('checkout').hidden=false;
 $('chosen-art').innerHTML=selected.art;
 $('chosen-name').textContent=selected.name;
 $('chosen-price').textContent=fmt(selected.price);
 $('instruction').textContent=mode==='single'?'Vyber jednu minci, kterou zaplatíš.':'Vyber mince tak, abys zaplatil přesně.';
 announce('Kolik zaplatíš?');update();$('pay-heading').focus();
}
function home(focus=true){
 selected=null;values=[];finished=false;
 $('checkout').hidden=true;$('selection').hidden=false;
 if(focus)$('select-heading').focus();
}
function setMode(m){if(!['single','multiple'].includes(m))return;mode=m;
 $('single').setAttribute('aria-pressed',String(m==='single'));$('multiple').setAttribute('aria-pressed',String(m==='multiple'));
 home(false);
}
function pick(v){if(!selected||finished||!coins.includes(v))return;
 if(mode==='single')values=[v];else if(values.length<20)values.push(v);
 announce('Až budeš připravený, zkontroluj platbu.');update();
}
function check(){if(!selected||finished||!values.length)return;const s=payment(selected.price,values,mode);
 if(s.exact){finished=true;announce('Výborně! Zaplaceno přesně '+fmt(s.total)+'.','success');update();$('again').focus();}
 else {announce(s.remaining?'Ještě chybí '+fmt(s.remaining)+'. Zkus to znovu.':'Je to o '+fmt(s.over)+' více. Zkus to znovu.','help');}
}
document.querySelectorAll('[data-product]').forEach(b=>b.addEventListener('click',()=>choose(b.dataset.product)));
document.querySelectorAll('[data-coin]').forEach(b=>b.addEventListener('click',()=>pick(Number(b.dataset.coin))));
$('single').addEventListener('click',()=>setMode('single'));
$('multiple').addEventListener('click',()=>setMode('multiple'));
$('undo').addEventListener('click',()=>{if(selected&&!finished){values.pop();announce('Uprav platbu.');update();}});
$('clear').addEventListener('click',()=>{if(selected&&!finished){values=[];announce('Zkus vybrat peníze znovu.');update();}});
$('check').addEventListener('click',check);
$('back-shop').addEventListener('click',()=>home());
$('again').addEventListener('click',()=>home());
home(false);
