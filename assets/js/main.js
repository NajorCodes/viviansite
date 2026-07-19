// ---------- Mobile nav toggle ----------
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    document.body.classList.toggle("nav-open", isOpen);
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

// ---------- Floating contact widget ----------
(() => {
  const wrap = document.createElement("div");
  wrap.className = "floating-contact";
  wrap.id = "floatingContact";
  wrap.innerHTML = `
    <div class="fc-icons">
      <a class="fc-icon fc-email" href="mailto:studio.vivianzapanta@gmail.com" aria-label="Email us">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
      </a>
      <a class="fc-icon fc-messenger" href="https://m.me/vzpilates" target="_blank" rel="noopener" aria-label="Message us on Messenger">
        <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.48 2 2 6.15 2 11.5c0 2.9 1.32 5.5 3.5 7.28V22l3.5-1.92c.94.26 1.94.42 3 .42 5.52 0 10-4.15 10-9.5S17.52 2 12 2Zm1.02 12.5-2.55-2.72-4.98 2.72 5.48-5.82 2.6 2.72 4.93-2.72-5.48 5.82Z"/></svg>
      </a>
      <a class="fc-icon fc-viber" href="viber://chat?number=%2B639178440945" aria-label="Chat on Viber">
        <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2C6.7 2 2.6 5.6 2.3 10.6c-.2 3 1 5.7 3.1 7.6l-.7 3.5 3.7-1.4c1.1.4 2.3.6 3.6.6 5.3 0 9.4-3.6 9.7-8.6C22 7.1 17.7 2 12 2Zm4.8 13.4c-.2.5-1.1 1-1.6 1-1.6.2-4.6-.8-6.9-3.1-1.9-1.9-2.9-4.1-3.1-5.5-.1-.7.3-1.5.8-1.9.3-.3.7-.4 1-.4h.3c.3 0 .5.1.7.5l1 2.2c.1.3.1.6-.1.8l-.6.7c-.1.1-.1.3 0 .5.4.9 1 1.7 1.7 2.4.7.6 1.5 1.2 2.4 1.6.2.1.4.1.5-.1l.6-.7c.2-.2.5-.3.8-.1l2.1 1.1c.3.2.5.4.4.7 0 .1 0 .2-.1.3ZM12 5c3.7 0 6.7 2.8 7 6.4a.6.6 0 1 1-1.2.1C17.5 8.4 15 6.1 12 6.1a.6.6 0 0 1 0-1.1Zm0 2.3c2.3.2 4.1 2 4.4 4.3a.6.6 0 1 1-1.2.1c-.2-1.7-1.5-3-3.2-3.2a.55.55 0 0 1 0-1.1Zm.1 2.4c.9.1 1.5.7 1.6 1.6a.55.55 0 1 1-1.1.1.5.5 0 0 0-.5-.5.55.55 0 0 1-.1-1.1Z"/></svg>
      </a>
      <a class="fc-icon fc-instagram" href="https://instagram.com/vivianzapanta/" target="_blank" rel="noopener" aria-label="Message us on Instagram">
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="#fff" stroke="none"/></svg>
      </a>
      <a class="fc-icon fc-whatsapp" href="https://wa.me/639178440945" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
        <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.1c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 1 1 12 20.1Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1-.2-.1-1-.4-1.9-1.2-.7-.6-1.2-1.4-1.3-1.6-.1-.2 0-.4.1-.5l.4-.4c.1-.1.2-.3.2-.4.1-.2 0-.3 0-.5 0-.1-.6-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.2-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.5-.3Z"/></svg>
      </a>
    </div>
    <button class="fc-toggle" id="fcToggle" aria-label="Open contact options" aria-expanded="false">
      <svg class="fc-icon-chat" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3C6.48 3 2 6.58 2 11c0 2.44 1.36 4.63 3.5 6.09V21l3.79-2.05c.86.2 1.76.31 2.71.31 5.52 0 10-3.58 10-8s-4.48-8-10-8Z"/><circle cx="8" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="11" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="11" r="1" fill="currentColor" stroke="none"/></svg>
      <svg class="fc-icon-close" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
    </button>
  `;
  document.body.appendChild(wrap);

  const toggleBtn = wrap.querySelector("#fcToggle");
  toggleBtn.addEventListener("click", () => {
    const isOpen = wrap.classList.toggle("open");
    toggleBtn.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
    if (wrap.classList.contains("open") && !wrap.contains(e.target)) {
      wrap.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && wrap.classList.contains("open")) {
      wrap.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    }
  });
})();

// ---------- Mark active nav link ----------
const current = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-link, .dropdown a").forEach((a) => {
  const href = a.getAttribute("href");
  if (href === current) a.classList.add("active");
});
