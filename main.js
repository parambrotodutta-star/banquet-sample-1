/* ═══════════════════════════════════════════════════════════
   THE GRANDEUR — v3
   Cinematic Hero · Particles · Parallax · GSAP + Lenis
   ═══════════════════════════════════════════════════════════ */

(() => {
  'use strict';

  gsap.registerPlugin(ScrollTrigger);

  /* ─── LENIS ─── */
  const lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });
  const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
  requestAnimationFrame(raf);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  /* ─── UTILS ─── */
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const isMobile = () => window.innerWidth < 768;

  /* ═══════════════════════════════════════════
     HEADER
  ═══════════════════════════════════════════ */
  function initHeader() {
    const header = $('#header');

    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 80);
    }, { passive: true });

    $$('.why, .gallery, .hero').forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec,
        start: 'top 60px',
        end: 'bottom 60px',
        onEnter: () => document.body.classList.add('section-dark'),
        onLeave: () => document.body.classList.remove('section-dark'),
        onEnterBack: () => document.body.classList.add('section-dark'),
        onLeaveBack: () => document.body.classList.remove('section-dark'),
      });
    });
  }

  /* ═══════════════════════════════════════════
     OVERLAY
  ═══════════════════════════════════════════ */
  function initOverlay() {
    const btn = $('#menuToggle');
    const overlay = $('#overlay');
    const links = $$('.overlay__link');
    let open = false;

    const toggle = () => {
      open = !open;
      btn.classList.toggle('is-open', open);
      overlay.classList.toggle('is-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      if (open) {
        links.forEach((l, i) => {
          gsap.fromTo(l, { opacity: 0, y: 20 }, {
            opacity: 1, y: 0, duration: 0.45, delay: 0.08 + i * 0.06, ease: 'expo.out',
          });
        });
      }
    };

    btn.addEventListener('click', toggle);
    links.forEach((l) => {
      l.addEventListener('click', () => {
        if (open) toggle();
        const t = $(l.getAttribute('href'));
        if (t) setTimeout(() => lenis.scrollTo(t, { offset: -60 }), 300);
      });
    });

    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener('click', (e) => {
        const href = a.getAttribute('href');
        if (href === '#') return;
        const t = $(href);
        if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -60 }); }
      });
    });
  }

  /* ═══════════════════════════════════════════
     HERO ANIMATIONS
  ═══════════════════════════════════════════ */
  function initHero() {
    const tl = gsap.timeline({ delay: 0.15 });

    // Divider
    tl.to('#heroDivider', { opacity: 1, duration: 0.5, ease: 'power2.out' })

      // Title words — staggered from bottom
      .to('.hero__word', {
        y: 0, duration: 1.4, stagger: 0.13, ease: 'expo.out',
      }, '-=0.3')

      // Subtitle
      .to('#heroSub', { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.7')

      // CTA
      .to('#heroCta', { opacity: 1, duration: 0.6 }, '-=0.4')

      // Scroll indicator
      .to('#heroScroll', { opacity: 1, duration: 0.5 }, '-=0.3');

    // Parallax on scroll — background moves slower
    gsap.to('#heroBgImg', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
    });

    // Content parallax — text moves up slightly faster
    gsap.to('.hero__content', {
      yPercent: -15,
      opacity: 0,
      ease: 'none',
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '60% top', scrub: 1 },
    });
  }

  /* ═══════════════════════════════════════════
     SCROLL REVEALS
  ═══════════════════════════════════════════ */
  function initReveals() {
    // INTRO
    gsap.from('.intro__col--left', {
      scrollTrigger: { trigger: '.intro', start: 'top 72%' },
      x: -30, opacity: 0, duration: 0.9, ease: 'expo.out',
    });
    gsap.from('.intro__img', {
      scrollTrigger: { trigger: '.intro__img-wrap', start: 'top 80%' },
      clipPath: 'inset(100% 0 0 0)', duration: 1.3, ease: 'expo.out',
    });
    gsap.from('.intro__body', {
      scrollTrigger: { trigger: '.intro__body', start: 'top 85%' },
      y: 20, opacity: 0, duration: 0.7, ease: 'power2.out',
    });

    // WHY
    gsap.from('.why__heading', {
      scrollTrigger: { trigger: '.why__wrap', start: 'top 70%' },
      y: 40, opacity: 0, duration: 0.9, ease: 'expo.out',
    });
    $$('.why__item').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 88%' },
        y: 20, opacity: 0, duration: 0.6, delay: i * 0.06, ease: 'power2.out',
      });
    });

    // TESTIMONIALS
    gsap.from('.testimonials__heading', {
      scrollTrigger: { trigger: '.testimonials__wrap', start: 'top 72%' },
      y: 40, opacity: 0, duration: 0.9, ease: 'expo.out',
    });

    // GALLERY
    gsap.from('.gallery__heading', {
      scrollTrigger: { trigger: '.gallery__header', start: 'top 72%' },
      y: 40, opacity: 0, duration: 0.9, ease: 'expo.out',
    });
    gsap.from('.gallery__sub', {
      scrollTrigger: { trigger: '.gallery__header', start: 'top 72%' },
      y: 20, opacity: 0, duration: 0.7, delay: 0.15, ease: 'power2.out',
    });
    $$('.gallery__item').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 88%' },
        clipPath: 'inset(100% 0 0 0)', opacity: 0, duration: 0.9,
        delay: (i % 4) * 0.08, ease: 'expo.out',
      });
    });

    // STATS
    $$('.stats__item').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: '.stats', start: 'top 82%' },
        y: 15, opacity: 0, duration: 0.5, delay: i * 0.08, ease: 'power2.out',
      });
    });

    // EVENT TYPES
    gsap.from('.event-types__heading', {
      scrollTrigger: { trigger: '.event-types__header', start: 'top 72%' },
      y: 40, opacity: 0, duration: 0.9, ease: 'expo.out',
    });
    gsap.from('.event-types__sub', {
      scrollTrigger: { trigger: '.event-types__header', start: 'top 72%' },
      y: 20, opacity: 0, duration: 0.7, delay: 0.1, ease: 'power2.out',
    });
    $$('.event-type').forEach((item, i) => {
      gsap.from(item, {
        scrollTrigger: { trigger: item, start: 'top 88%' },
        y: 30, opacity: 0, duration: 0.7,
        delay: (i % 2) * 0.1, ease: 'power2.out',
      });
    });

    // BOOKING
    gsap.from('.booking__left > *', {
      scrollTrigger: { trigger: '.booking', start: 'top 68%' },
      y: 25, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
    });
    gsap.from('.form > *', {
      scrollTrigger: { trigger: '.form', start: 'top 82%' },
      y: 15, opacity: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out',
    });
  }

  /* ═══════════════════════════════════════════
     COUNTERS
  ═══════════════════════════════════════════ */
  function initCounters() {
    $$('.stats__val[data-count]').forEach((el) => {
      const target = parseInt(el.dataset.count, 10);
      ScrollTrigger.create({
        trigger: el,
        start: 'top 88%',
        once: true,
        onEnter: () => {
          gsap.to(el, {
            duration: 1.8, ease: 'power2.out',
            onUpdate() { el.textContent = Math.round(this.progress() * target).toLocaleString('en-IN'); },
          });
        },
      });
    });
  }

  /* ═══════════════════════════════════════════
     TESTIMONIALS
  ═══════════════════════════════════════════ */
  function initTestimonials() {
    const slides = $$('.testimonial');
    const progress = $('#testProgress');
    const currentEl = $('#testCurrent');
    let idx = 0;
    const total = slides.length;

    const go = (i) => {
      slides[idx].classList.remove('testimonial--active');
      idx = ((i % total) + total) % total;
      slides[idx].classList.add('testimonial--active');
      progress.style.width = `${((idx + 1) / total) * 100}%`;
      currentEl.textContent = String(idx + 1).padStart(2, '0');
    };

    $('#testPrev').addEventListener('click', () => go(idx - 1));
    $('#testNext').addEventListener('click', () => go(idx + 1));

    let autoTimer = setInterval(() => go(idx + 1), 5500);
    const pause = () => clearInterval(autoTimer);
    const resume = () => { autoTimer = setInterval(() => go(idx + 1), 5500); };
    $('#testPrev').addEventListener('click', pause);
    $('#testNext').addEventListener('click', pause);
    $$('.testimonials__btn').forEach((b) => b.addEventListener('mouseleave', resume));
  }

  /* ═══════════════════════════════════════════
     MAGNETIC BUTTONS
  ═══════════════════════════════════════════ */
  function initMagnetic() {
    if (isMobile()) return;
    $$('.hero__cta, .btn').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.12;
        const y = (e.clientY - r.top - r.height / 2) * 0.12;
        gsap.to(btn, { x, y, duration: 0.35, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.45)' });
      });
    });
  }

  /* ═══════════════════════════════════════════
     GALLERY + LIGHTBOX
  ═══════════════════════════════════════════ */
  function initGallery() {
    const lightbox = $('#lightbox');
    const lbImg = $('#lightboxImg');
    const lbCaption = $('#lightboxCaption');
    const lbCount = $('#lightboxCount');
    const items = $$('.gallery__item');
    let current = 0;

    const images = items.map((item) => {
      const img = item.querySelector('img');
      const label = item.querySelector('.gallery__item-label');
      return {
        src: img.src.replace('w=600', 'w=1400').replace('w=900', 'w=1400'),
        alt: img.alt,
        caption: label ? label.textContent : '',
      };
    });

    function open(i) {
      current = i;
      update();
      lightbox.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      lightbox.classList.remove('is-open');
      document.body.style.overflow = '';
    }

    function update() {
      const d = images[current];
      lbImg.src = d.src;
      lbImg.alt = d.alt;
      lbCaption.textContent = d.caption;
      lbCount.textContent = `${current + 1} / ${images.length}`;
    }

    function next() { current = (current + 1) % images.length; update(); }
    function prev() { current = (current - 1 + images.length) % images.length; update(); }

    items.forEach((item, i) => {
      item.addEventListener('click', () => open(i));
    });

    $('#lightboxClose').addEventListener('click', close);
    $('#lightboxNext').addEventListener('click', next);
    $('#lightboxPrev').addEventListener('click', prev);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox || e.target === lbImg) close();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    });

    // Tilt on gallery items
    if (!isMobile()) {
      items.forEach((item) => {
        item.addEventListener('mousemove', (e) => {
          const r = item.getBoundingClientRect();
          const rx = (e.clientX - r.left) / r.width - 0.5;
          const ry = (e.clientY - r.top) / r.height - 0.5;
          gsap.to(item, {
            rotateY: rx * 4, rotateX: -ry * 4,
            duration: 0.35, ease: 'power2.out', transformPerspective: 800,
          });
        });
        item.addEventListener('mouseleave', () => {
          gsap.to(item, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
        });
      });
    }
  }

  /* ═══════════════════════════════════════════
     BOOT
  ═══════════════════════════════════════════ */
  function boot() {
    initHero();
    initReveals();
    initCounters();
    initHeader();
    initOverlay();
    initTestimonials();
    initGallery();
    initMagnetic();
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', boot)
    : boot();
})();
