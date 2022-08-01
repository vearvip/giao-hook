import { useState, useEffect, useRef } from 'react'

declare module 'giao-hook'

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

export function useAsyncGetState(initState?: any) {
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