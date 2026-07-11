
(() => {
  const root = document.documentElement;
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      document.body.classList.toggle('menu-open', open);
      menuButton.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      document.body.classList.remove('menu-open');
      menuButton.setAttribute('aria-expanded', 'false');
    }));
  }

  document.querySelectorAll('[data-lang-choice]').forEach(link => {
    link.addEventListener('click', () => {
      localStorage.setItem('dokrok-lang', link.dataset.langChoice);
    });
  });

  const search = document.querySelector('[data-article-search]');
  if (search) {
    const cards = [...document.querySelectorAll('[data-article-card]')];
    const empty = document.querySelector('[data-search-empty]');
    search.addEventListener('input', () => {
      const q = search.value.trim().toLocaleLowerCase();
      let visible = 0;
      cards.forEach(card => {
        const haystack = (card.dataset.search || card.textContent).toLocaleLowerCase();
        const match = !q || haystack.includes(q);
        card.hidden = !match;
        if (match) visible++;
      });
      if (empty) empty.hidden = visible !== 0;
    });
  }

  const contactForm = document.querySelector('[data-mailto-form]');
  if (contactForm) {
    contactForm.addEventListener('submit', event => {
      event.preventDefault();
      const fd = new FormData(contactForm);
      const language = document.documentElement.lang === 'de' ? 'de' : 'en';
      const subjectPrefix = language === 'de' ? 'Website-Anfrage' : 'Website inquiry';
      const body = [
        `${language === 'de' ? 'Name' : 'Name'}: ${fd.get('name') || ''}`,
        `${language === 'de' ? 'E-Mail' : 'Email'}: ${fd.get('email') || ''}`,
        `${language === 'de' ? 'Organisation' : 'Organisation'}: ${fd.get('organisation') || ''}`,
        '',
        `${fd.get('message') || ''}`
      ].join('\n');
      location.href = `mailto:contact@dokrok.com?subject=${encodeURIComponent(subjectPrefix + ': ' + (fd.get('subject') || ''))}&body=${encodeURIComponent(body)}`;
    });
  }

  const year = document.querySelector('[data-current-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
