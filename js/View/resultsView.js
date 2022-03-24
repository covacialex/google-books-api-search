import View from "./View.js";

class ResultsView extends View {
  _parentElement = document.querySelector(".results__list");
  _errorMessage = "Something went wrong with your search. Please try again!";

  _generateMarkup() {
    // Create new array of each Preview and join them together
    return this._data.map(this._generateMarkupPreview).join("");
  }

  _generateMarkupPreview(book) {
    return `
      <li class="results__book"  id=${book.id} data-index="${book.index}" tabindex="0">
      <div class="results__book__cover">
        <img
          src="${book.cover}"
          alt="${book.title} book cover image"
          class="results__book__cover__image"
        />
      </div>
      <div class="results__book__content">
        <h3 class="results__book__content__title line--clamp-2">${book.title}</h3>
        <h3 class="results__book__content__author"><span>${book.author}</span></h3>
       
      </div>
      </li>
`;
  }
}

export default new ResultsView();
