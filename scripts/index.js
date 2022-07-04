import { Card } from './card.js';
import { FormValidator } from './formValidator.js';

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

const cardSelectors = {
  template: '.card-template',
  card: '.card',
  title: '.card__title',
  image: '.card__image',
  likeButton: '.button-like',
  likeButtonPressed: 'button-like_pressed',
  delButton: '.button-delete'
}

const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button-submit',
  inactiveButtonClass: 'button-submit_invalid',
  inputErrorClass: 'popup__input_type_error',
};

const cardList = document.querySelector('.posts__list');// куда вставляем контент
const templateSelector = '.card-template';
// Попапы:
const popups = document.querySelectorAll('.popup')
const popupName = document.querySelector('.popup_type_edit-name');
const popupCard = document.querySelector('.popup_type_add-card');
//const popupImg = document.querySelector('.popup_type_image-zoomed');
// Формы для event слушателя:
const formElementName = popupName.querySelector('.popup__form_type_editname'); 
const formElementCard = popupCard.querySelector('.popup__form_type_addcard');
// Инпуты в попапах:
const nameInput = formElementName.elements.name;//поле ввод имя
const jobInput = formElementName.elements.job; //поле ввод работа
const cardNameInput = formElementCard.elements.placeNameInput;//поле ввод места
const cardLinkInput = formElementCard.elements.placeLinkInput;//поле ввод ссылка
// То, куда вставляем данные в html:
const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profileJob = profile.querySelector('.profile__job');

// Кнопки, кол-во не изменяется:
const editButton = profile.querySelector('.profile__button-edit');
const addButton = profile.querySelector('.button-add');

// Включаем валидацию форм для 2-х попапов:
const cardFormVaditaion = new FormValidator (formSelectors, formElementCard);
const nameFormValidation = new FormValidator (formSelectors, formElementName);
cardFormVaditaion.enableValidation();
nameFormValidation.enableValidation();

// Функция рендерит карточки из массива:
function renderList(data) {
  data.forEach(function (item) {
    const newCard = new Card (cardSelectors, item.name, item.link)
    newCard.renderCard(cardList);
  });
  };

// Рендерим дефолтные 6 карточек:
renderList(initialCards);

// Функция открытия попапа:
function openPopup(popup) {
  document.addEventListener('keydown', handleEscapePopup);
  popup.classList.add('popup_opened');
}

// Функция закрытия попапа:
function closePopup(popup) {
  document.removeEventListener('keydown', handleEscapePopup);
  popup.classList.remove('popup_opened');
}

// Функция открытия попапа редактирования имени:
function openPopupEditName () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  nameFormValidation._resetValidation();
  openPopup(popupName);
};

// Функция открытия попапа добавление карточки
function openPopupCard () {
  formElementCard.reset();
  openPopup(popupCard);
};

// Обработчик отправки формы редактирования имени
function handleFormNameSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(popupName);
};


// // Функция открытие попапа увеличенной картинки
// function openPopupImg (evt) {
//   // находим данные из поста, которые передаем в попап:
//   imageZoomed.src = evt.target.src;
//   imageZoomed.alt = evt.target.alt;
//   captionZoomed.textContent = evt.target.alt;
//   openPopup(popupImg);
//   };

//   const image = listElement.querySelector('.card__image');
//   image.addEventListener('click', openPopupImg);

// Обработчик отправки формы добавления карточки:
function handleFormCardSubmit (evt) {
  evt.preventDefault();
  const newCard = new Card (cardSelectors, cardNameInput.value, cardLinkInput.value)
  newCard.renderCard(cardList);
  closePopup(popupCard);
  };

// Cлушатели:
formElementName.addEventListener('submit', handleFormNameSubmit);// Слушатель: редактирование имени
formElementCard.addEventListener('submit', handleFormCardSubmit);// Слушатель: добавление карточки
editButton.addEventListener('click', openPopupEditName);// Слушатель: кнопка редактирования профиля
addButton.addEventListener('click', openPopupCard);// Слушатель: кнопка с плюсом в профиле

// Функция закрывает попап по нажатию на escape
function handleEscapePopup (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

popups.forEach((popup) => {
  // Слушатель закрытие попапа по крестику или клике вне попапа
  popup.addEventListener('click', (evt) => {
    const popupArea = popup.querySelector('.popup__container-area')
    if (evt.target.classList.contains('button-close') || !popupArea.contains(evt.target)) {
      closePopup(popup);
    }
  })
});