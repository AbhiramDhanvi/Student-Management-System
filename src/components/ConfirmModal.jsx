import { IconWarn } from './Icons.jsx';

export default function ConfirmModal({ student, onConfirm, onCancel }) {
  if (!student) return null;

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="modal">

        <div className="modal-icon"><IconWarn /></div>

        <h3>Remove Student?</h3>
        <p>
          You are about to permanently delete the record for{' '}
          <strong>{student.name}</strong> (Roll No. <strong>{student.rollNo}</strong>).
          This action cannot be undone.
        </p>

        <div className="modal-actions">
          <button className="btn-cancel" onClick={onCancel}>Keep Record</button>
          <button className="btn-danger" onClick={() => onConfirm(student.id)}>Yes, Delete</button>
        </div>

      </div>
    </div>
  );
}
