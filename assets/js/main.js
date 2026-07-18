// ---------- Mobile nav toggle ----------
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  document.querySelectorAll(".has-dropdown > .nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 920) {
        e.preventDefault();
        link.parentElement.classList.toggle("open");
      }
    });
  });
}

// ---------- Scroll fade-in ----------
const fadeEls = document.querySelectorAll(".fade-up");
if (fadeEls.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  fadeEls.forEach((el) => observer.observe(el));
}

// ---------- Gallery lightbox ----------
const lightbox = document.querySelector(".lightbox");
if (lightbox) {
  const lightboxImg = lightbox.querySelector("img");
  document.querySelectorAll("[data-lightbox]").forEach((item) => {
    item.addEventListener("click", () => {
      const src = item.querySelector("img").src;
      lightboxImg.src = src;
      lightbox.classList.add("open");
    });
  });
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox || e.target.classList.contains("lightbox-close")) {
      lightbox.classList.remove("open");
      lightboxImg.src = "";
    }
  });
}

// ---------- Video lightbox (YouTube) ----------
const videoLightbox = document.getElementById("videoLightbox");
const videoCards = document.querySelectorAll(".video-card");

if (videoLightbox && videoCards.length) {
  const videos = Array.from(videoCards).map((card) => ({
    id: card.getAttribute("data-video-id"),
    title: card.getAttribute("data-video-title"),
  }));
  const vlIframe = videoLightbox.querySelector(".vl-iframe");
  const vlTitle = videoLightbox.querySelector(".vl-title");
  const vlCurrent = videoLightbox.querySelector(".vl-current");
  const vlTotal = videoLightbox.querySelector(".vl-total");
  let currentVideoIndex = 0;

  vlTotal.textContent = videos.length;
  if (videos.length <= 1) {
    videoLightbox.querySelector(".vl-prev").style.display = "none";
    videoLightbox.querySelector(".vl-next").style.display = "none";
    videoLightbox.querySelector(".vl-topbar .vl-counter").style.display = "none";
  }

  const showVideo = (index) => {
    currentVideoIndex = (index + videos.length) % videos.length;
    const video = videos[currentVideoIndex];
    vlIframe.src = `https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`;
    vlTitle.textContent = video.title;
    vlCurrent.textContent = currentVideoIndex + 1;
  };

  const openVideoLightbox = (index) => {
    showVideo(index);
    videoLightbox.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  const closeVideoLightbox = () => {
    videoLightbox.classList.remove("open");
    vlIframe.src = "";
    document.body.style.overflow = "";
  };

  videoCards.forEach((card, index) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();
      openVideoLightbox(index);
    });
  });

  videoLightbox.querySelector(".vl-close").addEventListener("click", closeVideoLightbox);
  videoLightbox.querySelector(".vl-prev").addEventListener("click", () => showVideo(currentVideoIndex - 1));
  videoLightbox.querySelector(".vl-next").addEventListener("click", () => showVideo(currentVideoIndex + 1));

  videoLightbox.addEventListener("click", (e) => {
    if (e.target === videoLightbox || e.target.classList.contains("vl-body")) {
      closeVideoLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (!videoLightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeVideoLightbox();
    if (e.key === "ArrowLeft") showVideo(currentVideoIndex - 1);
    if (e.key === "ArrowRight") showVideo(currentVideoIndex + 1);
  });
}

// ---------- FAQ accordion ----------
document.querySelectorAll(".faq-item").forEach((item) => {
  item.querySelector(".faq-q").addEventListener("click", () => {
    item.classList.toggle("open");
  });
});

// ---------- Forms: no backend, gentle confirmation ----------
document.querySelectorAll("form[data-no-backend]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const note = form.querySelector(".form-note");
    if (note) {
      note.textContent = "Thank you! Your message has been noted. We'll get back to you soon.";
    }
    form.reset();
  });
});

// ---------- Mark active nav link ----------
const current = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-link, .dropdown a").forEach((a) => {
  const href = a.getAttribute("href");
  if (href === current) a.classList.add("active");
});
