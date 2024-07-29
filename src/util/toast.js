import { toast } from 'react-toastify';

export const showToast = (message, type) => {
  let toastType = 'info';
  switch (type) {
    case 'error':
      toastType = toast.TYPE.ERROR;
      break;
    case 'success':
      toastType = toast.TYPE.SUCCESS;
      break;
    case 'warning':
      toastType = toast.TYPE.WARNING;
      break;
    case 'info':
      toastType = toast.TYPE.INFO;
      break;
  }

  toast(message || "Something wen't wrong please try again later.", {
    type: toastType,
    autoClose: true,
    theme: 'colored',
    position: 'bottom-right',
    hideProgressBar: true,
  });
};
