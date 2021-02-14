export const typingNotStarted = (enteredLettersCounter: number): boolean =>
  enteredLettersCounter === 0 ? true : false;
export const typingStarted = (enteredLettersCounter: number): boolean =>
  enteredLettersCounter === 1 ? true : false;
export const typingEnded = (
  enteredLettersCounter: number,
  textLength: number,
): boolean => (enteredLettersCounter === textLength ? true : false);
export const typing = (
  enteredLettersCounter: number,
  textLength: number,
): boolean =>
  1 < enteredLettersCounter && enteredLettersCounter < textLength
    ? true
    : false;
