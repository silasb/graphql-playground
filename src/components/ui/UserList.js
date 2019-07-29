import React from "react";
import User from "./User";

const Users = ({ users = [] }) =>
  users.map(user => <User key={user.id} {...user} />);

export default Users;
