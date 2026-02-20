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
// ========== HERO TABS + VIDEO (ONE CONTROLLER) ==========
(() => {
  const tabsBar = document.querySelector(".hero-tabs");
  const tabs = Array.from(document.querySelectorAll(".hero-tab"));
  const tabTag = document.getElementById("tabTag");
  const tabTitle = document.getElementById("tabTitle");

  const video = document.getElementById("heroVideo");
  const playBtn = document.getElementById("playBtn");
  const playTxt = document.getElementById("playTxt") || playBtn?.querySelector(".showcase__playtxt");

  const soundBtn = document.getElementById("soundBtn");
  const soundTxt = document.getElementById("soundTxt");

  // Si no hay hero/video, salimos sin romper
  if (!tabsBar && !tabs.length && !video) return;

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
  }

  // Tabs
  if (tabs.length) {
    tabs.forEach((btn) => btn.addEventListener("click", () => setActiveTab(btn.dataset.tab)));
    setActiveTab(tabs[0].dataset.tab || "strategy");
  }

  // Arrows
  const left = document.querySelector(".hero-tabs__nav--l");
  const right = document.querySelector(".hero-tabs__nav--r");
  left?.addEventListener("click", () => tabsBar?.scrollBy({ left: -320, behavior: "smooth" }));
  right?.addEventListener("click", () => tabsBar?.scrollBy({ left: 320, behavior: "smooth" }));

  // --- VIDEO ---
  if (!video) return;

  // Autoplay seguro (requiere muted)
  video.muted = true;
  video.volume = 1;
  video.playsInline = true;

  const setPlayLabel = () => {
    if (!playTxt) return;
    playTxt.textContent = video.paused ? "Play" : "Pause";
  };

  const setSoundLabel = () => {
    if (!soundTxt) return;
    soundTxt.textContent = video.muted ? "Sound off" : "Sound on";
  };

  async function safePlay() {
    try {
      await video.play();
    } catch {
      // autoplay puede fallar hasta que haya interacción
    }
    setPlayLabel();
  }

  // intenta autoplay al cargar
  video.addEventListener("loadedmetadata", () => {
    safePlay();
    setPlayLabel();
    setSoundLabel();
  });

  // Play/Pause button
  playBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (video.paused) await safePlay();
    else video.pause();

    setPlayLabel();
  });

  // Sound button (solo funcionará tras interacción del usuario, por política del navegador)
  soundBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Asegura que esté reproduciendo cuando activas sonido
    if (video.paused) {
      await safePlay();
    }

    video.muted = !video.muted;
    if (!video.muted) video.volume = 1;

    setSoundLabel();
  });

  // Mantener labels en sync
  video.addEventListener("play", setPlayLabel);
  video.addEventListener("pause", setPlayLabel);

  // Primera interacción del usuario: si quiere, puedes auto-unmute aquí (opcional)
  // window.addEventListener("pointerdown", () => { ... }, { once:true });
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
// === VIDEO CONTROLS (Play/Pause + Sound) ===
(() => {
  const video = document.getElementById("heroVideo");
  const playBtn = document.getElementById("playBtn");
  const playTxt = document.getElementById("playTxt");
  const soundBtn = document.getElementById("soundBtn");
  const soundTxt = document.getElementById("soundTxt");

  if (!video) return;

  const setPlayLabel = () => {
    if (!playTxt) return;
    playTxt.textContent = video.paused ? "Play" : "Pause";
  };

  const setSoundLabel = () => {
    if (!soundTxt) return;
    soundTxt.textContent = video.muted ? "Sound off" : "Sound on";
  };

  // Autoplay suele requerir muted
  video.muted = true;
  setPlayLabel();
  setSoundLabel();

  playBtn?.addEventListener("click", async () => {
    try{
      if (video.paused) await video.play();
      else video.pause();
    } catch {}
    setPlayLabel();
  });

  soundBtn?.addEventListener("click", () => {
    video.muted = !video.muted;
    if (!video.muted) video.volume = 1;
    setSoundLabel();
  });

  video.addEventListener("play", setPlayLabel);
  video.addEventListener("pause", setPlayLabel);
})();

// ========== VIDEO CONTROLS (PLAY + SOUND) ==========
(() => {
  const video = document.getElementById("heroVideo");
  const playBtn = document.getElementById("playBtn");
  const playTxt = document.getElementById("playTxt");
  const soundBtn = document.getElementById("soundBtn");
  const soundTxt = document.getElementById("soundTxt");

  if (!video) return;

  // Autoplay más compatible: inicia en mute
  video.muted = true;
  video.volume = 1;
  video.playsInline = true;

  const setPlayLabel = () => {
    if (!playTxt) return;
    playTxt.textContent = video.paused ? "Play" : "Pause";
  };

  const setSoundLabel = () => {
    if (!soundTxt) return;
    soundTxt.textContent = video.muted ? "Sound off" : "Sound on";
  };

  async function safePlay() {
    try { await video.play(); } catch {}
    setPlayLabel();
  }

  // Intenta autoplay al cargar
  video.addEventListener("loadedmetadata", () => {
    safePlay();
    setPlayLabel();
    setSoundLabel();
  });

  // Play / Pause
  playBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (video.paused) await safePlay();
    else video.pause();
    setPlayLabel();
  });

  // Sound on/off (requiere interacción del usuario; normal)
  soundBtn?.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();

    // si está pausado, lo reproducimos para que el audio quede “enganchado”
    if (video.paused) await safePlay();

    video.muted = !video.muted;
    if (!video.muted) video.volume = 1;

    setSoundLabel();
  });

  // Sync labels
  video.addEventListener("play", setPlayLabel);
  video.addEventListener("pause", setPlayLabel);
})();