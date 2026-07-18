# Vivian Zapanta Pilates Studio — Website

Official website for **Vivian Zapanta Pilates Studio**, Las Piñas, Philippines.  
The 1st and only STOTT PILATES® Licensed Training Center in the Philippines.

---

## How to Run (Local Preview)

### Option 1 — Double-click (easiest)
1. Open the project folder
2. Double-click **`Start Website (Local Preview).bat`**
3. The browser will open automatically at `http://localhost:8000`

> **Note:** Always use this method. Do NOT open the HTML files directly by double-clicking them — YouTube videos will not work on `file://` protocol.

### Option 2 — Manual (if .bat doesn't work)
Open a terminal inside the project folder and run:
```
python nocache-server.py
```
Then open your browser and go to: `http://localhost:8000`

---

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| About Vivian Zapanta | `about-vivian.html` |
| About Pilates | `about-pilates.html` |
| About Our Studio | `about-studio.html` |
| Gallery | `gallery.html` |
| Instructor Courses | `instructor-courses.html` |
| By Appointment (Classes) | `class-descriptions.html` |
| Free Video Classes | `free-classes.html` |
| Schedule | `schedule.html` |
| Blog / Latest News | `blog.html` |
| Testimonials | `testimonials.html` |
| Contact | `contact.html` |

---

## Replacing Photos

Photos are stored in `assets/img/` and named `picture1.jpg` through `picture34.jpg`.  
See **`PICTURE-GUIDE.txt`** for the full legend of which picture goes on which page/section.

To replace a photo:
1. Prepare your new photo (any size, JPG recommended)
2. Rename it to the matching picture number (e.g. `picture1.jpg`)
3. Drop it into `assets/img/` — it will automatically replace the old one

---

## Tech Stack

- Plain HTML5, CSS3, Vanilla JavaScript — no frameworks, no build step required
- Python `http.server` for local preview (included via `.bat` and `nocache-server.py`)

---

## Requirements

- Python 3 must be installed on your computer
- Any modern browser (Chrome, Edge, Firefox)

---

*Built for Vivian Zapanta Pilates Studio · vivianzapanta.com*
