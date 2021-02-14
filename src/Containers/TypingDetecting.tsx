import React from 'react';

import { fetchText } from '../functions/FetchText';
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

export const TypingDetecting: React.FC<{
  setTypingStats: React.Dispatch<
    React.SetStateAction<{
      typingSpeed: number;
      typingAccuracy: number;
      errorsCount: number;
    }>
  >;
}> = ({ setTypingStats }) => {
  const [text, setText] = useState<string[]>([]);
  const [userCurrentPosition, setUserCurrentPosition] = useState<number>(0);
  const [error, setError] = useState<boolean>(false);

  const [beginTimer, setBeginTimer] = useState<number>(+new Date());
  const [rightCharactersCounter, setRightCharactersCounter] = useState<number>(
    0,
  );
  const [isOpenResultModal, setIsOpenResultModal] = useState<boolean>(false);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState<boolean>(false);

  const {
    currentSpeed,
    typingAccuracy,
    errorsCount,
    countCurrentAccuracy,
    countCurrentSpeed,
    setStatsToDefault,
  } = useStats(beginTimer);

  const letterInput = useRef<HTMLInputElement>(null);

  const setStatesToDefault = (): void => {
    setError(false);
    setUserCurrentPosition(0);
    setText([]);
    setRightCharactersCounter(0);
    setStatsToDefault();
  };

  const getText = async () => {
    const text = await fetchText();
    setText(text.split(''));
  };

  useEffect(() => {
    getText();
  }, []);

  useEffect(() => {
    if (userCurrentPosition === 1) {
      setBeginTimer(+new Date());
    }
  }, [userCurrentPosition]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const letterCode = event.target.value.charCodeAt(0);

    const letter = event.target.value;

    if (letterCode >= 31 && letterCode <= 127)
      if (letter === text[userCurrentPosition]) {
        setError(false);
        setUserCurrentPosition(userCurrentPosition + 1);

        countCurrentSpeed(rightCharactersCounter + 1);
        setRightCharactersCounter(rightCharactersCounter + 1);

        if (userCurrentPosition + 1 === text.length) {
          //set states to default
          setIsOpenResultModal(true);
        }
      } else {
        if (!error) {
          countCurrentAccuracy(text.length);
        }

        setError(true);
      }
    else {
      setIsOpenWarningModal(true);
    }

    event.target.value = '';
  };

  const setSelectionModeOnLetter = (
    index: number,
    currentIndex: number,
  ): 'selected' | 'error' | undefined => {
    if (index === currentIndex && !error) return 'selected';
    else if (index === currentIndex && error) return 'error';
  };

  const setStyledToEnteredLetters = (
    index: number,
    currentIndex: number,
  ): boolean => {
    if (index < currentIndex) return true;
    return false;
  };

  return (
    <Wrapper>
      <WarningLanguageModal
        isOpened={isOpenWarningModal}
        onClose={() => setIsOpenWarningModal(false)}
      />
      <ShowResultsModal
        isOpened={isOpenResultModal}
        onClose={() => {
          setIsOpenResultModal(false);
          setTypingStats({
            typingSpeed: currentSpeed,
            typingAccuracy,
            errorsCount,
          });
          setStatesToDefault();
          getText();
        }}
        stats={{ currentSpeed, typingAccuracy, errorsCount }}
      />
      <InputUserLetter
        autoFocus
        name="userInputLetter"
        onChange={(event) => inputChangeHandler(event)}
        onBlur={() =>
          letterInput && letterInput.current && letterInput.current.focus()
        }
        ref={letterInput}
      />
      <Card>
        <Text>
          {text.map((letter, i) => (
            <TextLetter
              selection={setSelectionModeOnLetter(i, userCurrentPosition)}
              colorType={setStyledToEnteredLetters(i, userCurrentPosition)}
              key={i}
            >
              {letter}
            </TextLetter>
          ))}
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
            getText();
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
