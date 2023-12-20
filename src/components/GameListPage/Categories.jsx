import React from "react";

import { Header, List, Message } from "semantic-ui-react";
import AppLoader from "../common/AppLoader";
/**
 * @component
 * @description This comonent use to display category list
 * @param {boolean} isLoading this flag is use for loading when category list fetch
 * @param {Array} data  Array of categories
 * @param {boolean} isError this flag is use for error when category list trying to fetch an error occurred.
 * @param {Object} error this object is use for store error information when category list trying to fetch an
 * @param {Function} setCategory this this call back funtion to set the category list
 * error occurred.
 * @returns {JSX.Element} A React element that renders a category list.
 */
export default function Categories({
  isLoading,
  data: categories = [],
  isError,
  error,
  setCategory,
}) {
  return (
    <>
      <Header as="h3" dividing>
        Categories
      </Header>
      {isLoading ? (
        <AppLoader />
      ) : isError ? (
        <Message
          error
          content={error?.message ? error.message : "something went wrong"}
        />
      ) : (
        <List selection animated size="large">
          {categories.map((category) => (
            <List.Item
              key={category?.id}
              onClick={() => {
                setCategory(category?.id);
              }}
            >
              <List.Header>{category.name}</List.Header>
            </List.Item>
          ))}
        </List>
      )}
    </>
  );
}
