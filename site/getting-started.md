# Getting Started

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
2. Check if I'm authenticated with gh auth status. If not, run gh auth login and walk me through it. When it asks about token expiration, recommend "No expiration" so the token doesn't stop working later.
3. Ask me three things:
   a. What do you want to name your site? (This becomes the repo name and the site title.)
   b. Give a one-line description of what this site is for.
   c. Where should I create this repo — on your personal GitHub account, or on a GitHub organization? (If org, ask which one.)
4. Create a new repo from the TabulaKit template by running:
   gh repo create [OWNER/]MY-SITE --template heatherstoneio/tabulakit --public --clone
   (Replace MY-SITE with the site name. If they chose an org, use ORG/MY-SITE format.)
5. After cloning, cd into the new repo directory.
6. Write a file at CLAUDE.md (in the repo root, NOT inside .claude/) with this content:

# Setup Instructions

This is a freshly forked TabulaKit site that hasn't been configured yet.
Site name: [use the name from step 3]
Site description: [use the description from step 3]

On the NEXT session (after this one), the .claude/ folder will be active
with full project context, permissions, and skills.

When the user returns, tell them: "Welcome back! Your TabulaKit repo is
ready. Type /startup to configure your site."

After /startup completes, delete this root CLAUDE.md file — the real
project context lives in .claude/CLAUDE.md.

7. Commit that file: git add CLAUDE.md && git commit -m "docs: add setup breadcrumb for first session"
8. Push: git push origin main
9. Tell me: "Setup is complete! Now use File > Open Folder to open the new repo folder (the one we just created). That will automatically start a fresh Claude Code session with all the project settings loaded. Then type /startup to configure your site."

If anything fails, explain what went wrong and help me fix it. I may be non-technical.
```

Claude Code will handle everything — installing tools, authenticating with GitHub, creating your repo, and setting things up. Just answer its questions.

When it tells you to switch folders, go to **File > Open Folder** and open the new repo folder. This starts a fresh session with all permissions pre-configured.

## Step 2: Run the Setup Wizard

After restarting Claude Code in your new repo, type:

```
/startup
```

The wizard walks you through:

1. **Site name & description** — what to call your site
2. **Template** — pick a starting structure (blank, mission planning, or course/workshop)
3. **Theme color** — choose from presets or enter a custom color
4. **Deployment target** — where your site will live (GitHub Pages, Firebase, or Netlify)
5. **Authentication** — if using Firebase, choose who can access your site
6. **Command Architecture** — optional organizational framework module

Answer the questions and the wizard configures everything for you.

## Step 3: Deploy

The wizard tells you exactly what to do based on your deployment choice. Here's a quick summary:

**GitHub Pages** (simplest):
1. Go to your repo on GitHub → **Settings** → **Pages**
2. Set Source to **GitHub Actions**
3. Push your changes — the site deploys automatically

**Firebase** (if you need access control):
1. Follow the steps in the [Firebase guide](deploy-firebase.md)

**Netlify** (deploy previews on pull requests):
1. Follow the steps in the [Netlify guide](deploy-netlify.md)

## Step 4: Add Content

Your site is live! Now just talk to Claude Code:

- *"Add a new page about our onboarding process"*
- *"Change the theme color to green"*
- *"Add a section header called Resources to the sidebar"*
- *"Help me write documentation about X"*

Or do it manually:

1. Create a new `.md` file in the `site/` folder
2. Add a link to it in `site/_sidebar.md`
3. Push your changes — the site updates automatically

## Writing Content

TabulaKit uses [Docsify](https://docsify.js.org/) to render markdown files as a single-page application. Key features:

- **No build step** — edit markdown, refresh browser
- **Sidebar navigation** — defined in `_sidebar.md`
- **Full-text search** — built in
- **Dark theme** — default, customizable via config

### Sidebar Navigation

Edit `site/_sidebar.md` to control the navigation:

```markdown
- [Page Title](filename.md)
- **SECTION HEADER**
- [Another Page](another.md)
```

### Local Preview

To preview your site on your own computer before pushing:

```bash
npx live-server site --port=3000
```

Open [http://localhost:3000](http://localhost:3000) in your browser. Changes appear when you refresh.
