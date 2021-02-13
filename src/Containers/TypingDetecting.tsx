import React from 'react';

import { fetchText } from '../Functions/FetchText';
import { useEffect } from 'react';
import { useState } from 'react';
import { Card } from '../Styles/AppStyles';
import { MainButton } from '../Components/MainButton';

import styled from 'styled-components';
import { colors } from '../Styles/Colors';
import { CountersContainer } from './CountersContainer';

import { WarningLanguageModal } from './Modals/WarningLanguageModal';
import { ShowResultsModal } from './Modals/ShowResultsModal';

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
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);

  const [typingAccuracy, setTypingAccuracy] = useState<number>(100);
  const [errorsCount, setErrorsCount] = useState<number>(0);
  const [isOpenResultModal, setIsOpenResultModal] = useState<boolean>(false);
  const [isOpenWarningModal, setIsOpenWarningModal] = useState<boolean>(false);

  const setStatesToDefault = (): void => {
    setError(false);
    setUserCurrentPosition(0);
    setText([]);
    setBeginTimer(+new Date());
    setRightCharactersCounter(0);
    setCurrentSpeed(0);
    setTypingAccuracy(100);
    setErrorsCount(0);
  };

  const getText = async () => {
    const text = await fetchText();
    setText(text.split(''));
  };

  useEffect(() => {
    getText();
  }, []);

  const countCurrentSpeed = (charactersCounter: number): void => {
    setRightCharactersCounter(rightCharactersCounter + 1);
    setCurrentSpeed(
      Math.round(charactersCounter / ((+new Date() - beginTimer) / 1000 / 60)),
    );
  };

  const countCurrentAccuracy = () => {
    if (!error) {
      setErrorsCount(errorsCount + 1);
      setTypingAccuracy(+(typingAccuracy - (1 / text.length) * 100).toFixed(2));
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const letterCode = event.target.value.charCodeAt(0);
    if (userCurrentPosition === 0) setBeginTimer(+new Date());
    if (letterCode >= 31 && letterCode <= 127)
      if (event.target.value === text[userCurrentPosition]) {
        setError(false);
        setUserCurrentPosition(userCurrentPosition + 1);
        countCurrentSpeed(rightCharactersCounter + 1);

        if (userCurrentPosition + 1 === text.length) {
          setIsOpenResultModal(true);
        }
      } else {
        setError(true);
        countCurrentAccuracy();
      }
    else {
      setIsOpenWarningModal(true);
    }

    event.target.value = '';
  };

  const setSelectionModeOnLetter = (index: number) => {
    if (index === userCurrentPosition && !error) return 'selected';
    else if (index === userCurrentPosition && error) return 'error';
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
        setIsOpened={setIsOpenWarningModal}
      />
      <ShowResultsModal
        isOpened={isOpenResultModal}
        setIsOpened={() => {
          setIsOpenResultModal(false);
          setTypingStats({
            typingSpeed: currentSpeed,
            typingAccuracy,
            errorsCount,
          });
          setStatesToDefault();
          getText();
        }}
        countersInfo={{ currentSpeed, typingAccuracy, errorsCount }}
      />
      <InputUserLetter
        autoFocus
        name="userInputLetter"
        onChange={(event) => inputChangeHandler(event)}
      />
      <Card>
        <Text>
          {text.map((letter, i) => (
            <TextLetter
              selection={setSelectionModeOnLetter(i)}
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
  word-spacing: 3px;
`;

const Text = styled.p`
  margin-bottom: 18px;

  user-select: none;
`;

const TextLetter = styled.span<{
  selection?: 'selected' | 'error';
  colorType?: boolean;
}>`
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
