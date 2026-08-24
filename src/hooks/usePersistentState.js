import { useState, useEffect, useRef } from 'react';

const PREFIX = 'skc:';

function readStorage(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    // Storage unavailable (private mode, quota, etc.) — app still works, just won't persist.
  }
}

/**
 * Drop-in replacement for useState that persists to localStorage per device.
 * Works entirely client-side, so it's safe for a static PWA with no backend.
 */
export function usePersistentState(key, initialValue) {
  const isFirst = useRef(true);
  const [state, setState] = useState(() => readStorage(key, initialValue));

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    writeStorage(key, state);
  }, [key, state]);

  return [state, setState];
}
