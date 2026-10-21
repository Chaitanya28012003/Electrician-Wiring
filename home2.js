
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

  // Theme setting
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
    } catch (error) {
      // Theme remains active for this page.
    }

    refreshIcons();
  }

  let initialTheme = "light";

  try {
    initialTheme = localStorage.getItem("voltcare-theme") || "light";
  } catch (error) {
    initialTheme = "light";
  }

  applyTheme(initialTheme);

  themeToggle?.addEventListener("click", () => {
    const nextTheme = body.classList.contains("dark-mode")
      ? "light"
      : "dark";

    applyTheme(nextTheme);
  });

  // RTL / LTR direction setting
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
    } catch (error) {
      // Direction remains active for this page.
    }

    refreshIcons();
  }

  let initialDirection = "ltr";

  try {
    initialDirection = localStorage.getItem("voltcare-direction") || "ltr";
  } catch (error) {
    initialDirection = "ltr";
  }

  applyDirection(initialDirection);

  rtlToggle?.addEventListener("click", () => {
    const nextDirection = html.getAttribute("dir") === "rtl"
      ? "ltr"
      : "rtl";

    applyDirection(nextDirection);
  });

  // Home dropdown
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

  // Mobile navigation
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
    link.addEventListener("click", () => {
      closeMobileMenu();
    });
  });

  // Close mobile navigation after returning to desktop width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) {
      closeMobileMenu();
    }
  });

  // Automatic footer year
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Front-end form validation
  form?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (message) {
      message.textContent =
        "Your form is valid. Connect a backend to receive real enquiries.";
    }

    form.reset();
  });

  // Render all Lucide icons
  refreshIcons();
});
