/* Al Hind Educations & Developments Society — site behaviour.
   Plain, dependency-free. Respects prefers-reduced-motion.
   Scroll-driven: staggered reveals, count-ups, growing bars,
   gentle parallax, a section rail with scrollspy, back-to-top. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---- reveal targets: register the rest before the observer is built ---- */
  document
    .querySelectorAll(".sec-head, .voice, .gal figure, .give-card, .news-item, .timeline li, .board li, .prog")
    .forEach(function (el) {
      if (!el.classList.contains("rv")) el.classList.add("rv");
    });

  /* stagger siblings inside grouped containers */
  document
    .querySelectorAll(".gal, .give-grid, .voices, .board, .timeline, .news-list, .stats")
    .forEach(function (group) {
      Array.prototype.forEach.call(group.children, function (child, i) {
        if (child.classList && child.classList.contains("rv")) {
          child.style.transitionDelay = Math.min(i * 70, 420) + "ms";
        }
      });
    });

  /* ---- count-up numbers ---- */
  function fmtCount(el, v) {
    var raw = el.getAttribute("data-count");
    var dec = raw.indexOf(".") > -1 ? 1 : 0;
    var s = dec ? v.toFixed(1) : String(Math.round(v));
    if (el.hasAttribute("data-comma")) s = Number(s).toLocaleString("en-IN");
    return s;
  }
  function animateCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    if (reduceMotion) { el.textContent = fmtCount(el, target); return; }
    var dur = 1300, t0 = null;
    function step(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var e = 1 - Math.pow(1 - p, 3); /* ease-out cubic */
      el.textContent = fmtCount(el, target * e);
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ---- reveal on scroll (also fires count-ups; bars grow via CSS) ---- */
  var revealEls = document.querySelectorAll(".rv");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
    document.querySelectorAll("[data-count]").forEach(function (el) {
      el.textContent = fmtCount(el, parseFloat(el.getAttribute("data-count")));
    });
  } else {
    var counted = new WeakSet();
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            en.target.querySelectorAll("[data-count]").forEach(function (n) {
              if (!counted.has(n)) { counted.add(n); animateCount(n); }
            });
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* ---- masthead shadow + reading progress ---- */
  var mast = document.querySelector(".masthead");
  var bar = document.getElementById("progress");
  var btt = document.createElement("button");
  btt.className = "btt";
  btt.textContent = "↑";
  btt.setAttribute("aria-label", "Back to top");
  document.body.appendChild(btt);
  btt.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  function onScroll() {
    if (mast) mast.classList.toggle("scrolled", window.scrollY > 8);
    if (bar) {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    }
    btt.classList.toggle("show", window.scrollY > 700);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- gentle parallax drift on field figures ---- */
  var plx = document.querySelectorAll(".hero-fig, .story-aside");
  if (!reduceMotion && plx.length) {
    var queued = false;
    function drift() {
      queued = false;
      var mid = window.innerHeight / 2;
      plx.forEach(function (el, i) {
        var r = el.getBoundingClientRect();
        if (r.bottom < -80 || r.top > window.innerHeight + 80) return;
        var f = i % 2 === 0 ? -0.045 : 0.035;
        el.style.transform = "translateY(" + ((r.top + r.height / 2 - mid) * f).toFixed(1) + "px)";
      });
    }
    window.addEventListener("scroll", function () {
      if (!queued) { queued = true; requestAnimationFrame(drift); }
    }, { passive: true });
    drift();
  }

  /* ---- section rail with scrollspy (home page) ---- */
  if (document.body.hasAttribute("data-rail")) {
    var secs = document.querySelectorAll("main section[id]");
    var pairs = [];
    var rail = document.createElement("nav");
    rail.className = "rail";
    rail.setAttribute("aria-label", "On this page");
    secs.forEach(function (s) {
      var h = s.querySelector("h2");
      if (!h) return;
      var a = document.createElement("a");
      a.href = "#" + s.id;
      a.textContent = h.textContent;
      rail.appendChild(a);
      pairs.push([s, a]);
    });
    if (pairs.length) {
      document.body.appendChild(rail);
      if ("IntersectionObserver" in window) {
        var spy = new IntersectionObserver(
          function (es) {
            es.forEach(function (en) {
              if (en.isIntersecting) {
                pairs.forEach(function (p) {
                  p[1].classList.toggle("on", p[0] === en.target);
                });
              }
            });
          },
          { rootMargin: "-38% 0px -55% 0px" }
        );
        pairs.forEach(function (p) { spy.observe(p[0]); });
      }
    }
  }

  /* ---- mobile nav ---- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.textContent = open ? "Close" : "Menu";
    });
    nav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.textContent = "Menu";
      }
    });
  }

  /* ---- accordions (programmes + faq) ---- */
  document.querySelectorAll(".acc-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".acc");
      var open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* ---- gift calculator on /donate ---- */
  var giftForm = document.getElementById("gift-form");
  if (giftForm) {
    var amount = giftForm.querySelector("[name=amount]");
    var custom = giftForm.querySelector("[name=custom]");
    var out = document.getElementById("gift-out");
    var fund = function (n) {
      if (n >= 5000) return "a month of a bridge classroom — rent, chalk, and a teacher's honorarium.";
      if (n >= 2600) return "one woman's full tailoring toolkit at a Hunar centre: machine time, thread, and her exam fee.";
      if (n >= 1100) return "a complete school kit — bag, slates, notebooks, geometry box — on one child's back for the year.";
      if (n >= 500) return "a family's monsoon ration kit: rice, dal, oil, salt, and jaggery for three weeks.";
      return "chalk, slates and register paper for a bridge classroom for a fortnight.";
    };
    var say = function () {
      var n = parseInt(amount && amount.value ? amount.value : "", 10);
      if (!n && custom) n = parseInt(custom.value, 10);
      if (!n || n < 1) { out.textContent = ""; return; }
      out.textContent = "₹" + n.toLocaleString("en-IN") + " pays for " + fund(n);
    };
    giftForm.addEventListener("input", say);
    giftForm.addEventListener("change", say);
    giftForm.addEventListener("submit", function (e) {
      e.preventDefault();
      say();
      var note = document.getElementById("gift-note");
      if (note) note.textContent = "Shukriya. Details of how to complete this gift are below — every rupee is receipted.";
    });
  }

  /* ---- simple forms: newsletter, contact, volunteer ---- */
  document.querySelectorAll("form[data-say]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      form.querySelectorAll("[required]").forEach(function (f) {
        if (!f.value.trim()) { ok = false; f.style.borderColor = "var(--madder)"; }
        else { f.style.borderColor = ""; }
      });
      var note = form.querySelector(".form-note");
      if (note) {
        note.textContent = ok
          ? form.getAttribute("data-say")
          : "Please fill the marked fields — or call us, we answer.";
      }
      if (ok) form.reset();
    });
  });
})();
