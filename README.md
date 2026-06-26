# Fulcrum Venture Studio — React

A React conversion of the Fulcrum Venture Studio website, preserving the original design, layout, and behavior.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Runs the site and email API together on http://localhost:3014. Do not use `vite` directly — the form needs the Node server for `/api/send-email`.

## Production

```bash
npm run build
npm start
```

Serves the site and email API on http://localhost:3014.

## Docker

Build the image:

```bash
docker build -t fulcrum-website .
```

Run the container (maps port 3014 on your machine to port 3014 in the container):

```bash
docker run -d -p 3014:3014 --name fulcrum-website fulcrum-website
```

Optional SMTP overrides:

```bash
docker run -d -p 3014:3014 --name fulcrum-website \
  -e SMTP_HOST=mail.fulcrum.com.na \
  -e SMTP_PORT=465 \
  -e SMTP_SECURE=true \
  -e SMTP_USER=build@fulcrum.com.na \
  -e SMTP_PASS=your-password \
  -e SMTP_FROM=build@fulcrum.com.na \
  -e SMTP_TO=build@fulcrum.com.na \
  fulcrum-website
```

Open [http://localhost:3014](http://localhost:3014).

Stop and remove:

```bash
docker stop fulcrum-website
docker rm fulcrum-website
```

Use any host port you prefer, e.g. `-p 8080:3014` to access it on port 8080.

## Project Structure

```
fulcrum_website/
├── assets/                  # Original assets (preserved)
├── public/
│   └── assets/              # Static assets served at /assets/
├── src/
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Footer.jsx
│   │   ├── HeroCanvas.jsx
│   │   └── pages/
│   │       ├── HomePage.jsx
│   │       ├── AboutPage.jsx
│   │       ├── TeamPage.jsx
│   │       ├── InvestorsPage.jsx
│   │       └── ApplyPage.jsx
│   ├── hooks/
│   │   └── useScrollFade.js
│   ├── utils/
│   │   ├── sendEmail.js     # SMTP form submission
│   │   └── emailTemplate.js # HTML email template
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Form Submission

The apply form posts to `/api/send-email`, which sends mail via SMTP (`mail.fulcrum.com.na`) using **nodemailer** on the same Node server that serves the site in production/Docker. In development, Vite proxies the same endpoint.

**Important:** The form will not work if you deploy only the `dist/` static files. You must run the Node server (`npm start` or the Docker image).

SMTP settings can be overridden with environment variables:

- `SMTP_HOST` (default: `mail.fulcrum.com.na`)
- `SMTP_PORT` (default: `465`)
- `SMTP_SECURE` (default: `true`; set `false` for port `587`)
- `SMTP_USER` / `SMTP_PASS` / `SMTP_FROM` / `SMTP_TO`

### Troubleshooting email in production

On server startup you should see:

```
[mail] Resolved mail.fulcrum.com.na -> x.x.x.x
[mail] TCP port 465: reachable
SMTP connection ready: { profile, port, host }
```

#### Why it works locally but not when deployed

Your **local machine can reach** `mail.fulcrum.com.na` on port 465. Many **cloud hosts block outbound SMTP** (ports 465 and 587) to prevent spam. That causes `ETIMEDOUT` — the connection never completes. This is a network/hosting restriction, not a bug in the form code.

Startup logs will show which ports are blocked:

```
[mail] TCP port 465: blocked (ETIMEDOUT)
[mail] TCP port 587: blocked (ETIMEDOUT)
```

#### How to fix it

**Option A — Deploy on fulcrum hosting (recommended)**

Run the Node app on the **same server or network** as `mail.fulcrum.com.na`. Then set:

```env
SMTP_HOST=127.0.0.1
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=build@fulcrum.com.na
SMTP_PASS=your-mailbox-password
SMTP_FROM=build@fulcrum.com.na
SMTP_TO=build@fulcrum.com.na
```

**Option B — Use a VPS that allows outbound SMTP**

Deploy on a VPS (not Railway/Render-style platforms that block SMTP) where ports 465/587 are open.

**Option C — Pass SMTP env vars at deploy time**

When using Docker, pass credentials at runtime (they are not baked into the image):

```bash
docker run -d -p 3014:3014 \
  -e SMTP_HOST=mail.fulcrum.com.na \
  -e SMTP_PORT=465 \
  -e SMTP_SECURE=true \
  -e SMTP_USER=build@fulcrum.com.na \
  -e SMTP_PASS=your-password \
  -e SMTP_FROM=build@fulcrum.com.na \
  -e SMTP_TO=build@fulcrum.com.na \
  fulcrum-website
```

When a form is submitted, logs will show:

```
[send-email] Submission received { applicant, email }
[send-email] Sent via SMTP configured (port 465) messageId=...
```

The form shows an error to the user if sending fails.

## Email Template

Submitted form data is formatted into a professional black-and-white HTML email via `src/utils/emailTemplate.js`, with:

- Header: company name on black background
- Body: structured table with labels and values
- Footer: auto-generated timestamp
