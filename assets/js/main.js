/* Al Hind Educations & Developments Society — site behaviour.
   Plain, dependency-free. Respects prefers-reduced-motion. */

(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* masthead shadow + reading progress */
  var mast = document.querySelector(".masthead");
  var bar = document.getElementById("progress");
  function onScroll() {
    if (mast) mast.classList.toggle("scrolled", window.scrollY > 8);
    if (bar) {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* mobile nav */
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

  /* accordions (programmes + faq): any number may stay open */
  document.querySelectorAll(".acc-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".acc");
      var open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  /* reveal on scroll */
  var revealEls = document.querySelectorAll(".rv");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* gift calculator on /donate */
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

  /* simple forms: newsletter, contact, volunteer — client-side only */
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
