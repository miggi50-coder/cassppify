# CAASPPify

Three tools for Integrated Math 3 teachers, in one app with a tab for each:

1. **Worksheet CAASPPify** — paste or upload a worksheet, get each problem matched to a CAASPP item type, override and regenerate any problem, export a student worksheet and answer key.
2. **Topic Practice Generator** — pick a lesson from the full Integrated 3 scope and sequence (26 modules, 82 lessons, pulled from the district's licensed HMH table of contents), choose how many problems, get an original practice set in CAASPP formats.
3. **Performance Task Builder** — pick up to five standards or topics, choose how many questions, get a full connected Performance Task built the way real Smarter Balanced math tasks are: a stimulus grounded in an actual data table and/or graph (not just narrative text), a task set building in difficulty that references that data, and a final extended response question with a rubric.

All three share the same backend function and the same API key, so nothing extra needs setting up per tool.

This is the deployable version: a small React app plus a backend function that calls Claude on your behalf, so your API key never sits in the browser.

## What you need before you start

1. **A GitHub account**, to hold this code.
2. **A Vercel account** (free tier is fine), to host the site. Sign up at
   vercel.com, you can log in with your GitHub account directly.
3. **An Anthropic Console account and API key**, separate from your Claude.ai
   login. Go to console.anthropic.com, create an account if you don't have
   one, and generate an API key under Settings > API Keys.

## Before you deploy: set a spending limit

Since you're trying this out to see real costs, do this first. In the
Anthropic Console, go to Settings > Billing, and set a monthly spend limit
and/or a usage alert. That way, if something behaves unexpectedly (a bug, a
runaway script, unexpectedly heavy use), you get capped or notified instead
of surprised. This takes two minutes and is worth doing before your first
real deploy.

## Step 1: Push this project to GitHub

1. Create a new, empty repository on GitHub (public or private, either
   works).
2. From this folder, run:
   ```
   git init
   git add .
   git commit -m "Initial CAASPPify app"
   git branch -M main
   git remote add origin <your-new-repo-url>
   git push -u origin main
   ```

## Step 2: Deploy to Vercel

1. Go to vercel.com, click "Add New" > "Project".
2. Import the GitHub repository you just created.
3. Vercel will auto-detect this as a Vite project. Leave the default build
   settings as they are.
4. Before clicking Deploy, add an Environment Variable:
   - Name: `ANTHROPIC_API_KEY`
   - Value: the API key you generated in the Anthropic Console
5. Click Deploy. In about a minute you'll get a live URL like
   `caasppify.vercel.app`.

That URL is what you share with teachers. No accounts needed on their end.

## Step 3: Try it and watch the cost

Use the tool yourself a few times, then check actual cost in the Anthropic
Console under Usage or Billing. It updates with a short delay, not
instantly, so give it a little time after testing before you look.

For reference, the model this uses (Claude Sonnet 5) is priced at $2 per
million input tokens and $10 per million output tokens as of this writing.
A typical worksheet conversion (5 to 10 problems) is a small fraction of a
cent to a few cents, since worksheet text is short. Actual cost depends on
how much text you send and how often the convert/regenerate buttons get
used, so treat this as a rough expectation to check your real numbers
against, not a guarantee.

## About the built-in rate limit

`api/convert.js` includes a basic per-visitor rate limit (12 requests per
minute) as a guardrail against something looping or misbehaving. It is
**not** an access gate, and it resets whenever the serverless function
cold-starts, so don't rely on it as a hard cap. It's a safety net, not a
budget control. Your spend limit in the Anthropic Console is the real
control.

## Making changes later

- Edit `src/App.jsx` for anything about the tool's behavior or design.
- Edit `api/convert.js` for anything about how requests reach Anthropic.
- Push changes to GitHub, Vercel redeploys automatically.

## If you ever want to switch to Azure Foundry instead

If your district provisions a Claude deployment through Microsoft Foundry
under your Azure Enterprise Agreement, `api/convert.js` would need its
target URL and auth changed to point at your Foundry resource endpoint
instead of `api.anthropic.com`, using the resource's own API key. Come back
and I can make that change once you have the resource endpoint, key, and
deployment name from your Azure admin.
