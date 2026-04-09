# How Do I...?

The short answer to most of these is: **just tell Claude Code what you want in plain English.** You don't need to know where settings live or how to write code. Describe what you want to change and the AI will handle the rest.

Here are some common things people want to do, with example prompts you can copy and paste.

---

## How do I make the site look different?

Tell Claude Code what you want to change. You can be as vague or specific as you like:

- *"Make the site look more professional"*
- *"Change the colors to match my company brand — our colors are navy blue and gold"*
- *"Make the headings bigger"*
- *"I want a lighter background, more of a cream color"*
- *"Make it look like [describe a site you like]"*

Claude Code knows where all the style settings live and will make the changes for you. If you don't like the result, just say *"undo that"* or *"try something else."*

---

## How do I add a new page?

- *"Add a new page called Meeting Notes"*
- *"Create a page for our company policies"*
- *"Add a FAQ page with some common questions about our product"*

Claude Code will create the file, add it to the sidebar navigation, and even draft some starter content if you describe what the page is about.

---

## How do I change what's in the sidebar?

- *"Add a section header called 'Resources' to the sidebar"*
- *"Move the FAQ page to the top of the sidebar"*
- *"Remove the About page from the navigation"*
- *"Reorganize the sidebar to group pages by topic"*

---

## How do I add content from something I already have?

If you have existing documents — Word files, PDFs, Google Docs, emails, notes — you can ask Claude Code to work with them:

- *"Here's the text from our employee handbook. Turn it into pages on this site."*
- *"I have a spreadsheet of contacts. Can you create a contacts page from this data?"*
- Copy and paste text directly into the chat: *"Turn this into a page called Project Timeline"*

---

## How do I change the font size?

- *"Make the text bigger"*
- *"The font is too small, can you increase it?"*
- *"Set the font size to 18px"*

---

## How do I change my site's name or description?

- *"Change the site name to 'Acme Operations Hub'"*
- *"Update the description to 'Internal documentation for Acme Corp'"*

---

## How do I deploy my changes?

If you're using **GitHub Pages** or **Netlify**, changes deploy automatically when you push. Just tell Claude Code:

- *"Push my changes"*
- *"Deploy the site"*

If you're using **Firebase**:

- *"Deploy to Firebase"*

---

## How do I add an image?

Put the image file in the `site/` folder (you can drag and drop it into VS Code), then tell Claude Code:

- *"Add the logo.png image to the home page"*
- *"Put a banner image at the top of the About page"*

---

## How do I add a table?

- *"Add a table to the roster page with columns for Name, Role, and Phone"*
- *"Create a comparison table for our three service tiers"*

---

## How do I restrict who can see my site?

If you deployed with Firebase, you can add authentication:

- *"Set up the site so only people with @ourcompany.com email addresses can access it"*
- *"Add these email addresses to the allowed list: alice@example.com, bob@example.com"*

See the [Firebase deployment guide](deploy-firebase.md) for details.

---

## How do I undo something?

- *"Undo the last change"*
- *"Go back to how it was before"*
- *"I don't like that, revert it"*

Because all your changes are tracked in GitHub, nothing is ever permanently lost. Claude Code can always go back.

---

## How do I get help when something breaks?

Describe what's wrong in plain language:

- *"The site is showing a blank page"*
- *"The sidebar disappeared"*
- *"I'm getting an error when I try to deploy"*
- *"Something looks weird on the home page"*

Claude Code can read the error messages, check the files, and fix most issues automatically. If it can't fix something, it will explain what's wrong and what your options are.

---

## What if I want to do something not listed here?

Just ask. Claude Code understands your entire project and can handle most requests. The worst that happens is it tells you something isn't possible and suggests an alternative. Some examples of things people don't think to ask for:

- *"Create a printable version of the checklist page"*
- *"Add a 'last updated' date to the bottom of every page"*
- *"Make the home page show a summary of what's changed recently"*
- *"Set up a page that shows a QR code people can scan to reach this site"*
