import { typing } from './../utils/typingDetectingStatus';
import { useState, useEffect, useCallback } from 'react';

export const useStats = (text: string[]) => {
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

  const countCurrentSpeedCallback = useCallback(() => {
    if (typing(rightCharactersCounter, text.length))
      return countCurrentSpeed(rightCharactersCounter);
  }, [rightCharactersCounter]);

  useEffect(() => {
    const interval = setInterval(countCurrentSpeedCallback, 1000);
    return () => clearInterval(interval);
  }, [rightCharactersCounter]);

  const countCurrentSpeed = (rightCharactersCount: number): void => {
    console.log(rightCharactersCount);
    const currentTime = +new Date();
    setCurrentSpeed(
      Math.round(
        (rightCharactersCount + 1) / ((currentTime - beginTimer) / 1000 / 60),
      ),
    );
    // setRightCharactersCounter(rightCharactersCount + 1);
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
    rightCharactersCounter,
    setRightCharactersCounter,
    countCurrentAccuracy,
    countCurrentSpeed,
    setStatsToDefault,
    setBeginTimer,
  };
};
