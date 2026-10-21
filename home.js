document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const html = document.documentElement;

  const themeToggle = document.getElementById("themeToggle");
  const rtlToggle = document.getElementById("rtlToggle");

  const dropdownBtn = document.getElementById("homeDropdownBtn");
  const dropdown = document.getElementById("homeDropdown");

  const mobileBtn = document.getElementById("mobileMenuBtn");
  const nav = document.getElementById("mainNav");

  const form = document.getElementById("bookingForm");
  const message = document.getElementById("formMessage");
  const yearElement = document.getElementById("year");

  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  /* DARK MODE */
  function applyTheme(theme) {
    const isDark = theme === "dark";

    body.classList.toggle("dark-mode", isDark);

    if (themeToggle) {
      themeToggle.innerHTML = isDark
        ? '<i data-lucide="sun"></i>'
        : '<i data-lucide="moon"></i>';

      themeToggle.title = isDark
        ? "Switch to light mode"
        : "Switch to dark mode";

      themeToggle.setAttribute("aria-label", themeToggle.title);
      themeToggle.setAttribute("aria-pressed", String(isDark));
    }

    try {
      localStorage.setItem("voltcare-theme", theme);
    } catch (error) {}

    refreshIcons();
  }

  let savedTheme = "light";

  try {
    savedTheme = localStorage.getItem("voltcare-theme") || "light";
  } catch (error) {}

  applyTheme(savedTheme);

  themeToggle?.addEventListener("click", () => {
    const nextTheme = body.classList.contains("dark-mode")
      ? "light"
      : "dark";

    applyTheme(nextTheme);
  });

  /* RTL / LTR */
  function applyDirection(direction) {
    html.setAttribute("dir", direction);

    if (rtlToggle) {
      rtlToggle.innerHTML = '<i data-lucide="arrow-left-right"></i>';

      rtlToggle.title = direction === "rtl"
        ? "Switch to left-to-right layout"
        : "Switch to right-to-left layout";

      rtlToggle.setAttribute("aria-label", rtlToggle.title);
      rtlToggle.setAttribute("aria-pressed", String(direction === "rtl"));
    }

    try {
      localStorage.setItem("voltcare-direction", direction);
    } catch (error) {}

    refreshIcons();
  }

  let savedDirection = "ltr";

  try {
    savedDirection = localStorage.getItem("voltcare-direction") || "ltr";
  } catch (error) {}

  applyDirection(savedDirection);

  rtlToggle?.addEventListener("click", () => {
    const nextDirection = html.getAttribute("dir") === "rtl"
      ? "ltr"
      : "rtl";

    applyDirection(nextDirection);
  });

  /* HOME DROPDOWN */
  function closeDropdown() {
    dropdown?.classList.remove("show");
    dropdownBtn?.setAttribute("aria-expanded", "false");
  }

  dropdownBtn?.addEventListener("click", (event) => {
    event.stopPropagation();

    const isOpen = dropdown?.classList.toggle("show") ?? false;
    dropdownBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".home-dropdown")) {
      closeDropdown();
    }
  });

  /* MOBILE MENU */
  function closeMobileMenu() {
    nav?.classList.remove("open");

    mobileBtn?.setAttribute("aria-expanded", "false");
    mobileBtn?.setAttribute("aria-label", "Open menu");

    if (mobileBtn) {
      mobileBtn.innerHTML = '<i data-lucide="menu"></i>';
    }

    closeDropdown();
    refreshIcons();
  }

  mobileBtn?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("open") ?? false;

    mobileBtn.setAttribute("aria-expanded", String(isOpen));
    mobileBtn.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

    mobileBtn.innerHTML = isOpen
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';

    refreshIcons();
  });

  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  dropdown?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMobileMenu();
    }
  });

  /* FOOTER YEAR */
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  /* ENQUIRY FORM — FRONTEND VALIDATION */
  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (message) {
      message.textContent =
        "Your details are valid. Connect a backend to receive real enquiries.";

      message.style.color = "var(--secondary)";
    }

    form.reset();
  });

  /* SCROLL REVEAL */
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px"
      }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  refreshIcons();
});