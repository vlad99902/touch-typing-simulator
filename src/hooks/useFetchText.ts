import { fetchText } from '../api/fetchText';

import { useState } from 'react';

export const useFetchText = (): [
  { text: string[]; loading: boolean; error: string | null },
  () => Promise<any>,
] => {
  const [text, setText] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getNewText = async () => {
    setLoading(true);
    try {
      const response = await fetchText('meat-and-filler', 1);
      const text = await response.json();

      if (!response.ok) {
        throw new Error(text.message || 'Something wrong in fetch');
      }

      setText(text[0].split(''));
      setError(null);
      return text;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return [{ text, loading, error }, getNewText];
};
