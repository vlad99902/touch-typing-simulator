import React from 'react';

import styled from 'styled-components';
import { Counter } from '../components/Counter';

interface ICounterContainer {
  typingSpeed: number;
  typingAccuracy: number;
  errorsCount: number;
  margin?: string;
}

export const CountersContainer: React.FC<ICounterContainer> = ({
  typingSpeed,
  typingAccuracy,
  errorsCount,
  margin,
}) => {
  return (
    <CountersPositioning margin={margin}>
      <CounterElement>
        <Counter label="Speed" dataType="ch/min">
          {typingSpeed}
        </Counter>
      </CounterElement>
      <CounterElement>
        <Counter label="Accuracy" dataType="%">
          {typingAccuracy}
        </Counter>
      </CounterElement>
      <CounterElement>
        <Counter label="Errors" dataType="">
          {errorsCount}
        </Counter>
      </CounterElement>
    </CountersPositioning>
  );
};

const CounterElement = styled.div`
  margin-right: 18px;
  :last-child {
    margin-right: 0;
  }
`;

const CountersPositioning = styled.div<{ margin?: string }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  flex-wrap: wrap;

  margin: ${(p) => p.margin};
`;
