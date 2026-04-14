---
description: Interactive setup wizard for a new TabulaKit documentation site
---

# /startup — TabulaKit Setup Wizard

You are configuring a freshly forked TabulaKit documentation site. Walk the user through each step below, asking one question at a time. Keep it conversational and friendly — the user may be non-technical.

**Important:**
- Ask one question per step. Wait for the user's answer before proceeding.
- If the user gives a vague or empty answer, use sensible defaults and tell them what you chose.
- After all questions, make ALL the file changes at once, then show the summary.

---

## Pre-flight: Orientation

Before asking any questions, orient the user:

> **Welcome to TabulaKit setup!**
>
> I'm going to walk you through configuring your documentation site. It takes about 2-3 minutes. I'll ask you a few questions — things like what to name your site, what colors you want, and where to host it.

Then ask: **"Before we start, are you comfortable with software terms like 'commit' and 'deploy', or would you prefer I use simpler language like 'save' and 'publish'?"**

Store their preference. If they prefer simpler language, avoid all git/dev terminology throughout this wizard AND write the following to `.claude/CLAUDE.md` (append to the end, under a new `## User Preferences` section):

```
## User Preferences

This user prefers non-technical language. Avoid git terminology (commit, push, pull, merge, branch, deploy, repository). Instead use:
- "save" instead of "commit"
- "publish" instead of "push" or "deploy"
- "your site's files" instead of "repository"
- "undo" instead of "revert"
- "update" instead of "pull"
```

Then ask: **"Ready to go?"** and present options: "Yes, let's do it!" (default) and "I have a question first."

Wait for the user to acknowledge before proceeding.

---

## Step 1: Site Name & Description

First, check if a site name and description already exist — the user may have provided them during the initial repo creation. Check the root `CLAUDE.md` breadcrumb file for `Site name:` and `Site description:` lines, or check `site/config.js` for non-default values.

- If **both** name and description are found: confirm them — "I see your site is called '{name}' with the description '{description}'. Want to keep these, or change anything?"
- If **only description** found: confirm it and ask for the name
- If **neither** found: ask for both

**Defaults:** name = "My Documentation", description = "A documentation site powered by TabulaKit"

---

## Step 2: Template Selection

Read the available templates from `.tabulakit/templates/` by checking each subdirectory for a `manifest.json`. Present them to the user:

| Template | Description |
|----------|-------------|
| **Blank** (default) | Minimal starting point — a home page, about page, and getting started guide |
| **Mission** | Operational reference site — timeline, roster, comms log, checklists, risk register |
| **Course** | Workshop or course site — syllabus, schedule, session outlines, pre-work, resources |

If the user picks **Mission** or **Course**, also ask the template-specific questions from `manifest.json` → `questions` array. Use the `prompt` field as the question and `default` field as the fallback.

**Default:** Blank

---

## Step 3: Color Scheme

TabulaKit uses five colors: sidebar background, body background, primary accent (headings), secondary accent (links/nav highlights), and text color. Present complete color schemes rather than individual colors.

Present the options using a visual preview format. Use the AskUserQuestion tool with preview panels showing a mockup of each scheme:

| Scheme | Accent | Secondary | Sidebar BG | Body BG | Text | Vibe |
|--------|--------|-----------|------------|---------|------|------|
| **Heatherstone** (default) | `#e84118` (red-orange) | `#3bc0cb` (teal) | `#2a2a2a` | `#222222` | `#dddddd` | Bold, warm, professional |
| **Ocean** | `#3b82f6` (blue) | `#22d3ee` (cyan) | `#1e293b` | `#0f172a` | `#e2e8f0` | Cool, calm, corporate |
| **Forest** | `#22c55e` (green) | `#a3e635` (lime) | `#1a2e1a` | `#141e14` | `#d4e4d4` | Natural, balanced, grounded |
| **Amethyst** | `#8b5cf6` (purple) | `#f472b6` (pink) | `#1e1b2e` | `#15121e` | `#e2ddf0` | Creative, bold, modern |
| **Ember** | `#f97316` (orange) | `#fbbf24` (amber) | `#2a2019` | `#221a12` | `#ede0d0` | Warm, energetic, inviting |
| **Minimal** | `#64748b` (slate) | `#94a3b8` (light slate) | `#1e1e1e` | `#171717` | `#d4d4d4` | Clean, neutral, understated |
| **Custom** | User picks colors | | | | | |

