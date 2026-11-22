const PROJECTS = [
    {
        id: "meridian",
        title: "Meridian Analytics",
        tag: "SaaS Dashboard",
        summary: "Real-time cloud telemetry suite with 54% smaller bundle size.",
        details: "Rebuilt Meridian's core monitoring views using modular layouts and asynchronous data fetching, cutting time-to-interactive under 1 second."
    },
    {
        id: "northline",
        title: "Northline Freight",
        tag: "Logistics Web App",
        summary: "Mobile-first shipment tracking for Mumbai dispatch hubs.",
        details: "Designed a responsive tracking interface with instant client-side filtering, offline-friendly assets, and clear proof-of-delivery workflows."
    },
    {
        id: "sora",
        title: "Sora Patient Portal",
        tag: "Healthcare",
        summary: "WCAG AA compliant patient booking and records portal.",
        details: "Engineered a high-contrast, keyboard-accessible scheduling application tested with screen readers and Lighthouse audits."
    }
];

const appState = {
    submittedMessages: []
};

const appEl = document.getElementById("app");
const routeIndicator = document.getElementById("route-indicator");

function renderHome() {
    return `
        <span class="eyebrow">Single Page Application Simulation</span>
        <h1>Seamless client-side navigation without page reloads.</h1>
        <p class="lead">
            This vanilla JavaScript SPA dynamically renders views, synchronizes browser history,
            and preserves in-memory state across routes.
        </p>
        <div class="btn-row">
            <a href="#/work" class="btn btn-primary">Browse Case Studies</a>
            <a href="#/services" class="btn btn-outline">Explore Services</a>
        </div>
    `;
}

function renderServices() {
    return `
        <span class="eyebrow">Capabilities</span>
        <h1>What Kova Studio Delivers</h1>
        <p class="lead">End-to-end frontend architecture tailored for speed, clarity, and maintainability.</p>
        <div class="card-grid">
            <article class="card">
                <h2>UI Architecture</h2>
                <p>Semantic HTML5 foundations and scalable CSS Grid systems.</p>
            </article>
            <article class="card">
                <h2>Interactive Engineering</h2>
                <p>Framework-free client-side routing, state management, and DOM updates.</p>
            </article>
            <article class="card">
                <h2>Performance &amp; A11y</h2>
                <p>WCAG AA accessibility compliance and 95+ mobile Lighthouse scores.</p>
            </article>
        </div>
    `;
}

function renderWork() {
    const cards = PROJECTS.map(p => `
        <article class="card">
            <span class="tag">${p.tag}</span>
            <h2>${p.title}</h2>
            <p>${p.summary}</p>
            <a href="#/work/${p.id}" class="btn btn-outline">Read Case Study &rarr;</a>
        </article>
    `).join("");

    return `
        <span class="eyebrow">Portfolio</span>
        <h1>Selected Launches</h1>
        <p class="lead">Click any project to navigate to its dynamic detail route without reloading the page.</p>
        <div class="card-grid">${cards}</div>
    `;
}

function renderProjectDetail(projectId) {
    const project = PROJECTS.find(p => p.id === projectId);
    if (!project) return renderNotFound();
    return `
        <a href="#/work" class="btn btn-outline" style="margin-bottom: 1.5rem;">&larr; Back to Work</a>
        <div class="card">
            <span class="tag">${project.tag}</span>
            <h1>${project.title}</h1>
            <p class="lead">${project.summary}</p>
            <p>${project.details}</p>
        </div>
    `;
}

function renderContact() {
    const recent = appState.submittedMessages.length
        ? `<div class="card" style="margin-top: 1.25rem; max-width: 600px;">
                <h2>Session Submissions (${appState.submittedMessages.length})</h2>
                ${appState.submittedMessages.map(m => `<p><strong>${m.name}</strong> (${m.email}): ${m.note}</p>`).join("")}
           </div>`
        : "";

    return `
        <span class="eyebrow">Get in Touch</span>
        <h1>Start a Project</h1>
        <p class="lead">Submissions are stored in client-side SPA state and persist as you navigate between routes.</p>
        <form id="spa-contact-form" class="card form-card">
            <div class="field">
                <label for="spa-name">Name</label>
                <input id="spa-name" type="text" required placeholder="Your name">
            </div>
            <div class="field">
                <label for="spa-email">Email</label>
                <input id="spa-email" type="email" required placeholder="you@company.com">
            </div>
            <div class="field">
                <label for="spa-note">Project Brief</label>
                <textarea id="spa-note" rows="3" required placeholder="What are we building?"></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit Inquiry</button>
            <div id="spa-status" class="status-msg"></div>
        </form>
        ${recent}
    `;
}

function renderNotFound() {
    return `
        <span class="eyebrow">404 Error</span>
        <h1>Route not found</h1>
        <p class="lead">The requested view does not exist in this SPA.</p>
        <a href="#/" class="btn btn-primary">Return Home</a>
    `;
}

function updateActiveNav(path) {
    document.querySelectorAll(".nav-link").forEach(link => {
        const route = link.dataset.route;
        const isMatch = route === "/" ? path === "/" : path.startsWith(route);
        link.classList.toggle("active", isMatch);
    });
}

function router() {
    const rawHash = window.location.hash.slice(1) || "/";
    const path = rawHash.startsWith("/") ? rawHash : `/${rawHash}`;

    let html = "";
    if (path === "/") {
        html = renderHome();
    } else if (path === "/services") {
        html = renderServices();
    } else if (path === "/work") {
        html = renderWork();
    } else if (path.startsWith("/work/")) {
        html = renderProjectDetail(path.replace("/work/", ""));
    } else if (path === "/contact") {
        html = renderContact();
    } else {
        html = renderNotFound();
    }

    // Re-trigger subtle CSS transition on each route swap
    appEl.style.animation = "none";
    appEl.offsetHeight;
    appEl.style.animation = "";

    appEl.innerHTML = html;
    routeIndicator.textContent = `Route: ${path}`;
    updateActiveNav(path);

    const contactForm = document.getElementById("spa-contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", e => {
            e.preventDefault();
            const name = document.getElementById("spa-name").value.trim();
            const email = document.getElementById("spa-email").value.trim();
            const note = document.getElementById("spa-note").value.trim();
            if (!name || !email || !note) return;

            appState.submittedMessages.push({ name, email, note });
            router();
            const status = document.getElementById("spa-status");
            if (status) status.textContent = "Saved to SPA state! Switch tabs and come back to verify.";
        });
    }
}

window.addEventListener("hashchange", router);
window.addEventListener("DOMContentLoaded", router);