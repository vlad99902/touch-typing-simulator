export const typingStarted = (enteredLettersCounter: number): boolean =>
  enteredLettersCounter === 1 ? true : false;

export const typing = (
  enteredLettersCounter: number,
  textLength: number,
): boolean =>
  1 < enteredLettersCounter && enteredLettersCounter < textLength
    ? true
    : false;

export const typingNotEnded = (
  enteredLettersCounter: number,
  textLength: number,
): boolean => (enteredLettersCounter < textLength ? true : false);
