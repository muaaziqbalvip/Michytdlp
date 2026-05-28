# MiTV Network - MUSLIM ISLAM

## Vercel ENV Variables

Add These Variables In Vercel:

GH_PAT=YOUR_GITHUB_PAT
GH_OWNER=YOUR_GITHUB_USERNAME
GH_REPO=YOUR_REPOSITORY_NAME
GH_WORKFLOW=yt-dlp-cron.yml

---

## GitHub PAT Permissions

Required Permissions:

actions:write
contents:read
workflows:write

---

## Firebase Database URL

https://ramadan-2385b-default-rtdb.firebaseio.com

---

## API Endpoint

https://michytdlp.vercel.app/api/play

---

## Admin Panel

https://michytdlp.vercel.app

---

## Workflow Logic

1. Admin Saves YouTube URL
2. GitHub Action Fetches Config
3. yt-dlp Extracts Direct URL
4. Firebase Stores Direct Link
5. Vercel API Redirects User
6. API Auto-Wakes GitHub Workflow
7. Workflow Refreshes Every 20 Minutes Forever

---

## Deployment

1. Upload Project To GitHub
2. Import Repo Into Vercel
3. Add ENV Variables
4. Deploy
5. Open Admin Panel
6. Add YouTube URL
7. Start Streaming
