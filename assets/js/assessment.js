(function(){
  const audience = document.querySelectorAll('input[name="audience"]');
  const minorNote = document.getElementById('minor-note');
  const adultCheckin = document.getElementById('adult-checkin');
  const form = document.getElementById('checkin-form');
  if (!form) return;
  audience.forEach((radio) => radio.addEventListener('change', () => {
    const adult = radio.checked && radio.value === 'adult';
    const minor = radio.checked && radio.value === 'minor';
    if (adult) { adultCheckin.hidden = false; minorNote.hidden = true; }
    if (minor) { adultCheckin.hidden = true; minorNote.hidden = false; }
  }));
  const summaries = {
    stress: ['A focus on managing pressure', 'You selected stress management as a current priority. Consider exploring practical coping resources and, if the pressure is persistent or affecting daily life, discussing it with a qualified professional.', 'A gentle next step: choose one free resource and consider what you would like to ask a professional.'],
    mood: ['A focus on mood and routines', 'You selected mood and motivation as an area to explore. A professional can help you understand your experience in context; this check-in cannot determine a cause or condition.', 'A gentle next step: note what kind of support feels comfortable and explore provider options.'],
    relationships: ['A focus on relationships', 'You selected relationships and connection as a support goal. You might explore resources about communication and boundaries, or discuss your goals with an appropriately qualified professional.', 'A gentle next step: identify one question you would like to discuss with a professional.'],
    change: ['Support through change', 'You selected a life change or personal growth as your current focus. Support can help you clarify priorities and consider options without needing to have everything figured out first.', 'A gentle next step: explore resources and consider which type of professional support might suit you.'],
    unsure: ['It is okay not to know yet', 'You do not need to label your experience to begin exploring support. This check-in does not make a clinical judgement about what you may need.', 'A gentle next step: read the support guides or use Eloise matching to explore practical options.']
  };
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const consent = document.getElementById('checkin-consent');
    const goal = form.querySelector('input[name="goal"]:checked');
    const next = form.querySelector('input[name="nextstep"]:checked');
    const status = document.getElementById('checkin-status');
    if (!goal || !next || !consent.checked) {
      status.textContent = 'Please choose an answer for each question and confirm the note above.';
      return;
    }
    const copy = summaries[goal.value] || summaries.unsure;
    document.getElementById('summary-title').textContent = copy[0];
    document.getElementById('summary-copy').textContent = copy[1];
    document.getElementById('summary-next').textContent = copy[2] + (next.value === 'self' ? ' You selected self-guided resources as your preferred next step.' : next.value === 'professional' ? ' You selected speaking with a professional as your preferred next step.' : ' You selected exploring options before deciding.');
    document.getElementById('summary').hidden = false;
    status.textContent = 'Your free demo summary is ready. No answers were sent to a server.';
    document.getElementById('summary').scrollIntoView({behavior:'smooth', block:'start'});
  });
})();