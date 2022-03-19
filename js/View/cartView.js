import { state } from "../model.js";
import View from "./View.js";

class CartView extends View {
  _parentElement = document.querySelector(".user-nav__cart__box");
  _errorMessage = "Something went wrong with cartView";

  addHandlerRender(handler) {
    const bookContainer = document.querySelector(".books-section__focused");
    const cartIcon = document.querySelector(".user-nav__cart-icon");
    const cartBox = document.querySelector(".user-nav__cart__box");

    // Show cart on click
    cartIcon.addEventListener("click", function () {
      cartBox.classList.toggle("display_flex");
    });

    bookContainer.addEventListener("click", function (e) {
      e.preventDefault();
      if (e.target.matches(".books-section__focused__container__cover")) {
        const book = document.querySelector(
          ".books-section__focused__container"
        );

        // Get ID from HTML dataset
        const bookID = book.dataset.id;

        // Find object based on ID using destructuring
        const focusedBookData = state.search.results.find(
          ({ id }) => id === bookID
        );

        // Send object to controller
        handler(focusedBookData);
      }
    });
  }

  addBoxTruncation(handler) {
    this._parentElement.addEventListener("mouseover", function (e) {
      const titleHover = e.target.closest(".user-nav__cart__box-title");
      if (!titleHover) return;

      console.log(titleHover.offsetHeight, titleHover.scrollHeight);
    });
  }

  deleteProduct() {
    const cartBox = document.querySelector(".user-nav__cart__box");

    cartBox.addEventListener("click", function (e) {
      // Select closest element on click
      const book = e.target.closest(".user-nav__cart__box__container");
      if (!book) return;

      // Select ID from HTML dataset
      const bookID = book.dataset.id;

      // Find index based on ID using destructuring
      const cartIndex = state.cart.findIndex(({ id }) => id === bookID);

      // Delete element on click from state using index
      state.cart.splice(cartIndex, 1);

      // Delete element on click from DOM
      book.remove();
    });
  }

  //   Overwrites original _clear() from View.js so it doesn't reset _parentElement.innerHTML when adding to cart
  _clear() {}

  _generateMarkup() {
    return `
    <li class="user-nav__cart__box__container display_flex" data-id="${this._data.id}">
        <img src="${this._data.cover}" class="user-nav__cart__box__container-cover" />
        <div class="user-nav__cart__box__container__contents">
            <h4 class="user-nav__cart__box__container__contents-title">${this._data.title}</h4>
            <p class="user-nav__cart__box__container__contents-author">${this._data.author}</p>
        </div>
    </li>
    `;
  }
}

export default new CartView();
