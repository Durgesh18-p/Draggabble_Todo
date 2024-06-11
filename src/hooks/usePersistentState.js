import { useState, useEffect } from 'react';
import localforage from 'localforage';

const usePersistentState = (defaultState, key) => {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    localforage.getItem(key).then((savedState) => {
      if (savedState) setState(savedState);
    });
  }, [key]);

  useEffect(() => {
    localforage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
};

export default usePersistentState;
