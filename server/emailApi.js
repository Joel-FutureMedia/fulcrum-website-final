import { sendApplicationEmail } from './sendApplicationEmail.js';

export async function handleSendEmail(formData) {
  if (!formData || typeof formData !== 'object') {
    throw new Error('Invalid form data');
  }

  await sendApplicationEmail(formData);
  return { success: true, message: 'Email sent successfully' };
}
