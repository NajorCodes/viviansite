// ---------- Hero parallax ----------
const heroBgs = document.querySelectorAll(".hero-bg");
if (heroBgs.length && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  let ticking = false;
  const updateParallax = () => {
    heroBgs.forEach((bg) => {
      const rect = bg.parentElement.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const offset = rect.top * 0.15;
      bg.style.transform = `translateY(${offset}px)`;
    });
    ticking = false;
  };
  document.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
  updateParallax();
}

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

// ---------- Animated stat counters ----------
const countEls = document.querySelectorAll("[data-count]");
if (countEls.length) {
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute("data-count"), 10);
        const suffix = el.getAttribute("data-suffix") || "";
        const duration = 1200;
        const start = performance.now();
        const step = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        countObserver.unobserve(el);
      });
    },
    { threshold: 0.4 }
  );
  countEls.forEach((el) => countObserver.observe(el));
}

// ---------- Gallery lightbox ----------
// Uses event delegation (not per-item listeners) so gallery items added
// later, e.g. by the Google Sheets photo loader below, work automatically.
const lightbox = document.querySelector(".lightbox");
if (lightbox) {
  const lightboxImg = lightbox.querySelector("img");
  document.addEventListener("click", (e) => {
    const item = e.target.closest("[data-lightbox]");
    if (!item) return;
    const img = item.querySelector("img");
    if (img) {
      lightboxImg.src = img.src;
      lightbox.classList.add("open");
    }
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

// ---------- Forms: mailing list + contact inquiry, no-backend confirmation ----------
// Both the mailing-form (footer) and the contact page inquiry form post to
// the same Google Apps Script, which routes by "formType" into separate
// tabs of the content sheet (and emails Vivian for contact inquiries).
const FORMS_ENDPOINT = "https://script.google.com/macros/s/AKfycbwsTa0Avi2LPkmUvAlAlA2ZZCOjP7NNuIcfnpdJcMydQtHheNatTKh5KovBqjPcH1Eq/exec";

document.querySelectorAll("form[data-no-backend]").forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // .form-note lives inside the form on the contact page, but as a
    // sibling after the mailing-form footer widget.
    const note = form.querySelector(".form-note") || form.parentElement.querySelector(".form-note");
    const isMailingForm = form.classList.contains("mailing-form");

    if (FORMS_ENDPOINT && !FORMS_ENDPOINT.startsWith("PASTE_")) {
      const body = new URLSearchParams();
      if (isMailingForm) {
        const emailInput = form.querySelector('input[type="email"]');
        if (emailInput && emailInput.value) {
          body.set("formType", "newsletter");
          body.set("email", emailInput.value);
        }
      } else {
        body.set("formType", "contact");
        body.set("name", form.querySelector("#name")?.value || "");
        body.set("email", form.querySelector("#email")?.value || "");
        body.set("message", form.querySelector("#message")?.value || "");
      }
      if (body.has("email")) {
        fetch(FORMS_ENDPOINT, { method: "POST", mode: "no-cors", body }).catch(() => {});
      }
    }

    if (note) {
      note.textContent = isMailingForm
        ? "Thanks for subscribing! You're on the list."
        : "Thank you! Your message has been noted. We'll get back to you soon.";
    }
    form.reset();
  });
});

