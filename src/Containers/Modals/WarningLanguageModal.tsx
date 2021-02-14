import React from 'react';
import { MainButton } from '../../components/MainButton';
import { Modal } from '../../components/Modal';
import { useCloseModalOnEnter } from '../../hooks/useCloseModalOnEnter';
import { Title } from '../../styles/Title';

interface IWarningLanguageModal {
  isOpened: boolean;
  onClose: () => void;
}

export const WarningLanguageModal: React.FC<IWarningLanguageModal> = ({
  isOpened,
  onClose,
}) => {
  useCloseModalOnEnter(isOpened, onClose);

  return (
    <Modal
      isOpened={isOpened}
      onClose={() => {
        onClose();
      }}
      maxWidth="400px"
    >
      <Title margin="0 0 18px">
        Please set your keyboard language to English
      </Title>
      <MainButton
        onClick={() => {
          onClose();
        }}
      >
        OK
      </MainButton>
    </Modal>
  );
};
