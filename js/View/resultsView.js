import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".books-section__results__list");
  _errorMessage = "No books found. Please try again!";
  _message = "";

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(book) {
    return `
      <li class="books-section__results__book"  id=${book.id} data-index="${book.index}"  >
      <div class="books-section__results__book__cover">
        <img
          src="${book.cover}"
          alt="${book.title} book cover image"
          class="books-section__results__book__cover-image"
        />
      </div>
      <div class="books-section__results__book__content">
        <h3 class="books-section__results__book__content__title">${book.title}</h3>
        <h3 class="books-section__results__book__content__author"><span>${book.author}</span></h3>
       
      </div>
      </li>
`;
  }
}

export default new ResultsView();
