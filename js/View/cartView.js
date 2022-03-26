import { state } from "../model.js";
import View from "./View.js";

class CartView extends View {
  _parentElement = document.querySelector(".user-nav__cart__box");

  addHandlerRender(handler) {
    const bookContainer = document.querySelector(".focused");
    const cartIcon = document.querySelector(".user-nav__cart__icon");
    const cartBox = document.querySelector(".user-nav__cart__box");

    // Show cart on click
    cartIcon.addEventListener("click", function () {
      cartBox.classList.toggle("display_flex");
    });

    bookContainer.addEventListener("click", function (e) {
      const btnCart = e.target.closest(".focused__container__cover__cart");
      if (!btnCart) return;

      const book = document.querySelector(".focused__container");

      // Get Id from HTML dataset
      const bookId = book.dataset.id;

      // Send Id. to controller
      handler(bookId);
    });
  }

  handleRemoveProduct() {
    const cartBox = document.querySelector(".user-nav__cart__box");

    // Select closest element on click
    cartBox.addEventListener("click", function (e) {
      const book = e.target.closest(".user-nav__cart__box__container");
      const removeIcon = e.target.closest(
        ".user-nav__cart__box__container__remove"
      );
      const cartNumber = document.querySelector(".user-nav__cart__number");
      if (!book) return;

      // Select ID from HTML dataset
      const bookID = book.dataset.cartid;

      // Find index in state based on ID using destructuring
      const cartIndex = state.cart.findIndex(({ id }) => id === bookID);

      // Remove DOM element
      book.remove();

      // Remove element from state using index found
      state.cart.splice(cartIndex, 1);

      // Decrement DOM number on cart
      // if (state.cart.length > 0) {
      //   cartNumber.innerHTML = state.cart.length;
      // } else {
      //   cartNumber.classList.remove("display_flex");
      //   cartNumber.innerHTML = "";
      //   document.querySelector(".user-nav__cart__icon").style.color =
      //     "var(--color-secondary)";
      // }

      // Delete element on click from state and DOM
    });
  }

  handleCartProducts(cart) {
    const cartNumber = document.querySelector(".user-nav__cart__number");
    const cartBox = document.querySelector(".user-nav__cart__box");

    console.log(cart.length);
    // Update DOM cart number
    if (cart.length > 0) {
      cartNumber.innerHTML = cart.length;

      cartNumber.classList.add("display_flex");
      document.querySelector(".user-nav__cart__icon").style.color = "orange";
    } else {
      cartNumber.innerHTML = "";
    }
  }

  //   Overwrites original _clear() from View.js so it doesn't clear _parentElement.innerHTML when adding to cart
  _clear() {}

  _generateMarkup() {
    return `
    <li class="user-nav__cart__box__container" data-cartid="${this._data.id}">
        <img src="${this._data.cover}" class="user-nav__cart__box__container__cover" />
        <div class="user-nav__cart__box__container__contents">
            <h4 class="user-nav__cart__box__container__contents__title">${this._data.title}</h4>
            <p class="user-nav__cart__box__container__contents__author">${this._data.author}</p>
        </div>
        <ion-icon name="close-outline" class="user-nav__cart__box__container__remove" tabindex="0"></ion-icon>
    </li>
    `;
  }
}

export default new CartView();
