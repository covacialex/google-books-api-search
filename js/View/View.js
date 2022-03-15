export default class View {
  _data;
  render(data) {
    //   Check if data is an array and it's longer than 0
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();

    // Set private _data to data from function argument
    this._data = data;

    // Generate markup
    const markup = this._generateMarkup();

    // Clear parent element
    this._clear();

    // Insert markup as first child to parent element
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  renderSpinner() {
    const markup = `
       <div class="loading">
          <ion-icon name="reload-outline" class="loading__spinner"></ion-icon> 
          <p class="loading__text">Fetching results</p>
       </div> 
    `;

    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    console.error(message);
  }
}
