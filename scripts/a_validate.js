// Функция показать ошибку при вводе
const showInputError = (formElement, inputElement, errorMessage, formSelectors) => {  // Находим span ошибки в ДАННОЙ форме
  const errorElement = formElement.querySelector(`.popup__input-${inputElement.id}-error`);
  inputElement.classList.add(formSelectors.inputErrorClass);// добавляем красную рамку инпуту
  errorElement.textContent = errorMessage;// в span выводим сообщение об ошибке
  errorElement.style.opacity = 1;// делаем span видимым
};

// Функция убрать ошибку при вводе
const hideInputError = (formElement, inputElement, formSelectors) => {
  const errorElement = formElement.querySelector(`.popup__input-${inputElement.id}-error`);// находим span ошибки в ДАННОЙ форме
  inputElement.classList.remove(formSelectors.inputErrorClass);// убираем красную рамку инпуту
  errorElement.style.opacity = 0;// делаем невидимым span с ошибкой
  errorElement.textContent = '';// очищаем текст span ошибки 
};

// Функция - если невалидно, вызываем показ ошибки, если валидно, убираем ее
const checkInputValidity = (formElement, inputElement, formSelectors) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, formSelectors);
  } else {
    hideInputError(formElement, inputElement, formSelectors);
  }
};

// Функция проверяет валидна ли форма (все инпуты в ней). Возвращает тру или фолс
const isFormValid = (formElement) => formElement.checkValidity();

// Функция меняет состояние кнопки submit
const toggleButtonState = (formElement, buttonElement, formSelectors) => {
  if (!isFormValid(formElement)) {
    disableSubmitButton(buttonElement, formSelectors);
  } else {
    enableSubmitButton(buttonElement, formSelectors);
  }
};

// Функция делает кнопку submit неактивной
const disableSubmitButton = (buttonElement, formSelectors) => {
  buttonElement.classList.add(formSelectors.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

// Функция делает кнопку submit активной:
const enableSubmitButton = (buttonElement, formSelectors) => {
  buttonElement.classList.remove(formSelectors.inactiveButtonClass);
  buttonElement.removeAttribute('disabled', true);
}

// Функция навешивает слушатели каждому инпуту:
const setEventListeners = (formElement, formSelectors) => {
  const buttonElement = formElement.querySelector(formSelectors.submitButtonSelector)
  toggleButtonState(formElement, buttonElement, formSelectors);
  // Каждому инпуту ставим слушатель ввода:
  const inputList = formElement.querySelectorAll(config.inputSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, formSelectors);// показывать или убирать ошибку
      toggleButtonState(formElement, buttonElement, formSelectors);// менять статус кнопки
    });
  });
};

// Сброс показа всех ошибок валидации
const resetValidation = (formElement, formSelectors) => {
  const inputList = Array.from(formElement.querySelectorAll(formSelectors.inputSelector));
  disableSubmitButton(formElement.querySelector(formSelectors.submitButtonSelector), formSelectors);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, formSelectors);
  })
}

// Функция включение валидации. Для валидации всего нужно вызвать только ее:
const enableValidation = (formSelectors) => {
  const formList = Array.from(document.forms);// массив из всех форм документа
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement, formSelectors);
  });
};

const formSelectors = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button-submit',
  inactiveButtonClass: 'button-submit_invalid',
  inputErrorClass: 'popup__input_type_error',
};

enableValidation(formSelectors);