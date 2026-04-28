import React, { createContext, useState, type ReactNode, useCallback } from 'react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextData {
  addToast: (message: string, type: ToastType) => void;
}

export const ToastContext = createContext<ToastContextData>({} as ToastContextData);

let nextId = 0;

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((message: string, type: ToastType) => {
    const id = nextId++;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        left: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        zIndex: 9999
      }}>
        {toasts.map((t) => {
          let bgColor = '#333';
          if (t.type === 'success') bgColor = '#1ed760';
          if (t.type === 'error') bgColor = '#e22134';
          if (t.type === 'info') bgColor = '#2e77d0';

          return (
            <div key={t.id} style={{
              backgroundColor: bgColor,
              color: '#fff',
              padding: '12px 24px',
              borderRadius: '8px',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              animation: 'slideIn 0.3s ease-out'
            }}>
              {t.message}
            </div>
          );
        })}
      </div>
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
        `}
      </style>
    </ToastContext.Provider>
  );
};
