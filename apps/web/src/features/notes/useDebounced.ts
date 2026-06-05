import { useEffect, useRef } from "react";

export function useDebounced<T>(value: T, ms: number, onFire: (v: T) => void) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => onFire(value), ms);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [value, ms, onFire]);
}
