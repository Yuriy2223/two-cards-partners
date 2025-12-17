document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");
  const header = document.querySelector(".header-section");

  function highlightActiveSection() {
    let scrollY;
    if (document.body.style.position === "fixed") {
      scrollY = Math.abs(parseInt(document.body.style.top) || 0);
    } else {
      scrollY = window.scrollY;
    }

    const headerHeight = header?.offsetHeight || 0;

    if (scrollY < 100) {
      navLinks.forEach((link) => link.classList.remove("active"));
      return;
    }

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", highlightActiveSection);

  const observer = new MutationObserver(() => {
    highlightActiveSection();
  });

  const navMenu = document.querySelector(".header-nav");
  if (navMenu) {
    observer.observe(navMenu, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  highlightActiveSection();
});
