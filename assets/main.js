document.addEventListener('DOMContentLoaded', function () {
  // Mobile nav toggle
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('nav.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.textContent = nav.classList.contains('open') ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Scroll reveal
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { obs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Contact form (static site — no backend, so route to WhatsApp/email)
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.name.value.trim();
      var msg = form.message.value.trim();
      var service = form.service ? form.service.value : '';
      var text = encodeURIComponent(
        'Hi Asad, I\'m ' + name + '. Interested in: ' + service + '. ' + msg
      );
      window.open('https://wa.me/923107324098?text=' + text, '_blank');
    });
  }

  // Budget page: chip selector
  var chips = document.querySelectorAll('.budget-chip');
  var budgetInput = document.getElementById('budget-value');
  if (chips.length) {
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        chips.forEach(function (c) { c.classList.remove('selected'); });
        chip.classList.add('selected');
        if (budgetInput) budgetInput.value = chip.dataset.value;
      });
    });
  }

  var budgetForm = document.getElementById('budget-form');
  if (budgetForm) {
    budgetForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = budgetForm.name.value.trim();
      var service = budgetForm.service ? budgetForm.service.value : '';
      var budget = budgetInput ? budgetInput.value : '';
      if (!budget) {
        alert('Please select a budget range first.');
        return;
      }
      var text = encodeURIComponent(
        'Hi Asad, I\'m ' + name + '. My budget is ' + budget + ' for: ' + service + '.'
      );
      window.open('https://wa.me/923107324098?text=' + text, '_blank');
    });
  }
});
