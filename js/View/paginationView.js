import View from "./View.js";

class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");
  _errorMessage =
    "There was an error while rendering the page buttons. Please refresh the page!";

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
             <span class="pagination__right__page">Page ${currPage + 1}</span>
             <ion-icon name="chevron-forward-outline" class="pagination__right__arrow"></ion-icon>
         </button>
      `;
    }

    // Last page
    if (currPage === numPages && numPages > 1) {
      return `
    <button data-goto="${currPage - 1}" class="btn pagination__left">
        <ion-icon name="chevron-back-outline" class="pagination__left__arrow"></ion-icon>
        <span class="pagination__left__page">Page ${currPage - 1}</span>
    </button>
      `;
    }

    // Other page
    if (currPage < numPages) {
      return `
      <button data-goto="${currPage - 1}" class="btn pagination__left">
      <ion-icon name="chevron-back-outline" class="pagination__left__arrow"></ion-icon>
      <span class="pagination__left__page">Page ${currPage - 1}</span>
     </button>

     <button data-goto="${currPage + 1}" class="btn pagination__right">
     <span class="pagination__right__page">Page ${currPage + 1}</span>
     <ion-icon name="chevron-forward-outline" class="pagination__right__arrow"></ion-icon>
    </button>
      `;
    }

    // Page 1, and no other pages
    return "";
  }
}

export default new PaginationView();
