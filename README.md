<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/temp/1

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to Vercel

1. Push your project to a Git repository (e.g., GitHub, GitLab).
2. Import your project into Vercel.
3. During the project setup in Vercel, add an Environment Variable:
    - **Name:** `GEMINI_API_KEY`
    - **Value:** Paste your Gemini API key here.
4. Deploy. Your app will be deployed and accessible with a public URL.
