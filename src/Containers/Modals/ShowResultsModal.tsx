import React from 'react';
import { Modal } from '../../Components/Modal';
import { Title } from '../../Styles/Title';
import { CountersContainer } from '../CountersContainer';

interface IWarningLanguageModal {
  isOpened: boolean;
  setIsOpened: () => void;
  countersInfo: { [key: string]: any };
}

export const ShowResultsModal: React.FC<IWarningLanguageModal> = ({
  isOpened,
  setIsOpened,
  countersInfo,
}) => {
  return (
    <Modal isOpened={isOpened} setIsOpened={setIsOpened} maxWidth="400px">
      <Title margin="0 0 18px">Great! Your results here!</Title>

      <CountersContainer
        typingSpeed={countersInfo.currentSpeed}
        typingAccuracy={countersInfo.typingAccuracy}
        errorsCount={countersInfo.errorsCount}
        margin="0 0 18px"
      />
    </Modal>
  );
};
