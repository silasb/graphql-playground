import React, { useState } from 'react'
import ConnectedUserList from './users/ConnectedUserList'
import CacheStats from './CacheStats'
import compact from 'lodash/compact'
import NetworkStats from './NetworkStats'
import Mike from './users/Mike'

const useToggle = () => {
  const [toggleState, setToggleState] = useState(false)
  return [toggleState, () => setToggleState(prev => !prev)]
}

const Toggle = ({ value, onChange, title }) => (
  <label style={{ display: 'block' }}>
    <input type="checkbox" {...{ onChange, value }} />
    {title}
  </label>
)

export default () => {
  const [shouldShowInactive, toggleShowInactive] = useToggle()
  const [shouldFilterFriends, toggleFilterFriends] = useToggle()
  const [shouldShowMike, toggleShowMike] = useToggle()

  const showInactiveCondition = shouldShowInactive
    ? ''
    : `inactive: { _neq: true }`

  return (
    <>
      <h1>GraphQL Demo</h1>
      <Toggle
        onChange={toggleShowInactive}
        value={shouldShowInactive}
        title="Show inactive users"
      />
      <Toggle
        onChange={toggleFilterFriends}
        value={shouldFilterFriends}
        title="Only show friends that have the letter 'a' (lowercase) in their name"
      />
      <br />

      <ConnectedUserList
        usersCondition={showInactiveCondition}
        friendsCondition={compact([
          showInactiveCondition,
          shouldFilterFriends ? `name: { _like: "%a%" }` : '',
        ]).join(',')}
      />

      <CacheStats />
      <br />
      <NetworkStats />
      <br />
      <br />
      <Toggle
        onChange={toggleShowMike}
        value={shouldShowMike}
        title="Show Mike"
      />

      {shouldShowMike && <Mike />}
    </>
  )
}
