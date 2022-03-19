import { getJSON } from "./helpers.js";
import { API_BOOK_URL } from "./config.js";
import { RES_PER_PAGE } from "./config.js";

export const state = {
  book: {},
  cart: [],
  search: {
    query: "",
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const searchByTitle = async function (bookName) {
  try {
    // API search
    const data = await getJSON(
      `${API_BOOK_URL}+intitle:${bookName}&langRestrict=en&printType=books&maxResults=40`
    ).then((data) => {
      // console.log(data); // Enable to see raw data from API

      const bookArray = data.items
        .map((num, index) => {
          // Loop through the API response to create a new array containing specified objects
          if (
            !num.id ||
            !num.volumeInfo.imageLinks ||
            !num.volumeInfo.description ||
            !num.volumeInfo.authors ||
            !num.volumeInfo.pageCount ||
            !num.volumeInfo.title
          )
            return; // If any of the above are undefined, skip whole object

          return {
            // Return chosen objects
            id: num.id,
            title: num.volumeInfo.title,
            author: num.volumeInfo.authors[0],
            cover: num.volumeInfo.imageLinks.thumbnail,
            description: num.volumeInfo.description,
            categories: num.volumeInfo.categories,
            pages: num.volumeInfo.pageCount,
          };
        })
        .filter((el) => {
          // Filter the array to get rid of undefined elements
          return el !== undefined;
        });

      // Added index to each item afterwards, otherwise it loses track of its index in undefined objects.
      bookArray.forEach((num, indexResult) => {
        return (num.index = indexResult);
      });

      // Add results to state
      state.search.results = bookArray;

      return state.search.results;
    });
  } catch (err) {
    console.error(err);
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;

  const start = (page - 1) * state.search.resultsPerPage; // (1-1) * 5 = 0;
  const end = page * state.search.resultsPerPage; // 1 * 5 = 5;

  return state.search.results.slice(start, end); // Slice method to get an array of resultsPerPage
};
