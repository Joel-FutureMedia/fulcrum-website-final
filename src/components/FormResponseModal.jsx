import { useEffect } from 'react';

export default function FormResponseModal({ status, onClose }) {
  useEffect(() => {
    if (!status) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [status, onClose]);

  if (!status) return null;

  const isSuccess = status.type === 'success';

  return (
    <div className="form-modal-overlay" onClick={onClose} role="presentation">
      <div
        className={`form-modal${isSuccess ? ' form-modal-success' : ' form-modal-error'}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-modal-title"
        aria-describedby="form-modal-message"
      >
        <span className="form-modal-eyebrow">{isSuccess ? 'Sent' : 'Unable to send'}</span>
        <h2 id="form-modal-title" className="form-modal-title">
          {isSuccess ? 'Application received' : 'Something went wrong'}
        </h2>
        <p id="form-modal-message" className="form-modal-message">
          {status.message}
        </p>
        <button type="button" className="apply-btn form-modal-btn" onClick={onClose}>
          {isSuccess ? 'Close' : 'Try again'}
        </button>
      </div>
    </div>
  );
}
