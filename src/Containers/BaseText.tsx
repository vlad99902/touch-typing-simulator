import React from 'react';
import styled from 'styled-components';
import { colors } from '../styles/Colors';
import { Title } from '../styles/Title';

type BaseTextType = {
  userCurrentPosition: number;
  typingError: boolean;
  error: string | null;
  loading: boolean;
  text: string[];
};

export const BaseText: React.FC<BaseTextType> = ({
  userCurrentPosition,
  typingError,
  error,
  loading,
  text,
}) => {
  const setStylesSelectionModeOnLetter = (
    index: number,
    currentIndex: number,
    typingError: boolean,
  ): 'selected' | 'error' | undefined => {
    if (index === currentIndex && !typingError) return 'selected';
    else if (index === currentIndex && typingError) return 'error';
  };

  const setStylesToEnteredLetters = (
    index: number,
    currentIndex: number,
  ): boolean => {
    if (index < currentIndex) return true;
    return false;
  };

  return (
    <Text>
      {!loading ? (
        text.map((letter, i) => (
          <TextLetter
            selection={setStylesSelectionModeOnLetter(
              i,
              userCurrentPosition,
              typingError,
            )}
            colorType={setStylesToEnteredLetters(i, userCurrentPosition)}
            key={i}
          >
            {letter}
          </TextLetter>
        ))
      ) : (
        <Title fw="700" color={colors.$darkGray} fz="22px">
          Loading...
        </Title>
      )}
      {error && (
        <Title fw="700" color={colors.$pink}>
          Error: {error}
        </Title>
      )}
    </Text>
  );
};

const Text = styled.div`
  margin-bottom: 18px;
  user-select: none;
`;

const TextLetter = styled.span<{
  selection?: 'selected' | 'error';
  colorType?: boolean;
}>`
  white-space: pre-wrap;
  font-family: 'JetBrains Mono', monospace;
  ${(p) => {
    if (p.selection === 'selected')
      return `background-color: ${colors.$green}; border-radius: 2px`;
    if (p.selection === 'error')
      return `background-color: ${colors.$pink}; border-radius: 2px`;
  }}
  ${(p) => p.colorType && `color: ${colors.$blue}`};
`;
