import { state } from "../model.js";
import View from "./View.js";

class CartView extends View {
  _parentElement = document.querySelector(".user-nav__cart__box");
  _errorMessage = "Something went wrong with cartView.";
  _message = "";

  addHandlerRender(handler) {
    const bookContainer = document.querySelector(".books-section__focused");

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

        // Send object index to controller
        handler(focusedBookData.index);
      }
    });
  }

  addBoxTruncation(handler) {
    this._parentElement.addEventListener("mouseover", function (e) {
      const titleHover = e.target.closest(".user-nav__cart__box-title");
      if (!titleHover) return;

      console.log(titleHover.offsetWidth, titleHover.scrollHeight);
    });
  }

  //   Overwrites original _clear() from View.js so it doesn't reset _parentElement.innerHTML when adding to cart
  _clear() {}

  _generateMarkup() {
    return `
    <div class="user-nav__cart__box-title">${this._data.title}</div>
    
    `;
  }
}

export default new CartView();
