/**
 * @function
 * @description store the user infromation (object) in local Storage.
 * @param {Object} user user infromation
 */
export const saveUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

/**
 * @function
 * @description get the user information from local Storage and return it
 * @returns {Object | null} The user object if found in local storage, or null if not present.
 */
export const getUser = () => {
  const userJSON = localStorage.getItem("user");
  return userJSON ? JSON.parse(userJSON) : null;
};
/**
 * @function
 * @description Removes user data from local storage.
 * @returns {void}
 */
export const removeUser = () => {
  localStorage.removeItem("user");
};
