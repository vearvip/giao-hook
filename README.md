# @vearvip/giao-hook

组件功能描述

## Install

```bash
$ npm i @vearvip/giao-hook --save
```

## Usage
```jsx
import React, { useEffect, useState } from 'react'
import { useAsyncGetState } from '@vearvip/giao-hook' 

function App() {
  const [count1, setCount1, getCount1] = useAsyncGetState(10)
  const [count2, setCount2] = useState(0)

  async function changeCount1() {
    await setCount1(count1 + 1)
  }
  function changeCount2() {
    setCount2(getCount1() * 10)
  }

  useEffect(() => {
    changeCount1()
    changeCount2()
  }, [])

  return (
    <div> 
      <h2>count1: { count1 }</h2>
      <h2>count2: { count2 }</h2> 
    </div>
  );
}

export default App;
``` 
