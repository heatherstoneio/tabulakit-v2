# Hands-On Workshop

## Overview

This is the core hands-on session. You'll build and deploy your own documentation site using TabulaKit and Claude Code.

## What You'll Build

By the end of this workshop, you'll have:
- A configured documentation site with your own name and theme
- Content tailored to your needs
- A live site deployed to the internet

## Exercises

### Exercise 1: Setup Your Site

1. Open your forked TabulaKit repo in Claude Code
2. Run `/startup`
3. Follow the wizard to configure your site name, theme, and deployment target

> **This is the recursive part:** You're using TabulaKit to learn about TabulaKit. The site you're building right now was built the same way.

### Exercise 2: Add Content

1. Ask Claude Code to add a new page about a topic you choose
2. Watch how it creates the file and updates the sidebar
3. Preview your site locally: `npx live-server site --port=3000`

### Exercise 3: Customize

Try asking Claude Code to:
- Change your theme color
- Add a section header to the sidebar
- Rearrange your navigation
- Add an image or table to a page

### Exercise 4: Deploy

Follow the deployment guide for your chosen target:
- [GitHub Pages](deploy-github-pages.md) — enable in Settings, push, done
- [Firebase](deploy-firebase.md) — create project, deploy
- [Netlify](deploy-netlify.md) — connect repo, auto-deploys

### Exercise 5: Explore (Bonus)

If you finish early:
- Try a different template
- Customize the CSS in `index.html`
- Add a custom Claude Code skill in `.claude/commands/`

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `/startup` not recognized | Make sure you're in the repo root, not a subfolder |
| Local preview won't start | Run `npx live-server site --port=3000` from the repo root |
| Site shows blank page | Check that `site/index.html` exists and isn't corrupted |
| Deploy failed | Check the deployment guide for your target — manual setup steps may be needed |

## Next Steps

After the workshop:
- Keep building on your site
- Explore the [Claude Code setup guide](claude-code-setup.md) for more capabilities
- Share your site with others!
