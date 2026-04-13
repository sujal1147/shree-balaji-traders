/* ============================================
   SHREE BALAJI TRADERS — script.js
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ----------------------------------------
     1. MOBILE MENU TOGGLE
  ---------------------------------------- */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close menu when a link is clicked
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', false);
    });
  });

  /* ----------------------------------------
     2. NAVBAR SCROLL SHADOW
  ---------------------------------------- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ----------------------------------------
     3. SCROLL FADE-UP ANIMATION
  ---------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-up');

  const fadeObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, i * 90);
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(function (el) {
    fadeObserver.observe(el);
  });

  /* ----------------------------------------
     4. COUNTER ANIMATION (Hero Stats)
  ---------------------------------------- */
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const duration = 1400;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target);
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target;
    }
    requestAnimationFrame(update);
  }

  const counterEls = document.querySelectorAll('[data-count]');
  let countersStarted = false;

  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting && !countersStarted) {
        countersStarted = true;
        counterEls.forEach(animateCounter);
        counterObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  if (counterEls.length > 0) {
    counterObserver.observe(counterEls[0]);
  }

  /* ----------------------------------------
     5. ACTIVE NAV LINK ON SCROLL
  ---------------------------------------- */
  const sections    = document.querySelectorAll('section[id]');
  const navAnchors  = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navAnchors.forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach(function (s) { sectionObserver.observe(s); });

  /* ----------------------------------------
     6. CONTACT FORM VALIDATION & SUBMIT
  ---------------------------------------- */
  const submitBtn    = document.getElementById('submitBtn');
  const formSuccess  = document.getElementById('formSuccess');
  const formError    = document.getElementById('formError');

  submitBtn.addEventListener('click', function () {
    const name  = document.getElementById('fname').value.trim();
    const phone = document.getElementById('phone').value.trim();

    // Hide previous messages
    formSuccess.style.display = 'none';
    formError.style.display   = 'none';

    if (!name || !phone) {
      formError.style.display = 'block';
      formError.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      return;
    }

    // Simulate submission
    submitBtn.disabled    = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(function () {
      submitBtn.textContent = 'Enquiry Sent ✓';
      formSuccess.style.display = 'block';
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Reset form fields
      ['fname', 'phone', 'business', 'category', 'message'].forEach(function (id) {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
    }, 1000);
  });

  /* ----------------------------------------
     7. SMOOTH CLOSE MOBILE MENU ON OUTSIDE CLICK
  ---------------------------------------- */
  document.addEventListener('click', function (e) {
    if (
      mobileMenu.classList.contains('open') &&
      !mobileMenu.contains(e.target) &&
      !hamburger.contains(e.target)
    ) {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });

});
