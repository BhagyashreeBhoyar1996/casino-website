import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";
/**
 * @component
 * @description This comonent use to display loader
 * @returns {JSX.Element} A React element that renders a loader.
 */
export default function AppLoader() {
  return (
    <Dimmer active inverted>
      <Loader inverted>Loading</Loader>
    </Dimmer>
  );
}
