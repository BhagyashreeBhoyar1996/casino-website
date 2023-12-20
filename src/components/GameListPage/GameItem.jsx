import React from "react";
import { Item, Button, Icon } from "semantic-ui-react";

import DescriptionComponent from "./DescriptionComponent";

/**
 * @component
 * @description This comonent use to display game item
 * @param {Function} redirect this is call back function which use to redirect to game-play screen
 * @param {Object} gameInfo this is game information object
 * @returns {JSX.Element} A React element that renders a game item
 */

export default function GameItem({ redirect, gameInfo }) {
  const { description } = gameInfo;
  const initialDescription = description?.slice(0, 160) || description;
  const additionalDescription = description;
  return (
    <Item>
      <Item.Image
        size="small"
        src={require(`../../${gameInfo.icon}`)}
        alt="game-icon"
      />
      <Item.Content>
        <Item.Header as="a">{gameInfo.name}</Item.Header>
        <Item.Description>
          <DescriptionComponent
            initialDescription={initialDescription}
            additionalDescription={additionalDescription}
          />
        </Item.Description>
        <Item.Extra>
          <Button
            inverted
            secondary
            size="small"
            floated="right"
            onClick={() => {
              redirect();
            }}
          >
            Play <Icon name="right chevron" />
          </Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}
