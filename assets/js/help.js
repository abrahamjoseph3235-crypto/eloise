document.addEventListener('DOMContentLoaded',function(){
 const f=document.getElementById('help-form'),s=document.getElementById('help-status');
 if(f)f.addEventListener('submit',function(e){e.preventDefault();s.textContent='Demo preview only: your message has not been sent or saved. Connect a secure support endpoint before launch.';});
});