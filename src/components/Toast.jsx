import { useEffect } from 'react';
import { IconCheck, IconTrash, IconAlert } from './Icons.jsx';

export default function Toast({ toasts, onRemove }) {
  useEffect(() => {
    if (toasts.length === 0) return;
    const timer = setTimeout(() => onRemove(toasts[0].id), 3500);
    return () => clearTimeout(timer);
  }, [toasts, onRemove]);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-area">
      {toasts.map(t => (
        <div key={t.id} className={`toast t-${t.type}`}>
          {t.type === 'success' && <IconCheck />}
          {t.type === 'deleted' && <IconTrash />}
          {t.type === 'error'   && <IconAlert />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}
