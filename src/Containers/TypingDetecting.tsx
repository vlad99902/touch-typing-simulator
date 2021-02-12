import React from 'react';

import { fetchText } from '../Functions/FetchText';
import { useEffect } from 'react';
import { useState } from 'react';
import { Card } from '../Styles/AppStyles';
import { MainButton } from '../Components/MainButton';

import styled from 'styled-components';
import { colors } from '../Styles/Colors';
import { CountersContainer } from './CountersContainer';
import { Modal } from '../Components/Modal';
import { Title } from '../Styles/Title';

export const TypingDetecting: React.FC = () => {
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
  const [isOpenModal, setIsOpenModal] = useState<boolean>(true);

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
    if (event.target.value === text[userCurrentPosition]) {
      setError(false);
      setUserCurrentPosition(userCurrentPosition + 1);
      countCurrentSpeed(rightCharactersCounter + 1);

      if (userCurrentPosition + 1 === text.length) {
        setIsOpenModal(true);
      }
    } else {
      setError(true);
      countCurrentAccuracy();
    }

    event.target.value = '';
  };

  const setSelectionModeOnLetter = (index: number) => {
    if (index === userCurrentPosition && !error) return 'selected';
    else if (index === userCurrentPosition && error) return 'error';
  };

  return (
    <Wrapper>
      <Modal
        isOpened={isOpenModal}
        setIsOpened={() => {
          setIsOpenModal(false);
          getText();
          setStatesToDefault();
        }}
        maxWidth="400px"
      >
        <Title margin="0 0 18px">Great! Your results here!</Title>

        <CountersContainer
          typingSpeed={currentSpeed}
          typingAccuracy={typingAccuracy}
          errorsCount={errorsCount}
          margin="0 0 18px"
        />
      </Modal>
      <InputUserLetter
        autoFocus
        name="userInputLetter"
        onChange={(event) => inputChangeHandler(event)}
      />
      <Card>
        <Text>
          {text.map((letter, i) => (
            <TextLetter selection={setSelectionModeOnLetter(i)} key={i}>
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
            getText();
            setStatesToDefault();
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
}>`
  ${(p) => {
    if (p.selection === 'selected')
      return `background-color: ${colors.$green}; border-radius: 2px`;
    if (p.selection === 'error')
      return `background-color: ${colors.$red}; border-radius: 2px`;
  }}
`;

const InputUserLetter = styled.input`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
`;
