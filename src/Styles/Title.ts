import styled from 'styled-components';

type TitleTypes = {
  fz?: string;
  ff?: 'Alegreya Sans';
  fw?: '100' | '300' | '400' | '500' | '700' | '800' | '900';
  color?: string;
  mb?: string;
};

export const Title = styled.h1<TitleTypes>`
  font-size: ${(props) => props.fz || '24px'};
  font-family: ${(props) =>
    props.ff || 'font-family: "Alegreya Sans", sans-serif'};
  font-weight: ${(props) => props.fw || 400};
  color: ${(props) => props.color};
  margin-bottom: ${(props) => props.mb};
`;
