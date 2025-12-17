document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", (e) => {
    e.preventDefault();

    const targetId = anchor.getAttribute("href");
    if (!targetId || targetId === "#") return;

    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const header = document.querySelector("header");
    const headerHeight = header?.offsetHeight || 0;

    const offset = targetElement.offsetTop - headerHeight - 30;

    smoothScrollTo(window.scrollY, offset, 1800);
  });
});

function smoothScrollTo(start, end, duration) {
  const distance = end - start;
  let startTime = null;

  function animationStep(currentTime) {
    if (!startTime) startTime = currentTime;
    const timeElapsed = currentTime - startTime;

    const progress = Math.min(timeElapsed / duration, 1);
    const ease = easeInOutQuad(progress);
    window.scrollTo(0, start + distance * ease);

    if (timeElapsed < duration) {
      requestAnimationFrame(animationStep);
    }
  }

  requestAnimationFrame(animationStep);
}

function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
let lastScroll = 0;
const header = document.querySelector(".header-section");

window.addEventListener("scroll", () => {
  const current = window.scrollY;

  header.classList.toggle("is-scrolled", current > 0);
  lastScroll = current;
});
