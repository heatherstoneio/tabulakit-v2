# Getting Started

This guide walks you through setting up your TabulaKit documentation site.

## Prerequisites

- [Git](https://git-scm.com/)
- A text editor or [Claude Code](https://claude.ai/code)
- [Node.js](https://nodejs.org/) (for local preview only)

## Quick Start

### 1. Create Your Site

Click **"Use this template"** on the [TabulaKit GitHub repo](https://github.com/heatherstoneio/tabulakit) to create your own copy.

Clone your new repository:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO
```

### 2. Configure

**With Claude Code (recommended):**

```
/startup
```

**Manually:** Edit `site/config.js` with your site name and theme colors.

### 3. Preview Locally

```bash
npx live-server site --port=3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Add Content

- Create markdown files in the `site/` directory
- Update `site/_sidebar.md` to add navigation links
- Docsify renders markdown on the fly — no build step needed

### 5. Deploy

Choose your deployment target:

| Target | Best For | Auth Support |
|--------|----------|--------------|
| **GitHub Pages** | Public sites, simplest setup | No |
| **Firebase** | Sites needing Google authentication | Yes |
| **Netlify** | Public sites, custom domains | No |

See the deployment guides for each target:
- [GitHub Pages](deploy-github-pages.md)
- [Firebase](deploy-firebase.md)
- [Netlify](deploy-netlify.md)

## Writing Content

TabulaKit uses [Docsify](https://docsify.js.org/) to render markdown files as a single-page application. Key features:

- **No build step** — edit markdown, refresh browser
- **Sidebar navigation** — defined in `_sidebar.md`
- **Full-text search** — built in
- **Dark theme** — default, customizable via CSS variables

### Sidebar Navigation

Edit `site/_sidebar.md` to control the navigation. Use bold text for section headers:

```markdown
- **SECTION NAME**
- [Page Title](filename.md)
- [Another Page](another.md)
```
