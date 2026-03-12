(function () {
  var progress = document.getElementById('topProgress');
  var year = document.getElementById('yearLabel');
  var revealItems = document.querySelectorAll('.reveal');

  function updateProgress() {
    if (!progress) {
      return;
    }
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var percent = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
    progress.style.width = percent + '%';
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

  document.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();
})();
