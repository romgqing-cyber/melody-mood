const track = document.querySelector('#slide-track');
const slides = [...track.querySelectorAll('.trip-slide')];
const title = document.querySelector('#slide-title');
const count = document.querySelector('#slide-count');
const previous = document.querySelector('#previous-slide');
const next = document.querySelector('#next-slide');
const dots = [...document.querySelectorAll('.slide-dot')];
const zoom = document.querySelector('#slide-zoom');
const zoomImage = document.querySelector('#zoom-image');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let current = 0;
let scrollFrame = 0;

function update(index) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  title.textContent = slides[current].dataset.title;
  count.textContent = `${String(current + 1).padStart(2, '0')} / ${slides.length}`;
  previous.disabled = current === 0;
  next.disabled = current === slides.length - 1;
  dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === current)));
  slides.slice(Math.max(0, current - 1), current + 3).forEach(slide => {
    slide.querySelector('img').loading = 'eager';
  });
}

function goTo(index) {
  const target = Math.max(0, Math.min(slides.length - 1, index));
  track.scrollTo({left: target * track.clientWidth, behavior: reduceMotion.matches ? 'instant' : 'smooth'});
}

track.addEventListener('scroll', () => {
  if (scrollFrame) return;
  scrollFrame = requestAnimationFrame(() => {
    update(Math.round(track.scrollLeft / track.clientWidth));
    scrollFrame = 0;
  });
}, {passive: true});
previous.addEventListener('click', () => goTo(current - 1));
next.addEventListener('click', () => goTo(current + 1));
dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));
document.addEventListener('keydown', event => {
  if (zoom.open || event.altKey || event.ctrlKey || event.metaKey) return;
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    goTo(current + (event.key === 'ArrowLeft' ? -1 : 1));
  }
});
window.addEventListener('resize', () => {
  const index = current;
  track.scrollTo({left: index * track.clientWidth, behavior: 'instant'});
});
document.querySelector('#expand-slide').addEventListener('click', () => {
  const image = slides[current].querySelector('img');
  zoomImage.src = image.src;
  zoomImage.alt = image.alt;
  zoom.showModal();
  document.body.classList.add('zoom-open');
  document.querySelector('.zoom-pan').scrollTo(0, 0);
});
document.querySelector('#close-zoom').addEventListener('click', () => zoom.close());
zoom.addEventListener('close', () => document.body.classList.remove('zoom-open'));
update(0);
