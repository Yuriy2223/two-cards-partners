document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  if (!form) return;

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const telegramInput = document.getElementById("telegram");
  const messageInput = document.getElementById("message");
  const consentInput = document.getElementById("consent");

  const validationRules = {
    name: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s'-]+$/,
      messages: {
        required: "Name is required",
        minLength: "Name must be at least 2 characters",
        maxLength: "Name must not exceed 50 characters",
        pattern: "Please enter a valid name",
      },
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      messages: {
        required: "E-mail is required",
        pattern: "Please enter a valid email address",
      },
    },
    telegram: {
      required: false,
      pattern: /^@?[a-zA-Z0-9_]{5,32}$/,
      messages: {
        pattern: "Telegram username must be 5-32 characters",
      },
    },
    message: {
      required: false,
      minLength: 10,
      maxLength: 500,
      messages: {
        minLength: "Message must be at least 10 characters",
        maxLength: "Message must not exceed 500 characters",
      },
    },
    consent: {
      required: true,
      messages: {
        required: "You must accept the terms",
      },
    },
  };

  function showError(input, message) {
    const formGroup =
      input.closest(".form-group") || input.closest(".form-checkbox");
    const errorElement = formGroup.querySelector(".form-error");

    input.classList.add("error");
    if (errorElement) {
      errorElement.textContent = message;
      errorElement.style.opacity = "1";
      errorElement.style.visibility = "visible";
    }
  }

  function clearError(input) {
    const formGroup =
      input.closest(".form-group") || input.closest(".form-checkbox");
    const errorElement = formGroup.querySelector(".form-error");

    input.classList.remove("error");
    if (errorElement) {
      errorElement.style.opacity = "0";
      errorElement.style.visibility = "hidden";

      setTimeout(() => {
        if (errorElement.style.opacity === "0") {
          errorElement.textContent = "";
        }
      }, 200);
    }
  }

  function validateField(input) {
    const fieldName = input.name;
    const value = input.value.trim();
    const rules = validationRules[fieldName];

    if (!rules) return true;

    if (rules.required) {
      if (input.type === "checkbox") {
        if (!input.checked) {
          showError(input, rules.messages.required);
          return false;
        }
      } else if (!value) {
        showError(input, rules.messages.required);
        return false;
      }
    }

    if (!value && !rules.required) {
      clearError(input);
      return true;
    }

    if (rules.minLength && value.length < rules.minLength) {
      showError(input, rules.messages.minLength);
      return false;
    }

    if (rules.maxLength && value.length > rules.maxLength) {
      showError(input, rules.messages.maxLength);
      return false;
    }

    if (rules.pattern && !rules.pattern.test(value)) {
      showError(input, rules.messages.pattern);
      return false;
    }

    clearError(input);
    return true;
  }

  [nameInput, emailInput, telegramInput, messageInput].forEach((input) => {
    input.addEventListener("blur", () => {
      if (input.value.trim()) {
        validateField(input);
      }
    });

    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        validateField(input);
      } else if (input.value.trim()) {
        validateField(input);
      }
    });
  });

  consentInput.addEventListener("change", () => {
    validateField(consentInput);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const isNameValid = validateField(nameInput);
    const isEmailValid = validateField(emailInput);
    const isTelegramValid = validateField(telegramInput);
    const isMessageValid = validateField(messageInput);
    const isConsentValid = validateField(consentInput);

    const isFormValid =
      isNameValid &&
      isEmailValid &&
      isTelegramValid &&
      isMessageValid &&
      isConsentValid;

    if (isFormValid) {
      const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        telegram: telegramInput.value.trim(),
        message: messageInput.value.trim(),
        consent: consentInput.checked,
      };

      console.log("Form submitted:", formData);

      // Відправити дані на сервер
      // fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })
      // .then(response => response.json())
      // .then(data => {
      //   alert('Form submitted successfully!');
      //   form.reset();
      // })
      // .catch(error => {
      //   alert('Error submitting form');
      // });

      // For demo
      alert("Form submitted successfully!");
      form.reset();
    } else {
      const firstError = form.querySelector(".error");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  });
});
