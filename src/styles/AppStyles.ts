import { colors } from './Colors';
import styled from 'styled-components';

type ContainerPropsType = {
  maxWidth?: string;
  margin?: string;
  padding?: string;
  pos?: 'center';
  posInner?: 'center';
};

export const Container = styled.div<ContainerPropsType>`
  max-width: ${(props) => props.maxWidth || '800px'};
  padding: ${(props) => props.padding || '0 16px'};
  margin: ${(props) => props.margin};
  ${(props) => props.pos && 'margin: 0 auto'};
  ${(props) => {
    if (props.posInner === 'center')
      return 'display: flex; justify-content: center; align-items: center';
  }};
`;

export const Card = styled.div`
  background-color: ${colors.$white};
  border-radius: 16px;
  padding: 20px;

  box-shadow: 0px 8px 29px 5px rgba(130, 130, 130, 0.15);
`;
