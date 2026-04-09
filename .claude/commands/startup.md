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

## Step 1: Site Name & Description

Ask the user:
- What is the name of your documentation site?
- Give a one-line description of what this site is for.

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

## Step 3: Theme Color

Present these palette options and ask the user to pick one (or provide a custom hex color):

| Option | Color | Hex |
|--------|-------|-----|
| **Blue** (default) | A clean, professional blue | `#3b82f6` |
| **Teal** | Calm and modern | `#14b8a6` |
| **Purple** | Bold and creative | `#8b5cf6` |
| **Orange** | Warm and energetic | `#f97316` |
| **Green** | Natural and balanced | `#22c55e` |
| **Red** | Strong and attention-grabbing | `#ef4444` |
| **Slate** | Minimal and neutral | `#64748b` |
| **Custom** | User provides a hex color | (ask) |

**Default:** Blue (`#3b82f6`)

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

Then tell the user:

> Firebase requires a few manual steps in your browser that I can't do for you. Follow the guide at `site/deploy-firebase.md` to:
> 1. Create a Firebase project
> 2. Register a web app and get your config values
> 3. Enable Google Sign-In (if using domain or allowlist mode)
>
> Once you have your Firebase config values, share them with me and I'll update the configuration files.

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

### Clean up deployment configs (optional)

If the user chose a specific deployment target, offer to remove the configs for targets they won't use. **Ask before deleting anything.** The files to potentially remove:

- GitHub Pages: `.github/workflows/deploy.yml`
- Firebase: `firebase.json`, `.firebaserc.template`
- Netlify: `netlify.toml`

Also offer to remove the deployment guides from `site/` for unused targets, and their entries from `site/_sidebar.md`.

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
  npx live-server site --port=3000
```

Then show the **manual steps** the user still needs to do, based on their deployment target:

**GitHub Pages:**
> To go live, you need to do one thing in your browser:
> 1. Go to your repo on GitHub → **Settings** → **Pages**
> 2. Set Source to **GitHub Actions**
> 3. Push your changes — the site will deploy automatically

**Firebase:**
> To go live, follow the steps in `site/deploy-firebase.md`:
> 1. Create a Firebase project and get your config values
> 2. Share the config values with me so I can update `auth-config.js`
> 3. Run `firebase deploy` (I can do this for you)

**Netlify:**
> To go live:
> 1. Go to [netlify.com](https://www.netlify.com) and sign in with GitHub
> 2. Click **Add new site** → **Import an existing project** → select this repo
> 3. Netlify auto-detects the settings — just click **Deploy**

**Skip:**
> When you're ready to deploy, check the deployment guides in the sidebar.

If a template has `getting_started` text in its manifest, include it after the deployment instructions.

---

## Important Notes

- Do NOT modify `site/index.html` — all configuration goes through `config.js` and `auth-config.js`
- If the user seems confused at any step, explain in plain language and offer the default
- Keep the whole interaction under 3 minutes — don't over-explain
- After the wizard, commit the changes with a message like: `feat: configure site via /startup wizard`
- The deploy guide files (`deploy-github-pages.md`, `deploy-firebase.md`, `deploy-netlify.md`) and Claude Code setup file (`claude-code-setup.md`) should NOT be overwritten by template content — they are part of the base site infrastructure
