import React from "react";
import { Grid } from "semantic-ui-react";
/**
 * @component
 * @description This comonent use to display error 404 message when some route not found
 * @returns {JSX.Element} A React element that renders a 404 error message.
 */
export default function NoMatch() {
  return (
    <Grid>
      <h2>404: Page Not Found</h2>
    </Grid>
  );
}
