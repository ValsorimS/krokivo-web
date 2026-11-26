'use strict';
const $=id=>document.getElementById(id);
const steps=[...document.querySelectorAll('.step')];
const nav=[...document.querySelectorAll('[data-go]')];
const fields=[...document.querySelectorAll('.question textarea')].map((el,i)=>({id:el.id,number:i<24?String(i+1).padStart(2,'0'):'S'+(i-23),section:el.closest('.step').dataset.section,question:el.closest('.question').querySelector('.question-title').textContent}));
const questionnaire='Krokivo – rozhovor se školou';
let current=0,dirty=false;
function update(){const filled=fields.slice(0,24).filter(f=>$(f.id).value.trim()).length;$('progress').value=filled;$('completion').textContent=filled+' z 24 otázek zodpovězeno';for(const f of fields)document.querySelector('[data-answer="'+f.id+'"]').textContent=$(f.id).value;}
function show(i,focus=true){current=Math.max(0,Math.min(steps.length-1,i));steps.forEach((s,j)=>s.hidden=j!==current);nav.forEach((b,j)=>{if(j===current)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current')});$('back').disabled=current===0;$('next').textContent=current===5?'Uložit odpovědi ↓':current===4?'Volitelné shrnutí →':'Další krok →';if(focus)$('title'+current).focus();update();}
function data(){return{version:1,questionnaire,date:$('date').value,schoolCode:$('school').value,answers:Object.fromEntries(fields.map(f=>[f.id,$(f.id).value]))}}
function download(name,text,type){const url=URL.createObjectURL(new Blob([text],{type}));const a=document.createElement('a');a.href=url;a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),2000)}
function save(){download('krokivo-odpovedi.json',JSON.stringify(data(),null,2),'application/json');dirty=false;$('status').textContent='Soubor byl připraven ke stažení. Zkontrolujte, že se uložil.'}
function exportText(){const d=data();let t='KROKIVO — ROZHOVOR SE ŠKOLOU\nDatum: '+d.date+'\nKód školy: '+d.schoolCode+'\n';let prev='';for(const f of fields){if(prev!==f.section){t+='\n## '+f.section+'\n';prev=f.section}t+='\n'+f.number+'. '+f.question+'\n'+(d.answers[f.id]||'[bez odpovědi]')+'\n'}download('krokivo-odpovedi.txt',t,'text/plain;charset=utf-8');$('status').textContent='Textový přehled byl připraven ke stažení.'}
nav.forEach(b=>b.addEventListener('click',()=>show(Number(b.dataset.go))));
$('back').addEventListener('click',()=>show(current-1));
$('next').addEventListener('click',()=>current===5?save():show(current+1));
$('save').addEventListener('click',save);$('export').addEventListener('click',exportText);
$('print').addEventListener('click',()=>{update();window.print()});
$('import').addEventListener('click',()=>$('file').click());
$('file').addEventListener('change',async()=>{try{const file=$('file').files[0];if(!file)return;if(file.size>2500000)throw Error('Příliš velký soubor.');const d=JSON.parse(await file.text());if(d?.version!==1||d.questionnaire!==questionnaire||!d.answers||typeof d.answers!=='object'||Array.isArray(d.answers))throw Error('Neplatný formát dotazníku.');if(!confirm('Načíst odpovědi a nahradit aktuální obsah?'))return;for(const f of fields)$(f.id).value=typeof d.answers[f.id]==='string'?d.answers[f.id].slice(0,10000):'';$('date').value=typeof d.date==='string'?d.date:'';$('school').value=typeof d.schoolCode==='string'?d.schoolCode.slice(0,80):'';dirty=false;update();$('status').textContent='Odpovědi načteny.'}catch(err){$('status').textContent='Soubor nelze načíst: '+err.message}finally{$('file').value=''}});
document.querySelectorAll('textarea,input:not([type=file])').forEach(el=>el.addEventListener('input',()=>{dirty=true;update()}));
window.addEventListener('beforeunload',event=>{if(dirty){event.preventDefault();event.returnValue=''}});
window.addEventListener('beforeprint',update);
show(0,false);