For each scheme in the preview, show a formatted block like:
```
┌─────────────────────────────────────┐
│  SIDEBAR        │  CONTENT          │
│  ▓▓▓▓▓▓▓▓▓▓▓▓  │                   │
│  ■ SECTION      │  ██ Heading       │
│    · Page One   │  Body text here   │
│    · Page Two   │  Link text here   │
│                 │                   │
└─────────────────────────────────────┘
```
Using the actual colors described in words (e.g., "red-orange heading, teal links on dark gray").

When the user picks a scheme, apply ALL five colors — update `site/css/custom.css` with the full palette as CSS variable overrides.

If the user picks **Custom**, ask them for their primary accent color and secondary accent color, then auto-generate harmonious sidebar/body/text colors.

**Default:** Heatherstone

---

## Step 3b: Font Size

Ask the user what font size they'd like:

| Option | Size | Best For |
|--------|------|----------|
| **Standard** | 17px | General use, comfortable for most screens |
| **Large** (default) | 20px | Presentations, sharing your screen, accessibility |
| **Compact** | 15px | Dense content, users who prefer more text on screen |

Update the `--base-font-size` CSS variable in `site/index.html`, and the `font-size` on `body` and `.markdown-section` to match.

**Default:** Large (20px)

---

## Step 4: Deployment Target

Ask the user which deployment target they want to use:

| Option | Best For |
|--------|----------|
| **GitHub Pages** (default) | Simplest setup. Public sites. Free. |
| **Firebase** | Sites that need Google sign-in to restrict access. Free tier. |
| **Netlify** | Similar to GitHub Pages with deploy previews on pull requests. Free. |
| **Skip** | I'll set up deployment later. |

**Default:** GitHub Pages

---

## Step 5: Authentication (Firebase Only)

**Only ask this if the user chose Firebase in Step 4.** Otherwise, skip to Step 6.

Ask which auth mode they want:

| Mode | Who Can Access |
|------|---------------|
| **Public** (default) | Anyone — no sign-in required |
| **Domain** | Only people with a specific Google Workspace domain (e.g., `@yourcompany.com`) |
| **Allowlist** | Only specific email addresses you list |

If **Domain**: ask for the domain (e.g., `yourcompany.com`)
If **Allowlist**: ask for the email addresses (comma-separated)

