const menuToggle = document.querySelector(".menu-toggle");
const primaryNavigation = document.querySelector(".primary-nav");
const studioScene = document.querySelector(".studio-scene");
const contactForm = document.querySelector("#contact-form");
const contactFeedback = document.querySelector("#contact-feedback");
const yearLabel = document.querySelector("#current-year");

yearLabel.textContent = new Date().getFullYear();

if (menuToggle && primaryNavigation) {
  menuToggle.addEventListener("click", () => {
    const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isExpanded));
    menuToggle.setAttribute("aria-label", isExpanded ? "Open navigation" : "Close navigation");
    primaryNavigation.classList.toggle("is-open", !isExpanded);
  });

  primaryNavigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
      primaryNavigation.classList.remove("is-open");
    }
  });
}

if (studioScene) {
  window.requestAnimationFrame(() => studioScene.classList.add("is-active"));
}

if (contactForm instanceof HTMLFormElement && contactFeedback) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const message = [
      "Hello Code We Media, I’d like to discuss a project.",
      `Name: ${formData.get("name")}`,
      `Phone: ${formData.get("phone")}`,
      `Interested in: ${formData.get("interest")}`,
      `Project details: ${formData.get("message")}`,
    ].join("\n");
    const whatsappUrl = new URL("https://wa.me/919943734726");
    whatsappUrl.searchParams.set("text", message);

    window.open(whatsappUrl.toString(), "_blank", "noopener,noreferrer");
    contactFeedback.textContent =
      "A WhatsApp draft is ready to review and send. If it didn’t open, call 099437 34726.";
  });
}

const revealElements = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("is-visible"));
}
