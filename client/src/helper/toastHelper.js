import { toast } from 'react-toastify';

const ToastHelper = {
  success: (message) => {
    toast.success(message);
  },
  error: (message) => {
    toast.error(message);
  }
};

export default ToastHelper;