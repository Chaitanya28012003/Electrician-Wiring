
document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);

  const root = document.documentElement;
  const body = document.body;

  /* ======================================
     SERVICE CONTENT
  ====================================== */

  const services = {
    installation: {
      title: "Electrical Installation",
      subtitle: "Professional installations for safe, reliable electrical systems.",
      heading: "Professional Electrical Installation",
      description:
        "Get electrical fittings, outlets, equipment and new electrical spaces installed with careful planning and attention to safety.",
      extra:
        "We help you understand your installation requirements and the appropriate next steps for your home or business.",
      image:
        "https://images.unsplash.com/photo-1741388222137-c0d3007ec173?auto=format&fit=crop&w=1100&q=85",
      alt: "Electrician working on electrical wiring",
      features: [
        {
          icon: "plug-zap",
          title: "Electrical Fittings",
          text: "Installation of suitable electrical fittings and outlets."
        },
        {
          icon: "cable",
          title: "Wiring Setup",
          text: "Support for electrical wiring requirements in new spaces."
        },
        {
          icon: "shield-check",
          title: "Safety Considerations",
          text: "Attention to safety during installation work."
        },
        {
          icon: "check-circle",
          title: "Installation Review",
          text: "Review of completed work and any follow-up requirements."
        }
      ]
    },

    repairs: {
      title: "Electrical Repairs",
      subtitle: "Troubleshooting and repair support for electrical issues.",
      heading: "Reliable Electrical Repair Services",
      description:
        "Electrical faults, damaged switches and equipment issues can interrupt your daily routine. Our repair service focuses on identifying the problem and discussing suitable repairs.",
      extra:
        "The required work depends on the issue found, the equipment involved and the condition of the electrical system.",
      image:
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1100&q=85",
      alt: "Electrician repairing electrical equipment",
      features: [
        {
          icon: "wrench",
          title: "Fault Troubleshooting",
          text: "Investigate reported electrical problems."
        },
        {
          icon: "plug",
          title: "Switches and Outlets",
          text: "Repair support for affected switches and outlets."
        },
        {
          icon: "activity",
          title: "Equipment Checks",
          text: "Check electrical equipment related to the issue."
        },
        {
          icon: "check-circle",
          title: "Repair Review",
          text: "Review the repair and discuss any remaining concerns."
        }
      ]
    },

    lighting: {
      title: "Lighting Solutions",
      subtitle: "Lighting options for comfortable, practical indoor and outdoor spaces.",
      heading: "Lighting Designed for Your Space",
      description:
        "Explore lighting solutions that support visibility, comfort and the appearance of your home or business.",
      extra:
        "Lighting requirements vary by room, intended use, fitting type and installation conditions.",
      image:
        "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1100&q=85",
      alt: "Modern interior lighting",
      features: [
        {
          icon: "lightbulb",
          title: "Indoor Lighting",
          text: "Lighting options for rooms and indoor work areas."
        },
        {
          icon: "sun",
          title: "Outdoor Lighting",
          text: "Options for outdoor spaces and visibility needs."
        },
        {
          icon: "sparkles",
          title: "Decorative Lighting",
          text: "Lighting to complement the appearance of a space."
        },
        {
          icon: "check-circle",
          title: "Lighting Planning",
          text: "Consider fitting types and the purpose of each area."
        }
      ]
    },

    wiring: {
      title: "Wiring & Maintenance",
      subtitle: "Electrical wiring checks and maintenance for your property.",
      heading: "Wiring and Maintenance Solutions",
      description:
        "Electrical wiring and planned maintenance help you understand the condition of your system and identify areas that may need attention.",
      extra:
        "The inspection and maintenance requirements depend on the property's electrical setup and the concerns reported.",
      image:
        "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=1100&q=85",
      alt: "Electrical wiring and maintenance work",
      features: [
        {
          icon: "cable",
          title: "Wiring Checks",
          text: "Review wiring concerns and reported problems."
        },
        {
          icon: "settings",
          title: "Routine Maintenance",
          text: "Discuss suitable maintenance requirements."
        },
        {
          icon: "shield-check",
          title: "System Safety",
          text: "Identify concerns that may require professional attention."
        },
        {
          icon: "clipboard-check",
          title: "Maintenance Planning",
          text: "Understand the work that may be needed next."
        }
      ]
    },

    inspection: {
      title: "Safety Inspections",
      subtitle: "Electrical checks to help identify potential hazards and maintenance needs.",
      heading: "Electrical Safety Inspections",
      description:
        "Electrical inspections help review visible system conditions and identify concerns that may need further investigation or repair.",
      extra:
        "The inspection scope depends on the property, the system being checked and the type of assessment requested.",
      image:
        "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1100&q=85",
      alt: "Technician inspecting electrical systems",
      features: [
        {
          icon: "shield-check",
          title: "Safety Checks",
          text: "Review electrical safety concerns within the agreed scope."
        },
        {
          icon: "search",
          title: "Visual Inspection",
          text: "Look for visible issues that may need further attention."
        },
        {
          icon: "clipboard-check",
          title: "Findings Review",
          text: "Discuss observations and recommended next steps."
        },
        {
          icon: "wrench",
          title: "Follow-up Support",
          text: "Identify repairs or additional assessment that may be needed."
        }
      ]
    },

    diagnosis: {
      title: "Fault Diagnosis",
      subtitle: "Systematic checks to help locate electrical issues.",
      heading: "Electrical Fault Diagnosis",
      description:
        "When an electrical issue is difficult to identify, a systematic assessment can help narrow down possible causes and determine what needs attention.",
      extra:
        "The next steps depend on the symptoms, the equipment involved and the findings of the assessment.",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1100&q=85",
      alt: "Electrical components and diagnostic equipment",
      features: [
        {
          icon: "search",
          title: "Issue Assessment",
          text: "Understand the symptoms and when the problem occurs."
        },
        {
          icon: "activity",
          title: "System Checks",
          text: "Check relevant components as appropriate."
        },
        {
          icon: "wrench",
          title: "Possible Causes",
          text: "Identify possible causes based on the assessment."
        },
        {
          icon: "clipboard-check",
          title: "Recommended Next Steps",
          text: "Explain appropriate repair or further investigation options."
        }
      ]
    }
  };

  /* ======================================
     LOAD SELECTED SERVICE
  ====================================== */

  const params = new URLSearchParams(window.location.search);
  const requestedService = params.get("service") || "installation";
  const service = services[requestedService] || services.installation;

  const setText = (selector, value) => {
    const element = $(selector);
    if (element) element.textContent = value;
  };

  const setImage = (selector, source, alt) => {
    const image = $(selector);
    if (!image) return;

    image.src = source;
    image.alt = alt;
  };

  setText("#serviceTitle", service.title);
  setText("#serviceSubtitle", service.subtitle);
  setText("#serviceHeading", service.heading);
  setText("#serviceDescription", service.description);
  setText("#serviceExtra", service.extra);

  setImage("#serviceImage", service.image, service.alt);
  setImage("#overviewImage", service.image, service.alt);

  document.title = `${service.title} | VoltCare Electrical`;

  /* ======================================
     FEATURE CARDS
  ====================================== */

  const featureContainer = $("#serviceFeatures");

  if (featureContainer) {
    featureContainer.replaceChildren();

    service.features.forEach((feature) => {
      const article = document.createElement("article");
      article.className = "service-detail-feature-card";

      const iconWrap = document.createElement("span");
      iconWrap.className = "service-detail-feature-icon";

      const icon = document.createElement("i");
      icon.setAttribute("data-lucide", feature.icon);
      iconWrap.appendChild(icon);

      const heading = document.createElement("h3");
      heading.textContent = feature.title;

      const paragraph = document.createElement("p");
      paragraph.textContent = feature.text;

      article.append(iconWrap, heading, paragraph);
      featureContainer.appendChild(article);
    });
  }

  /* ======================================
     THEME TOGGLE
  ====================================== */

  const themeToggle = $("#themeToggle");

  const updateThemeButton = () => {
    if (!themeToggle) return;

    const dark = body.classList.contains("dark-mode");
    themeToggle.innerHTML = dark
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';

    themeToggle.setAttribute(
      "aria-label",
      dark ? "Switch to light mode" : "Switch to dark mode"
    );

    themeToggle.title = dark ? "Light mode" : "Dark mode";

    if (window.lucide) window.lucide.createIcons();
  };

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    updateThemeButton();
  });

  updateThemeButton();

  /* ======================================
     RTL TOGGLE
  ====================================== */

  const rtlToggle = $("#rtlToggle");

  rtlToggle?.addEventListener("click", () => {
    const isRTL = root.getAttribute("dir") !== "rtl";
    root.setAttribute("dir", isRTL ? "rtl" : "ltr");
    root.setAttribute("lang", "en");
  });

  /* ======================================
     HOME DROPDOWN
  ====================================== */

  const dropdownButton = $("#homeDropdownBtn");
  const dropdownMenu = $("#homeDropdown");

  dropdownButton?.addEventListener("click", () => {
    const isOpen = dropdownMenu?.classList.toggle("show") || false;

    dropdownButton.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (event) => {
    if (
      dropdownMenu &&
      dropdownButton &&
      !dropdownMenu.contains(event.target) &&
      !dropdownButton.contains(event.target)
    ) {
      dropdownMenu.classList.remove("show");
      dropdownButton.setAttribute("aria-expanded", "false");
    }
  });

  /* ======================================
     MOBILE MENU
  ====================================== */

  const mobileMenuButton = $("#mobileMenuBtn");
  const mainNav = $("#mainNav");

  mobileMenuButton?.addEventListener("click", () => {
    const isOpen = mainNav?.classList.toggle("open") || false;

    mobileMenuButton.setAttribute("aria-expanded", String(isOpen));
    mobileMenuButton.setAttribute(
      "aria-label",
      isOpen ? "Close menu" : "Open menu"
    );

    mobileMenuButton.innerHTML = isOpen
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';

    if (window.lucide) window.lucide.createIcons();
  });

  mainNav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      mobileMenuButton?.setAttribute("aria-expanded", "false");

      if (mobileMenuButton) {
        mobileMenuButton.innerHTML = '<i data-lucide="menu"></i>';
      }

      if (window.lucide) window.lucide.createIcons();
    });
  });

  /* ======================================
     REVEAL ANIMATIONS
  ====================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  /* ======================================
     FOOTER YEAR + ICONS
  ====================================== */

  setText("#year", new Date().getFullYear());

  if (window.lucide) {
    window.lucide.createIcons();
  }
});
