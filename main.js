(function () {
  var progress = document.getElementById('topProgress');
  var year = document.getElementById('yearLabel');
  var revealItems = document.querySelectorAll('.reveal');
  var root = document.documentElement;
  var themeToggle = document.getElementById('themeToggle');
  var langButtons = document.querySelectorAll('[data-lang-btn]');
  var translatableNodes = document.querySelectorAll('[data-fr][data-en]');
  var pageTitle = document.getElementById('pageTitle');
  var metaDescription = document.getElementById('metaDescription');
  var filterButtons = document.querySelectorAll('.filter-btn');
  var projectCards = document.querySelectorAll('.project-card');
  var copyEmailBtn = document.getElementById('copyEmailBtn');
  var copyFeedback = document.getElementById('copyFeedback');
  var backToTop = document.getElementById('backToTop');

  function getStoredTheme() {
    var saved = localStorage.getItem('theme');
    return saved === 'light' || saved === 'dark' ? saved : 'dark';
  }

  function getStoredLang() {
    var saved = localStorage.getItem('lang');
    return saved === 'en' || saved === 'fr' ? saved : 'fr';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeToggle) {
      var isFr = getStoredLang() === 'fr';
      if (theme === 'light') {
        themeToggle.textContent = isFr ? 'Theme sombre' : 'Dark theme';
      } else {
        themeToggle.textContent = isFr ? 'Theme clair' : 'Light theme';
      }
    }
  }

  function applyLanguage(lang) {
    localStorage.setItem('lang', lang);
    root.setAttribute('lang', lang);

    translatableNodes.forEach(function (node) {
      node.textContent = lang === 'en' ? node.getAttribute('data-en') : node.getAttribute('data-fr');
    });

    if (pageTitle) {
      document.title = lang === 'en' ? pageTitle.getAttribute('data-en') : pageTitle.getAttribute('data-fr');
    }

    if (metaDescription) {
      metaDescription.setAttribute('content', lang === 'en' ? metaDescription.getAttribute('data-en') : metaDescription.getAttribute('data-fr'));
    }

    langButtons.forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-lang-btn') === lang);
    });

    var theme = root.getAttribute('data-theme') || getStoredTheme();
    applyTheme(theme);
  }

  function updateProgress() {
    if (!progress) {
      return;
    }
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var percent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    progress.style.width = percent + '%';

    if (backToTop) {
      backToTop.classList.toggle('show', scrollTop > 320);
    }
  }

  if (year) {
    year.textContent = new Date().getFullYear() + ' Louka De Paiva Abreu';
  }

  if (revealItems.length > 0) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = root.getAttribute('data-theme') || getStoredTheme();
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  if (langButtons.length > 0) {
    langButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        applyLanguage(btn.getAttribute('data-lang-btn'));
      });
    });
  }

  if (filterButtons.length > 0 && projectCards.length > 0) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');

        filterButtons.forEach(function (chip) {
          chip.classList.toggle('active', chip === btn);
        });

        projectCards.forEach(function (card) {
          var category = card.getAttribute('data-category');
          var shouldShow = filter === 'all' || category === filter;
          card.classList.toggle('hidden', !shouldShow);
        });
      });
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function () {
      var email = copyEmailBtn.getAttribute('data-copy-email') || '';
      if (!email) {
        return;
      }

      navigator.clipboard.writeText(email).then(function () {
        if (copyFeedback) {
          copyFeedback.textContent = getStoredLang() === 'fr' ? 'Email copie dans le presse-papiers.' : 'Email copied to clipboard.';
        }
      }).catch(function () {
        if (copyFeedback) {
          copyFeedback.textContent = getStoredLang() === 'fr' ? 'Impossible de copier automatiquement.' : 'Could not copy automatically.';
        }
      });
    });
  }

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  applyTheme(getStoredTheme());
  applyLanguage(getStoredLang());

  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();
