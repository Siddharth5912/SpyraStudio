# Spyra Studios — Official Portfolio Website

Official static portfolio website for **Spyra Studios** — indie game development studio building fun, creative, and meaningful games.

Featuring:
- **Room to Breathe** — A cozy logic puzzle game about space and comfort (Available on Steam).
- **Moon Swarm** — Idle/arcade moon defense game (Play Demo on Steam).

---

## 🚀 GitHub Pages Deployment Guide

This website is built with pure, static **HTML5**, **CSS3**, and **JavaScript**. It has zero build steps and is ready to deploy directly to **GitHub Pages**.

### 📦 Files & Folders Required for GitHub

Upload the following files and folders to the root of your GitHub repository:

```text
├── index.html                   # Main website homepage
├── .nojekyll                    # Tells GitHub Pages to bypass Jekyll processing
├── .gitignore                   # Ignores local raw assets
├── css/
│   └── style.css                # Official design styles & checkerboard theme
├── js/
│   └── main.js                  # Video/GIF modal viewer & interactive logic
└── assets/
    ├── icons/
    │   └── favicon.png          # Browser favicon
    ├── images/
    │   ├── branding/
    │   │   └── spyra-logo.png   # Official geometric S logo
    │   └── games/               # Game capsules, hero starship & gameplay GIFs
    └── videos/
        ├── room-to-breathe-trailer.mp4
        └── moon-swarm-trailer.mp4
```

> **Note:** The `My Assets/` folder is your local raw backup directory containing uncompressed source duplicates; it is excluded via `.gitignore` and **does not** need to be uploaded to GitHub.

---

### Step-by-Step: Deploy to GitHub Pages

#### Method A: Using Git CLI (Recommended)

1. Open PowerShell or Terminal in this folder:
   ```bash
   git init
   git add .
   git commit -m "Deploy Spyra website to GitHub Pages"
   ```

2. Create a new repository on GitHub (e.g. `spyra-portfolio` or `spyra-portfolio.github.io`).

3. Link your remote repository and push:
   ```bash
   git branch -M main
   git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
   git push -u origin main
   ```

4. Enable GitHub Pages:
   - Go to your repository on GitHub.
   - Click **Settings** → **Pages** (in the left sidebar).
   - Under **Build and deployment > Source**, choose **Deploy from a branch**.
   - Under **Branch**, select `main` and folder `/(root)`.
   - Click **Save**.

Your website will be live in ~60 seconds at:
`https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`

---

#### Method B: Drag & Drop via GitHub Web UI

1. Create a new GitHub repository at [github.com/new](https://github.com/new).
2. Click **"uploading an existing file"**.
3. Drag and drop:
   - `index.html`
   - `.nojekyll`
   - The `css` folder
   - The `js` folder
   - The `assets` folder
4. Commit changes directly to `main`.
5. Go to **Settings > Pages**, choose `main` branch and `/(root)`, and click **Save**.
