import React from 'react';
import { Card } from '../styles/AppStyles';
import { Title } from '../styles/Title';
import { CountersContainer } from './CountersContainer';

export const InfoCard: React.FC<{
  typingStats: {
    typingSpeed: number;
    typingAccuracy: number;
    errorsCount: number;
  };
}> = ({ typingStats }) => {
  return (
    <Card>
      <Title margin="0 0 12px">Information</Title>
      <p>
        If you are ready please start typing. Don't forget to set your keyboard
        language to English.
      </p>
      <Title margin="12px 0">Last result</Title>
      {typingStats.typingSpeed === 0 &&
      typingStats.typingAccuracy === 0 &&
      typingStats.errorsCount === 0 ? (
        <h2>Please enter text for the fist time</h2>
      ) : (
        <CountersContainer
          typingSpeed={typingStats.typingSpeed}
          typingAccuracy={typingStats.typingAccuracy}
          errorsCount={typingStats.errorsCount}
        />
      )}
    </Card>
  );
};
