import { useEffect, useState } from 'react';

function useTimeout(timeout: number) {
  const [expired, setExpired] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setExpired(true), timeout);
    return () => clearTimeout(timer);
  }, [timeout]);

  return expired;
}

export default useTimeout;
