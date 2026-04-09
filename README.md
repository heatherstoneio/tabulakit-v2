# TabulaKit

A template for creating documentation sites with zero build step. Fork, run `/startup`, deploy in 5 minutes.

Built on [Docsify](https://docsify.js.org/) with [Claude Code](https://claude.ai/code) integration for AI-assisted content creation and site management.

## Quick Start

### Prerequisites

- A [GitHub account](https://github.com/signup)
- [VS Code](https://code.visualstudio.com/) with the [Claude Code extension](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code)
- If using WSL: connect to WSL as a remote in VS Code first

### Step 1: Create Your Site

Open Claude Code in VS Code and paste this prompt:

> I want to create a documentation site using TabulaKit. Here's what I need you to do:
>
> 1. Check if `gh` (GitHub CLI) is installed. If not, install it.
> 2. Check if I'm authenticated with `gh auth status`. If not, run `gh auth login` and walk me through it.
> 3. Create a new repo from the TabulaKit template by running:
>    `gh repo create MY-SITE --template heatherstoneio/tabulakit --public --clone`
>    (Ask me what I want to name my repo before running this — replace MY-SITE with my answer.)
> 4. After cloning, `cd` into the new repo directory.
> 5. Write a file at `CLAUDE.md` (in the repo root, NOT inside .claude/) with this content:
>
> ```
> # Setup Instructions
>
> This is a freshly forked TabulaKit site that hasn't been configured yet.
>
> On the NEXT session (after this one), the .claude/ folder will be active
> with full project context, permissions, and skills.
>
> When the user returns, tell them: "Welcome back! Your TabulaKit repo is
> ready. Type /startup to configure your site — it'll walk you through
> picking a name, template, colors, and deployment target."
>
> After /startup completes, delete this root CLAUDE.md file — the real
> project context lives in .claude/CLAUDE.md.
> ```
>
> 6. Commit that file: `git add CLAUDE.md && git commit -m "docs: add setup breadcrumb for first session"`
> 7. Push: `git push origin main`
> 8. Tell me to **close this Claude Code session and open a new one** in the repo folder so the `.claude/settings.json` and skills take effect.
>
> If anything fails, explain what went wrong and help me fix it. I may be non-technical.

Claude Code will create your repo, set everything up, and tell you when to restart.

### Step 2: Configure Your Site

After restarting Claude Code in your new repo folder, type:

```
/startup
```

The wizard walks you through:
- Naming your site
- Picking a template (blank, mission planning, or course/workshop)
- Choosing a theme color
- Selecting a deployment target (GitHub Pages, Firebase, or Netlify)
- Optional: installing the Command Architecture reference module

### Step 3: Deploy

The wizard tells you exactly what to do for your chosen deployment target. For most people (GitHub Pages), it's:

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Set Source to **GitHub Actions**
3. Push your changes — the site deploys automatically

That's it. Your site is live.

## What You Can Do After Setup

Once your site is running, just talk to Claude Code:

- *"Add a new page about our onboarding process"*
- *"Change the theme color to green"*
- *"Update the sidebar with a Resources section"*
- *"Help me write documentation about X"*
- *"Deploy to Firebase"*

## Templates

| Template | Description |
|----------|-------------|
| **Blank** | Minimal starting point — home page, about page, getting started guide |
| **Mission** | Operational reference site — timeline, roster, comms log, checklists, risk register. Includes `/note` and `/aar` skills. |
| **Course** | Workshop or course site — syllabus, schedule, session outlines, pre-work, participant resources |

## Deployment Targets

| Target | Best For | Auth Support | Setup |
|--------|----------|-------------|-------|
| **GitHub Pages** | Public sites, simplest setup | No | Enable in Settings → Pages |
| **Firebase** | Sites needing access control | Yes (Google sign-in) | Create project, deploy |
| **Netlify** | Public sites, deploy previews | No | Connect repo, auto-deploys |

All three are free and auto-deploy on push to `main`.

## Authentication (Firebase)

Three modes for controlling access:

| Mode | Who Can Access |
|------|---------------|
| `public` | Anyone (default) |
| `domain` | Users with a specific Google Workspace domain |
| `allowlist` | Specific email addresses only |

## Claude Code Skills

| Skill | Available In | Description |
|-------|-------------|-------------|
| `/startup` | All templates | Interactive site setup wizard |
| `/orient` | All templates | Save session state for continuity across sessions |
| `/note` | Mission template | Add timestamped comms log entries with smart propagation |
| `/aar` | Mission template | Log observations for the After Action Review |

## Optional Modules

### Command Architecture

A military-inspired organizational framework for structured planning and execution. Includes reference docs on staff sections (S1-S7), planning process, execution lifecycle, orders communication, and operating rhythm.

Install during `/startup` or manually copy from `.tabulakit/modules/command-architecture/`.

## Project Structure

```
tabulakit/
├── site/                          # Your documentation content
│   ├── index.html                 # Docsify app shell
│   ├── config.js                  # Site name, theme, options
│   ├── auth-config.js             # Authentication settings
│   ├── _sidebar.md                # Navigation
│   └── *.md                       # Your pages
│
├── .claude/                       # Claude Code integration
│   ├── CLAUDE.md                  # Project context
│   ├── settings.json              # Permissions and hooks
│   └── commands/                  # Slash command skills
│
├── .tabulakit/                    # Template system
│   ├── templates/                 # Site templates
│   │   ├── blank/
│   │   ├── mission/
│   │   └── course/
│   └── modules/                   # Optional add-on modules
│       └── command-architecture/
│
├── .github/workflows/deploy.yml   # GitHub Pages auto-deploy
├── firebase.json                  # Firebase hosting config
├── netlify.toml                   # Netlify hosting config
└── LICENSE                        # MIT
```

## Creating Your Own Template

Templates live in `.tabulakit/templates/<name>/` with this structure:

```
my-template/
├── manifest.json    # Metadata, questions, skills list
├── content/         # Markdown files copied into site/
├── sidebar.md       # Navigation structure
└── skills/          # Optional Claude Code skills
    └── my-skill/
        └── SKILL.md
```

### manifest.json

```json
{
  "name": "My Template",
  "description": "One-line description shown in /startup",
  "version": "1.0.0",
  "questions": [
    {
      "key": "project_name",
      "prompt": "What is the project name?",
      "default": "My Project",
      "type": "text"
    }
  ],
  "skills": ["my-skill"],
  "getting_started": "Extra text for the setup summary"
}
```

Use `{{project_name}}` placeholders in content files — they're replaced with the user's answers during `/startup`.

## Local Development

```bash
npx live-server site --port=3000
```

No build step, no dependencies to install. Edit markdown, refresh browser.

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `/startup` not recognized | Make sure you're running Claude Code from the repo root. If you just cloned, restart the session. |
| `gh` not found | Install GitHub CLI: `sudo apt install gh` (Ubuntu/WSL) or see [cli.github.com](https://cli.github.com) |
| `gh auth` fails | Run `gh auth login`, choose HTTPS, and authenticate via browser |
| Local preview won't start | Run `npx live-server site --port=3000` from the repo root |
| Site shows blank page | Check that `site/index.html` exists |
| GitHub Pages not deploying | Go to Settings → Pages and set Source to **GitHub Actions** |
| Firebase deploy fails | Run `firebase login` first, make sure `.firebaserc` has your project ID |
| Auth not working | Check that Firebase Auth is enabled and `auth-config.js` has your config values |
| Sidebar not showing | Verify `site/_sidebar.md` exists and has valid markdown links |

## License

MIT — see [LICENSE](LICENSE).

---

Built by [Heatherstone](https://heatherstone.com). Powered by [Docsify](https://docsify.js.org/) and [Claude Code](https://claude.ai/code).
