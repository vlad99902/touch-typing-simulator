import React from 'react';
import { Card } from '../Styles/AppStyles';
import { Title } from '../Styles/Title';
import { CountersContainer } from './CountersContainer';

export const InfoCard: React.FC = () => {
  return (
    <Card>
      <Title margin="0 0 12px">Information</Title>
      <p>
        If you are ready to start please start typing. Don't forget to set your
        keyboard language to English.
      </p>
      <Title margin="12px 0">Last result</Title>
      <div>
        <CountersContainer
          typingSpeed={0}
          typingAccuracy={100}
          errorsCount={0}
        />
      </div>
    </Card>
  );
};
