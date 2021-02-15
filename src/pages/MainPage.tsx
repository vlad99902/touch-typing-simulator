import React, { useState } from 'react';
import { Container } from '../styles/AppStyles';
import { TypingDetecting } from '../containers/TypingDetecting';
import { InfoCard } from '../containers/InfoCard';
import styled from 'styled-components';

export const MainPage: React.FC = () => {
  const [typingStats, setTypingStats] = useState<{
    typingSpeed: number;
    typingAccuracy: number;
    errorsCount: number;
  }>({
    typingSpeed: 0,
    typingAccuracy: 0,
    errorsCount: 0,
  });

  return (
    <Container pos="center" padding="132px 18px 60px">
      <MainPageSection>
        <TypingDetecting setTypingStats={setTypingStats} />
      </MainPageSection>
      <MainPageSection>
        <InfoCard typingStats={typingStats} />
      </MainPageSection>
    </Container>
  );
};

const MainPageSection = styled.div`
  margin-bottom: 48px;
  :last-child {
    margin-bottom: 0;
  }
`;
