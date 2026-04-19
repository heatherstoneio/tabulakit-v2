---
title: Getting Started
description: Walk-through for creating your own TabulaKit v2 documentation site from scratch
---

:::note[Migration status]
This page was migrated from the v1 Docsify source at [`heatherstoneio/tabulakit/site/getting-started.md`](https://github.com/heatherstoneio/tabulakit/blob/main/site/getting-started.md) as a smoke-test for OPORD 202604-019 Phase 1. Some deploy-target and wizard references still point to v1 behavior; v2 bootstrap flow is covered in the [scaffold bootstrap script](../../../../scripts/bootstrap.mjs) (work in progress under OPORD 022).
:::

This guide walks you through creating your own TabulaKit documentation site from scratch.

## Prerequisites

Before you start, make sure you have:

- A [GitHub account](https://github.com/signup)
- [VS Code](https://code.visualstudio.com/) installed
- The [Claude Code extension](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code) installed in VS Code
- If using Windows: [WSL](https://learn.microsoft.com/en-us/windows/wsl/install) set up, and VS Code connected to WSL as a remote

## Step 1: Create Your Site

Open VS Code, launch Claude Code, and paste this prompt:

```text
I want to create a documentation site using TabulaKit. Here's what I need you to do:

IMPORTANT: Before you start, tell me: "During this setup, you'll see permission prompts asking you to approve each action. That's normal for this first session — just approve them. Once we're done and you reopen in your new project folder, permissions will be pre-configured and you won't see these prompts anymore."

1. Check if gh (GitHub CLI) is installed. If not, install it.
2. Check if I'm authenticated with gh auth status. If not, run gh auth login and walk me through it.
3. Ask me three things:
   a. What do you want to name your site? (This becomes the repo name and the site title.)
   b. Give a one-line description of what this site is for.
   c. Where should I create this repo — on your personal GitHub account, or on a GitHub organization?
4. Create a new repo from the TabulaKit template by running:
   gh repo create [OWNER/]MY-SITE --template heatherstoneio/tabulakit-v2 --public --clone
5. After cloning, cd into the new repo directory and run the bootstrap script:
   npm install && npm run bootstrap
6. Tell me: "Setup is complete! Now use File > Open Folder to open the new repo folder. Then type /startup or follow the bootstrap instructions."

If anything fails, explain what went wrong and help me fix it. I may be non-technical.
```

Claude Code will handle everything — installing tools, authenticating with GitHub, creating your repo, and setting things up. Just answer its questions.

## Step 2: Run the Bootstrap

After your new repo is cloned, run:

```bash
npm install
npm run bootstrap
```

The bootstrap script (new in v2 — replaces v1's `/startup` skill):

1. Seeds initial Setup-tab GitHub Issues in your new repo
2. Pins Node version per `.nvmrc`
3. Configures your site title in `astro.config.mjs`

More configuration (theme color, deployment target, authentication) happens via the Setup tab shipping in the TabulaKit VS Code extension (OPORD 022).

## Step 3: Deploy

`tabulakit-v2` deploys to **GitHub Pages** by default via `.github/workflows/deploy.yml`:

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Set Source to **GitHub Actions**
3. Push to `main` — the site deploys automatically

**Netlify** support is preserved as a secondary target. A deploy-path simplification evaluation is planned in OPORD 202604-021. For now see the [v1 Netlify guide](https://github.com/heatherstoneio/tabulakit/blob/main/site/deploy-netlify.md) for Netlify-specific setup steps.

## Step 4: Add Content

Your site is live! Now just talk to Claude Code:

- *"Add a new page about our onboarding process"*
- *"Change the theme color to green"*
- *"Add a section header called Resources to the sidebar"*
- *"Help me write documentation about X"*

Or do it manually:

1. Create a new `.md` or `.mdx` file in `src/content/docs/`
2. Add an entry to the `sidebar` config in `astro.config.mjs`
3. Push your changes — the site updates automatically

## Writing Content

TabulaKit v2 uses [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/) to render markdown into a static site. Key differences from v1:

- **Build step** — `astro build` produces a static bundle (runs in GitHub Actions, not your browser)
- **Content lives in `src/content/docs/`** (not `site/` like v1)
- **Sidebar defined in `astro.config.mjs`** (not `_sidebar.md` like v1)
- **Dark/light theme toggle** — built-in via Starlight
- **Full-text search** — built-in via Pagefind (production builds)

### Sidebar Navigation

Edit `astro.config.mjs` to control the navigation:

```js
sidebar: [
    {
        label: 'Guides',
        items: [
            { label: 'Getting Started', slug: 'guides/getting-started' },
            { label: 'How Do I...?', slug: 'guides/how-do-i' },
        ],
    },
],
```

### Local Preview

To preview your site on your own computer before pushing:

```bash
npm run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser. Hot reload refreshes content changes in under a second.
