export class Card {
  constructor (selectors, name, link, openPopupImg) {
    this._name = name;
    this._link = link;
    this._selectors = selectors;
    this._openPopupImg = openPopupImg;
  }

  _getTemplate () {
    this._element = document.querySelector(this._selectors.template).content.querySelector(this._selectors.card).cloneNode(true);
    return this._element;
  }

  _createCard(name, link) {
    this._getTemplate();
    this._element.querySelector(this._selectors.title).textContent = name;
    this._image = this._element.querySelector(this._selectors.image);
    this._image.src = link;
    this._image.link = link;
    this._image.alt = name;
    this._setListeners();
    return this._element;
  }

  _setListeners () {
    this._likeButton = this._element.querySelector(this._selectors.likeButton);
    this._delButton = this._element.querySelector(this._selectors.delButton);
    this._delButton.addEventListener('click', this._delCard.bind(this));
    this._likeButton.addEventListener('click', this._likeCard.bind(this));
    this._image.addEventListener('click', this._handleImgZoom.bind(this));
  }

  _handleImgZoom () {
    this._openPopupImg(this._name, this._link)
  }

  _likeCard () {
    this._likeButton.classList.toggle(this._selectors.likeButtonPressed);
  }

  _delCard () {
    this._element.remove();
  }

  renderCard (where) {
    this._createCard(this._name, this._link);
    where.prepend(this._element);
  }
}