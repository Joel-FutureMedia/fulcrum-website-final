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
SMTP config: { host, port, secure, user, from, to }
SMTP connection verified successfully
```

If SMTP verification fails, check your environment variables and that the host allows outbound connections on port 465. Many cloud hosts block SMTP ports.

When a form is submitted, logs will show:

```
[send-email] Submission received { applicant, email }
[send-email] Email sent successfully
```

Or on failure:

```
[send-email] Failed to send email: ...
```

The form now shows an error to the user if sending fails (it no longer reports success before the email is actually sent).

## Email Template

Submitted form data is formatted into a professional black-and-white HTML email via `src/utils/emailTemplate.js`, with:

- Header: company name on black background
- Body: structured table with labels and values
- Footer: auto-generated timestamp
