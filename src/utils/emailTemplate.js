function escapeHtml(text) {
  if (!text || !String(text).trim()) return '—';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function formatTimestamp() {
  return new Date().toLocaleString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

function buildRows(fields) {
  return fields
    .map(
      (field) => `
        <tr>
          <td style="padding:14px 20px;border-bottom:1px solid #ebebeb;font-size:12px;font-weight:600;color:#000000;width:38%;vertical-align:top;line-height:1.55;letter-spacing:0.02em;">
            ${escapeHtml(field.label)}
          </td>
          <td style="padding:14px 20px;border-bottom:1px solid #ebebeb;font-size:14px;font-weight:400;color:#1a1a1a;width:62%;vertical-align:top;line-height:1.65;white-space:pre-wrap;">
            ${escapeHtml(field.value)}
          </td>
        </tr>`
    )
    .join('');
}

function sectionBlock(title, fields) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;border:1px solid #000000;border-collapse:collapse;">
      <tr>
        <td colspan="2" style="background-color:#000000;padding:12px 20px;">
          <p style="margin:0;font-size:11px;font-weight:600;color:#ffffff;letter-spacing:0.14em;text-transform:uppercase;">
            ${escapeHtml(title)}
          </p>
        </td>
      </tr>
      ${buildRows(fields)}
    </table>`;
}

export function buildApplicationEmailHtml(formData) {
  const contactFields = [
    { label: 'Full name', value: formData.fullName },
    { label: 'Email address', value: formData.email },
    { label: 'Phone number', value: formData.phone },
  ];

  const applicationFields = [
    {
      label: 'Problem / opportunity identification',
      value: formData.problemIdentification,
    },
    {
      label: 'Current business structure',
      value: formData.businessStructure,
    },
    {
      label: 'Current customers',
      value: formData.customers,
    },
  ];

  const timestamp = formatTimestamp();
  const applicantName = formData.fullName?.trim() || 'Applicant';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Application — Fulcrum Venture Studio</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f0f0;font-family:'Segoe UI',Arial,Helvetica,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f0f0;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:680px;background-color:#ffffff;border:1px solid #d4d4d4;">
          <tr>
            <td style="background-color:#000000;padding:36px 40px;text-align:center;border-bottom:3px solid #ffffff;">
              <p style="margin:0 0 8px;font-size:11px;font-weight:600;color:#b0b0b0;letter-spacing:0.18em;text-transform:uppercase;">
                Fulcrum Venture Studio
              </p>
              <h1 style="margin:0;font-size:24px;font-weight:700;color:#ffffff;letter-spacing:-0.01em;line-height:1.2;">
                New Application
              </h1>
              <p style="margin:14px 0 0;font-size:14px;font-weight:400;color:#d8d8d8;line-height:1.5;">
                Submission from ${escapeHtml(applicantName)}
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px 12px;">
              <p style="margin:0 0 28px;font-size:15px;color:#333333;line-height:1.7;">
                A new application has been submitted through the website. Details are below.
              </p>
              ${sectionBlock('Contact details', contactFields)}
              ${sectionBlock('Application responses', applicationFields)}
            </td>
          </tr>
          <tr>
            <td style="background-color:#000000;padding:22px 40px;text-align:center;">
              <p style="margin:0 0 6px;font-size:12px;color:#ffffff;font-weight:400;letter-spacing:0.04em;">
                Generated automatically from website form
              </p>
              <p style="margin:0;font-size:11px;color:#888888;font-weight:400;">
                ${escapeHtml(timestamp)}
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
