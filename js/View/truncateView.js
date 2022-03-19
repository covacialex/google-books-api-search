import View from "./View.js";

class TruncateView extends View {
  _parentElement = document.querySelector(".books-section__focused");
  _errorMessage = "Something went wrong with Trunc.";
  _message = "";

  addTruncButton() {
    const bookList = document.querySelector(".books-section__results__list");

    bookList.addEventListener("click", function () {
      const description = document.querySelector(
        ".books-section__focused__container__content-description"
      );
      const btn = document.querySelector(
        ".books-section__focused__container__content-description-button"
      );

      if (!description) return;

      //   'offset' is the element height set in css properties, 'scroll' is the maximum height it could muster based on content with overflow visible
      if (description.offsetHeight < description.scrollHeight) {
        // Render button
        btn.innerHTML = "Show More";
        btn.classList.add("btn");

        // Add button functionality
        btn.addEventListener("click", function () {
          description.classList.toggle("line--clamp-5");

          toggleText(btn);
        });
      }
    });

    function toggleText(btn) {
      if (btn.innerHTML == "Show More") {
        btn.innerHTML = "Show Less";
      } else if (btn.innerHTML == "Show Less") {
        btn.innerHTML = "Show More";
      } else {
        btn.innerHTML = "";
      }
    }
  }
}

export default new TruncateView();
