import { state } from "../model.js";
import View from "./View.js";

class FocusedView extends View {
  _parentElement = document.querySelector(".books-section__focused");
  _errorMessage = "Something went wrong. Please try again!";
  _message = "";

  addHandlerRender(handler) {
    const bookList = document.querySelector(".books-section__results__list");

    bookList.addEventListener("click", function (e) {
      const bookSelect = e.target.closest(".books-section__results__book");
      if (!bookSelect) return;

      const bookIndex = +bookSelect.dataset.index;

      handler(bookIndex);
    });
  }

  _generateMarkup() {
    return `
    <div class="books-section__focused__container" data-id="${this._data.id}">
    <img
      src="${this._data.cover}"
      alt="${this._data.title} book cover"
      class="books-section__focused__container__cover"
    />
    <div class="books-section__focused__container__content">
      <h3 class="books-section__focused__container__content-title">
        ${this._data.title}
      </h3>

      <div class="books-section__focused__container__content-author">
        by <span>${this._data.author}</span>
      </div>

      <p class="books-section__focused__container__content-description line--clamp-5">
        ${this._data.description}
      </p>
      <button class="books-section__focused__container__content-description-button"></button>
      <span class="books-section__focused__container__content-category"
        ></span
      >
      
    </div>
  </div>
      `;
  }
}

export default new FocusedView();
