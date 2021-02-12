import { useState } from 'react';

export const useStats = (startTimer: number) => {
  const [beginTimer] = useState<number>(startTimer);

  const [currentSpeed, setCurrentSpeed] = useState<number>(0);

  const [typingAccuracy, setTypingAccuracy] = useState<number>(100);
  const [errorsCount, setErrorsCount] = useState<number>(0);

  const countCurrentSpeed = (charactersCounter: number): void => {
    setCurrentSpeed(
      Math.round(charactersCounter / ((+new Date() - beginTimer) / 1000 / 60)),
    );
  };

  const countCurrentAccuracy = (error: boolean, text: string): void => {
    if (!error) {
      setErrorsCount(errorsCount + 1);
      setTypingAccuracy(+(typingAccuracy - (1 / text.length) * 100).toFixed(2));
    }
  };

  return [
    currentSpeed,
    typingAccuracy,
    errorsCount,
    countCurrentAccuracy,
    countCurrentSpeed,
  ];
};
