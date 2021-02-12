import React from 'react';
import { Container } from '../Styles/AppStyles';
import { TypingDetecting } from '../Containers/TypingDetecting';

export const MainPage: React.FC = () => {
  return (
    <Container pos="center" padding="102px 18px 0">
      <TypingDetecting />
    </Container>
  );
};
