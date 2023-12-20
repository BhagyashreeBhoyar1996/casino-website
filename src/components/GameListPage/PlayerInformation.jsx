import React, { useContext } from "react";
import { List, Image, Button, Icon } from "semantic-ui-react";

import ContextComponent from "../common/ContextComponent";
import { getUser } from "../../utility/userData";

/**
 * @component
 * @description This comonent use to display player information
 * @returns {JSX.Element} A React element that renders a player information
 */
export default function PlayerInformation() {
  const handleLogout = useContext(ContextComponent);
  const user = getUser();

  return (
    <>
      <List>
        <List.Item>
          <Image avatar src={require(`../../${user?.avatar}`)} alt="avatar" />
          <List.Content>
            <List.Header>{user?.name || ""}</List.Header>
            <List.Description>{user?.event}</List.Description>
          </List.Content>
        </List.Item>
      </List>
      <Button
        inverted
        secondary
        size="mini"
        floated="left"
        onClick={() => {
          handleLogout();
        }}
      >
        <Icon name="left chevron" /> Log Out
      </Button>
    </>
  );
}
