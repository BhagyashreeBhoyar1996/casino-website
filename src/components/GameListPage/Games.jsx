import React, { useEffect, useState } from "react";

import { Header, Item, Message } from "semantic-ui-react";

import GameItem from "./GameItem";
import AppLoader from "../common/AppLoader";

/**
 * @component
 * @description This comonent use to display game list
 * @param {Function} redirect this is call back function which use to redirect to game-play screen
 * @param {Array} gameList Array of games
 * @param {boolean} isLoading this flag is use for loading when game list fetch
 * @param {number} selectedCategory this is use for category id use user select specific category.
 * @param {boolean} isError this flag is use for error when game list trying to fetch an error occurred.
 * @param {Object} error this object is use for store error information when game list trying to fetch an
 * error occurred.
 * @returns {JSX.Element} A React element that renders a game list.
 */

export default function Games({
  redirect,
  gameList = [],
  isLoading,
  selectedCategory,
  isError,
  error,
}) {
  const [filteredGames, setFilteredGames] = useState(gameList);

  useEffect(() => {
    const result = gameList.filter((game) =>
      game.categoryIds.includes(selectedCategory)
    );
    setFilteredGames(result);
  }, [gameList, selectedCategory]);

  return (
    <>
      <Header as="h3" dividing>
        Games
      </Header>
      {isLoading ? (
        <AppLoader />
      ) : isError ? (
        <Message
          error
          content={error?.message ? error.message : "something went wrong"}
        />
      ) : (
        <Item.Group divided relaxed link>
          {filteredGames?.map((gameInfo) => (
            <GameItem
              key={gameInfo.code}
              redirect={() => {
                redirect(gameInfo.code);
              }}
              gameInfo={gameInfo}
            />
          ))}
        </Item.Group>
      )}
    </>
  );
}
