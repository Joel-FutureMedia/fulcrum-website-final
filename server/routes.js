import { handleSendEmail } from './emailApi.js';

export function registerEmailRoute(app) {
  app.post('/api/send-email', (req, res) => {
    const formData = req.body;

    if (!formData || typeof formData !== 'object') {
      return res.status(400).json({
        success: false,
        message: 'Invalid form data',
      });
    }

    res.json({ success: true, message: 'Application received' });

    handleSendEmail(formData).catch((err) => {
      console.error('Background email error:', err);
    });
  });
}
