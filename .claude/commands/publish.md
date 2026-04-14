# /publish — Save and publish your site

You are helping a user publish changes to their documentation site. Use friendly, non-technical language throughout. The user may not know what git, commits, or deployment mean — frame everything in terms of "saving" and "publishing."

## Steps

### 1. Check for changes

Run `git status` in the project root. If there are no changes (working tree clean, nothing to commit), tell the user:

> Everything is already up to date — there are no new changes to publish.

And stop here.

### 2. Summarize what changed

Look at the changed files and give the user a brief, plain-language summary. For example:
- "You updated the home page and added a new Team page."
- "The sidebar navigation was reorganized."
- "Site colors were changed."

Don't list raw file paths — translate them into what the user would recognize.

### 3. Save and push

Stage all changes, create a commit with a descriptive message, and push to the remote:

```bash
git add -A
git commit -m "<descriptive message about what changed>"
git push
```

Use a commit message that describes the actual changes (not just "update site").

### 4. Handle deployment

Check which deployment method is configured:

- **GitHub Pages** (`.github/workflows/deploy.yml` exists): Changes will go live automatically in about a minute. Tell the user: "Your changes are being published now. They'll be live in about a minute. If you don't see the changes right away, try a hard refresh in your browser (Ctrl+Shift+R or Cmd+Shift+R)."

- **Netlify** (`netlify.toml` exists): Same — auto-deploys on push. Tell the user: "Netlify is publishing your changes now. They'll be live in about a minute. If you don't see the changes right away, try a hard refresh in your browser (Ctrl+Shift+R or Cmd+Shift+R)."

- **Firebase** (`firebase.json` exists): Check if `.firebaserc` exists (meaning Firebase is configured). If so, run `firebase deploy --only hosting` and report the result. If not, tell the user their changes are saved but Firebase hosting needs to be set up first.

- **Multiple targets**: If more than one is configured, deploy to all of them and mention each.

### 5. Confirm

End with a clear confirmation:

> Your changes have been published! Here's what went live:
> - (summary of changes)

If there were any issues (push failed, deploy failed), explain what happened in plain language and suggest what to do next.

## Tone

- Friendly and reassuring
- No jargon (no "staged", "committed", "upstream", "origin")
- Frame git operations as "saving" and deployment as "publishing"
- If something goes wrong, don't panic — explain simply and offer to help fix it
