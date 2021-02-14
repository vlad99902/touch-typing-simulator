import React from 'react';
import { Modal } from '../../components/Modal';
import { useCloseModalOnEnter } from '../../hooks/useCloseModalOnEnter';
import { Title } from '../../styles/Title';
import { CountersContainer } from '../CountersContainer';

type WarningLanguageModal = {
  isOpened: boolean;
  onClose: () => void;
  stats: { [key: string]: any };
};

export const ShowResultsModal: React.FC<WarningLanguageModal> = ({
  isOpened,
  onClose,
  stats,
}) => {
  useCloseModalOnEnter(isOpened, onClose);

  return (
    <Modal isOpened={isOpened} onClose={onClose} maxWidth="400px">
      <Title margin="0 0 18px">Great! Your results here!</Title>

      <CountersContainer
        typingSpeed={stats.currentSpeed}
        typingAccuracy={stats.typingAccuracy}
        errorsCount={stats.errorsCount}
        margin="0 0 18px"
      />
    </Modal>
  );
};
