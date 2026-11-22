document.addEventListener("DOMContentLoaded", () => {
    // Mobile Navigation Drawer
    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");
    menuToggle.addEventListener("click", () => {
        const isOpen = mainNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Dynamic Portfolio Filtering
    const filterButtons = document.querySelectorAll(".filter-btn");
    const workCards = document.querySelectorAll(".work-card");
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const category = btn.dataset.filter;
            workCards.forEach(card => {
                const match = category === "all" || card.dataset.category === category;
                card.classList.toggle("hidden", !match);
            });
        });
    });

    // Project Details Modal
    const modal = document.getElementById("project-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalCategory = document.getElementById("modal-category");
    const modalSummary = document.getElementById("modal-summary");
    const closeModalBtn = document.getElementById("close-modal");

    const closeModal = () => modal.classList.add("hidden");

    document.querySelectorAll(".open-modal-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            modalTitle.textContent = btn.dataset.title;
            modalCategory.textContent = btn.dataset.category;
            modalSummary.textContent = btn.dataset.summary;
            modal.classList.remove("hidden");
            closeModalBtn.focus();
        });
    });

    closeModalBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", e => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener("keydown", e => {
        if (e.key === "Escape" && !modal.classList.contains("hidden")) closeModal();
    });

    // FAQ Accordion
    document.querySelectorAll(".accordion-trigger").forEach(trigger => {
        trigger.addEventListener("click", () => {
            const item = trigger.closest(".accordion-item");
            const isOpen = item.classList.toggle("open");
            trigger.setAttribute("aria-expanded", String(isOpen));
            trigger.querySelector(".accordion-icon").textContent = isOpen ? "−" : "+";
        });
    });

    // Client-Side Form Validation
    const form = document.getElementById("contact-form");
    const statusEl = document.getElementById("form-status");

    form.addEventListener("submit", e => {
        e.preventDefault();
        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");

        let valid = true;
        const setError = (input, errId, msg) => {
            document.getElementById(errId).textContent = msg;
            input.classList.toggle("invalid", Boolean(msg));
            if (msg) valid = false;
        };

        setError(name, "name-error", name.value.trim().length < 2 ? "Please enter your full name." : "");
        setError(email, "email-error", /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim()) ? "" : "Please enter a valid email address.");
        setError(message, "message-error", message.value.trim().length < 20 ? "Please include at least 20 characters about your project." : "");

        if (valid) {
            statusEl.textContent = `Thanks, ${name.value.trim()}! Your project brief has been validated and queued.`;
            form.reset();
        } else {
            statusEl.textContent = "";
        }
    });
});