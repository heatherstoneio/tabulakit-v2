# Deploy to Netlify

Netlify connects directly to your GitHub repository and deploys automatically when you push changes — similar to GitHub Pages, but with a few more features like deploy previews for pull requests.

## What You Need to Do Manually

Netlify setup happens in your browser:

### Step 1: Create a Netlify Account

1. Go to [netlify.com](https://www.netlify.com) and sign up (signing in with your GitHub account is easiest)

### Step 2: Connect Your Repository

1. From your Netlify dashboard, click **Add new site** > **Import an existing project**
2. Choose **GitHub** and authorize Netlify if prompted
3. Select your TabulaKit repository
4. Netlify will auto-detect the settings from the included `netlify.toml` — you don't need to change anything
5. Click **Deploy site**

That's it. Netlify will build and deploy your site immediately.

## What Happens Automatically

After the initial setup:

- Every push to `main` triggers a new deploy
- Your site gets a URL like `https://random-name-12345.netlify.app`
- Pull requests get **deploy previews** — a temporary URL so you can see changes before merging

The included `netlify.toml` handles all the technical configuration (publish directory, routing rules) so you don't need to touch any settings in Netlify's dashboard.

## Limitations

- **Public only** — Netlify sites are public by default. Netlify does offer access control, but it's a paid feature. Use [Firebase](deploy-firebase.md) if you need free access control with Google sign-in.

## Advanced: Custom Domain

1. In Netlify, go to **Site settings** > **Domain management** > **Add custom domain**
2. Follow the prompts to verify your domain
3. Netlify can manage your DNS automatically, or you can add a `CNAME` record at your DNS provider pointing to your Netlify URL

## Advanced: Rename Your Site

Don't like the random URL? In Netlify, go to **Site settings** > **Site name** and change it to something like `my-docs.netlify.app`.
