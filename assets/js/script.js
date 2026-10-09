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
const contactDetailLabel = document.querySelector("#contact-detail-label");
const contactDetailHelp = document.querySelector("#contact-detail-help");
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
    if (!contactMethod || !contactDetail || !contactDetailLabel || !contactDetailHelp) return;

    const contactDetails = {
      Email: {
        type: "email",
        autocomplete: "email",
        label: "Email for preferred contact",
        placeholder: "name@example.com",
        help: "Enter the email address you want me to use. It can be the same as your confirmation email.",
        invalid: "",
      },
      Phone: {
        type: "tel",
        autocomplete: "tel",
        label: "Phone number",
        placeholder: "Phone number",
        help: "Enter a phone number where I can reach you.",
        invalid: "Enter a valid phone number with 7 to 15 digits.",
      },
      Messenger: {
        type: "url",
        autocomplete: "url",
        label: "Messenger link",
        placeholder: "https://m.me/yourusername",
        help: "Quick guide: Open your Messenger profile, copy your profile link (often starts with https://m.me/), and paste it here.",
        invalid: "Enter a Messenger link, such as https://m.me/yourusername.",
      },
      WhatsApp: {
        type: "url",
        autocomplete: "url",
        label: "WhatsApp link",
        placeholder: "https://wa.me/639171234567",
        help: "Quick guide: Use https://wa.me/ followed by your country code and phone number, with no + sign, spaces, or dashes.",
        invalid: "Enter a WhatsApp link starting with https://wa.me/ or https://api.whatsapp.com/.",
      },
    };
    const details = contactDetails[contactMethod.value] || contactDetails.Email;

    contactDetail.type = details.type;
    contactDetail.autocomplete = details.autocomplete;
    contactDetail.required = true;
    contactDetailLabel.textContent = details.label;
    contactDetail.placeholder = details.placeholder;
    contactDetailHelp.textContent = details.help;
    contactDetail.setCustomValidity("");
    contactDetail.oninput = () => {
      if (!contactDetail.value || !details.invalid) {
        contactDetail.setCustomValidity("");
        return;
      }

      if (contactMethod.value === "Phone") {
        const phone = contactDetail.value.trim();
        const digits = phone.replace(/\D/g, "");
        const validPhone = /^[+\d().\-\s]+$/.test(phone) && digits.length >= 7 && digits.length <= 15;
        contactDetail.setCustomValidity(validPhone ? "" : details.invalid);
        return;
      }

      let validHost = false;
      try {
        const url = new URL(contactDetail.value);
        const hostname = url.hostname.toLowerCase();
        validHost = url.protocol === "https:"
          && (contactMethod.value === "Messenger"
            ? ["m.me", "facebook.com", "www.facebook.com", "messenger.com", "www.messenger.com"].includes(hostname)
            : ["wa.me", "api.whatsapp.com"].includes(hostname));
      } catch {
        validHost = false;
      }
      contactDetail.setCustomValidity(validHost ? "" : details.invalid);
    };
    contactDetail.oninput();
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
