import { useState } from 'react';
import Footer from '../Footer';
import FormResponseModal from '../FormResponseModal';
import { sendEmail } from '../../utils/sendEmail';

const INITIAL_FORM = {
  fullName: '',
  email: '',
  phone: '',
  problemIdentification: '',
  businessStructure: '',
  customers: '',
};

export default function ApplyPage({ isActive }) {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(field) {
    return (e) => setFormData((prev) => ({ ...prev, [field]: e.target.value }));
  }

  function closeModal() {
    setStatus(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    try {
      await sendEmail({ ...formData });
      setFormData(INITIAL_FORM);
      setStatus({
        type: 'success',
        message:
          'Your application has been sent. We review every submission and respond where there is a fit.',
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message || 'Failed to send your application. Please try again.',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div id="page-apply" className={`page${isActive ? ' active' : ''}`}>
      <div className="investors-hero" style={{ paddingBottom: '60px' }}>
        <span className="eyebrow">Apply to build with us</span>
        <h1 style={{ fontSize: 'clamp(2rem,4vw,3.2rem)', marginBottom: '24px' }}>
          Tell us what you are working on.
        </h1>
        <p style={{ color: 'var(--muted)' }}>
          All fields are optional. The quality of what is written — and what is left unanswered
          — is itself signal.
        </p>
      </div>

      <div style={{ padding: '72px 6% 100px', maxWidth: '680px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                type="text"
                placeholder="Your name"
                value={formData.fullName}
                onChange={handleChange('fullName')}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange('email')}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                type="tel"
                placeholder="+264"
                value={formData.phone}
                onChange={handleChange('phone')}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="problemIdentification">
              How did you identify the problem or opportunity you are working on?
            </label>
            <span className="field-hint">Walk us through your thinking.</span>
            <textarea
              id="problemIdentification"
              rows={5}
              value={formData.problemIdentification}
              onChange={handleChange('problemIdentification')}
              />
          </div>

          <div className="form-group">
            <label htmlFor="businessStructure">
              What does your current business structure look like?
            </label>
            <span className="field-hint">
              For example: registered company, co-founders, team members, existing agreements.
              If nothing is formalised yet, tell us where you are.
            </span>
            <textarea
              id="businessStructure"
              rows={5}
              value={formData.businessStructure}
              onChange={handleChange('businessStructure')}
              />
          </div>

          <div className="form-group">
            <label htmlFor="customers">Do you currently have customers?</label>
            <span className="field-hint">
              Tell us how many, who they are, and how you found them.
            </span>
            <textarea
              id="customers"
              rows={5}
              value={formData.customers}
              onChange={handleChange('customers')}
              />
          </div>

          <button type="submit" className="apply-btn" disabled={submitting}>
            {submitting ? 'Sending…' : 'Send it'}
          </button>

          <span className="contact-note" style={{ display: 'block', marginTop: '20px' }}>
            We review every submission. We respond to the ones where there is a fit.
          </span>
        </form>
      </div>

      <Footer />

      <FormResponseModal status={status} onClose={closeModal} />
    </div>
  );
}
