import View from "./View.js";

class TruncateView extends View {
  _parentElement = document.querySelector(".books-section__focused");
  _errorMessage = "Something went wrong with Trunc. Please try again!";
  _message = "";

  addTruncButton(handler) {
    const bookList = document.querySelector(".books-section__results__list");

    function toggleText(btn) {
      if (btn.innerHTML == "Show More") {
        btn.innerHTML = "Show Less";
      } else if (btn.innerHTML == "Show Less") {
        btn.innerHTML = "Show More";
      } else {
        null;
      }
    }

    bookList.addEventListener("click", function () {
      const description = document.querySelector(
        ".books-section__focused__container__content-description"
      );
      const btn = document.querySelector(
        ".books-section__focused__container__content-description-button"
      );

      //   'offset' is the element height set in css properties, 'scroll' is the size of the potential scrollable element with overflow visible
      if (description.offsetHeight < description.scrollHeight) {
        btn.innerHTML = "Show More";

        btn.addEventListener("click", function () {
          description.classList.toggle("line--clamp-4");

          toggleText(btn);
        });
      }

      handler();
    });
  }
}

export default new TruncateView();
