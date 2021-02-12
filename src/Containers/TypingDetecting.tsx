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

  const getText = async () => {
    const text = await fetchText();

    setUserCurrentPosition(0);
    setText(text.split(''));
  };

  useEffect(() => {
    getText();
  }, []);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === text[userCurrentPosition]) {
      setUserCurrentPosition(userCurrentPosition + 1);
      setError(false);
    } else {
      setError(true);
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
        <Counter label="Скорость" dataType="зн/мин">
          {1}
        </Counter>
        <MainButton onClick={() => getText()}>RefreshText</MainButton>
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
