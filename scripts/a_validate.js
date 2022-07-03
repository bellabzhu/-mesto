// Функция показать ошибку при вводе
const showInputError = (formElement, inputElement, errorMessage, config) => {  // Находим span ошибки в ДАННОЙ форме
  const errorElement = formElement.querySelector(`.popup__input-${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);// добавляем красную рамку инпуту
  errorElement.textContent = errorMessage;// в span выводим сообщение об ошибке
  errorElement.style.opacity = 1;// делаем span видимым
};

// Функция убрать ошибку при вводе
const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.popup__input-${inputElement.id}-error`);// находим span ошибки в ДАННОЙ форме
  inputElement.classList.remove(config.inputErrorClass);// убираем красную рамку инпуту
  errorElement.style.opacity = 0;// делаем невидимым span с ошибкой
  errorElement.textContent = '';// очищаем текст span ошибки 
};

// Функция - если невалидно, вызываем показ ошибки, если валидно, убираем ее
const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Функция проверяет валидна ли форма (все инпуты в ней). Возвращает тру или фолс
const isFormValid = (formElement) => formElement.checkValidity();

// Функция меняет состояние кнопки submit
const toggleButtonState = (formElement, buttonElement, config) => {
  if (!isFormValid(formElement)) {
    disableSubmitButton(buttonElement, config);
  } else {
    enableSubmitButton(buttonElement, config);
  }
};

// Функция делает кнопку submit неактивной
const disableSubmitButton = (buttonElement, config) => {
  buttonElement.classList.add(config.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

// Функция делает кнопку submit активной:
const enableSubmitButton = (buttonElement, config) => {
  buttonElement.classList.remove(config.inactiveButtonClass);
  buttonElement.removeAttribute('disabled', true);
}

// Функция навешивает слушатели каждому инпуту:
const setEventListeners = (formElement, config) => {
  const buttonElement = formElement.querySelector(config.submitButtonSelector)
  toggleButtonState(formElement, buttonElement, config);
  // Каждому инпуту ставим слушатель ввода:
  const inputList = formElement.querySelectorAll(config.inputSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, config);// показывать или убирать ошибку
      toggleButtonState(formElement, buttonElement, config);// менять статус кнопки
    });
  });
};

// Сброс показа всех ошибок валидации
const resetValidation = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  disableSubmitButton(formElement.querySelector(config.submitButtonSelector), config);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, config);
  })
}

// Функция включение валидации. Для валидации всего нужно вызвать только ее:
const enableValidation = (config) => {
  const formList = Array.from(document.forms);// массив из всех форм документа
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button-submit',
  inactiveButtonClass: 'button-submit_invalid',
  inputErrorClass: 'popup__input_type_error',
};

enableValidation(config);

