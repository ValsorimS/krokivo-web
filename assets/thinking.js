'use strict';
const shapes={circle:['Kruh','<circle cx="60" cy="60" r="37" F/>'],square:['Čtverec','<rect x="25" y="25" width="70" height="70" rx="3" F/>'],triangle:['Trojúhelník','<path d="M60 18 105 99H15Z" F/>']};
const objects={
 apple:['Jablko','food','<path d="M60 35C39 20 17 42 27 66s25 30 33 23c8 7 23 1 33-23s-12-46-33-31Z" fill="#c94d3b" stroke="#8c352a" stroke-width="3"/><path d="M60 35q-4-16 8-24" stroke="#654934" stroke-width="5" fill="none"/><path d="M64 24Q82 5 97 17 86 31 64 24Z" fill="#6d9d4c"/>'],
 bread:['Chléb','food','<path d="M26 50q-18-8-10-24 14-21 44-21t44 21q8 16-10 24v55H26Z" fill="#efcf98" stroke="#92612d" stroke-width="5"/><path d="M43 69h1m17 12h1m18-22h1" stroke="#92612d" stroke-width="5" stroke-linecap="round"/>'],
 shirt:['Tričko','clothes','<path d="M42 20q18 17 36 0l32 21-16 26-15-9v44H41V58l-15 9L10 41Z" fill="#b9d7a8" stroke="#517b55" stroke-width="4" stroke-linejoin="round"/>'],
 hat:['Čepice','clothes','<path d="M20 78V60a40 40 0 0 1 80 0v18" fill="#dbe8f6" stroke="#345678" stroke-width="4"/><rect x="16" y="76" width="88" height="20" rx="6" fill="#91b4d3" stroke="#345678" stroke-width="4"/><circle cx="60" cy="14" r="8" fill="#345678"/>'],
 bus:['Autobus','transport','<rect x="12" y="22" width="96" height="71" rx="10" fill="#f3d9a1" stroke="#916835" stroke-width="4"/><path d="M22 33h76v26H22Z" fill="#dbe8f6" stroke="#916835" stroke-width="3"/><path d="M47 33v26m25-26v26" stroke="#916835" stroke-width="3"/><circle cx="33" cy="94" r="10" fill="#35443e"/><circle cx="87" cy="94" r="10" fill="#35443e"/>'],
 car:['Auto','transport','<path d="m22 51 15-24h46l15 24 11 8v29H11V59Z" fill="#a6c8e5" stroke="#345678" stroke-width="4" stroke-linejoin="round"/><path d="M31 51l12-16h34l12 16Z" fill="#fff" stroke="#345678" stroke-width="3"/><circle cx="32" cy="89" r="11" fill="#35443e"/><circle cx="88" cy="89" r="11" fill="#35443e"/>']
};
const labels={food:'jídlo',clothes:'oblečení',transport:'dopravní prostředek'};
const matching=['circle','triangle','square','triangle','circle','square'];
const sorting=['apple','hat','bus','bread','shirt','car'];
const colors=['#3d759f','#c94d3b','#5b8750'];
const $=id=>document.getElementById(id);
let mode='match',level=2,index=0,solved=false,options=[];
function rotate(arr,n){return arr.slice(n).concat(arr.slice(0,n));}
function question(mode,index,level){
 const correct=(mode==='match'?matching:sorting)[index];
 let others=mode==='match'?Object.keys(shapes).filter(k=>k!==correct):Object.keys(objects).filter(k=>objects[k][1]!==objects[correct][1]);
 if(mode==='sort')others=others.filter((k,i,a)=>a.findIndex(x=>objects[x][1]===objects[k][1])===i);
 if(index%2)others.reverse();
 const opts=[correct,...others.slice(0,level-1)];return {correct,options:rotate(opts,index%opts.length)};
}
function picture(id,color=colors[0]){const art=mode==='match'?shapes[id][1].replace(' F',' fill="'+color+'" stroke="#25382e" stroke-width="3"'):objects[id][2];return '<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">'+art+'</svg>';}
function feedback(text,kind=''){const el=$('brain-feedback');el.textContent=text;el.className='shop-feedback'+(kind?' '+kind:'');}
function render(focus=false){
 const done=index>=6;$('brain-count').textContent=done?'Dokončeno 6 z 6':'Úloha '+(index+1)+' z 6';$('brain-progress').value=index;$('brain-task').hidden=done;$('brain-done').hidden=!done;
 if(done){if(focus)$('brain-finish').focus();return;}
 solved=false;const q=question(mode,index,level);options=q.options;
 $('brain-question').textContent=mode==='match'?'Najdi stejný tvar.':'Která věc je '+labels[objects[q.correct][1]]+'?';
 $('brain-example').innerHTML=mode==='match'?picture(q.correct,colors[index%3])+'<span>'+shapes[q.correct][0]+'</span>':'';
 $('brain-example').hidden=mode==='sort';
 const group=$('brain-options');group.replaceChildren();
 options.forEach((id,i)=>{const b=document.createElement('button');b.type='button';b.className='brain-choice';b.dataset.choice=id;b.innerHTML=picture(id,colors[(index+i+1)%3])+'<span>'+(mode==='match'?shapes[id][0]:objects[id][0])+'</span>';b.addEventListener('click',()=>answer(id));group.appendChild(b);});
 $('brain-next').hidden=true;$('brain-skip').hidden=false;feedback('Vyber jednu možnost.');if(focus)$('brain-question').focus();
}
function answer(id){if(solved||!options.includes(id))return;const q=question(mode,index,level);if(id!==q.correct){feedback('Zkus vybrat jinou možnost.','help');return;}solved=true;feedback('Ano, správně!','success');Array.from($('brain-options').children).forEach(b=>{b.disabled=true;if(b.dataset.choice===id)b.classList.add('correct');});$('brain-next').hidden=false;$('brain-skip').hidden=true;$('brain-next').focus();}
function advance(){index=Math.min(6,index+1);render(true);}
function reset(){index=0;render();}
function change(m,l){if(mode===m&&level===l)return;mode=m;level=l;['match','sort'].forEach(id=>$(id).setAttribute('aria-pressed',String(mode===id)));$('easy').setAttribute('aria-pressed',String(level===2));$('hard').setAttribute('aria-pressed',String(level===3));reset();}
$('match').addEventListener('click',()=>change('match',level));$('sort').addEventListener('click',()=>change('sort',level));$('easy').addEventListener('click',()=>change(mode,2));$('hard').addEventListener('click',()=>change(mode,3));
$('brain-next').addEventListener('click',()=>{if(solved)advance();});$('brain-skip').addEventListener('click',()=>{if(!solved)advance();});$('brain-restart').addEventListener('click',()=>{index=0;render(true);});render();
