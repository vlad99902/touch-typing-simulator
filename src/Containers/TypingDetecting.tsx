import React from 'react';

import { useEffect } from 'react';
import { useState } from 'react';
import { Card } from '../styles/AppStyles';
import { MainButton } from '../components/MainButton';

import styled from 'styled-components';
import { colors } from '../styles/Colors';
import { CountersContainer } from './CountersContainer';

import { WarningLanguageModal } from './modals/WarningLanguageModal';
import { ShowResultsModal } from './modals/ResultsModal';
import { useRef } from 'react';
import { useStats } from '../hooks/useStats';
import { useFetchText } from '../hooks/useFetchText';

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

  const [isOpenResultModal, setIsOpenResultModal] = useState<boolean>(false);
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
    setBeginTimer,
  } = useStats();

  useEffect(() => {
    getNewText();
  }, []);

  useEffect(() => {
    if (userCurrentPosition === 1) {
      setBeginTimer(+new Date());
    }
  }, [userCurrentPosition]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const letterCode = event.target.value.charCodeAt(0);
    const letter = event.target.value;

    if (userCurrentPosition < text.length)
      if (letterCode >= 31 && letterCode <= 127)
        if (letter === text[userCurrentPosition]) {
          setTypingError(false);
          setUserCurrentPosition(userCurrentPosition + 1);
          countCurrentSpeed();

          if (userCurrentPosition + 1 === text.length) {
            setIsOpenResultModal(true);
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

  const setSelectionModeOnLetter = (
    index: number,
    currentIndex: number,
    typingError: boolean,
  ): 'selected' | 'error' | undefined => {
    if (index === currentIndex && !typingError) return 'selected';
    else if (index === currentIndex && typingError) return 'error';
  };

  const setStyledToEnteredLetters = (
    index: number,
    currentIndex: number,
  ): boolean => {
    if (index < currentIndex) return true;
    return false;
  };

  const setStatesToDefault = (): void => {
    setTypingError(false);
    setUserCurrentPosition(0);
    setStatsToDefault();
  };

  const onCloseShowResultModal = (): void => {
    const endsSpeed = currentSpeed;
    setIsOpenResultModal(false);
    setTypingStats({
      typingSpeed: endsSpeed,
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
        isOpened={isOpenResultModal}
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
        <Text>
          {!loading
            ? text.map((letter, i) => (
                <TextLetter
                  selection={setSelectionModeOnLetter(
                    i,
                    userCurrentPosition,
                    typingError,
                  )}
                  colorType={setStyledToEnteredLetters(i, userCurrentPosition)}
                  key={i}
                >
                  {letter}
                </TextLetter>
              ))
            : 'Loading'}
        </Text>

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

const Text = styled.p`
  margin-bottom: 18px;

  user-select: none;
`;

const TextLetter = styled.span<{
  selection?: 'selected' | 'error';
  colorType?: boolean;
}>`
  font-family: 'JetBrains Mono', monospace;
  ${(p) => {
    if (p.selection === 'selected')
      return `background-color: ${colors.$green}; border-radius: 2px`;
    if (p.selection === 'error')
      return `background-color: ${colors.$red}; border-radius: 2px`;
  }}
  ${(p) => p.colorType && `color: ${colors.$blue}`};
`;

const InputUserLetter = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  opacity: 0;
`;
