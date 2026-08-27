import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-md w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-white shrink-0" />,
          warning: <AlertTriangle className="w-5 h-5 text-white shrink-0" />,
          error: <XCircle className="w-5 h-5 text-white shrink-0" />,
          info: <Info className="w-5 h-5 text-white shrink-0" />
        };

        return (
          <div
            key={toast.id}
            className="pointer-events-auto liquid-glass border border-white/20 p-4 rounded-xl shadow-2xl flex items-start gap-3 transform transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
          >
            {icons[toast.type || 'info']}
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-white">{toast.title}</h4>
              <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-white transition-colors p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
