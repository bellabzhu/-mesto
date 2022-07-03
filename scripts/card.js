export class Card {
  constructor (cardSelectors, name, link) {
    this.name = name;
    this.link = link;
    this._cardSelectors = cardSelectors;
  }

  _getTemplate () {
    this._element = document.querySelector(this._cardSelectors.template).content.querySelector(this._cardSelectors.card).cloneNode(true);
    return this._element;
  }

  _createCard(name, link) {
    this._getTemplate(this._cardSelectors);
    this._element.querySelector(this._cardSelectors.title).textContent = name;
    this._image = this._element.querySelector(this._cardSelectors.image);
    this._image.src = link;
    this._image.link = link;
    this._image.alt = name;
    this._setListeners();
    return this._element;
  }

  _setListeners () {
    this._likeButton = this._element.querySelector(this._cardSelectors.likeButton);
    this._delButton = this._element.querySelector(this._cardSelectors.delButton);
    this._delButton.addEventListener('click', this._delCard.bind(this));
    this._likeButton.addEventListener('click', this._likeCard.bind(this));
    //this._image.addEventListener('click', this._openImg.bind(this));
  }

  _likeCard () {
    this._likeButton.classList.toggle(this._cardSelectors.likeButtonPressed);
  }

  _delCard () {
    this._element.remove();
  }

  _openImg () {
    this._openPopupImg
    console.log('картинка')
  }

  renderCard (where) {
    this._createCard(this.name, this.link);
    where.prepend(this._element);
  }
}