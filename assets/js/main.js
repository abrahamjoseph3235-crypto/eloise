// Eloise - small interactions (no dependencies)
document.addEventListener('DOMContentLoaded',function(){
  var y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
  var mb=document.querySelector('.menu-btn'),nav=document.querySelector('.nav');
  if(mb&&nav)mb.addEventListener('click',function(){var o=nav.classList.toggle('open');mb.setAttribute('aria-expanded',o)});
  document.querySelectorAll('.chip').forEach(function(c){c.addEventListener('click',function(){c.setAttribute('aria-pressed',c.getAttribute('aria-pressed')==='true'?'false':'true')})});
  var dlg=document.getElementById('video-dialog'),open=document.getElementById('open-video');
  if(dlg&&open){open.addEventListener('click',function(){dlg.showModal()});
    dlg.querySelector('.close').addEventListener('click',function(){var v=dlg.querySelector('video');if(v)v.pause();dlg.close()})}
  document.querySelectorAll('form[data-demo]').forEach(function(f){f.addEventListener('submit',function(e){e.preventDefault();
    var m=f.querySelector('.form-msg');if(m)m.textContent='Thank you. (Demo only: connect this form to your backend or form service.)'})});
  var prefs=document.getElementById('save-client-preferences');
  if(prefs)prefs.addEventListener('click',function(){var m=document.getElementById('client-preferences-message');if(m)m.textContent='Preview only: preferences have not been saved to an account.';});
});
