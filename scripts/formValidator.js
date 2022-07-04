export class FormValidator {
  constructor(selectors, form) {
    this._selectors = selectors;
    this._element = form;
    this._buttonSubmit = this._element.querySelector(this._selectors.submitButtonSelector);
    this._inputList = Array.from(this._element.querySelectorAll(this._selectors.inputSelector));
  }

  // Функция показать ошибку при вводе
  _showInputError (inputElement, errorMessage) {
    const errorElement = this._element.querySelector(`${this._selectors.inputSelector}-${inputElement.id}-error`);// находим span ошибки
    inputElement.classList.add(this._selectors.inputErrorClass);
    errorElement.textContent = errorMessage;// в span выводим сообщение об ошибке
    errorElement.style.opacity = 1;// делаем span видимым
  }

  // Функция убрать ошибку при вводе
  _hideInputError (inputElement) {
    const errorElement = this._element.querySelector(`${this._selectors.inputSelector}-${inputElement.id}-error`);// находим span ошибки
    inputElement.classList.remove(this._selectors.inputErrorClass);// убираем красную рамку инпуту
    errorElement.style.opacity = 0;// делаем невидимым span с ошибкой
    errorElement.textContent = '';// очищаем текст span ошибки 
  }

  // Функция - если невалидно, вызываем показ ошибки, если валидно, убираем ее
  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // Метод проверяет валидна ли форма (все инпуты в ней). Возвращает тру или фолс
  _isFormValid () {
    return this._element.checkValidity();
  }

  // Метод меняет состояние кнопки submit
  _toggleButtonState () {
    if (!this._isFormValid()) {
      this._disableSubmitButton ();
    } else {
      this._enableSubmitButton ();
    }
  }

  //Метод делает кнопку submit активной:
  _enableSubmitButton () {
    this._buttonSubmit.classList.remove(this._selectors.inactiveButtonClass);
    this._buttonSubmit.removeAttribute('disabled', true);
  }

  // Метод делает кнопку submit неактивной
  _disableSubmitButton () {
    this._buttonSubmit.classList.add(this._selectors.inactiveButtonClass);
    this._buttonSubmit.setAttribute('disabled', true);
  }

  // Сброс показа всех ошибок валидации
  _resetValidation () {
    this._disableSubmitButton();
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  // Навешивает слушатели каждому инпуту:
  _setListeners () {
    this._toggleButtonState();
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);// показывать или убирать ошибку
        this._toggleButtonState();// менять статус кнопки
      })
    });
  }

//Публичный метод, который включает валидацию формы
  enableValidation () {
    this._setListeners();
  }
}