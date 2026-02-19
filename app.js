// =====================
// app.js (FULL, COPY/PASTE)
// =====================

// ========== HELPERS ==========
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

// ========== NAVBAR SCROLL ==========
(() => {
  const nav = $("#nav");
  if (!nav) return;

  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 10);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// ========== MOBILE MENU (A11Y + SCROLL LOCK) ==========
(() => {
  const burger = $("#burger");
  const mobileMenu = $("#mobileMenu");
  if (!burger || !mobileMenu) return;

  const openMenu = () => {
    mobileMenu.classList.add("open");
    burger.setAttribute("aria-expanded", "true");
    document.documentElement.classList.add("no-scroll");
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("no-scroll");
  };

  burger.setAttribute("aria-expanded", "false");

  burger.addEventListener("click", () => {
    mobileMenu.classList.contains("open") ? closeMenu() : openMenu();
  });

  mobileMenu.addEventListener("click", (e) => {
    if (e.target && e.target.matches("a")) closeMenu();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

// ========== SMOOTH SCROLL BUTTONS ==========
(() => {
  $$("[data-scroll]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-scroll");
      const el = id ? $(id) : null;
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
})();

// ========== REVEAL ON SCROLL ==========
(() => {
  const revealEls = $$(".reveal");
  if (!revealEls.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealEls.forEach((el) => io.observe(el));
})();

// ========== COUNT UP (STATS) ==========
(() => {
  const countEls = $$(".stat__n[data-count]");
  if (!countEls.length) return;

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

  const statsIO = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          animateCount(e.target);
          statsIO.unobserve(e.target);
        }
      });
    },
    { threshold: 0.35 }
  );

  countEls.forEach((el) => statsIO.observe(el));
})();

// ========== HERO TABS + VIDEO (SAFE) ==========
(() => {
  const tabsBar = $(".hero-tabs");
  const tabs = $$(".hero-tab");
  const tabTag = $("#tabTag");
  const tabTitle = $("#tabTitle");

  const video = $("#heroVideo");
  const playBtn = $("#playBtn");

  // Si no existe el hero nuevo, no hacemos nada (no rompe)
  if (!tabsBar && !tabs.length && !video && !playBtn) return;

  const TAB_COPY = {
    strategy: "Strategy systems that scale.",
    branding: "Brand identity built for recall.",
    motion: "Motion that feels expensive.",
    web: "Fast websites with premium UI.",
  };

  function setActiveTab(key) {
    if (!tabs.length) return;

    tabs.forEach((t) => {
      const active = t.dataset.tab === key;
      t.classList.toggle("is-active", active);
      t.setAttribute("aria-selected", active ? "true" : "false");
    });

    if (tabTag) tabTag.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    if (tabTitle) tabTitle.textContent = TAB_COPY[key] || "Selected capability";

    try {
      tabTag?.animate(
        [{ transform: "translateY(6px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
        { duration: 260, easing: "cubic-bezier(.2,.8,.2,1)" }
      );
      tabTitle?.animate(
        [{ transform: "translateY(6px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
        { duration: 280, easing: "cubic-bezier(.2,.8,.2,1)" }
      );
    } catch {}
  }

  // Tabs click
  if (tabs.length) {
    tabs.forEach((btn) => btn.addEventListener("click", () => setActiveTab(btn.dataset.tab)));
    setActiveTab(tabs[0].dataset.tab || "strategy");
  }

  // Arrows scroll (si existen)
  const left = $(".hero-tabs__nav--l");
  const right = $(".hero-tabs__nav--r");
  left?.addEventListener("click", () => tabsBar?.scrollBy({ left: -320, behavior: "smooth" }));
  right?.addEventListener("click", () => tabsBar?.scrollBy({ left: 320, behavior: "smooth" }));

  // Video play/pause
  async function tryPlay() {
    if (!video) return false;
    try {
      await video.play();
      const t = playBtn?.querySelector(".showcase__playtxt");
      if (t) t.textContent = "Pause";
      return true;
    } catch {
      const t = playBtn?.querySelector(".showcase__playtxt");
      if (t) t.textContent = "Play";
      return false;
    }
  }

  if (video) {
    video.muted = true;
    video.playsInline = true;

    video.addEventListener("loadeddata", () => {
      tryPlay();
    });

    // desbloqueo por interacción (si autoplay está bloqueado)
    const unlock = async () => {
      const ok = await tryPlay();
      if (ok) {
        window.removeEventListener("pointerdown", unlock);
        window.removeEventListener("touchstart", unlock);
        window.removeEventListener("keydown", unlock);
      }
    };

    window.addEventListener("pointerdown", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("keydown", unlock);
  }

  playBtn?.addEventListener("click", async () => {
    if (!video) return;
    if (video.paused) {
      await tryPlay();
    } else {
      video.pause();
      const t = playBtn.querySelector(".showcase__playtxt");
      if (t) t.textContent = "Play";
    }
  });
})();

// ========== FOOTER YEAR ==========
(() => {
  const y = $("#year");
  if (y) y.textContent = String(new Date().getFullYear());
})();

// ========== CONTACT FORM (VALIDATION + FEEDBACK) ==========
(() => {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const status = document.getElementById("formStatus");
  const btn = document.getElementById("sendBtn");

  const setStatus = (msg) => { if (status) status.textContent = msg; };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    setStatus("");

    if (!form.checkValidity()) {
      setStatus("Please complete the required fields.");
      form.reportValidity();
      return;
    }

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      message: form.message.value.trim(),
    };

    // Opción A: mailto (sin backend)
    const subject = encodeURIComponent("New lead — BSA Agency");
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    window.location.href = `mailto:hello@bsaagency.com?subject=${subject}&body=${body}`;
    setStatus("Opening your email client…");

  });
})();
const video = document.getElementById("heroVideo");

video.addEventListener("click", () => {
  if (video.muted) {
    video.muted = false;
    video.volume = 1;
  }
});