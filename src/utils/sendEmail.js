/**
 * Sends the apply form to the project email API, which delivers via SMTP.
 *
 * @param {Object} formData
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export async function sendEmail(formData) {
  const response = await fetch('/api/send-email', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });

  let data;
  try {
    data = await response.json();
  } catch {
    throw new Error('Failed to send email');
  }

  if (!response.ok || !data.success) {
    if (response.status === 404) {
      throw new Error('Email service is not available. Restart the server with npm run dev or npm start.');
    }
    throw new Error(data.message || 'Failed to send email');
  }

  return data;
}
