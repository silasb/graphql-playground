import React from 'react'
import UserList from './UserList'

const User = ({ name, team_name, friends = [] }) => (
  <li>
    {name} {team_name && `(Team: ${team_name})`}
    {friends.length > 0 && (
      <ul>
        <label>Friends: </label>
        <UserList users={friends.map(({ details }) => details)} />
      </ul>
    )}
  </li>
)

export default User
