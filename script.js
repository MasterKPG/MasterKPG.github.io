/* ================================================
   Portfolio — Animations & Interactions
   ================================================ */

(function () {
    'use strict';

    /* ---- Set current year in footer ---- */
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();


    /* ---- Scroll-reveal (IntersectionObserver) ---- */
    const revealEls = document.querySelectorAll('.animate-fadeup, .animate-fadein');

    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        revealEls.forEach(function (el) { revealObserver.observe(el); });
    } else {
        /* Fallback: show everything immediately */
        revealEls.forEach(function (el) { el.classList.add('in-view'); });
    }


    /* ---- Navbar: scroll shadow + active link ---- */
    var navbar = document.getElementById('navbar');
    var sections = document.querySelectorAll('section[id]');
    var navLinks = document.querySelectorAll('.nav-links a');

    function onScroll() {
        /* Scrolled class for navbar shadow */
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        /* Highlight active nav link based on scroll position */
        var scrollPos = window.scrollY + 100;
        sections.forEach(function (section) {
            var top    = section.offsetTop;
            var bottom = top + section.offsetHeight;
            var id     = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(function (link) { link.classList.remove('active'); });
                var activeLink = document.querySelector('.nav-links a[href="#' + id + '"]');
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); /* run once on load */


    /* ---- Mobile menu toggle ---- */
    var navToggle  = document.getElementById('navToggle');
    var navLinksList = document.getElementById('navLinks');

    if (navToggle && navLinksList) {
        navToggle.addEventListener('click', function () {
            var isOpen = navLinksList.classList.toggle('open');
            navToggle.classList.toggle('open', isOpen);
            navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        /* Close menu on link click (mobile) */
        navLinksList.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                navLinksList.classList.remove('open');
                navToggle.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }


    /* ---- Smooth scroll (fallback for browsers without CSS scroll-behavior) ---- */
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                var offset = 64; /* navbar height */
                var top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top: top, behavior: 'smooth' });
            }
        });
    });

}());