// ---------- Google Sheets content loader ----------
// Vivian edits a published Google Sheet (Date | Title | Description columns).
// Each container below reads its sheet's CSV link from its data-sheet-csv
// attribute, so the URLs live in the page HTML, not here.
(() => {
  function parseCSV(text) {
    const rows = [];
    let row = [], field = "", inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (inQuotes) {
        if (c === '"') {
          if (text[i + 1] === '"') { field += '"'; i++; }
          else inQuotes = false;
        } else field += c;
      } else if (c === '"') {
        inQuotes = true;
      } else if (c === ",") {
        row.push(field); field = "";
      } else if (c === "\n" || c === "\r") {
        if (c === "\r" && text[i + 1] === "\n") i++;
        row.push(field); rows.push(row); row = []; field = "";
      } else {
        field += c;
      }
    }
    if (field.length || row.length) { row.push(field); rows.push(row); }
    return rows.filter((r) => r.some((cell) => cell.trim() !== ""));
  }

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str == null ? "" : str;
    return div.innerHTML;
  }

  // Converts a Google Drive "share" link into a direct, embeddable image URL,
  // so Vivian can paste whatever link Drive gives her as-is.
  function driveImageURL(url) {
    if (!url) return url;
    const match = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?id=)([a-zA-Z0-9_-]+)/);
    return match ? `https://lh3.googleusercontent.com/d/${match[1]}=w1000` : url;
  }

  async function fetchSheetRows(url) {
    if (!url || url.startsWith("PASTE_")) return null;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) return null;
      const text = await res.text();
      const rows = parseCSV(text)
        .slice(1)
        .filter((r) => (r[0] || "").trim());
      return rows.length ? rows : null;
    } catch (e) {
      return null; // offline or fetch failed: caller keeps its existing fallback
    }
  }

  async function loadSheetCards(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const rows = await fetchSheetRows(container.getAttribute("data-sheet-csv"));
    if (!rows || !rows.some((r) => (r[1] || "").trim())) return;

    container.innerHTML = `<div class="grid grid-2">${rows
      .map(
        (r) => `
        <div class="card">
          <span class="tag-pill">${escapeHTML(r[0])}</span>
          <h3>${escapeHTML(r[1])}</h3>
          <p>${escapeHTML(r[2] || "")}</p>
        </div>`
      )
      .join("")}</div>`;
  }

  async function loadGalleryPhotos(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const rows = await fetchSheetRows(container.getAttribute("data-sheet-csv"));
    if (!rows) return;

    // Sheet columns: Title | Photo URL | Caption | More Photos Link (optional)
    // Photo URL can hold several links separated by commas (one row =
    // one album, many photos). Rows are grouped into an album per unique
    // Title, in the order each title first appears in the sheet. If any
    // row for a title has a 4th column, that album gets a "more photos"
    // link — it's fine to leave this blank.
    const groups = [];
    const indexByTitle = new Map();
    rows.forEach((r) => {
      const title = (r[0] || "").trim() || "Gallery";
      const urls = (r[1] || "")
        .split(",")
        .map((u) => u.trim())
        .filter(Boolean);
      const morePhotosLink = (r[3] || "").trim();
      if (!urls.length) return;
      if (!indexByTitle.has(title)) {
        indexByTitle.set(title, groups.length);
        groups.push({ title, items: [], morePhotosLink: "" });
      }
      const group = groups[indexByTitle.get(title)];
      if (morePhotosLink && !group.morePhotosLink) group.morePhotosLink = morePhotosLink;
      urls.forEach((url) => {
        group.items.push({ url, caption: r[2] || title });
      });
    });
    if (!groups.length) return;

    container.innerHTML = groups
      .map(
        (g) => `
        <div class="gallery-group">
          <h3 class="gallery-group-title">${escapeHTML(g.title)}</h3>
          <div class="gallery-grid">${g.items
            .map((item) => {
              const src = escapeHTML(driveImageURL(item.url));
              const caption = escapeHTML(item.caption);
              return `<div class="gallery-item" data-lightbox><img src="${src}" alt="${caption}" loading="lazy"></div>`;
            })
            .join("")}</div>
          ${
            g.morePhotosLink
              ? `<div class="gallery-more-link"><a href="${escapeHTML(g.morePhotosLink)}" target="_blank" rel="noopener">For more photos, click here</a></div>`
              : ""
          }
        </div>`
      )
      .join("");
  }

  async function loadTestimonials(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const rows = await fetchSheetRows(container.getAttribute("data-sheet-csv"));
    if (!rows || !rows.some((r) => (r[1] || "").trim())) return;

    container.innerHTML = `<div class="grid grid-4">${rows
      .map(
        (r) => `
        <div class="testimonial-card">
          <span class="quote-mark">&quot;</span>
          <p>${escapeHTML(r[0])}</p>
          <div class="name">${escapeHTML(r[1])}</div>
        </div>`
      )
      .join("")}</div>`;
  }

  ["scheduleEvents", "upcomingTrainings", "blogPosts"].forEach(loadSheetCards);
  loadGalleryPhotos("galleryPhotos");
  loadTestimonials("studentTestimonials");
})();

// ---------- Mark active nav link ----------
const current = location.pathname.split("/").pop() || "index.html";
document.querySelectorAll(".nav-link, .dropdown a").forEach((a) => {
  const href = a.getAttribute("href");
  if (href === current) a.classList.add("active");
});
