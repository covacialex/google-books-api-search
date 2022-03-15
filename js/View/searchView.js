import View from "./View.js";

class SearchView extends View {
  _parentElement = document.querySelector(".search__nav");

  getQuery = function () {
    const query = document.querySelector(".search__nav__bar").value;
    this._clearInput();
    return query;
  };

  _clearInput() {
    this._parentElement.querySelector(".search__nav__bar").value = "";
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener("submit", function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
