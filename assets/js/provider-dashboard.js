// Eloise provider workspace prototype. All records are fictional and all changes are local.
document.addEventListener('DOMContentLoaded',function(){
 const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
 const toast=$('#provider-toast');let timer;
 function notify(m){toast.textContent=m;toast.classList.add('show');clearTimeout(timer);timer=setTimeout(()=>toast.classList.remove('show'),2800);}
 $('#provider-year').textContent=new Date().getFullYear();
 $('#provider-date').textContent=new Intl.DateTimeFormat(undefined,{weekday:'short',month:'short',day:'numeric',year:'numeric'}).format(new Date());
 const sessions=[
  {ref:'EL-2081',client:'Client A17',format:'Video',when:'Oct 15 · 09:30',status:'Booked',follow:'Prepare session'},
  {ref:'EL-2084',client:'Client B04',format:'Audio',when:'Oct 15 · 13:00',status:'Booked',follow:'Prepare session'},
  {ref:'EL-2087',client:'Client C22',format:'Chat',when:'Oct 16 · 10:00',status:'Needs attention',follow:'Confirm time'},
  {ref:'EL-2076',client:'Client D11',format:'Video',when:'Oct 13 · 16:30',status:'Completed',follow:'Complete notes'},
  {ref:'EL-2072',client:'Client E08',format:'Audio',when:'Oct 12 · 11:00',status:'Cancelled',follow:'No action'}
 ];
 const clients=[
  {alias:'Client A17',format:'Video',zone:'UTC+01:00',next:'Oct 15 · 09:30',status:'Active'},
  {alias:'Client B04',format:'Audio',zone:'UTC+00:00',next:'Oct 15 · 13:00',status:'Active'},
  {alias:'Client C22',format:'Chat',zone:'UTC−05:00',next:'Oct 16 · 10:00',status:'Active'},
  {alias:'Client D11',format:'Video',zone:'UTC+01:00',next:'Not booked',status:'Awaiting booking'},
  {alias:'Client E08',format:'Audio',zone:'UTC+00:00',next:'Not booked',status:'Awaiting booking'}
 ];
 function pill(v){let c=['Needs attention','Pending'].includes(v)?'pending':['Cancelled'].includes(v)?'suspended':['Awaiting booking'].includes(v)?'review':'';return '<span class="pill '+c+'">'+v+'</span>';}
 function empty(n){return '<tr><td colspan="'+n+'" class="empty-row">No matching sample records.</td></tr>';}
 function renderSchedule(){
  let q=$('#schedule-search').value.toLowerCase(),st=$('#schedule-filter').value;
  let rows=sessions.filter(s=>(s.ref+' '+s.client+' '+s.format).toLowerCase().includes(q)&&(st==='all'||s.status===st));
  $('#provider-schedule-table').innerHTML=rows.map(s=>'<tr><td><strong>'+s.ref+'</strong></td><td>'+s.client+'</td><td>'+s.format+'</td><td>'+s.when+'</td><td>'+pill(s.status)+'</td><td><select class="action-select session-action" data-ref="'+s.ref+'" aria-label="Update '+s.ref+'"><option value="">Update</option><option>Booked</option><option>Needs attention</option><option>Completed</option><option>Cancelled</option></select></td></tr>').join('')||empty(6);
 }
 function renderClients(){
  const q=$('#client-search').value.toLowerCase(),st=$('#client-state').value;
  const rows=clients.filter(c=>(c.alias+' '+c.format+' '+c.zone).toLowerCase().includes(q)&&(st==='all'||c.status===st));
  $('#provider-clients-table').innerHTML=rows.map(c=>'<tr><td><strong>'+c.alias+'</strong></td><td>'+c.format+'</td><td>'+c.zone+'</td><td>'+c.next+'</td><td>'+pill(c.status)+'</td></tr>').join('')||empty(5);
 }
 function renderHistory(){
  $('#provider-history-table').innerHTML=sessions.map(s=>'<tr><td>'+s.ref+'</td><td>'+s.client+'</td><td>'+s.when+'</td><td>'+s.format+'</td><td>'+pill(s.status)+'</td><td>'+s.follow+'</td></tr>').join('');
 }
 function renderNext(){
  $('#next-session-list').innerHTML=sessions.filter(s=>['Booked','Needs attention'].includes(s.status)).slice(0,3).map(s=>'<div class="row"><span><strong>'+s.when+'</strong><br><small class="mut">'+s.client+' · '+s.format+'</small></span>'+pill(s.status)+'</div>').join('');
 }
 function navigate(id){
  const sec=$('#'+id);if(!sec||!sec.classList.contains('admin-section'))return;
  $$('.admin-section').forEach(s=>s.classList.toggle('active',s===sec));
  $$('.admin-nav a').forEach(a=>a.classList.toggle('active',a.dataset.providerSection===id));
  $('#provider-page-title').textContent=sec.dataset.title||'Overview';
  if(location.hash!=='#'+id)history.replaceState(null,'','#'+id);
  window.scrollTo({top:0,behavior:'smooth'});
 }
 $$('.admin-nav a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();navigate(a.dataset.providerSection);}));
 $$('[data-provider-go]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();navigate(a.dataset.providerGo);}));
 ['schedule-search','schedule-filter'].forEach(id=>$('#'+id).addEventListener('input',renderSchedule));
 ['client-search','client-state'].forEach(id=>$('#'+id).addEventListener('input',renderClients));
 $('#provider-schedule-table').addEventListener('change',e=>{if(!e.target.matches('.session-action')||!e.target.value)return;const s=sessions.find(x=>x.ref===e.target.dataset.ref);if(s){s.status=e.target.value;renderSchedule();renderHistory();renderNext();notify('Sample session status changed locally only.');}});
 $('#save-availability').addEventListener('click',()=>notify('Availability preview saved for this browser session only.'));
 $('#save-provider-profile').addEventListener('click',()=>{$('#provider-profile-message').textContent='Demo profile preview updated locally. Nothing was sent to a server.';notify('Demo profile updated locally.');});
 $('#provider-profile-form').addEventListener('submit',e=>e.preventDefault());
 $('#provider-support-form').addEventListener('submit',e=>{e.preventDefault();$('#support-message-status').textContent='Preview only: support request has not been sent. A backend support endpoint is required.';notify('Support request preview created.');});
 function download(name,rows){const csv=rows.map(r=>r.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');const url=URL.createObjectURL(new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();URL.revokeObjectURL(url);notify('Demo CSV exported.');}
 $('#export-provider-history').addEventListener('click',()=>download('eloise-provider-demo-history.csv',[['Reference','Client alias','Date','Format','Status','Follow-up'],...sessions.map(s=>[s.ref,s.client,s.when,s.format,s.status,s.follow])]));
 $('#export-provider-earnings').addEventListener('click',()=>download('eloise-provider-demo-earnings.csv',[['Reference','Period','Amount','Status'],['PAY-DEMO-014','Sep 2026','980.00','Paid sample'],['PAY-DEMO-015','Oct 2026','240.00','Pending sample']]));
 renderSchedule();renderClients();renderHistory();renderNext();
 const hash=location.hash.slice(1);if(hash&&$('#'+hash)?.classList.contains('admin-section'))navigate(hash);
});