import React from 'react';

import { fetchText } from '../Functions/FetchText';
import { useEffect } from 'react';
import { useState } from 'react';
import { Card } from '../Styles/AppStyles';
import { MainButton } from '../Components/MainButton';
import { Counter } from '../Components/Counter';
import styled from 'styled-components';
import { colors } from '../Styles/Colors';

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

  const setStatesToDefault = (): void => {
    setError(false);
    setUserCurrentPosition(0);
    setText([]);
    setBeginTimer(+new Date());
    setRightCharactersCounter(0);
    setCurrentSpeed(0);
  };

  const getText = async () => {
    const text = await fetchText();
    setUserCurrentPosition(0);
    setText(text.split(''));
  };

  useEffect(() => {
    getText();
  }, []);

  const countCurrentSpeed = (charactersCounter: number): void => {
    setRightCharactersCounter(charactersCounter + 1);
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
      setUserCurrentPosition(userCurrentPosition + 1);
      setError(false);
      countCurrentSpeed(rightCharactersCounter + 1);
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
        <CountersPositioning>
          <CounterElement>
            <Counter label="Скорость" dataType="зн/мин">
              {currentSpeed}
            </Counter>
          </CounterElement>
          <CounterElement>
            <Counter label="Точность" dataType="%">
              {typingAccuracy}
            </Counter>
          </CounterElement>
          <CounterElement>
            <Counter label="Ошибок" dataType="">
              {errorsCount}
            </Counter>
          </CounterElement>
        </CountersPositioning>
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

const CountersPositioning = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 18px;
`;

const CounterElement = styled.div`
  margin-right: 18px;
  :last-child {
    margin-right: 0;
  }
`;
