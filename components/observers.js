if (typeof window !== "undefined") {
  const faders = document.querySelectorAll(".fade_in");

  const appearOption = {
    threshold: 1,
    rootMargin: "0px 0px -50px 0px",
  };

  const appearOnScroll = new IntersectionObserver(async function (
    entries,
    appearOnScroll
  ) {
    for (const entry of entries) {
      if (!entry.isIntersecting) {
        return;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 200));
        entry.target.classList.add("appear");
        appearOnScroll.unobserve(entry.target);
      }
    }
  },
  appearOption);

  faders.forEach((fader) => {
    appearOnScroll.observe(fader);
  });
}
