import { useState, useEffect } from 'react';

export const useStats = (startTimer: number) => {
  const [beginTimer, setBeginTimer] = useState<number>(startTimer);
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [typingAccuracy, setTypingAccuracy] = useState<number>(100);
  const [errorsCount, setErrorsCount] = useState<number>(0);

  useEffect(() => {
    setBeginTimer(startTimer);
  }, [startTimer]);

  const setStatsToDefault = (): void => {
    setCurrentSpeed(0);
    setTypingAccuracy(100);
    setErrorsCount(0);
  };

  const countCurrentSpeed = (charactersEnteredCounter: number): void => {
    const currentTime = +new Date();
    setCurrentSpeed(
      Math.round(
        charactersEnteredCounter / ((currentTime - beginTimer) / 1000 / 60),
      ),
    );
  };

  const countCurrentAccuracy = (textLength: number): void => {
    setErrorsCount(errorsCount + 1);
    setTypingAccuracy(
      parseFloat((typingAccuracy - (1 / textLength) * 100).toFixed(2)),
    );
  };

  return {
    currentSpeed,
    typingAccuracy,
    errorsCount,
    countCurrentAccuracy,
    countCurrentSpeed,
    setStatsToDefault,
  };
};
