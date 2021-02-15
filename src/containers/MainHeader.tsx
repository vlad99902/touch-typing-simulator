import React from 'react';
import { Container } from '../styles/AppStyles';
import styled from 'styled-components';

import { Title } from '../styles/Title';
import { colors } from '../styles/Colors';

export const MainHeader: React.FC = () => {
  return (
    <Wrapper>
      <Container pos="center" padding="22px 18px">
        <Title fw="500" color={colors.$white}>
          Touch typing simulator
        </Title>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: ${colors.$purple};

  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`;
