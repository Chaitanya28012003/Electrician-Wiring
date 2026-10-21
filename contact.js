
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("enquiryForm");
  const status = document.getElementById("formStatus");
  const preferredDate = document.getElementById("preferredDate");
  const serviceSelect = document.getElementById("service");

  // Refresh Lucide icons
  function refreshIcons() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  refreshIcons();

  // Prevent selecting a date in the past
  if (preferredDate) {
    const today = new Date();
    const localToday = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0")
    ].join("-");

    preferredDate.min = localToday;
  }

  // Service cards: select service and move to form
  document.querySelectorAll("[data-service]").forEach((link) => {
    link.addEventListener("click", () => {
      const selectedService = link.getAttribute("data-service");

      if (serviceSelect && selectedService) {
        serviceSelect.value = selectedService;
      }
    });
  });

  // Form status helper
  function showStatus(message, type) {
    if (!status) return;

    status.textContent = message;
    status.className = "form-status is-visible " + type;
  }

  // Enquiry form validation
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const phoneInput = document.getElementById("phone");
      const phone = phoneInput.value.trim();
      const digits = phone.replace(/\D/g, "");

      if (digits.length < 7 || digits.length > 15) {
        showStatus(
          "Please enter a valid phone number containing 7 to 15 digits.",
          "is-error"
        );
        phoneInput.focus();
        return;
      }

      if (
        preferredDate &&
        preferredDate.value &&
        preferredDate.value < preferredDate.min
      ) {
        showStatus(
          "Please choose today or a future date.",
          "is-error"
        );
        preferredDate.focus();
        return;
      }

      showStatus(
        "Your form passed validation. This demo form is not connected to a server, so your enquiry has not been sent. Connect a backend or form service to receive submissions.",
        "is-success"
      );
    });

    // Clear the previous message when the user edits the form
    form.addEventListener("input", () => {
      if (status) {
        status.textContent = "";
        status.className = "form-status";
      }
    });

    form.addEventListener("change", () => {
      if (status) {
        status.textContent = "";
        status.className = "form-status";
      }
    });
  }

  // Animate Contact page elements if pricing.js has not already revealed them
  const revealItems = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item) => {
      if (!item.classList.contains("is-visible")) {
        observer.observe(item);
      }
    });
  } else {
    revealItems.forEach((item) => {
      item.classList.add("is-visible");
    });
  }

  refreshIcons();
});
