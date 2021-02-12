import React, { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import { colors } from '../Styles/Colors';

interface IMainButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const MainButton: React.FC<IMainButton> = ({ children, ...rest }) => {
  return <StyledButton {...rest}>{children}</StyledButton>;
};

const StyledButton = styled.button`
  background-color: ${colors.$pink};
  color: ${colors.$white};
  cursor: pointer;
  user-select: none;
  border: none;
  font-family: 'Alegreya Sans';
  padding: 10px 15px;
  border-radius: 18px;
  font-size: 18px;
  :last-child {
    margin-right: 0;
  }
`;
