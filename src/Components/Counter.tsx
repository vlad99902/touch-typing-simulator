import React from 'react';
import styled from 'styled-components';
import { colors } from '../Styles/Colors';

interface ICounter {
  children: number;
  label: string;
  dataType: string;
}

export const Counter: React.FC<ICounter> = ({ children, label, dataType }) => {
  return (
    <>
      <LabelText>{label}</LabelText>
      <div>
        <CounterValue>{children}</CounterValue>
        <CounterDataType>{dataType}</CounterDataType>
      </div>
    </>
  );
};

const LabelText = styled.h2`
  color: ${colors.$darkGray};
  font-size: 18px;
  font-weight: 500;
`;

const CounterValue = styled.span`
  color: ${colors.$purple};
  font-size: 32px;
  font-weight: 700;

  margin-right: 8px;
`;

const CounterDataType = styled.span`
  color: ${colors.$black};
  font-size: 22px;
  font-weight: 500;
`;
