import { useState } from "react";
import { Button } from "semantic-ui-react";

/**
 * @component
 * @description This comonent use to display description as per user choice.
 * @param {string} initialDescription use for short description
 * @param {string} additionalDescription use for brife description
 * @returns {JSX.Element} A React element that renders a description.
 */
const DescriptionComponent = ({
  initialDescription,
  additionalDescription,
}) => {
  const [showAdditional, setShowAdditional] = useState(false);

  const toggleDescription = () => {
    setShowAdditional(!showAdditional);
  };

  return (
    <>
      {showAdditional ? (
        <p>{additionalDescription}</p>
      ) : (
        <p>{initialDescription}</p>
      )}
      <Button
        as="a"
        basic
        primary
        className="button-like-link"
        onClick={toggleDescription}
      >
        {showAdditional ? "See Less" : "See More"}
      </Button>
    </>
  );
};

export default DescriptionComponent;
