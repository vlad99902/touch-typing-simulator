import { typing, typingStarted } from './../utils/typingDetectingStatus';
import { useState, useEffect, useCallback } from 'react';

export const useStats = (text: string[], userCurrentPosition: number) => {
  const [beginTimer, setBeginTimer] = useState<number>(+new Date());
  const [currentSpeed, setCurrentSpeed] = useState<number>(0);
  const [typingAccuracy, setTypingAccuracy] = useState<number>(100);
  const [errorsCount, setErrorsCount] = useState<number>(0);

  const setStatsToDefault = (): void => {
    setCurrentSpeed(0);
    setTypingAccuracy(100);
    setErrorsCount(0);
  };

  useEffect(() => {
    if (typingStarted(userCurrentPosition)) {
      setBeginTimer(+new Date());
    }
    const intervalPtr = setInterval(countCurrentSpeedCallback, 1000);
    return () => clearInterval(intervalPtr);
  }, [userCurrentPosition]);

  const countCurrentSpeedCallback = useCallback(() => {
    if (typing(userCurrentPosition, text.length))
      return countCurrentSpeed(userCurrentPosition);
  }, [userCurrentPosition]);

  const countCurrentSpeed = (userCurrentPosition: number): void => {
    const currentTime = +new Date();
    setCurrentSpeed(
      Math.round(
        (userCurrentPosition + 1) / ((currentTime - beginTimer) / 1000 / 60),
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
