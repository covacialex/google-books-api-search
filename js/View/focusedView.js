import View from "./View.js";

class FocusedView extends View {
  _parentElement = document.querySelector(".focused");
  _errorMessage =
    "Something went wrong while selecting your book. Please try again or refresh the page!";

  addHandlerRender(handler) {
    const bookList = document.querySelector(".results__list");
    const bookFocus = document.querySelector(".focused");

    bookList.addEventListener("click", function (e) {
      const bookSelect = e.target.closest(".results__book");
      if (!bookSelect) return;

      bookFocus.scrollIntoView({ block: "end" });

      // Get HTML dataset
      const bookIndex = +bookSelect.dataset.index;

      // Send index to controller
      handler(bookIndex);
    });
  }

  clearContainer() {
    this._parentElement.innerHTML = "";
  }

  _generateMarkup() {
    return `
    <div class="focused__container" data-id="${this._data.id}">
    <div class="focused__container__cover">
    <img
      src="${this._data.cover}"
      alt="${this._data.title} book cover"
      class="focused__container__cover__image"
    />
    <button class="focused__container__cover__cart">
    <ion-icon name="cart-outline" class="focused__container__cover__cart__icon"></ion-icon>
    </button>
    </div>
    <div class="focused__container__content">
      <h3 class="focused__container__content__title">
        ${this._data.title}
      <span class="focused__container__content__pages">(${this._data.pages} pages)</span>

      </h3>
      <div class="focused__container__content__author">
        by <span>${this._data.author}</span>
      </div>

      <p class="focused__container__content__description line--clamp-5">
        ${this._data.description}
      </p>
      <button class="focused__container__content__description__button"></button>
      <span class="focused__container__content__category"
        ></span>
    </div>
  </div>
      `;
  }
}

export default new FocusedView();
