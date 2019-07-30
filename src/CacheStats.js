import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import compact from 'lodash/compact'
import map from 'lodash/map'
import size from 'lodash/size'
import Label from './lib/ui/Label'

export default () => {
  const client = useApolloClient()

  const [cache, setCache] = useState()

  useEffect(() => {
    const interval = setInterval(() => {
      const newCache = { ...client.store.cache.data.data }
      if (size(cache) !== size(newCache)) {
        setCache(newCache)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [cache, client.store.cache.data.data])

  console.log('cache:', cache)

  const cachedUsers = compact(
    map(cache, (obj, key) => key.indexOf('users') === 0 && obj.name),
  )

  return (
    <div>
      <Label>Cached users:</Label>
      <div style={{ marginTop: '10px' }}>{cachedUsers.join(', ')}</div>
    </div>
  )
}
