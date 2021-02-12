import { colors } from './Colors';
import styled from 'styled-components';

type ContainerPropsType = {
  maxWidth?: string;
  padding?: string;
  pos?: 'center';
  posInner?: 'center';
};

export const Container = styled.div<ContainerPropsType>`
  max-width: ${(props) => props.maxWidth || '800px'};
  padding: ${(props) => props.padding || '0 16px'};
  ${(props) => (props.pos ? 'margin: 0 auto' : 'margin: 0')};
  ${(props) => {
    if (props.posInner === 'center')
      return 'display: flex; justify-content: center; align-items: center';
  }};
`;

export const Card = styled.div`
  background-color: ${colors.$white};
  border-radius: 16px;
  padding: 20px;

  box-shadow: 0px 8px 29px rgba(0, 0, 0, 0.4);
`;
