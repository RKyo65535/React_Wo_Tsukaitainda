import { useRef, useEffect } from "react";

//以前の状態を取得する
export function usePrevious<T>(value: T): T {
  const ref = useRef(value);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
