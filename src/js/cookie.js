function acceptCookies() {
  const popup = document.getElementById("cookiePopup");

  popup.style.animation = "none";

  setTimeout(() => {
    popup.style.animation = "slideDown 0.3s ease-out forwards";
  }, 10);

  setTimeout(() => {
    popup.style.display = "none";
  }, 310);
}

function learnMore() {
  alert("Here you would navigate to your cookie policy page");
}

document.addEventListener("DOMContentLoaded", () => {
  const acceptBtn = document.querySelector(".btn-accept");
  const learnBtn = document.querySelector(".btn-learn");

  if (acceptBtn) {
    acceptBtn.addEventListener("click", acceptCookies);
  }

  if (learnBtn) {
    learnBtn.addEventListener("click", learnMore);
  }
});

const style = document.createElement("style");
style.textContent = `
  @keyframes slideDown {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);
