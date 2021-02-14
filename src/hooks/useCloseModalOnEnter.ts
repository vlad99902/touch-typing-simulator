import { useEffect } from 'react';

export const useCloseModalOnEnter = (
  isOpened: boolean,
  onClose: () => void,
) => {
  const keyPressEnter = (e: any) => {
    if (e.key === 'Enter') onClose();
  };

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('keypress', keyPressEnter);
    }
    return () => {
      document.removeEventListener('keypress', keyPressEnter);
    };
  }, [isOpened]);
};
