import React, { useState, useEffect } from 'react'
import { counterEmitter } from './lib/network/counterLink'
import Label from './lib/ui/Label'

export default () => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    counterEmitter.on('newCount', setCount)

    return () => counterEmitter.off('newCount', setCount)
  }, [])

  return (
    <div>
      <Label>Number of network requests:</Label> {count}
    </div>
  )
}
