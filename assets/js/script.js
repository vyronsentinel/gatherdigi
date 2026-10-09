const pricingDialog = document.querySelector("#pricing-dialog");
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxhaX02P8zejkyEGclqKjvFY2GZu0cxPxoh5m_gVqBDqY09DCfLfHYAGIgMa6GztFyE/exec";

if (pricingDialog) {
  document.querySelectorAll("[data-open-pricing]").forEach((button) => {
    button.addEventListener("click", () => pricingDialog.showModal());
  });

  document.querySelector("[data-close-pricing]")?.addEventListener("click", () => {
    pricingDialog.close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && pricingDialog.open) pricingDialog.close();
  });

  pricingDialog.addEventListener("click", (event) => {
    if (event.target === pricingDialog) pricingDialog.close();
  });
}

const inquiryDialog = document.querySelector("#inquiry-dialog");
const inquiryForm = document.querySelector("#inquiry-form");
const inquiryFrame = document.querySelector('iframe[name="inquiry-response"]');
const inquiryStatus = document.querySelector("#inquiry-status");
const contactMethod = document.querySelector("#contact-method");
const contactDetail = document.querySelector("#contact-detail");
let pendingInquiryToken = "";

if (inquiryDialog && inquiryForm && inquiryFrame && inquiryStatus) {
  document.querySelectorAll("[data-open-inquiry]").forEach((button) => {
    button.addEventListener("click", () => {
      if (pricingDialog?.open) pricingDialog.close();
      if (!inquiryDialog.open) inquiryDialog.showModal();
    });
  });

  document.querySelector("[data-close-inquiry]")?.addEventListener("click", () => {
    inquiryDialog.close();
  });

  inquiryDialog.addEventListener("click", (event) => {
    if (event.target === inquiryDialog) inquiryDialog.close();
  });

  const updateContactRequirement = () => {
    if (!contactMethod || !contactDetail) return;
    contactDetail.required = contactMethod.value !== "Email";
    contactDetail.placeholder = contactMethod.value === "Email"
      ? "Optional phone number or profile name"
      : "Required for your preferred contact method";
  };

  contactMethod?.addEventListener("change", updateContactRequirement);
  updateContactRequirement();

  inquiryForm.addEventListener("submit", (event) => {
    if (!APPS_SCRIPT_URL) {
      event.preventDefault();
      inquiryStatus.textContent = "The inquiry form is not connected yet. Please check back soon.";
      return;
    }

    event.preventDefault();
    pendingInquiryToken = `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}`;
    inquiryForm.elements.requestToken.value = pendingInquiryToken;
    inquiryForm.action = APPS_SCRIPT_URL;
    inquiryForm.target = inquiryFrame.name;
    inquiryStatus.textContent = "Sending your inquiry…";
    inquiryForm.querySelector('[type="submit"]').disabled = true;
    inquiryForm.submit();
  });

  window.addEventListener("message", (event) => {
    const senderIsGoogle = event.origin === "https://script.google.com"
      || event.origin.endsWith(".googleusercontent.com");
    if (!senderIsGoogle || event.data?.source !== "gathered-inquiry" || event.data.requestToken !== pendingInquiryToken) return;

    const submitButton = inquiryForm.querySelector('[type="submit"]');
    submitButton.disabled = false;

    if (event.data.status === "success") {
      inquiryStatus.textContent = "Thank you. Your inquiry was received, and a confirmation email has been sent.";
      inquiryForm.reset();
      updateContactRequirement();
      return;
    }

    inquiryStatus.textContent = event.data.status === "saved-email-failed"
      ? "Your inquiry was saved, but the confirmation email could not be sent. Please contact us directly."
      : "We couldn’t send your inquiry. Please try again in a moment.";
  });
}

const revealTargets = document.querySelectorAll("[data-reveal]");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  document.documentElement.classList.add("has-reveal");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add("is-visible"));
}

// Floating "Inquire now" button: appears after the intro, hides near the contact band.
const floatingCta = document.querySelector("#floating-cta");
const introSection = document.querySelector(".intro");
const contactSection = document.querySelector("#contact");

if (floatingCta && introSection && contactSection && "IntersectionObserver" in window) {
  let introVisible = true;
  let contactVisible = false;

  const updateFloatingCta = () => {
    const show = !introVisible && !contactVisible;
    floatingCta.classList.toggle("is-shown", show);
    floatingCta.setAttribute("aria-hidden", String(!show));
    floatingCta.tabIndex = show ? 0 : -1;
  };

  new IntersectionObserver(([entry]) => { introVisible = entry.isIntersecting; updateFloatingCta(); }, { threshold: 0 })
    .observe(introSection);
  new IntersectionObserver(([entry]) => { contactVisible = entry.isIntersecting; updateFloatingCta(); }, { threshold: 0.2 })
    .observe(contactSection);
}
