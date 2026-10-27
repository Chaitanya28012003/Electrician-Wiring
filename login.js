
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const html = document.documentElement;

  const themeToggle = document.getElementById("themeToggle");
  const rtlToggle = document.getElementById("rtlToggle");

  const passwordInput = document.getElementById("password");
  const passwordToggle = document.getElementById("passwordToggle");

  const emailInput = document.getElementById("email");
  const rememberMe = document.getElementById("rememberMe");

  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  const forgotToggle = document.getElementById("forgotToggle");
  const resetArea = document.getElementById("resetPanel");
  const resetForm = document.getElementById("resetForm");
  const resetEmail = document.getElementById("resetEmail");
  const resetMessage = document.getElementById("resetMessage");

  const yearElement = document.getElementById("year");

  /* LUCIDE ICONS */
  function refreshIcons() {
    if (window.lucide &&
        typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }

  /* CURRENT YEAR */
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
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
    } catch (error) {
      // Storage is optional.
    }

    refreshIcons();
  }

  let savedTheme = "light";

  try {
    savedTheme = localStorage.getItem("voltcare-theme") || "light";
  } catch (error) {
    savedTheme = "light";
  }

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
      rtlToggle.innerHTML =
        '<i data-lucide="arrow-left-right"></i>';

      rtlToggle.title = direction === "rtl"
        ? "Switch to left-to-right layout"
        : "Switch to right-to-left layout";

      rtlToggle.setAttribute("aria-label", rtlToggle.title);
      rtlToggle.setAttribute(
        "aria-pressed",
        String(direction === "rtl")
      );
    }

    try {
      localStorage.setItem("voltcare-direction", direction);
    } catch (error) {
      // Storage is optional.
    }

    refreshIcons();
  }

  let savedDirection = "ltr";

  try {
    savedDirection =
      localStorage.getItem("voltcare-direction") || "ltr";
  } catch (error) {
    savedDirection = "ltr";
  }

  applyDirection(savedDirection);

  rtlToggle?.addEventListener("click", () => {
    const nextDirection =
      html.getAttribute("dir") === "rtl" ? "ltr" : "rtl";

    applyDirection(nextDirection);
  });

  /* SHOW / HIDE PASSWORD */
  passwordToggle?.addEventListener("click", () => {
    if (!passwordInput) return;

    const showPassword = passwordInput.type === "password";

    passwordInput.type = showPassword ? "text" : "password";

    passwordToggle.innerHTML = showPassword
      ? '<i data-lucide="eye-off"></i>'
      : '<i data-lucide="eye"></i>';

    passwordToggle.setAttribute(
      "aria-label",
      showPassword ? "Hide password" : "Show password"
    );

    passwordToggle.setAttribute(
      "aria-pressed",
      String(showPassword)
    );

    refreshIcons();
    passwordInput.focus();
  });

  /* REMEMBER EMAIL */
  const rememberedEmailKey = "voltcare-remembered-email";

  try {
    const rememberedEmail =
      localStorage.getItem(rememberedEmailKey);

    if (rememberedEmail && emailInput && rememberMe) {
      emailInput.value = rememberedEmail;
      rememberMe.checked = true;
    }
  } catch (error) {
    // Remember email is optional.
  }

  function updateRememberedEmail() {
    if (!emailInput || !rememberMe) return;

    try {
      if (rememberMe.checked && emailInput.value.trim()) {
        localStorage.setItem(
          rememberedEmailKey,
          emailInput.value.trim()
        );
      } else if (!rememberMe.checked) {
        localStorage.removeItem(rememberedEmailKey);
      }
    } catch (error) {
      // Storage is optional.
    }
  }

  rememberMe?.addEventListener("change", updateRememberedEmail);
  emailInput?.addEventListener("change", updateRememberedEmail);

  /* LOGIN FORM */
  loginForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!loginForm.checkValidity()) {
      loginForm.reportValidity();
      return;
    }

    updateRememberedEmail();

  

    window.location.href = "dash.html";
  });

  /* FORGOT PASSWORD */
  function openResetPanel() {
    if (!resetArea) return;

    resetArea.hidden = false;

    if (resetEmail && emailInput && emailInput.value.trim()) {
      resetEmail.value = emailInput.value.trim();
    }

    if (resetMessage) {
      resetMessage.textContent = "";
    }

    refreshIcons();
    resetEmail?.focus();
  }

  function closeResetPanel() {
    if (!resetArea) return;

    resetArea.hidden = true;

    if (resetMessage) {
      resetMessage.textContent = "";
    }

    forgotToggle?.focus();
  }

  forgotToggle?.addEventListener("click", () => {
    if (!resetArea) return;

    if (resetArea.hidden) {
      openResetPanel();
    } else {
      closeResetPanel();
    }
  });

  /* PASSWORD RESET FORM */
  resetForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!resetForm.checkValidity()) {
      resetForm.reportValidity();
      return;
    }

    if (resetMessage) {
      resetMessage.textContent =
        "Email format is valid. A password-reset service is required to send a real reset link.";
    }
  });

  /* INITIAL ICON RENDER */
  refreshIcons();
});
