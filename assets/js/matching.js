document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('matching-form');
  var results = document.getElementById('match-results');
  var list = document.getElementById('results-list');
  var status = document.getElementById('match-status');
  var reset = document.getElementById('reset-matching');
  if (!form || !results || !list) return;

  // Fictional profiles exist only to demonstrate the matching interface.
  var profiles = [
    {name:'Dr. Amara Okafor', initials:'AO', role:'Clinical psychologist · sample profile', focus:['mood','life','unsure'], languages:['english','igbo'], formats:['video','audio'], budget:'mid', times:['morning','afternoon'], price:'Illustrative fee: ₦12,000', bio:'A sample profile showing how a provider introduction and areas of practice could appear.'},
    {name:'Tomi Adeyemi', initials:'TA', role:'Counselling psychologist · sample profile', focus:['anxiety','relationships','life','unsure'], languages:['english','yoruba'], formats:['video','audio','inperson'], budget:'low', times:['afternoon','evening','weekend'], price:'Illustrative fee: ₦7,500', bio:'A sample profile demonstrating language, format and affordability preferences.'},
    {name:'Musa Bello', initials:'MB', role:'Mental-health professional · sample profile', focus:['anxiety','mood','unsure'], languages:['english','hausa'], formats:['video','audio'], budget:'mid', times:['evening','weekend'], price:'Illustrative fee: ₦10,000', bio:'A sample profile showing how availability and support preferences could be compared.'}
  ];
  var labels = {video:'Video',audio:'Audio',inperson:'In person',english:'English',yoruba:'Yoruba',igbo:'Igbo',hausa:'Hausa',morning:'Morning',afternoon:'Afternoon',evening:'Evening',weekend:'Weekend'};
  function selected(name) { var item=form.querySelector('[name="'+name+'"]:checked'); return item ? item.value : 'any'; }
  function score(p, prefs) {
    var s=0, reasons=[];
    if (prefs.focus!=='any' && p.focus.indexOf(prefs.focus)>=0) {s+=3; reasons.push('Support preference is represented in this sample profile');}
    if (prefs.language!=='any' && p.languages.indexOf(prefs.language)>=0) {s+=3; reasons.push('Matches your language preference');}
    if (prefs.format!=='any' && p.formats.indexOf(prefs.format)>=0) {s+=2; reasons.push('Offers your preferred sample format');}
    if (prefs.availability!=='any' && p.times.indexOf(prefs.availability)>=0) {s+=2; reasons.push('Matches your preferred time');}
    if (prefs.budget==='low' && p.budget==='low') {s+=2; reasons.push('Illustrative lower-cost option');}
    if (prefs.budget==='mid' && p.budget==='mid') {s+=2; reasons.push('Illustrative mid-range option');}
    if (prefs.budget==='flexible' || prefs.budget==='any') {s+=1;}
    return {score:s,reasons:reasons};
  }
  function render(p, rank) {
    var div=document.createElement('article'); div.className='card provider-match-card';
    var avatar=document.createElement('div'); avatar.className='avatar'; avatar.textContent=p.initials; avatar.setAttribute('aria-hidden','true');
    var title=document.createElement('h3'); title.textContent=p.name;
    var role=document.createElement('p'); role.className='mut profile-role'; role.textContent=p.role;
    var bio=document.createElement('p'); bio.textContent=p.bio;
    var price=document.createElement('p'); price.className='profile-price'; price.textContent=p.price;
    var tag=document.createElement('span'); tag.className='sample-tag'; tag.textContent='Sample '+rank;
    var reasonTitle=document.createElement('h4'); reasonTitle.textContent='Why this appears';
    var ul=document.createElement('ul'); ul.className='plain';
    var reasons=p._reasons.length?p._reasons:['General preferences may be worth discussing with a qualified provider.'];
    reasons.slice(0,3).forEach(function(reason){var li=document.createElement('li');li.textContent=reason;ul.appendChild(li);});
    var btn=document.createElement('a'); btn.className='btn btn-outline btn-sm'; btn.href='help.html#contact'; btn.textContent='Questions before booking';
    div.append(avatar,tag,title,role,bio,price,reasonTitle,ul,btn); return div;
  }
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!form.reportValidity()) return;
    var prefs={focus:selected('focus'),format:form.elements.format.value,language:form.elements.language.value,budget:form.elements.budget.value,availability:form.elements.availability.value};
    var ranked=profiles.map(function(p){var match=score(p,prefs);return Object.assign({},p,{_score:match.score,_reasons:match.reasons});});
    ranked.sort(function(a,b){return b._score-a._score;});
    list.replaceChildren();
    ranked.forEach(function(p,i){list.appendChild(render(p,i+1));});
    results.hidden=false;
    status.textContent='Shortlist generated using sample data only. Your preferences were processed in this browser and were not sent or saved.';
    results.scrollIntoView({behavior:'smooth',block:'start'});
  });
  if(reset) reset.addEventListener('click',function(){results.hidden=true;list.replaceChildren();status.textContent='Preferences cleared.';});
});