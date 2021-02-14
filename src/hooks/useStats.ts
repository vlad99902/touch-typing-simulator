import { useState, useEffect, useCallback } from 'react';

export const useStats = () => {
  const [beginTimer, setBeginTimer] = useState<number>(+new Date());
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [typingAccuracy, setTypingAccuracy] = useState<number>(100);
  const [errorsCount, setErrorsCount] = useState<number>(0);
  const [rightCharactersCounter, setRightCharactersCounter] = useState<number>(
    0,
  );

  const setStatsToDefault = (): void => {
    setCurrentSpeed(0);
    setTypingAccuracy(100);
    setErrorsCount(0);
    setRightCharactersCounter(0);
  };

  const countCurrentSpeed = (): void => {
    const currentTime = +new Date();
    setCurrentSpeed(
      Math.round(
        (rightCharactersCounter + 1) / ((currentTime - beginTimer) / 1000 / 60),
      ),
    );
    setRightCharactersCounter(rightCharactersCounter + 1);
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
    setBeginTimer,
  };
};
