import { Ref, useRef, useState } from "react";

export const useHover = <T extends HTMLElement>(): [Ref<T>, boolean] => {
  const ref = useRef<T | undefined>(undefined);

  const [isHover, setisHover] = useState(false);

  const handleMouseOver = () => {
    setisHover(true);
  };

  const handleMouseLeave = () => {
    setisHover(false);
  };

  const updateRef = (element: T) => {
    if (ref.current) {
      ref.current.removeEventListener("mouseover", handleMouseOver);
      ref.current.removeEventListener("mouseleave", handleMouseLeave);
    }

    ref.current = element;

    if (ref.current) {
      ref.current.addEventListener("mouseover", handleMouseOver);
      ref.current.addEventListener("mouseleave", handleMouseLeave);
    }

    return ref;
  };

  return [updateRef, isHover];
};
