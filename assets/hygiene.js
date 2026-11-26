'use strict';
const steps=[["Namoč si ruce.","Použij čistou tekoucí vodu. Potom vodu zavři."],["Dej si mýdlo.","Naneste mýdlo na mokré ruce."],["Tři si ruce 20 sekund.","Dlaně, hřbety rukou, mezi prsty, palce a kolem nehtů."],["Opláchni si ruce.","Opláchni všechno mýdlo pod tekoucí vodou."],["Osuš si ruce.","Použij čistý ručník, papírovou utěrku nebo osoušeč."]];
const $=id=>document.getElementById(id);
let index=0,mode='learn',help=false,interval=null;
function stop(){if(interval!==null)clearInterval(interval);interval=null;$('timer').disabled=false;$('timer-value').textContent='';}
function render(focus=true){stop();const done=index===steps.length;$('wash-step').hidden=done;$('wash-done').hidden=!done;$('step-count').textContent=done?'Dokončeno 5 z 5':'Krok '+(index+1)+' z 5';$('wash-progress').value=index;$('previous').disabled=index===0;$('forward').hidden=done;$('restart').hidden=!done;if(done){if(focus)$('done-heading').focus();return;}$('wash-art').src='../../assets/hygiene/step-'+(index+1)+'.svg';$('wash-title').textContent=steps[index][0];$('wash-help').textContent=steps[index][1];$('wash-help').hidden=mode==='alone'&&!help;$('hint').hidden=mode==='learn';$('hint').textContent=help?'Skrýt nápovědu':'Ukázat nápovědu';$('hint').setAttribute('aria-expanded',String(help));$('timer-panel').hidden=index!==2;$('forward').textContent=index===steps.length-1?'Hotovo':'Hotovo, další krok →';if(focus)$('wash-title').focus();}
function move(next){index=Math.max(0,Math.min(steps.length,next));help=false;render();}
function setMode(m){mode=m;help=false;$('learn').setAttribute('aria-pressed',String(m==='learn'));$('alone').setAttribute('aria-pressed',String(m==='alone'));render(false);}
$('learn').addEventListener('click',()=>setMode('learn'));$('alone').addEventListener('click',()=>setMode('alone'));
$('previous').addEventListener('click',()=>move(index-1));$('forward').addEventListener('click',()=>move(index+1));$('restart').addEventListener('click',()=>move(0));
$('hint').addEventListener('click',()=>{help=!help;$('wash-help').hidden=!help;$('hint').textContent=help?'Skrýt nápovědu':'Ukázat nápovědu';$('hint').setAttribute('aria-expanded',String(help));});
$('timer').addEventListener('click',()=>{stop();$('timer').disabled=true;const end=Date.now()+20000;$('timer-value').textContent='Čas běží. Tři si ruce.';interval=setInterval(()=>{if(Date.now()>=end){clearInterval(interval);interval=null;$('timer-value').textContent='20 sekund uplynulo. Můžeš opláchnout ruce.';$('timer').disabled=false;}},250);});
window.addEventListener('pagehide',stop);render(false);
