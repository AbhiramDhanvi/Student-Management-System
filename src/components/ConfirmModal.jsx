import { IconWarning } from './Icons.jsx';

export default function ConfirmModal({ student, onConfirm, onCancel }) {
  if (!student) return null;

  return (
    <div
      className="modal-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      onClick={(e) => e.target === e.currentTarget && onCancel()}
    >
      <div className="modal">

        <div className="modal__icon" aria-hidden="true">
          <IconWarning />
        </div>

        <h2 id="modal-title" className="modal__title">Remove Student?</h2>

        <p id="modal-desc" className="modal__text">
          You are about to permanently delete the record for{' '}
          <strong>{student.name}</strong>{' '}
          (Roll No. <strong>{student.rollNo}</strong>).{' '}
          This action cannot be undone.
        </p>

        <div className="modal__actions">
          <button
            id="modal-cancel-btn"
            className="btn-cancel"
            onClick={onCancel}
            autoFocus
          >
            Keep Record
          </button>
          <button
            id="modal-confirm-btn"
            className="btn-danger"
            onClick={() => onConfirm(student.id)}
          >
            Yes, Delete
          </button>
        </div>

      </div>
    </div>
  );
}
