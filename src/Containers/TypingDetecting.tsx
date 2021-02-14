import React from 'react';

import { useEffect } from 'react';
import { useState } from 'react';
import { Card } from '../styles/AppStyles';
import { MainButton } from '../components/MainButton';
import styled from 'styled-components';
import { CountersContainer } from './CountersContainer';
import { WarningLanguageModal } from './modals/WarningLanguageModal';
import { ShowResultsModal } from './modals/ResultsModal';
import { useRef } from 'react';
import { useStats } from '../hooks/useStats';
import { useFetchText } from '../hooks/useFetchText';
import { typingNotEnded } from '../utils/typingDetectingStatus';
import { BaseText } from './BaseText';

export const TypingDetecting: React.FC<{
  setTypingStats: React.Dispatch<
    React.SetStateAction<{
      typingSpeed: number;
      typingAccuracy: number;
      errorsCount: number;
    }>
  >;
}> = ({ setTypingStats }) => {
  const [userCurrentPosition, setUserCurrentPosition] = useState<number>(0);
  const [typingError, setTypingError] = useState<boolean>(false);
  const [showResultModal, setShowResultModal] = useState<boolean>(false);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState<boolean>(false);

  const letterInput = useRef<HTMLInputElement>(null);

  const [result, getNewText] = useFetchText();
  const { text, loading, error } = result;

  const {
    currentSpeed,
    typingAccuracy,
    errorsCount,
    countCurrentAccuracy,
    countCurrentSpeed,
    setStatsToDefault,
  } = useStats(text, userCurrentPosition);

  useEffect(() => {
    getNewText();
  }, []);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const letterCode = event.target.value.charCodeAt(0);
    const letter = event.target.value;

    if (typingNotEnded(userCurrentPosition, text.length))
      if (letterCode >= 31 && letterCode <= 127)
        if (letter === text[userCurrentPosition]) {
          setTypingError(false);
          setUserCurrentPosition(userCurrentPosition + 1);

          countCurrentSpeed(userCurrentPosition + 1);

          if (userCurrentPosition + 1 === text.length) {
            setShowResultModal(true);
          }
        } else {
          if (!typingError) {
            countCurrentAccuracy(text.length);
          }
          setTypingError(true);
        }
      else {
        setIsOpenWarningModal(true);
      }

    event.target.value = '';
  };

  const setStatesToDefault = (): void => {
    setTypingError(false);
    setUserCurrentPosition(0);
    setStatsToDefault();
  };

  const onCloseShowResultModal = (): void => {
    setShowResultModal(false);
    setTypingStats({
      typingSpeed: currentSpeed,
      typingAccuracy,
      errorsCount,
    });
    setStatesToDefault();
    getNewText();
  };

  return (
    <Wrapper>
      <WarningLanguageModal
        isOpened={isOpenWarningModal}
        onClose={() => setIsOpenWarningModal(false)}
      />
      <ShowResultsModal
        isOpened={showResultModal}
        onClose={onCloseShowResultModal}
        stats={{ currentSpeed, typingAccuracy, errorsCount }}
      />
      <InputUserLetter
        autoFocus
        name="userInputLetter"
        onChange={(event) => inputChangeHandler(event)}
        onBlur={() => letterInput?.current?.focus()}
        ref={letterInput}
      />
      <Card>
        <BaseText
          userCurrentPosition={userCurrentPosition}
          typingError={typingError}
          error={error}
          loading={loading}
          text={text}
        />
        <CountersContainer
          typingSpeed={currentSpeed}
          typingAccuracy={typingAccuracy}
          errorsCount={errorsCount}
          margin="0 0 18px"
        />
        <MainButton
          onClick={() => {
            setStatesToDefault();
            getNewText();
          }}
        >
          Restart
        </MainButton>
      </Card>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
`;
const InputUserLetter = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
`;
