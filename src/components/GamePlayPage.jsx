import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Grid, Button, Icon } from "semantic-ui-react";

/**
 * @component
 * @description This comonent use to display game play screen
 * @returns {JSX.Element} A React element that renders a game play screen.
 */
export default function GamePlayPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { code } = location.state || {};

  useEffect(() => {
    if (code) {
      if (window.comeon && window.comeon.game) {
        window.comeon.game.launch(code);
      }
    }
  }, [code]);

  const redirect = () => {
    navigate("/game-list");
  };
  return (
    <>
      <Grid centered>
        <Grid.Column only="computer tablet" width={3}>
          <Button
            inverted
            secondary
            size="small"
            floated="right"
            onClick={() => {
              redirect();
            }}
          >
            <Icon name="left chevron" />
            Back
          </Button>
        </Grid.Column>
        <Grid.Column only="mobile" width={1}>
          <Button
            inverted
            secondary
            size="mini"
            floated="right"
            onClick={() => {
              redirect();
            }}
            icon="left chevron"
          />
        </Grid.Column>
        <Grid.Column computer={10} tablet={10} mobile={14}>
          <div id="game-launch"></div>
        </Grid.Column>
        <Grid.Column computer={3} tablet={3} mobile={1} />
      </Grid>
    </>
  );
}
