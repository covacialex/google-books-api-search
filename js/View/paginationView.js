import View from "./View.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn");
      if (!btn) return;

      const goToPage = +btn.dataset.goto; // Took dataset from HTML button class

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currPage === 1 && numPages > 1) {
      return `
         <button data-goto="${currPage + 1}" class="btn pagination__right">
             <span class="pagination__left__page">Page ${currPage + 1}</span>
             <span class="pagination__left__arrow">></span>
         </button>
      `;
    }

    // Last page
    if (currPage === numPages && numPages > 1) {
      return `
    <button data-goto="${currPage - 1}" class="btn pagination__left">
        <span class="pagination__left__arrow"><</span>
        <span class="pagination__left__page">Page ${currPage - 1}</span>
    </button>
      `;
    }

    // Other page
    if (currPage < numPages) {
      return `
      <button data-goto="${currPage - 1}" class="btn pagination__left">
      <span class="pagination__left__arrow"><</span>
      <span class="pagination__left__page">Page ${currPage - 1}</span>
     </button>

     <button data-goto="${currPage + 1}" class="btn pagination__right">
     <span class="pagination__left__page">Page ${currPage + 1}</span>
     <span class="pagination__left__arrow">></span>
    </button>
      `;
    }

    // Page 1, and no other pages
    return "";
  }
}

export default new PaginationView();
