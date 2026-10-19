(() => {
  const cue = document.querySelector('.scroll-cue');
  const posts = document.getElementById('home-posts');
  if (!cue || !posts) return;
  const update = () => cue.classList.toggle('is-hidden', window.scrollY > 40);
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('pageshow', update);
  update();
  cue.addEventListener('click', event => {
    event.preventDefault();
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    posts.focus({ preventScroll: true });
    posts.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  });
})();
