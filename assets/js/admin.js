// Eloise admin dashboard: interactive front-end prototype with fictional data only.
document.addEventListener('DOMContentLoaded', function () {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => Array.from(root.querySelectorAll(s));
  const toast = $('#admin-toast');
  let toastTimer;
  function notify(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
  }
  $('#admin-year').textContent = new Date().getFullYear();
  $('#today-date').textContent = new Intl.DateTimeFormat(undefined,{weekday:'short',month:'short',day:'numeric',year:'numeric'}).format(new Date());

  const users = [
    {name:'Maya Bennett',email:'maya.b@example.test',role:'Client',joined:'Oct 12, 2026',verification:'Not required',status:'Active'},
    {name:'Dr. Amara Okafor',email:'amara.o@example.test',role:'Provider',joined:'Oct 11, 2026',verification:'Verified',status:'Active'},
    {name:'Daniel Mensah',email:'daniel.m@example.test',role:'Provider',joined:'Oct 10, 2026',verification:'Pending',status:'Pending'},
    {name:'Nadia Williams',email:'nadia.w@example.test',role:'Client',joined:'Oct 09, 2026',verification:'Not required',status:'Active'},
    {name:'Dr. Leo Martin',email:'leo.m@example.test',role:'Provider',joined:'Oct 07, 2026',verification:'Review needed',status:'Pending'},
    {name:'Aisha Bello',email:'aisha.b@example.test',role:'Client',joined:'Oct 06, 2026',verification:'Not required',status:'Suspended'},
    {name:'Samuel Reed',email:'samuel.r@example.test',role:'Runner',joined:'Oct 04, 2026',verification:'Not required',status:'Active'},
    {name:'Operations Admin',email:'admin@example.test',role:'Admin',joined:'Oct 01, 2026',verification:'Verified',status:'Active'}
  ];
  const events = [
    {event:'Account created',actor:'Maya Bennett',type:'Account',time:'Today, 18:42',result:'Success'},
    {event:'Provider application submitted',actor:'Daniel Mensah',type:'Application',time:'Today, 17:18',result:'Pending'},
    {event:'Appointment rescheduled',actor:'Nadia Williams',type:'Appointment',time:'Today, 16:05',result:'Success'},
    {event:'Sign-in attempt blocked',actor:'Sample account',type:'Security',time:'Today, 14:32',result:'Review'},
    {event:'Provider verification updated',actor:'Operations Admin',type:'Admin action',time:'Today, 11:20',result:'Success'}
  ];
  const applications = [
    {name:'Daniel Mensah',specialty:'Anxiety & stress',stage:'New',interview:'Not scheduled',outcome:'Pending'},
    {name:'Dr. Leo Martin',specialty:'Family therapy',stage:'Credential review',interview:'Not scheduled',outcome:'Pending'},
    {name:'Dr. Priya Shah',specialty:'Life transitions',stage:'Interview scheduled',interview:'Oct 18, 2026 · 10:00',outcome:'Pending'},
    {name:'Dr. Noah James',specialty:'Trauma-informed care',stage:'Interview complete',interview:'Oct 12, 2026 · 14:00',outcome:'Pending'}
  ];
  const feedback = [
    {id:'FB-1042',title:'Booking time zone looks incorrect',from:'Maya Bennett',category:'Bug report',priority:'High',status:'Open',date:'Oct 14, 2026',message:'The appointment confirmation seems to show a different time zone from the one selected during booking. Please review how the selected local time is displayed.'},
    {id:'FB-1041',title:'Request for more language filters',from:'Nadia Williams',category:'Feature request',priority:'Normal',status:'In progress',date:'Oct 13, 2026',message:'It would help to filter providers by multiple languages and see their available session formats.'},
    {id:'FB-1039',title:'Question about provider verification',from:'Daniel Mensah',category:'Support',priority:'High',status:'Open',date:'Oct 13, 2026',message:'Could you explain which credential documents are required and how long the review normally takes?'},
    {id:'FB-1035',title:'Mobile layout suggestion',from:'Sample client',category:'Product feedback',priority:'Normal',status:'Resolved',date:'Oct 11, 2026',message:'The dashboard navigation could be easier to use on smaller screens.'}
  ];
  const appointments = [
    {ref:'EL-2081',provider:'Dr. Amara Okafor',format:'Video',when:'Oct 15 · 09:30',status:'Booked'},
    {ref:'EL-2080',provider:'Dr. Priya Shah',format:'Audio',when:'Oct 15 · 12:00',status:'Needs attention'},
    {ref:'EL-2076',provider:'Dr. Noah James',format:'Video',when:'Oct 13 · 16:30',status:'Completed'},
    {ref:'EL-2072',provider:'Dr. Amara Okafor',format:'Chat',when:'Oct 12 · 11:00',status:'Cancelled'}
  ];
  const audit = [
    ['Oct 14, 18:42','Operations Admin','Viewed dashboard','Overview','Routine operations review'],
    ['Oct 14, 17:18','Operations Admin','Opened application queue','Applications','Provider onboarding'],
    ['Oct 14, 14:32','System event sample','Blocked sign-in attempt','Sample account','Illustrative security event'],
    ['Oct 13, 10:10','Operations Admin','Reviewed support ticket','FB-1041','Customer support']
  ];
  function initials(name){return name.split(/\s+/).map(x=>x[0]).slice(0,2).join('').toUpperCase();}
  function pill(text){let cls='';if(['Pending','New','Open','Needs attention'].includes(text))cls='pending';else if(['Suspended','Declined','Cancelled'].includes(text))cls='suspended';else if(['Review needed','Credential review','Interview scheduled','In progress','Review'].includes(text))cls='review';else if(['Completed','Approved','Resolved','Verified','Success','Booked','Active'].includes(text))cls='';else cls='neutral';return '<span class="pill '+cls+'">'+text+'</span>';}
  function emptyRow(cols,msg='No matching demo records found.'){return '<tr><td colspan="'+cols+'" class="empty-row">'+msg+'</td></tr>';}
  function renderUsers(){
    const q=$('#user-search').value.toLowerCase(), role=$('#user-role').value,status=$('#user-status').value;
    const list=users.filter(u=>(u.name+' '+u.email).toLowerCase().includes(q)&&(role==='all'||u.role===role)&&(status==='all'||u.status===status));
    $('#users-table').innerHTML=list.map((u)=>'<tr><td><div class="person-cell"><span class="person-avatar">'+initials(u.name)+'</span><span><strong>'+u.name+'</strong><small>'+u.email+'</small></span></div></td><td>'+u.role+'</td><td>'+u.joined+'</td><td>'+pill(u.verification)+'</td><td>'+pill(u.status)+'</td><td><select class="action-select user-action" data-email="'+u.email+'" aria-label="Change status for '+u.name+'"><option value="">Choose action</option><option value="Active">Set active</option><option value="Suspended">Suspend account</option><option value="Pending">Mark pending</option></select></td></tr>').join('')||emptyRow(6);
  }
  function renderEvents(){
    const q=($('#activity-search')?.value||'').toLowerCase();
    const rows=events.filter(e=>(e.event+' '+e.actor+' '+e.type+' '+e.result).toLowerCase().includes(q));
    const body=rows.map(e=>'<tr><td>'+e.event+'</td><td>'+e.actor+'</td><td>'+e.type+'</td><td>'+e.time+'</td><td>'+pill(e.result)+'</td></tr>').join('')||emptyRow(5);
    $('#activity-table').innerHTML=body;
    $('#recent-events').innerHTML=events.slice(0,5).map(e=>'<tr><td>'+e.event+'</td><td>'+e.actor+'</td><td>'+e.type+'</td><td>'+e.time+'</td><td>'+pill(e.result)+'</td></tr>').join('');
  }
  function renderApplications(){
    const q=$('#application-search').value.toLowerCase(), stage=$('#application-status').value;
    const list=applications.filter(a=>(a.name+' '+a.specialty).toLowerCase().includes(q)&&(stage==='all'||a.stage===stage));
    $('#applications-table').innerHTML=list.map(a=>'<tr><td><strong>'+a.name+'</strong></td><td>'+a.specialty+'</td><td>'+pill(a.stage)+'</td><td>'+a.interview+'</td><td>'+pill(a.outcome)+'</td><td><select class="action-select app-action" data-name="'+a.name+'" aria-label="Update stage for '+a.name+'"><option value="">Update stage</option><option>Credential review</option><option>Interview scheduled</option><option>Interview complete</option><option>Approved</option><option>Declined</option></select></td></tr>').join('')||emptyRow(6);
  }
  let selectedFeedback=feedback[0]?.id;
  function renderFeedback(){
    const q=$('#feedback-search').value.toLowerCase(),filter=$('#feedback-filter').value;
    const list=feedback.filter(f=>(f.title+' '+f.from+' '+f.id+' '+f.category).toLowerCase().includes(q)&&(filter==='all'||f.priority===filter||f.status===filter));
    $('#feedback-list').innerHTML=list.map(f=>'<button class="feedback-item '+(f.id===selectedFeedback?'selected':'')+'" data-feedback="'+f.id+'"><div class="feedback-head"><strong>'+f.title+'</strong>'+pill(f.priority)+'</div><p>'+f.from+' · '+f.category+'</p><small>'+f.id+' · '+f.date+' · '+f.status+'</small></button>').join('')||'<p class="mut" style="padding:16px">No matching demo feedback.</p>';
    if(!list.some(f=>f.id===selectedFeedback))selectedFeedback=list[0]?.id;
    renderFeedbackDetail();
  }
  function renderFeedbackDetail(){
    const f=feedback.find(x=>x.id===selectedFeedback);
    if(!f){$('#feedback-detail').innerHTML='<h3>No item selected</h3><p class="mut">Adjust the filters to see demo feedback.</p>';return;}
    $('#feedback-detail').innerHTML='<span class="mini-label">'+f.id+' · '+f.date+'</span><h3>'+f.title+'</h3><p class="mut">From '+f.from+' · '+f.category+'</p><p>'+f.message+'</p><div class="detail-meta"><span>Priority</span>'+pill(f.priority)+'</div><label for="feedback-status-edit">Ticket status</label><select id="feedback-status-edit"><option '+(f.status==='Open'?'selected':'')+'>Open</option><option '+(f.status==='In progress'?'selected':'')+'>In progress</option><option '+(f.status==='Resolved'?'selected':'')+'>Resolved</option></select><label for="internal-note">Internal note (demo only)</label><textarea id="internal-note" rows="3" placeholder="Add a note for the support team…"></textarea><button class="admin-button primary" id="save-feedback">Save demo update</button>';
    $('#save-feedback').addEventListener('click',()=>{f.status=$('#feedback-status-edit').value;const note=$('#internal-note').value.trim();audit.unshift([new Date().toLocaleString(),'Operations Admin','Updated feedback status',f.id,note||'Status changed in prototype']);selectedFeedback=f.id;renderFeedback();renderAudit();notify('Demo ticket updated in this browser only.');});
  }
  function renderAppointments(){
    const q=$('#appointment-search').value.toLowerCase(),st=$('#appointment-status').value;
    const list=appointments.filter(a=>(a.ref+' '+a.provider+' '+a.format).toLowerCase().includes(q)&&(st==='all'||a.status===st));
    $('#appointments-table').innerHTML=list.map(a=>'<tr><td><strong>'+a.ref+'</strong></td><td>'+a.provider+'</td><td>'+a.format+'</td><td>'+a.when+'</td><td>'+pill(a.status)+'</td><td><select class="action-select appointment-action" data-ref="'+a.ref+'" aria-label="Update '+a.ref+'"><option value="">Update status</option><option>Booked</option><option>Needs attention</option><option>Completed</option><option>Cancelled</option></select></td></tr>').join('')||emptyRow(6);
  }
  function renderAudit(){$('#audit-table').innerHTML=audit.map(a=>'<tr>'+a.map(v=>'<td>'+v+'</td>').join('')+'</tr>').join('');}
  function csvDownload(filename,rows){
    const csv=rows.map(row=>row.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');
    const blob=new Blob(['\uFEFF'+csv],{type:'text/csv;charset=utf-8;'}),url=URL.createObjectURL(blob),a=document.createElement('a');
    a.href=url;a.download=filename;document.body.appendChild(a);a.click();a.remove();URL.revokeObjectURL(url);notify('Demo CSV exported.');
  }
  function exportData(kind){
    const map={users:{file:'eloise-demo-users.csv',headers:['Name','Email','Role','Joined','Verification','Status'],data:users.map(u=>[u.name,u.email,u.role,u.joined,u.verification,u.status])},applications:{file:'eloise-demo-applications.csv',headers:['Applicant','Specialty','Stage','Interview','Outcome'],data:applications.map(a=>[a.name,a.specialty,a.stage,a.interview,a.outcome])},feedback:{file:'eloise-demo-feedback.csv',headers:['ID','Title','From','Category','Priority','Status','Date'],data:feedback.map(f=>[f.id,f.title,f.from,f.category,f.priority,f.status,f.date])},appointments:{file:'eloise-demo-appointments.csv',headers:['Reference','Provider','Format','Scheduled','Status'],data:appointments.map(a=>[a.ref,a.provider,a.format,a.when,a.status])},audit:{file:'eloise-demo-audit.csv',headers:['When','Administrator','Action','Target','Reason'],data:audit}};
    const x=map[kind];csvDownload(x.file,[x.headers,...x.data]);
  }
  function navigate(id){
    const section=$('#'+id);if(!section||!section.classList.contains('admin-section'))return;
    $$('.admin-section').forEach(s=>s.classList.toggle('active',s===section));
    $$('.admin-nav a').forEach(a=>a.classList.toggle('active',a.dataset.section===id));
    $('#page-title').textContent=section.dataset.title||'Overview';
    if(location.hash!=='#'+id)history.replaceState(null,'','#'+id);
    window.scrollTo({top:0,behavior:'smooth'});
  }
  $$('.admin-nav a').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();navigate(a.dataset.section);}));
  $$('[data-go]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();navigate(a.dataset.go);}));
  ['user-search','user-role','user-status'].forEach(id=>$('#'+id).addEventListener('input',renderUsers));
  ['application-search','application-status'].forEach(id=>$('#'+id).addEventListener('input',renderApplications));
  ['feedback-search','feedback-filter'].forEach(id=>$('#'+id).addEventListener('input',renderFeedback));
  ['appointment-search','appointment-status'].forEach(id=>$('#'+id).addEventListener('input',renderAppointments));
  $('#activity-search').addEventListener('input',renderEvents);
  $('#users-table').addEventListener('change',e=>{if(!e.target.matches('.user-action')||!e.target.value)return;const u=users.find(u=>u.email===e.target.dataset.email);if(u){u.status=e.target.value;audit.unshift([new Date().toLocaleString(),'Operations Admin','Changed account status',u.email,'Prototype action']);renderUsers();renderAudit();notify('Demo account status changed locally.');}});
  $('#applications-table').addEventListener('change',e=>{if(!e.target.matches('.app-action')||!e.target.value)return;const a=applications.find(a=>a.name===e.target.dataset.name);if(a){const v=e.target.value;a.stage=['Approved','Declined'].includes(v)?'Interview complete':v;a.outcome=['Approved','Declined'].includes(v)?v:'Pending';audit.unshift([new Date().toLocaleString(),'Operations Admin','Updated application stage',a.name,v+' (demo)']);renderApplications();renderAudit();notify('Demo application updated locally.');}});
  $('#appointments-table').addEventListener('change',e=>{if(!e.target.matches('.appointment-action')||!e.target.value)return;const a=appointments.find(a=>a.ref===e.target.dataset.ref);if(a){a.status=e.target.value;audit.unshift([new Date().toLocaleString(),'Operations Admin','Updated appointment status',a.ref,a.status+' (demo)']);renderAppointments();renderAudit();notify('Demo appointment updated locally.');}});
  $('#feedback-list').addEventListener('click',e=>{const b=e.target.closest('[data-feedback]');if(b){selectedFeedback=b.dataset.feedback;renderFeedback();}});
  $('#refresh-activity').addEventListener('click',()=>{renderEvents();notify('Sample activity feed refreshed. No server was contacted.');});
  $('#export-users').addEventListener('click',()=>exportData('users'));
  $('#export-applications').addEventListener('click',()=>exportData('applications'));
  $('#export-feedback').addEventListener('click',()=>exportData('feedback'));
  $('#export-appointments').addEventListener('click',()=>exportData('appointments'));
  $('#export-audit').addEventListener('click',()=>exportData('audit'));
  $('#preview-notice').addEventListener('click',()=>{const v=$('#notice-text').value.trim();$('#notice-preview').textContent=v?'Preview only: “'+v+'”':'Write a notice first to preview it.';});
  renderUsers();renderEvents();renderApplications();renderFeedback();renderAppointments();renderAudit();
  $('#admin-logout').addEventListener('click',async()=>{try{await fetch('/api/admin/logout',{method:'POST',credentials:'same-origin'});}finally{window.location.replace('/admin-login.html');}});
  const initial=location.hash.slice(1);if(initial&&$('#'+initial)?.classList.contains('admin-section'))navigate(initial);
});