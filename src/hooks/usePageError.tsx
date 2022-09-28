import { useEffect, useState } from 'react';

type THook = (initialError: string) => [string, React.Dispatch<string>];

export const usePageError: THook = (initialError) => {
  const [error, setError] = useState(initialError);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timerId = setTimeout(() => {
      setError('');
    }, 3000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timerId);
    };
  }, [error]);

  return [error, setError];
};
