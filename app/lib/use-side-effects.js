import React, { useState, useEffect } from 'react'

// const sideEffects=useSideEffects()
// ...
// sideEffects.push(()=>console.info("side effect")) // will get executed after function runs but before dom update
//

export function useSideEffects(cleanup) {
  const [sideEffects] = useState([])
  useEffect(() => {
    while (sideEffects.length) sideEffects.shift()()
  }, [sideEffects.length])
  return sideEffects
}

export default useSideEffects
