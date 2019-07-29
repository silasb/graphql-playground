import React, { useState } from "react";
import ConnectedUserList from "./components/connected/ConnectedUserList";

const useToggle = () => {
  const [toggleState, setToggleState] = useState(false);
  return [toggleState, () => setToggleState(prev => !prev)];
};

const Toggle = ({ value, onChange, title }) => (
  <label style={{ display: "block" }}>
    <input type="checkbox" {...{ onChange, value }} />
    {title}
  </label>
);

export default () => {
  const [shouldShowInactive, toggleShowInactive] = useToggle();
  const [shouldFilterFriends, toggleFilterFriends] = useToggle();

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
        usersCondition={shouldShowInactive ? "" : `inactive: { _neq: true }`}
        friendsCondition={shouldFilterFriends ? `name: { _like: "%a%" }` : ""}
      />
    </>
  );
};
