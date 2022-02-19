import { useLayoutEffect, useState } from "react";

const useWindowSize = () => {
  const [size, setSize] = useState(0);
  const [bool, setBool] = useState(false);
  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
      if (size <= 639) {
        setBool(true);
      } else {
        setBool(false);
      }
    };
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, [size]);
  return { bool, size };
};

export default useWindowSize;
