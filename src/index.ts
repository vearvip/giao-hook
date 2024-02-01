import { useState, useEffect, useRef } from 'react'

export function useCallbackState(initState) {
  const callbackRef = useRef();
  const [data, setData] = useState(initState);

  useEffect(() => {
    callbackRef.current && callbackRef.current(data);
  }, [data]);

  return [
    data,
    function (value, callback) {
      callbackRef.current = callback;
      setData(value);
    }
  ];
}

export function useAsyncGetState(initState) {
  const dataRef = useRef(initState);
  const [data, setData] = useCallbackState(initState);

  return [
    data,
    function (arg, callback) {
      return new Promise((resolve) => {
        if (typeof arg === 'function') {
          dataRef.current = arg(data)
          setData(arg(data), (_data) => resolve(_data))
          callback && callback(arg(data))
        } else {
          dataRef.current = arg
          setData(arg, (_data) => resolve(_data))
          callback && callback(arg)
        }
      })
    },
    () => dataRef.current
  ];
} 

export const useSignal = (initialState) => {
  const [state, setState] = useState(initialState)
  const stateRef = useRef(initialState)

  const getState = () => stateRef.current

  const editState = (newState) => {
    setState(newState)

    if (typeof newState === 'function'){
      stateRef.current = newState(stateRef.current)
    } else {
      stateRef.current = newState
    } 
  }

  return [state, editState, getState]
}