# /tabula-update — Update your site with the latest TabulaKit improvements

You are helping a user pull in the latest improvements from the TabulaKit template repository into their forked site. Use friendly, non-technical language. The user may not understand git remotes, merging, or upstream — frame everything as "checking for updates" and "applying improvements."

## Overview

TabulaKit is a template repository at `heatherstoneio/tabulakit` on GitHub. When the user forked it to create their site, they got a snapshot. This skill pulls in improvements made to the template since then — bug fixes, new features, better styling — without overwriting the user's own content.

## Steps

### 1. Check current state

First, make sure the working tree is clean:

```bash
git status
```

If there are uncommitted changes, tell the user:

> You have unsaved changes. Let me publish those first before checking for updates.

Then run `/publish` to save their work before proceeding.

### 2. Set up the upstream connection (first time only)

Check if the upstream remote exists:

```bash
git remote -v
```

If there's no remote named `upstream` pointing to `heatherstoneio/tabulakit`, add it:

```bash
git remote add upstream https://github.com/heatherstoneio/tabulakit.git
```

### 3. Fetch the latest updates

```bash
git fetch upstream main
```

### 4. Check what's new

Compare the user's current state with upstream:

```bash
git log HEAD..upstream/main --oneline
```

If there are no new commits, tell the user:

> You're already up to date! No new improvements available.

And stop here.

If there are updates, summarize them in plain language. Read the commit messages and translate them into user-friendly descriptions. For example:
- "Better mobile support for tables"
- "Improved login screen layout"
- "New diagram support with Mermaid"

### 5. Identify what to update

TabulaKit updates fall into two categories:

**Framework files** (safe to update — these are TabulaKit infrastructure):
- `site/index.html` — the app shell, theme engine, and plugins
- `site/css/tabulakit.css` — framework styles (the main stylesheet)
- `.github/workflows/deploy.yml` — deployment automation
- `firebase.json` — hosting configuration
- `netlify.toml` — hosting configuration
- `.claude/commands/*.md` — skill definitions
- `.claude/settings.json` — Claude Code permissions
- `.claude/CLAUDE.md` — project context
- `.tabulakit/` — template registry and modules

**User content** (never overwrite — this is the user's work):
- `site/README.md` — home page
- `site/_sidebar.md` — navigation
- `site/config.js` — site identity and colors
- `site/auth-config.js` — authentication settings
- `site/css/custom.css` — user style overrides
- `site/*.md` (except README.md at root of templates) — user's documentation pages
- `.firebaserc` — user's Firebase project binding
- `.claude/state/` — session state
- `.tabulakit/config.json` — site-specific settings (preview port, etc.)

### 6. Apply updates selectively

For each changed framework file, check it out from upstream:

```bash
git checkout upstream/main -- <file>
```

Do this for each framework file that has changes. **Never** checkout user content files from upstream.

If `site/index.html` was updated, this is the most impactful change — it contains the Docsify runtime, theme engine, auth gate, and plugins. After applying, verify the user's `config.js` values are still being respected (they should be — config is loaded separately).

### 7. Review and confirm

After applying, run the local preview if it's available to make sure things look right:

```bash
git diff --stat
```

Show the user what was updated in plain language:

> Here's what I updated:
> - The site engine got mobile table support and diagram rendering
> - Deployment configuration was improved
> - New skills are available: /publish
>
> Your pages, navigation, colors, and settings are untouched.

### 8. Save the update

Stage and commit the framework updates:

```bash
git add -A
git commit -m "chore: update TabulaKit framework to latest upstream"
git push
```

Tell the user:

> All done! Your site has been updated with the latest TabulaKit improvements and the changes are being published now.

## Edge cases

**Merge conflicts**: If a file has both upstream changes and user modifications (rare for framework files, but possible if the user edited `index.html` directly), explain the conflict simply:

> There's a conflict in [file] — both TabulaKit and your site changed the same part. Let me resolve this for you.

Then resolve it, preferring the upstream version for framework code.

**User edited index.html**: If the user has custom changes in `index.html`, warn them before overwriting:

> The site engine file (index.html) has been updated upstream, but you also have custom changes in it. The update includes [summary]. I recommend taking the update since your customizations should be in config.js instead. Want me to proceed?

## Tone

- Frame as "checking for updates" like an app update
- No git jargon — no "upstream", "merge", "rebase", "checkout"
- Reassure the user their content is safe
- Be specific about what improved
