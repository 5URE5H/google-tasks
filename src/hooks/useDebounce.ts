import { useEffect, useRef, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [text, setText] = useState(value);

  const ref = useRef<any>(undefined);

  useEffect(() => {
    if (ref.current) {
      clearTimeout(ref.current);
    }

    const timeout = setTimeout(() => {
      setText(value);
    }, delay);

    ref.current = timeout;
  }, [value, delay]);

  return text;
};
