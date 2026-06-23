import { useEffect } from 'react';
import { IconCheck, IconTrash, IconAlert } from './Icons.jsx';

export default function Toast({ toasts, onRemove }) {
  useEffect(() => {
    if (toasts.length === 0) return;
    // Auto-remove oldest toast after 3.5s
    const timer = setTimeout(() => {
      onRemove(toasts[0].id);
    }, 3500);
    return () => clearTimeout(timer);
  }, [toasts, onRemove]);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" role="status" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`} role="alert">
          <span className="toast__icon">
            {toast.type === 'success' && <IconCheck />}
            {toast.type === 'deleted' && <IconTrash />}
            {toast.type === 'error'   && <IconAlert />}
          </span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
