import React, { useEffect } from 'react';
import { MainButton } from '../../components/MainButton';
import { Modal } from '../../components/Modal';
import { Title } from '../../styles/Title';

interface IWarningLanguageModal {
  isOpened: boolean;
  setIsOpened: (value: boolean) => void;
}

export const WarningLanguageModal: React.FC<IWarningLanguageModal> = ({
  isOpened,
  setIsOpened,
}) => {
  const keyPressEnter = (e: any) => {
    if (e.key === 'Enter') setIsOpened(false);
  };

  useEffect(() => {
    if (isOpened) {
      document.addEventListener('keypress', keyPressEnter);
    }
    return () => {
      document.removeEventListener('keypress', keyPressEnter);
    };
  }, [isOpened]);

  return (
    <Modal
      isOpened={isOpened}
      setIsOpened={() => {
        setIsOpened(false);
      }}
      maxWidth="400px"
    >
      <Title margin="0 0 18px">
        Please set your keyboard language to English
      </Title>
      <MainButton
        onClick={(event) => {
          setIsOpened(false);
        }}
      >
        OK
      </MainButton>
    </Modal>
  );
};
