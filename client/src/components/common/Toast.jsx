import { useToast } from '../../context/ToastContext';

const Toast = () => {
  const { toasts, removeToast } = useToast();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'info':
        return 'ℹ';
      default:
        return 'ℹ';
    }
  };

  const getColors = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`${getColors(
            toast.type
          )} px-6 py-3 rounded-lg shadow-lg flex items-center gap-3 min-w-[300px] animate-slide-in`}
        >
          <span className="text-xl font-bold">{getIcon(toast.type)}</span>
          <p className="flex-1">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-white hover:text-gray-200 transition-colors"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;