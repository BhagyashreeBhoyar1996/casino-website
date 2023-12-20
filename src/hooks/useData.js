import { useQuery } from "react-query";

/**
 * @function
 * @description this function is use to fetch data as per give url
 * @param {string} url url
 * @returns {Object} return data object or throw error fectching data fails
 */
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }
};

/**
 * @function
 * @description use to fetch data as per url
 * @param {Function} onSuccess this is call back function call when fetch data success
 * @param {Function} onError this is call back function call when fetch data fail and have some error
 * @param {boolean} refetchOnMount option is used to control whether a query should automatically
 *  trigger a refetch when the component mounts. 
 * @param {string} url url
 * @returns {Object} all information aboue fetch data call
 */
export default function useData({
  onSuccess,
  onError,
  refetchOnMount = true,
  url,
}) {
  return useQuery(["fetch-data", url], () => fetchData(url), {
    onSuccess,
    onError,
    refetchOnMount,
  });
}
