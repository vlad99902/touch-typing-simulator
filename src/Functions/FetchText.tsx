export const fetchText = async () => {
  try {
    const res = await fetch(
      'https://baconipsum.com/api/?type=meat-and-filler&sentences=1',
    );
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
