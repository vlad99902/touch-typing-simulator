import React from 'react';
import { Container } from '../Styles/AppStyles';
import { TypingDetecting } from '../Containers/TypingDetecting';
import { InfoCard } from '../Containers/InfoCard';
import styled from 'styled-components';

export const MainPage: React.FC = () => {
  return (
    <Container pos="center" padding="132px 18px 60px">
      <MainPageSection>
        <TypingDetecting />
      </MainPageSection>
      <MainPageSection>
        <InfoCard />
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
