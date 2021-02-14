export const fetchText = async () => {
  try {
    const res = await fetch(
      'https://baconipsum.com/api/?type=meat-and-filler&sentences=1',
    );
    const text = await res.json();
    return text[0];
  } catch (error) {
    console.log(error);
  }
};
