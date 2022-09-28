import { useEffect, useState } from 'react';

type THook = (initialMessage: string) => [string, React.Dispatch<string>];

export const usePageSuccess: THook = (initialMessage) => {
  const [success, setSuccess] = useState(initialMessage);

  useEffect(() => {
    if (!success) {
      return;
    }

    const timerId = setTimeout(() => {
      setSuccess('');
    }, 3000);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(timerId);
    };
  }, [success]);

  return [success, setSuccess];
};
