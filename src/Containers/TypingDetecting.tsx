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
  const [text, setText] = useState([]);
  const [userCurrentPosition, setUserCurrentPosition] = useState(0);
  const [error, setError] = useState(false);

  const [beginTimer, setBeginTimer] = useState<number>(+new Date());
  const [charactersCounter, setCharactersCounter] = useState(0);
  const [currentSpeed, setCurrentSpeed] = useState(0);

  const setStatesToDefault = (): void => {
    setError(false);
    setUserCurrentPosition(0);
    setText([]);
    setBeginTimer(+new Date());
    setCharactersCounter(0);
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

  const countCurrentSpeed = (
    error: boolean,
    charactersCounter: number,
  ): void => {
    if (!error) {
      const currentTypingTime = +new Date() - beginTimer;
      setCurrentSpeed(
        Math.round(charactersCounter / (currentTypingTime / 1000 / 60)),
      );
    }
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === text[userCurrentPosition]) {
      setUserCurrentPosition(userCurrentPosition + 1);
      setError(false);
      countCurrentSpeed(false, charactersCounter + 1);
    } else {
      setError(true);
      countCurrentSpeed(true, charactersCounter + 1);
    }

    setCharactersCounter(charactersCounter + 1);

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
        <Counter label="Скорость" dataType="зн/мин">
          {currentSpeed}
        </Counter>
        <MainButton
          onClick={() => {
            getText();
            setStatesToDefault();
          }}
        >
          RefreshText
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
