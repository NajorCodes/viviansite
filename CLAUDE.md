# CLAUDE.md — Vivian Zapanta Pilates Studio Website

This file gives you full context about this project so you can continue work immediately in a new session.

---

## What This Project Is

A complete website redesign for **Vivian Zapanta Pilates Studio** (vivianzapanta.com), Las Piñas, Philippines. The original site runs on WordPress. This is a brand-new, clean static HTML/CSS/JS redesign built from scratch — more modern, faster, and easier to hand off.

**Owner:** Vivian Zapanta  
**Client contact / project manager:** Rojan (the user you're talking to)  
**Original site for reference:** vivianzapanta.com  
**GitHub repo:** https://github.com/NajorCodes/viviansite.git

---

## Git Workflow — Auto-Commit & Push

Rojan wants every change made in this project committed and pushed to GitHub (`origin/main`) automatically — do not stop to ask for confirmation before pushing in this repo. After making edits, `git add` the relevant files, commit with a clear message, and `git push origin main` without waiting for separate approval. This standing authorization is scoped to this repo only.

Local git identity for commits in this repo is set to `Rojan <rojandelacruz2017@gmail.com>` (repo-local config, not global).

---

## Tech Stack

- **Plain HTML5 + CSS3 + Vanilla JavaScript** — no build step, no npm, no framework
- **Python 3** for local preview server only
- All 12 pages share the same `assets/css/style.css` and `assets/js/main.js`
- No dependencies to install — just clone and run

---

## How to Run Locally

**Option 1 (easiest):** Double-click `Start Website (Local Preview).bat`  
**Option 2 (manual):** Open terminal in project folder → `python nocache-server.py` → open `http://localhost:8000`

> NEVER open HTML files directly via double-click (file:// protocol). YouTube videos in the video lightbox won't work. Always use the local server.

The `.bat` launches `nocache-server.py` which runs Python's built-in HTTP server with `Cache-Control: no-store` headers. This prevents stale browser cache from showing old versions of pages during development.

---

## File Structure

```
/
├── index.html                        ← Home
├── about-vivian.html
├── about-pilates.html
├── about-studio.html
├── gallery.html
├── instructor-courses.html
├── class-descriptions.html           ← "By Appointment" online classes
├── free-classes.html                 ← Free YouTube video classes
├── schedule.html
├── blog.html
├── testimonials.html
├── contact.html
├── assets/
│   ├── css/style.css                 ← Single shared stylesheet
│   ├── js/main.js                    ← Single shared JS file
│   └── img/
│       ├── picture1.jpg … picture34.jpg   ← All page photos
│       ├── testi-zsazsa.jpg          ← Testimonial avatar: Rissah "ZsaZsa" Shao
│       ├── testi-steve.jpg           ← Testimonial avatar: Steve Vicera
│       ├── testi-snow.jpg            ← Testimonial avatar: Supaluck "Snow" Chulasewok
│       └── testi-ludy.jpg            ← Testimonial avatar: Ludy Puray
├── nocache-server.py                 ← No-cache local server script
├── Start Website (Local Preview).bat ← Double-click to run
├── PICTURE-GUIDE.txt                 ← Legend: which picture# maps to which page/section
└── CLAUDE.md                         ← This file
```

---

## Hero Banner System — IMPORTANT

Every page has a full-width hero banner at the top. The background image is set via **static inline CSS only**:

```html
<div class="hero-bg" style="background-image:url('assets/img/pictureN.jpg');"></div>
```

**Do NOT use `data-bg` attributes or JavaScript to set hero backgrounds.** We previously had a JS probe-and-swap system (`new Image()` checking if file exists, then swapping) but it caused ocean/forest placeholder images to show instead of real photos. It was completely removed from `main.js`. All hero images are now hard-coded inline.

### Hero Image Requirements
- Must be **landscape orientation** (width > height, ratio ≥ 1.2)
- Portrait photos (ratio < 1.0) look terrible in hero banners — CSS `background-size: cover` crops them to just a chin or body part
- Minimum recommended size: 1200×800px

### Current Hero Assignments
| Page | File | Description |
|---|---|---|
| index.html | picture1.jpg | Vivian with orange resistance bands class (1500×1000) |
| about-vivian.html | picture6.jpg | Anatomy workshop, Vivian holding bone model (1920×1280) |
| about-pilates.html | picture8.jpg | Stretching/coaching landscape (1200×800) |
| about-studio.html | picture11.jpg | Studio interior, chandelier room (1500×1213) |
| gallery.html | picture17.jpg | Arc-stretch coaching dynamic shot (1242×807) |
| instructor-courses.html | picture27.jpg | Group reformer training (1500×1000) |
| class-descriptions.html | picture28.jpg | Seated group workshop class (1200×800) |
| free-classes.html | picture30.jpg | |
| schedule.html | picture31.jpg | Group class active (1500×1159) |
| blog.html | picture32.jpg | |
| testimonials.html | picture33.jpg | Workshop teaching landscape (1500×1000) |
| contact.html | picture34.jpg | |

---

## Key Features Built

### Home Page (index.html)
- Hero with Vivian teaching orange resistance bands class (picture1.jpg)
- "Why Pilates" section with 3 feature cards
- "Welcome to Our Studio" section with HD studio interior photo (picture11.jpg / picture4.jpg)
- **"Tour Our Studio" video section** — YouTube lightbox for `s6ypcAfJ1bc` (LTC studio tour video)
- Featured classes grid
- CTA section

### Video Lightbox System
All pages with YouTube videos use a shared lightbox modal. Video cards use class `.video-card` with `data-video-id` and `data-video-title` attributes. The modal markup must be present in the page HTML (at the bottom, before the script tag). The JS in `main.js` handles open/close/navigation. When a page has only 1 video, prev/next/counter are hidden automatically.

### Testimonials Page (testimonials.html)
Four featured testimonials have circular profile avatars + 5-star ratings:
- Rissah "ZsaZsa" Shao — `testi-zsazsa.jpg` — Pilates Instructor
- Steve Vicera — `testi-steve.jpg` — Fitness Professional
- Supaluck "Snow" Chulasewok — `testi-snow.jpg` — Instructor
- Ludy Puray — `testi-ludy.jpg` — Client

Avatar CSS class: `.testimonial-avatar` (96px circle, `object-fit: cover`).  
Card CSS class: `.testimonial-card.has-avatar` (centered, padded top, quote-mark hidden).  
Star rating class: `.star-rating` (uses `&#9733;` entities, colored gold via CSS var).

---

## Design System (CSS Variables)

Defined in `:root` in `style.css`:
- `--sage` / `--sage-deep` / `--sage-pale` — green/sage tones (brand color)
- `--blush` — warm pink accent
- `--gold` — gold accent (used for stars, btn-gold)
- `--charcoal` — dark backgrounds
- `--off-white` — light section backgrounds
- `--shadow-soft` — box shadow
- `--font-head` — Cormorant Garamond (elegant serif for headings)
- `--font-body` — Outfit (clean sans-serif for body text)

Common layout classes: `.container`, `.grid.grid-2`, `.grid.grid-3`, `.section-head`, `.fade-up`, `.btn.btn-gold`, `.btn.btn-outline`, `.card`, `.bg-sage`, `.bg-charcoal`, `.eyebrow`

---

## Things That Were Fixed (Don't Redo These)

1. **Removed JS hero-bg probe system** — was causing ocean/forest placeholder images to appear. All heroes are now static inline styles.
2. **Reverted ?v=2 cache-busting** — adding query strings to image URLs broke the (now-removed) JS probe. No longer needed since heroes are static.
3. **Replaced portrait hero photos** — 6 pages had portrait-oriented photos that cropped badly. All replaced with landscape photos from the real photo pool.
4. **No-cache server** — browser was caching old HTML pages. `nocache-server.py` sends `Cache-Control: no-store` to prevent this.
5. **Real testimonial photos** — downloaded from vivianzapanta.com WordPress uploads (2025/05/ path). Full-res originals by stripping size suffixes from URLs.

---

## Replacing Photos

If Vivian or Rojan wants to swap any photo:
1. Prepare the new photo (JPG, landscape ratio ≥ 1.2 for hero banners)
2. Rename it to the matching `pictureN.jpg` number (see `PICTURE-GUIDE.txt` for the full legend)
3. Drop it in `assets/img/` — it replaces the old one automatically

---

## What's Left / Possible Next Steps

- The site is a **static prototype** — contact forms, the mailing list signup, and booking currently have no backend
- Could be deployed to GitHub Pages, Netlify, or Vercel for free hosting (just push and connect)
- The WordPress site at vivianzapanta.com is still live — this redesign hasn't replaced it yet
- Blog page has placeholder cards — real blog posts haven't been migrated
- Schedule page shows a sample timetable — actual class schedule needs to be updated by the client
- Could add Google Analytics or Facebook Pixel if needed

---

## Language Note

Rojan communicates in a mix of **Filipino (Tagalog) and English**. Responses in either language are fine. Rojan is the developer/project manager, not Vivian herself.
