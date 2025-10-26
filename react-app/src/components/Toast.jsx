import { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    
    return () => clearTimeout(timer);
  }, [duration, onClose]);
  
  return (
    <div className={`toast toast-${type}`} role="alert">
      <span>{message}</span>
      <button 
        onClick={onClose} 
        className="toast-close"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

export default Toast;

