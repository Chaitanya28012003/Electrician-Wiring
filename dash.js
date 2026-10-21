
document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const body = document.body;

  const themeToggle = document.getElementById("themeToggle");
  const rtlToggle = document.getElementById("rtlToggle");
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");

  function renderIcons() {
    if (window.lucide) window.lucide.createIcons();
  }

  // Dark / light mode
  themeToggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-mode");

    themeToggle.innerHTML = isDark
      ? '<i data-lucide="sun"></i>'
      : '<i data-lucide="moon"></i>';

    themeToggle.title = isDark ? "Light mode" : "Dark mode";
    themeToggle.setAttribute(
      "aria-label",
      isDark ? "Switch to light mode" : "Switch to dark mode"
    );

    renderIcons();
  });

  // RTL / LTR toggle
  rtlToggle.addEventListener("click", () => {
    const isRTL = html.getAttribute("dir") !== "rtl";
    html.setAttribute("dir", isRTL ? "rtl" : "ltr");
    rtlToggle.textContent = isRTL ? "LTR" : "RTL";
    renderIcons();
  });

  // Mobile sidebar
  sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  document.addEventListener("click", (event) => {
    if (
      window.innerWidth <= 900 &&
      sidebar.classList.contains("open") &&
      !sidebar.contains(event.target) &&
      !sidebarToggle.contains(event.target)
    ) {
      sidebar.classList.remove("open");
    }
  });

  // Active sidebar links
  document.querySelectorAll(".side-link[href^='#']").forEach((link) => {
    link.addEventListener("click", () => {
      document.querySelectorAll(".side-link").forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");
      sidebar.classList.remove("open");
    });
  });

  // Notifications popover
  const notificationToggle = document.getElementById("notificationToggle");
  const notificationPopover = document.getElementById("notificationPopover");
  const profileToggle = document.getElementById("profileToggle");
  const profilePopover = document.getElementById("profilePopover");

  function closePopovers() {
    notificationPopover.classList.remove("show");
    profilePopover.classList.remove("show");
  }

  notificationToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const shouldOpen = !notificationPopover.classList.contains("show");
    closePopovers();
    notificationPopover.classList.toggle("show", shouldOpen);
  });

  profileToggle.addEventListener("click", (event) => {
    event.stopPropagation();
    const shouldOpen = !profilePopover.classList.contains("show");
    closePopovers();
    profilePopover.classList.toggle("show", shouldOpen);
  });

  document.addEventListener("click", (event) => {
    if (
      !notificationPopover.contains(event.target) &&
      !profilePopover.contains(event.target)
    ) {
      closePopovers();
    }
  });

  // Current year
  const year = new Date().getFullYear();
  document.getElementById("footerYear").textContent = year;
  document.getElementById("sidebarYear").textContent = year;

  // Search and filter service requests
  const requestTable = document.getElementById("requestTable");
  const requestSearch = document.getElementById("requestSearch");
  const statusFilter = document.getElementById("statusFilter");
  const emptyMessage = document.getElementById("emptyMessage");

  function filterRequests() {
    const query = requestSearch.value.trim().toLowerCase();
    const selectedStatus = statusFilter.value;
    let visibleRows = 0;

    requestTable.querySelectorAll("tr").forEach((row) => {
      const text = row.textContent.toLowerCase();
      const matchesText = text.includes(query);
      const matchesStatus =
        selectedStatus === "all" || row.dataset.status === selectedStatus;

      const visible = matchesText && matchesStatus;
      row.hidden = !visible;

      if (visible) visibleRows++;
    });

    emptyMessage.hidden = visibleRows > 0;
  }

  requestSearch.addEventListener("input", filterRequests);
  statusFilter.addEventListener("change", filterRequests);

  // Counts from displayed demo records
  function updateCounts() {
    const rows = [...requestTable.querySelectorAll("tr")];

    document.getElementById("totalCount").textContent =
      String(rows.length).padStart(2, "0");

    document.getElementById("pendingCount").textContent =
      String(rows.filter(row => row.dataset.status === "Pending").length).padStart(2, "0");

    document.getElementById("completedCount").textContent =
      String(rows.filter(row => row.dataset.status === "Completed").length).padStart(2, "0");

    document.getElementById("upcomingCount").textContent =
      String(rows.filter(row =>
        ["Scheduled", "In Progress"].includes(row.dataset.status)
      ).length).padStart(2, "0");
  }

  updateCounts();

  // Request detail dialog
  const requestDialog = document.getElementById("requestDialog");
  const dialogBody = document.getElementById("dialogBody");

  const requestDetails = {
    "VC-1048": {
      service: "Wiring Inspection",
      date: "October 15, 2026",
      status: "Pending",
      description: "The request has been received and is awaiting confirmation."
    },
    "VC-1047": {
      service: "Lighting Installation",
      date: "October 12, 2026",
      status: "In Progress",
      description: "This service request is currently in progress."
    },
    "VC-1046": {
      service: "Safety Inspection",
      date: "October 8, 2026",
      status: "Completed",
      description: "This sample service request has been marked completed."
    },
    "VC-1045": {
      service: "Outlet Repair",
      date: "October 6, 2026",
      status: "Scheduled",
      description: "This sample service request is scheduled."
    }
  };

  requestTable.addEventListener("click", (event) => {
    const button = event.target.closest("[data-request]");
    if (!button) return;

    const id = button.dataset.request;
    const item = requestDetails[id];
    if (!item) return;

    // Values come from the fixed local demo-data object above.
    dialogBody.innerHTML = `
      <div class="dialog-row"><span>Request ID</span><strong>#${id}</strong></div>
      <div class="dialog-row"><span>Service</span><strong>${item.service}</strong></div>
      <div class="dialog-row"><span>Date requested</span><strong>${item.date}</strong></div>
      <div class="dialog-row"><span>Status</span><strong>${item.status}</strong></div>
      <p style="color:var(--muted);font-size:12px;line-height:1.7">${item.description}</p>
    `;

    requestDialog.showModal();
  });

  function closeDialog() {
    requestDialog.close();
  }

  document.getElementById("closeDialog").addEventListener("click", closeDialog);
  document.getElementById("dialogDone").addEventListener("click", closeDialog);

  requestDialog.addEventListener("click", (event) => {
    if (event.target === requestDialog) closeDialog();
  });

  renderIcons();
});
