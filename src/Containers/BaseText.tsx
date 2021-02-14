import { useEffect } from 'react';
import styled from 'styled-components';
import { useFetchText } from '../hooks/useFetchText';
import { colors } from '../styles/Colors';

type BaseTextType = {
  userCurrentPosition: number;
  typingError: boolean;
  updateText: boolean;
};

export const BaseText: React.FC<BaseTextType> = ({
  userCurrentPosition,
  typingError,
  updateText,
}) => {
  const [result, getNewText] = useFetchText();
  const { text, loading, error } = result;

  useEffect(() => {
    if (updateText) getNewText();
  }, [updateText]);

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
      {!loading
        ? text.map((letter, i) => (
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
        : 'Loading...'}
    </Text>
  );
};

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