Then walk the user through the Firebase setup steps inline (don't send them to a separate guide):

> Firebase requires a few manual steps in your browser that I can't do for you. Here's what to do:
>
> **1. Create a Firebase project:**
> Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project** → name it (e.g., your site name) → disable Google Analytics (not needed) → **Create project**
>
> **2. Register a web app:**
> On the project home page, click the **web icon** (`</>`) → nickname it anything (e.g., "docs site") → leave Firebase Hosting **unchecked** → **Register app** → you'll see config values (apiKey, authDomain, etc.) — **copy those and paste them back to me**
>
> **3. Enable Google Sign-In** (only if using domain or allowlist mode):
> In the left sidebar: **Build** → **Authentication** → **Get started** → **Sign-in method** tab → click **Google** → toggle **Enable** → **Public-facing name**: enter your site or org name (this shows on the sign-in screen) → **Support email**: pick yours → **Save**
>
> Once you have your Firebase config values, paste them here and I'll update everything.

**Default:** Public

---

## Step 6: Command Architecture Module (Optional)

Ask:

> Would you like to include the Command Architecture reference? It's an organizational framework for structured planning and execution — useful if your team uses military-style planning processes (OPORDs, FRAGOs, AARs) or wants to adopt them.

If **yes**: the module content will be installed from `.tabulakit/modules/command-architecture/`.

**Default:** No

---

## Step 7: Apply Changes

Now make all the changes based on the user's answers:

### Install Template

1. **Copy template content** from `.tabulakit/templates/<selected>/content/` into `site/`, overwriting existing files
2. **Replace `site/_sidebar.md`** with the template's `sidebar.md`
3. **Replace placeholders** in all copied files: `{{site_name}}`, `{{site_description}}`, and any template-specific variables from the manifest questions (e.g., `{{mission_name}}`, `{{org_name}}`, `{{course_title}}`)
4. **Install template skills** — copy any skills from `.tabulakit/templates/<selected>/skills/` into `.claude/commands/` and add `Skill(<name>)` entries to `.claude/settings.json` permissions

### Install CA Module (if selected)

1. Copy content from `.tabulakit/modules/command-architecture/content/` into `site/docs/command-architecture/`
2. Copy `CA_VERSION.md` into `site/docs/command-architecture/`
3. Append the sidebar entries from `.tabulakit/modules/command-architecture/sidebar-section.md` to `site/_sidebar.md`

### Assign preview port

Generate a random port between 3100 and 3800 for the local preview server. Read `.tabulakit/config.json` — if it exists and already has a `previewPort`, keep it. Otherwise, pick a new one and write it:

```json
{
  "previewPort": 3247
}
```

This avoids conflicts when running multiple TabulaKit sites simultaneously. The VS Code extension and preview commands use this port automatically.

### Update `site/config.js`

Replace the values in `window.TABULAKIT_CONFIG`:
- Set `name` to the user's site name
- Set `description` to the user's description
- Set `theme.color` to the chosen hex color

### Update `site/auth-config.js` (Firebase with auth only)

If the user chose Firebase with domain or allowlist mode:
- Set `mode` to `"domain"` or `"allowlist"`
- Set `allowedDomain` (for domain mode) or `allowedEmails` (for allowlist mode)
- If the user provided Firebase config values, fill in the `firebase` object

### Clean up deployment configs

If the user chose a specific deployment target (not "Skip"), automatically remove the configs and guides for targets they didn't choose. **Do not ask — just clean up.** Users pick one deploy target and stick with it.

Remove for unused targets:
- GitHub Pages: `.github/workflows/deploy.yml`
- Firebase: `firebase.json`, `.firebaserc.template`
- Netlify: `netlify.toml`

Also remove the deployment guide pages from `site/` for ALL targets (`deploy-github-pages.md`, `deploy-firebase.md`, `deploy-netlify.md`). Deployment instructions are provided inline in the summary below — users don't need separate guide pages on their site.

### Remove help/meta content from user site

TabulaKit help content belongs on the TabulaKit documentation site and in the VS Code extension, NOT in user sites. Automatically remove these files from `site/` if they exist:

- `getting-started.md`
- `how-do-i.md`
- `claude-code-setup.md`
- `case-studies.md`

Also remove any references to these files from `site/_sidebar.md`. The user's site should only contain their own content from the selected template.

---

## Step 8: Summary

After making all changes, present a summary:

```
Setup Complete!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Site Name:    {name}
Description:  {description}
Template:     {template}
Theme Color:  {color} {hex}
Deploy To:    {target}
Auth Mode:    {mode}
CA Module:    {yes/no}

Files Updated:
  - site/config.js
  - site/README.md
  - site/_sidebar.md
  {- template content files}
  {- template skills installed}
  {- site/docs/command-architecture/ (if CA selected)}
  {- site/auth-config.js}
  {- removed: ...}

Preview locally:
  npx live-server site --port={previewPort from .tabulakit/config.json}
```

Then show the **manual steps** the user still needs to do, based on their deployment target:

**GitHub Pages:**
> To go live, you need to do one thing in your browser:
> 1. Go to your repo on GitHub → **Settings** → **Pages**
> 2. Set Source to **GitHub Actions**
> 3. Push your changes — the site will deploy automatically

**Firebase:**
> To go live:
> 1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
> 2. Register a web app and get your config values
> 3. Share the config values with me so I can update `auth-config.js`
> 4. Run `firebase deploy` (I can do this for you)
> If you need more details, visit the [TabulaKit Firebase guide](https://heatherstoneio.github.io/tabulakit/#/deploy-firebase)

**Netlify:**
> To go live:
> 1. Go to [netlify.com](https://www.netlify.com) and sign in with GitHub
> 2. Click **Add new site** → **Import an existing project** → select this repo
> 3. Netlify auto-detects the settings — just click **Deploy**

**Skip:**
> When you're ready to deploy, just tell me and I'll walk you through it. You can also visit the [TabulaKit deployment guides](https://heatherstoneio.github.io/tabulakit/#/getting-started) for reference.

If a template has `getting_started` text in its manifest, include it after the deployment instructions.

---

## Important Notes

- Do NOT modify `site/index.html` — all configuration goes through `config.js` and `auth-config.js`
- If the user seems confused at any step, explain in plain language and offer the default
- Keep the whole interaction under 3 minutes — don't over-explain
- After the wizard, commit the changes with a message like: `feat: configure site via /startup wizard`
- When telling the user to close their session, be explicit: "Click the **New Session** button (at the top of the Claude Code panel) to start a fresh session. Your settings will take full effect in the new session."
- Help/meta content (getting-started, how-do-i, claude-code-setup, case-studies, deploy guides) is removed from user sites during setup — it lives on the TabulaKit docs site and in the VS Code extension instead
- Delete the root `CLAUDE.md` breadcrumb file (if it exists) after setup completes — the real project context lives in `.claude/CLAUDE.md`
