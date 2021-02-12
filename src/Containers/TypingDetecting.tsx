import React from 'react';

import { fetchText } from '../Functions/FetchText';

import { useEffect } from 'react';
import { useState } from 'react';
import { Card } from '../Styles/AppStyles';
import { MainButton } from '../Components/MainButton';

export const TypingDetecting: React.FC = () => {
  const [text, setText] = useState('');

  const getText = async () => {
    const text = await fetchText();
    setText(text);
  };

  useEffect(() => {
    getText();
  }, []);

  return (
    <Card>
      <h1>{text}</h1>
      <MainButton onClick={() => getText()}>RefreshText</MainButton>
    </Card>
  );
};
