document.addEventListener("DOMContentLoaded", () => {
  // Lenis Smooth Scroll
  let lenis;
  if (typeof Lenis !== "undefined") {
    lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Loader with rotating cat
  window.addEventListener("load", () => {
    // Fade in cat
    gsap.to(".loader-cat", { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" });

    // Rotate continuously while loading
    gsap.to(".loader-cat", {
      rotation: 360,
      duration: 2,
      ease: "linear",
      repeat: 1,
      transformOrigin: "center"
    });

    // End loader after delay
    gsap.to("#loader", {
      opacity: 0,
      delay: 2.2,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => document.getElementById("loader").remove()
    });
  });

  // Hero Title Animation
  if (document.querySelector(".hero-title")) {
    gsap.fromTo(".hero-title",
      { opacity: 0, clipPath: "inset(0 0 100% 0)" },
      { opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.5, ease: "power3.out", delay: 2.5 }
    );
  }

  // Fade-in Text
  gsap.utils.toArray(".fade-text").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 30, duration: 1, delay: i * 0.2, ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 85%", once: true }
    });
  });

  // Projects Animation
  gsap.utils.toArray(".project").forEach((el, i) => {
    gsap.from(el, {
      opacity: 0, y: 60, duration: 1, delay: i * 0.1, ease: "power3.out",
      scrollTrigger: { trigger: el, start: "top 80%" }
    });
  });

  // Mobile Menu Toggle
  document.getElementById("menu-toggle")?.addEventListener("click", () => {
    document.querySelector(".menu").classList.toggle("open");
  });

  // Dark Mode Toggle
  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });

  // Custom Cursor
  const cursor = document.getElementById("custom-cursor");
  if (cursor) {
    document.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });
  }
});
