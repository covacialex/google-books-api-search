"use strict";

import * as model from "./model.js";
import addToCartView from "./View/addToCartView.js";
import focusedView from "./View/focusedView.js";
import paginationView from "./View/paginationView.js";
import resultsView from "./View/resultsView.js";
import searchView from "./View/searchView.js";
import truncateView from "./View/truncateView.js";
import removeCartView from "./View/removeCartView.js";

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    // Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // Clear focused book
    focusedView.clearContainer();

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
  // Render focused book based on index taken from html dataset
  focusedView.render(model.state.search.results[bookIndex]);
};

const addToCart = function (bookId) {
  // Send bookId to model
  model.addToCart(bookId);

  // Check if book is present in cart DOM, if not -> render
  const isInCart = document.querySelector(`[data-cartid="${bookId}"]`);
  isInCart ? null : addToCartView.render(model.state.book);

  // Update DOM number
  addToCartView.incrementDOM(model.state.cart);
};

const removeFromCart = function (bookId) {
  // Send bookId to model
  model.removeFromCart(bookId);

  // Update DOM number
  removeCartView.decrementDOM(model.state.cart);
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  focusedView.addHandlerRender(controlFocusedBook);
  truncateView.addTruncButton();
  addToCartView.addHandlerRender(addToCart);
  removeCartView.addHandlerRemove(removeFromCart);
};
init();
