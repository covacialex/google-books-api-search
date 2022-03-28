import View from "./View.js";

class RemoveCartView extends View {
  _parentElement = document.querySelector(".user-nav__cart__box");

  addHandlerRemove(cart) {
    this._parentElement.addEventListener("click", function (e) {
      // Select closest element
      const book = e.target.closest(".user-nav__cart__box__container");
      if (!book) return;

      // Select ID from HTML dataset
      const bookID = book.dataset.cartid;

      // Remove DOM element
      book.remove();

      cart(bookID);
    });
  }

  decrementDOM(cart) {
    const cartNumber = document.querySelector(".user-nav__cart__number");

    // Decrement DOM number on cart
    if (cart.length > 0) {
      cartNumber.innerHTML = cart.length;
    } else {
      cartNumber.classList.remove("display_flex");
      cartNumber.innerHTML = "";
      document.querySelector(".user-nav__cart__icon").style.color =
        "var(--color-secondary)";
    }
  }
}

export default new RemoveCartView();
