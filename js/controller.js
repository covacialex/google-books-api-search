"use strict";

import * as model from "./model.js";
import cartView from "./View/cartView.js";
import focusedView from "./View/focusedView.js";
import paginationView from "./View/paginationView.js";
import resultsView from "./View/resultsView.js";
import searchView from "./View/searchView.js";
import truncateView from "./View/truncateView.js";

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Load search results
    await model.searchByTitle(query);

    // Render results
    resultsView.render(model.getSearchResultsPage(1));

    // Render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // 1) Render new results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 2) Render new pagination buttons
  paginationView.render(model.state.search);
};

const controlFocusedBook = async function (bookIndex) {
  focusedView.render(model.state.search.results[bookIndex]);
};

const controlCart = function (index) {
  cartView.render(model.state.search.results[index]);
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  focusedView.addHandlerRender(controlFocusedBook);
  truncateView.addTruncButton();
  cartView.addHandlerRender(controlCart);
  cartView.addBoxTruncation();
};

init();
