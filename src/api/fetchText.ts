export const fetchText = async (type: string, senteces: number) =>
  await fetch(`https://baconipsum.com/api/?type=${type}&sentences=${senteces}`);
