import React, { Suspense, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Input } from "semantic-ui-react";

import useData from "../../hooks/useData";
import useDebounce from "../../hooks/useDebounce.js";
import AppLoader from "../common/AppLoader.jsx";

const PlayerInformation = React.lazy(() => import("./PlayerInformation.jsx"));
const Games = React.lazy(() => import("./Games.jsx"));
const Categories = React.lazy(() => import("./Categories.jsx"));

/**
 * @component
 * @description This comonent use to display game list screen with user infonation,
 *  game list, category list and game search option.
 * @returns {JSX.Element} A React element that renders a game list screen
 */
export default function GameListPage() {
  const [selectedCategory, setCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const gameListQuery = useData({ url: "http://localhost:3001/games" });

  const categoriesQuery = useData({ url: "http://localhost:3001/categories" });

  const navigate = useNavigate();

  const redirect = (code) => {
    navigate("/game-play", { state: { code: code } });
  };
  
  const filteredGameList = gameListQuery.data
  ? gameListQuery.data.filter((game) =>
        game.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      )
    : [];

  return (
    <>
      <Suspense fallback={<AppLoader />}>
        <Grid centered>
          <Grid.Column computer={12} mobile={16} tablet={12}>
            <PlayerInformation />
          </Grid.Column>
          <Grid.Column computer={4} mobile={16} tablet={4}>
            <Input
              fluid
              size="small"
              icon="search"
              placeholder="Search Game"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Grid.Column>
        </Grid>
        <Grid>
          <Grid.Column computer={12} tablet={10} mobile={10}>
            <Games
              redirect={redirect}
              gameList={filteredGameList}
              isLoading={gameListQuery.isLoading}
              selectedCategory={selectedCategory}
              isError={gameListQuery.isError}
              error={gameListQuery.error}
            />
          </Grid.Column>
          <Grid.Column computer={4} tablet={6} mobile={6}>
            <Categories
              {...categoriesQuery}
              setCategory={setCategory}
            />
          </Grid.Column>
        </Grid>
      </Suspense>
    </>
  );
}
