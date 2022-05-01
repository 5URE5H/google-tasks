import { MutableRefObject, Ref, useRef, useState } from "react";

export const useFocus = <T extends HTMLTextAreaElement>(): [
  Ref<T>,
  boolean,
  MutableRefObject<T | undefined>
] => {
  const ref = useRef<T | undefined>(undefined);

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const updateRef = (element: T) => {
    if (ref.current) {
      ref.current.removeEventListener("focus", handleFocus);
      ref.current.removeEventListener("blur", handleBlur);
    }

    ref.current = element;

    if (ref.current) {
      ref.current.addEventListener("focus", handleFocus);
      ref.current.addEventListener("blur", handleBlur);
    }

    return ref;
  };

  return [updateRef, isFocused, ref];
};
