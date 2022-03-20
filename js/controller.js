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

const controlCart = function (data) {
  // Add book data from cartView to model.state.book
  model.state.book = data;

  // Set copies to 1
  model.state.book.copies = 1;

  // Check if cart already contains book using destructuring
  if (model.state.cart.find(({ id }) => id === data.id)) {
    // Increment copies in cart
    model.state.book.copies++;

    return;
  } else {
    // Render book info
    cartView.render(model.state.book);

    // Push new cart data into array
    model.state.cart.push(data);

    // Update DOM cart number (I had to put the code here since it doesn't update in cartView on controller click for some reason)
    if (model.state.cart.length > 0) {
      const cartNumber = document.querySelector(".user-nav__cart-number");

      cartNumber.innerHTML = model.state.cart.length;

      cartNumber.classList.add("display_flex");
      document.querySelector(".user-nav__cart-icon").style.color = "orange";
    } else {
      cartNumber.innerHTML = "";
    }
  }
};

const init = function () {
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  focusedView.addHandlerRender(controlFocusedBook);

  truncateView.addTruncButton();

  cartView.addHandlerRender(controlCart);
  cartView.handleRemoveProduct();
};

init();
