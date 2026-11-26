'use strict';
// Fixed, illustrative schedules; no personal information or persistence.
const activities = {
 arrive:['Přijdu do školy','<path d="M22 96V44l38-25 38 25v52H22Z" fill="#dbe8f6" stroke="#345678" stroke-width="4"/><path d="M49 96V65h22v31M33 53h13v13H33ZM74 53h13v13H74Z" fill="#fff" stroke="#345678" stroke-width="3"/><path d="M12 99h96" stroke="#345678" stroke-width="4" stroke-linecap="round"/>'],
 learn:['Učím se','<path d="M60 33Q38 18 13 29v63q25-10 47 5 22-15 47-5V29Q82 18 60 33Z" fill="#dcefd3" stroke="#18483e" stroke-width="4" stroke-linejoin="round"/><path d="M60 33v64M26 44l22 4M26 59l22 4M72 48l22-4M72 63l22-4" stroke="#18483e" stroke-width="3" stroke-linecap="round"/>'],
 snack:['Svačím','<path d="M60 35C39 20 17 42 27 66s25 30 33 23c8 7 23 1 33-23s-12-46-33-31Z" fill="#c94d3b" stroke="#8c352a" stroke-width="3"/><path d="M60 35q-4-16 8-24" stroke="#654934" stroke-width="5" fill="none"/><path d="M64 24Q82 5 97 17 86 31 64 24Z" fill="#6d9d4c"/>'],
 play:['Hraju si','<circle cx="60" cy="61" r="39" fill="#f3d9a1" stroke="#916835" stroke-width="4"/><path d="M24 49q36-29 72 0M24 73q36 29 72 0M60 22q-24 39 0 78M60 22q24 39 0 78" fill="none" stroke="#916835" stroke-width="4"/>'],
 home:['Jdu domů','<path d="M12 51 60 16l48 35-10 8v44H22V59Z" fill="#f0ddc4" stroke="#80502e" stroke-width="4" stroke-linejoin="round"/><path d="M48 103V68h24v35" fill="#fff" stroke="#80502e" stroke-width="4"/>'],
 wake:['Vstanu','<circle cx="84" cy="31" r="16" fill="#f4c85e" stroke="#906b24" stroke-width="3"/><path d="M12 91V36M12 66h96v25M12 81h96M19 54h24q9 0 9 12H19Z" fill="#dbe8f6" stroke="#345678" stroke-width="4" stroke-linejoin="round"/><path d="M54 54h45q9 0 9 12H54Z" fill="#92b9d8"/>'],
 wash:['Umyji se','<path d="M23 41h36V22h29q15 0 15 15v9H84V39H59" fill="none" stroke="#607c88" stroke-width="12" stroke-linejoin="round"/><path d="M88 53q-13 18 0 22 13-4 0-22ZM68 66q-10 15 0 18 10-3 0-18Z" fill="#62a8d1"/><path d="M17 86h90q-4 22-45 22T17 86Z" fill="#dbe8f6" stroke="#345678" stroke-width="3"/>'],
 dress:['Obléknu se','<path d="M42 20q18 17 36 0l32 21-16 26-15-9v44H41V58l-15 9L10 41Z" fill="#b9d7a8" stroke="#517b55" stroke-width="4" stroke-linejoin="round"/>'],
 breakfast:['Snídám','<path d="M15 58h90q-6 39-45 39T15 58Z" fill="#dbe8f6" stroke="#345678" stroke-width="4"/><path d="M28 52q5-21 22-7 11-22 25-2 17-11 21 9" fill="#d8ae68" stroke="#916835" stroke-width="3"/><path d="M89 56l14-34" stroke="#607c88" stroke-width="6" stroke-linecap="round"/>']
};
const plans={school:['arrive','learn','snack','play','home'],morning:['wake','wash','dress','breakfast','arrive']};
const $=id=>document.getElementById(id);
let plan='school',index=0;
const icon=id=>'<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">'+(id?activities[id][1]:'<path d="m25 62 23 23 47-51" fill="none" stroke="#18483e" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>')+'</svg>';
function render(focus=false){
 const ids=plans[plan],done=index===ids.length;
 $('routine-count').textContent=index+' z '+ids.length+' dokončeno';
 $('routine-progress').max=ids.length;$('routine-progress').value=index;
 $('routine-list').innerHTML=ids.map((id,i)=>'<li class="routine-item'+(i===index?' current':i<index?' completed':'')+'"'+(i===index?' aria-current="step"':'')+'><div class="routine-icon" aria-hidden="true">'+icon(id)+'</div><strong>'+activities[id][0]+'</strong><span class="routine-state">'+(i<index?'✓ Hotovo':i===index?'Teď':'Potom')+'</span></li>').join('');
 $('routine-current').hidden=done;$('routine-done').hidden=!done;
 $('routine-back').disabled=index===0;$('routine-forward').hidden=done;$('routine-reset').disabled=index===0;
 if(!done){$('current-icon').innerHTML=icon(ids[index]);$('current-name').textContent=activities[ids[index]][0];const next=ids[index+1];$('next-icon').innerHTML=icon(next);$('next-name').textContent=next?activities[next][0]:'Konec plánu';$('routine-forward').textContent=next?'Hotovo, další činnost →':'Dokončit plán';}
 if(focus)$(done?'routine-finish':'current-name').focus();
}
function selectPlan(value){if(value===plan)return;plan=value;index=0;$('school').setAttribute('aria-pressed',String(plan==='school'));$('morning').setAttribute('aria-pressed',String(plan==='morning'));$('routine-status').textContent='Zobrazen nový plán.';render();}
function move(delta){index=Math.max(0,Math.min(plans[plan].length,index+delta));$('routine-status').textContent='';render(true);}
$('school').addEventListener('click',()=>selectPlan('school'));
$('morning').addEventListener('click',()=>selectPlan('morning'));
$('routine-back').addEventListener('click',()=>move(-1));
$('routine-forward').addEventListener('click',()=>move(1));
$('routine-reset').addEventListener('click',()=>{index=0;$('routine-status').textContent='Plán začíná znovu.';render(true);});
render();
