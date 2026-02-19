// Helpers
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];

// Navbar state on scroll
const nav = $("#nav");
const onScroll = () => {
  nav.classList.toggle("is-scrolled", window.scrollY > 10);
};
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

// Mobile menu
const burger = $("#burger");
const mobileMenu = $("#mobileMenu");
burger?.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

// Close mobile menu when clicking a link
mobileMenu?.addEventListener("click", (e) => {
  if (e.target.matches("a")) mobileMenu.classList.remove("open");
});

// Smooth scroll for buttons
$$("[data-scroll]").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-scroll");
    const el = $(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Reveal on scroll (IntersectionObserver)
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      e.target.classList.add("is-in");
      io.unobserve(e.target);
    }
  }
}, { threshold: 0.12 });

$$(".reveal").forEach(el => io.observe(el));

// Count up when stats appear
const countEls = $$(".stat__n[data-count]");

const animateCount = (el) => {
  const to = Number(el.dataset.count || "0");
  const duration = 900;
  const start = performance.now();
  const from = 0;

  const tick = (t) => {
    const p = Math.min(1, (t - start) / duration);
    const val = Math.floor(from + (to - from) * (1 - Math.pow(1 - p, 3))); // easeOutCubic
    el.textContent = String(val);
    if (p < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

const statsIO = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) {
      animateCount(e.target);
      statsIO.unobserve(e.target);
    }
  }
}, { threshold: 0.35 });

countEls.forEach(el => statsIO.observe(el));

// Footer year
$("#year").textContent = String(new Date().getFullYear());
