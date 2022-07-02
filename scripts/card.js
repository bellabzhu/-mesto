export class Card {
  constructor (templateSelector, name, link) {
    this.name = name;
    this.link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate (templateSelector) {
    this._element = document.querySelector(templateSelector).content.querySelector('.card').cloneNode(true);
    return this._element;
  }

  _createCard(name, link) {
    this._getTemplate(this._templateSelector)
    this._element.querySelector('.card__title').textContent = name;
    this._image = this._element.querySelector('.card__image');
    this._image.src = link;
    this._image.link = link;
    this._image.alt = name;
    this._setListeners()
    return this._element;
  }

  _setListeners () {
    this._likeButton = this._element.querySelector('.button-like');
    this._delButton = this._element.querySelector('.button-delete');
    this._delButton.addEventListener('click', this._delCard.bind(this));
    this._likeButton.addEventListener('click', this._likeCard.bind(this));
    this._image.addEventListener('click', this._openImg.bind(this))
  }

  _likeCard () {
    this._likeButton.classList.toggle('button-like_pressed');
  }

  _delCard () {
    this._element.remove()
    this._element = null;
  }

  _openImg () {
    console.log('картинка')
  }

  renderCard (where) {
    this._createCard(this.name, this.link)
    where.prepend(this._element);
  }
}