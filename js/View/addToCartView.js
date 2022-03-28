import View from "./View.js";

class AddToCartView extends View {
  _parentElement = document.querySelector(".user-nav__cart__box");

  addHandlerRender(handler) {
    const bookContainer = document.querySelector(".focused");
    const cartIcon = document.querySelector(".user-nav__cart__icon");
    const cartBox = document.querySelector(".user-nav__cart__box");

    // Show cart on click
    cartIcon.addEventListener("click", function () {
      cartBox.classList.toggle("display_flex");
    });

    // Send to controller
    bookContainer.addEventListener("click", function (e) {
      // Select closest element
      const btnCart = e.target.closest(".focused__container__cover__cart");
      if (!btnCart) return;

      const book = document.querySelector(".focused__container");

      // Get Id from HTML dataset
      const bookId = book.dataset.id;

      // Send Id. to controller
      handler(bookId);
    });
  }

  incrementDOM(cart) {
    const cartNumber = document.querySelector(".user-nav__cart__number");

    // Update DOM cart number
    if (cart.length > 0) {
      cartNumber.innerHTML = cart.length;

      cartNumber.classList.add("display_flex");
      document.querySelector(".user-nav__cart__icon").style.color = "orange";
    } else {
      cartNumber.innerHTML = "";
    }
  }

  //   Overwrites original _clear() from View.js so it doesn't clear _parentElement.innerHTML when adding to cart
  _clear() {}

  _generateMarkup() {
    return `
    <li class="user-nav__cart__box__container" data-cartid="${this._data.id}">
        <img src="${this._data.cover}" class="user-nav__cart__box__container__cover" />
        <div class="user-nav__cart__box__container__contents">
            <h4 class="user-nav__cart__box__container__contents__title">${this._data.title}</h4>
            <p class="user-nav__cart__box__container__contents__author">${this._data.author}</p>
        </div>
        <ion-icon name="close-outline" class="user-nav__cart__box__container__remove" tabindex="0"></ion-icon>
    </li>
    `;
  }
}

export default new AddToCartView();
