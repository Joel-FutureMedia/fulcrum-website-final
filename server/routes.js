import { handleSendEmail } from './emailApi.js';

function logEmailError(err) {
  console.error('[send-email] Failed to send email:', err.message);
  if (err.code) console.error('[send-email] Error code:', err.code);
  if (err.response) console.error('[send-email] SMTP response:', err.response);
  if (err.stack) console.error(err.stack);
}

export function registerEmailRoute(app) {
  app.post('/api/send-email', async (req, res) => {
    const formData = req.body;

    console.log('[send-email] Submission received', {
      applicant: formData?.fullName?.trim() || '(no name)',
      email: formData?.email?.trim() || '(no email)',
    });

    if (!formData || typeof formData !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid form data',
      });
    }

    try {
      await handleSendEmail(formData);
      console.log('[send-email] Email sent successfully');
      return res.json({ success: true, message: 'Application received' });
    } catch (err) {
      logEmailError(err);
      return res.status(500).json({
        success: false,
        message: 'Failed to send email. Please try again later.',
      });
    }
  });
}
