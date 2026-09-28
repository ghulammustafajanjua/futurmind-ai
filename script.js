/**
 * FutureMind AI — Site interactions
 * Owner: Ghulam Mustafa Janjua
 */

(function () {
  "use strict";

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const backToTop = document.getElementById("backToTop");
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");
  const yearEls = document.querySelectorAll("[data-year]");
  const faqItems = document.querySelectorAll(".faq-item");
  const filterBtns = document.querySelectorAll("[data-filter]");
  const filterChips = document.querySelectorAll(".filter-chip");
  const toolCards = document.querySelectorAll(".tool-card[data-category]");
  const animateEls = document.querySelectorAll(".animate-on-scroll");

  // Current year
  yearEls.forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

  // Active nav link based on current page
  const path = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".nav-links a[href]").forEach((link) => {
    const href = (link.getAttribute("href") || "").toLowerCase();
    if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto")) return;
    const file = href.split("/").pop().split("#")[0];
    if (file === path || (path === "" && file === "index.html")) {
      link.classList.add("active");
    }
  });

  // Mobile menu
  function closeMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.classList.remove("active");
    navLinks.classList.remove("open");
    document.body.style.overflow = "";
  }

  function openMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.classList.add("active");
    navLinks.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      if (navLinks.classList.contains("open")) closeMenu();
      else openMenu();
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (e) => {
      if (
        navLinks.classList.contains("open") &&
        !navLinks.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  // Header + back to top
  function onScroll() {
    const y = window.scrollY || window.pageYOffset;
    if (header) header.classList.toggle("scrolled", y > 40);
    if (backToTop) backToTop.classList.toggle("visible", y > 500);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Scroll reveal
  if ("IntersectionObserver" in window && animateEls.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -36px 0px" }
    );
    animateEls.forEach((el) => observer.observe(el));
  } else {
    animateEls.forEach((el) => el.classList.add("visible"));
  }

  // FAQ accordion
  faqItems.forEach((item) => {
    const btn = item.querySelector(".faq-question");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      faqItems.forEach((other) => {
        other.classList.remove("active");
        const ob = other.querySelector(".faq-question");
        if (ob) ob.setAttribute("aria-expanded", "false");
      });
      if (!isActive) {
        item.classList.add("active");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  // Category filter buttons (homepage) → tools
  filterBtns.forEach((btn) => {
    if (btn.classList.contains("filter-chip")) return;
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter");
      if (!filter) return;
      const toolsSection = document.getElementById("tools");
      if (toolsSection) {
        toolsSection.scrollIntoView({ behavior: "smooth" });
      }
      document.querySelectorAll(".tool-card[data-category]").forEach((card) => {
        card.classList.remove("highlight");
        if (card.getAttribute("data-category") === filter) {
          card.classList.add("highlight");
        }
      });
      setTimeout(() => {
        document.querySelectorAll(".tool-card").forEach((c) => c.classList.remove("highlight"));
      }, 2500);
    });
  });

  // Tools directory filter chips
  if (filterChips.length && toolCards.length) {
    filterChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        const filter = chip.getAttribute("data-filter") || "all";
        filterChips.forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        toolCards.forEach((card) => {
          const cat = card.getAttribute("data-category");
          const show = filter === "all" || cat === filter;
          card.style.display = show ? "" : "none";
        });
      });
    });
  }

  // Contact form
  function showError(id, message) {
    const el = document.getElementById(id);
    if (el) el.textContent = message;
  }

  function clearErrors() {
    ["nameError", "emailError", "subjectError", "messageError"].forEach((id) => showError(id, ""));
    if (!contactForm) return;
    contactForm.querySelectorAll("input, select, textarea").forEach((f) => f.classList.remove("error"));
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearErrors();
      if (formSuccess) formSuccess.hidden = true;

      const name = document.getElementById("name");
      const email = document.getElementById("email");
      const subject = document.getElementById("subject");
      const message = document.getElementById("message");
      let valid = true;

      if (!name || !name.value.trim()) {
        showError("nameError", "Please enter your name.");
        if (name) name.classList.add("error");
        valid = false;
      } else if (name.value.trim().length < 2) {
        showError("nameError", "Name should be at least 2 characters.");
        name.classList.add("error");
        valid = false;
      }

      if (!email || !email.value.trim()) {
        showError("emailError", "Please enter your email.");
        if (email) email.classList.add("error");
        valid = false;
      } else if (!isValidEmail(email.value.trim())) {
        showError("emailError", "Please enter a valid email address.");
        email.classList.add("error");
        valid = false;
      }

      if (!subject || !subject.value) {
        showError("subjectError", "Please choose a topic.");
        if (subject) subject.classList.add("error");
        valid = false;
      }

      if (!message || !message.value.trim()) {
        showError("messageError", "Please write a message.");
        if (message) message.classList.add("error");
        valid = false;
      } else if (message.value.trim().length < 10) {
        showError("messageError", "Message should be at least 10 characters.");
        message.classList.add("error");
        valid = false;
      }

      if (!valid) return;

      // Client-side demo success (no backend)
      // Prefer opening mail client with owner's address
      const ownerEmail = "mustafajanjua0786@gmail.com";
      const mailSubject = encodeURIComponent("[FutureMind AI] " + (subject.options[subject.selectedIndex].text || subject.value));
      const mailBody = encodeURIComponent(
        "Name: " + name.value.trim() + "\nEmail: " + email.value.trim() + "\n\n" + message.value.trim()
      );

      contactForm.reset();
      if (formSuccess) {
        formSuccess.hidden = false;
        formSuccess.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }

      // Optional: open mail client for real outreach
      try {
        window.location.href = "mailto:" + ownerEmail + "?subject=" + mailSubject + "&body=" + mailBody;
      } catch (_) {
        /* ignore */
      }

      setTimeout(() => {
        if (formSuccess) formSuccess.hidden = true;
      }, 8000);
    });

    contactForm.querySelectorAll("input, select, textarea").forEach((field) => {
      field.addEventListener("input", () => {
        field.classList.remove("error");
        showError(field.id + "Error", "");
      });
    });
  }
})();
