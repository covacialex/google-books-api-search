import { state } from "../model.js";
import View from "./View.js";

class CartView extends View {
  _parentElement = document.querySelector(".user-nav__cart__box");

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
      if (
        // I don't know why event delegation doesn't work on the cart parent
        e.target.matches(".books-section__focused__container__cover__cart") ||
        e.target.matches(".books-section__focused__container__cover__cart-icon")
      ) {
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

  handleRemoveProduct() {
    const cartBox = document.querySelector(".user-nav__cart__box");

    // Select closest element on click
    cartBox.addEventListener("click", function (e) {
      const book = e.target.closest(".user-nav__cart__box__container");
      const removeIcon = e.target.closest(
        ".user-nav__cart__box__container-remove"
      );
      const cartNumber = document.querySelector(".user-nav__cart-number");
      if (!book) return;

      // Select ID from HTML dataset
      const bookID = book.dataset.id;

      // Find index in state based on ID using destructuring
      const cartIndex = state.cart.findIndex(({ id }) => id === bookID);

      const removeItems = function () {
        // Remove DOM element
        book.remove();

        // Remove element from state using index found
        state.cart.splice(cartIndex, 1);

        // Decrement DOM number on cart
        if (state.cart.length > 0) {
          cartNumber.innerHTML = state.cart.length;
        } else {
          cartNumber.classList.remove("display_flex");
          cartNumber.innerHTML = "";
          document.querySelector(".user-nav__cart-icon").style.color =
            "var(--color-secondary)";
        }
      };

      // Delete element on click from state and DOM
      if (!removeIcon) return;
      removeIcon.addEventListener("click", removeItems());
    });
  }

  // handleNumberOfProducts() {
  //   document.querySelector(".user-nav__cart-number").innerHTML =
  //     state.cart.length;
  // }

  //   Overwrites original _clear() from View.js so it doesn't clear _parentElement.innerHTML when adding to cart
  _clear() {}

  _generateMarkup() {
    return `
    <li class="user-nav__cart__box__container display_flex" data-id="${this._data.id}">
        <img src="${this._data.cover}" class="user-nav__cart__box__container-cover" />
        <div class="user-nav__cart__box__container__contents">
            <h4 class="user-nav__cart__box__container__contents-title">${this._data.title}</h4>
            <p class="user-nav__cart__box__container__contents-author">${this._data.author}</p>
        </div>
        <ion-icon name="close-outline" class="user-nav__cart__box__container-remove" tabindex="0"></ion-icon>
    </li>
    `;
  }
}

export default new CartView();
