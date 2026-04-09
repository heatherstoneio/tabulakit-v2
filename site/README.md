# TabulaKit

TabulaKit is a template for building documentation sites with zero build step. You fork it, configure it with an AI assistant, and deploy it — no coding required.

It's built on [Docsify](https://docsify.js.org/) (a markdown-to-website engine) and [Claude Code](https://claude.ai/code) (an AI coding assistant that understands your project and can make changes for you).

## What You'll Build

A live documentation website that:

- Renders markdown files as a polished, searchable site
- Deploys automatically when you push changes
- Can be customized by talking to Claude Code in plain English
- Supports templates for different use cases (blank, mission planning, course/workshop)

## Before the Workshop

To hit the ground running on workshop day, please complete these setup steps. They take about 10 minutes.

### 1. Create a GitHub Account

If you don't have one, sign up at [github.com/signup](https://github.com/signup). GitHub is where your site's code will live.

### 2. Install VS Code

Download and install [Visual Studio Code](https://code.visualstudio.com/). This is the editor we'll use during the workshop.

**Windows users:** You'll also need WSL (Windows Subsystem for Linux). Open PowerShell as Administrator and run:
```
wsl --install
```
Restart your computer when prompted, then open VS Code and install the **WSL** extension from the Extensions panel.

### 3. Install the Claude Code Extension

In VS Code, go to the Extensions panel (the square icon in the left sidebar) and search for **Claude Code**. Install it. You'll need a Claude account — sign up at [claude.ai](https://claude.ai) if you don't have one.

### 4. Verify It Works

Open VS Code, launch Claude Code (look for it in the bottom panel or command palette), and try typing "hello". If Claude responds, you're ready.

That's it for prep. Everything else happens at the workshop.

## At the Workshop

On workshop day, we'll walk through the [Getting Started](getting-started.md) guide together. You'll paste a single prompt into Claude Code and it will set up your entire site — creating a GitHub repository, installing tools, and configuring everything. Then we'll customize it, add content, and deploy it live.

## Explore

- [Getting Started](getting-started.md) — Full setup walkthrough (we'll do this together at the workshop, or go ahead if you're feeling adventurous)
- **Deployment Guides** — [GitHub Pages](deploy-github-pages.md) · [Firebase](deploy-firebase.md) · [Netlify](deploy-netlify.md)
- [Claude Code Setup](claude-code-setup.md) — How Claude Code works with TabulaKit
