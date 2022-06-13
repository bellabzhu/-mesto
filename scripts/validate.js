
// Функция показать ошибку при вводе
const showInputError = (formElement, inputElement, errorMessage) => {
  // Находим span ошибки в ДАННОЙ форме
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');// добавляем красную рамку инпуту
  errorElement.textContent = errorMessage;// в span выводим сообщение об ошибке
  errorElement.style.opacity = 1;// делаем span видимым
};

// Функция убрать ошибку при вводе
const hideInputError = (formElement, inputElement) => {
  // находим span ошибки в ДАННОЙ форме
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');// убираем красную рамку инпуту
  errorElement.style.opacity = 0;// делаем невидимым span с ошибкой
  errorElement.textContent = '';// очищаем текст span ошибки 
};

// Функция - если невалидно, вызываем показ ошибки, если валидно, убираем ее
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

// Функция проверяет валидна ли форма (все инпуты в ней). Возвращаем тру или фолс
const isFormValid = inputList => {
  return inputList.every((inputElement) => {
    if (inputElement.validity.valueMissing) {}
    return inputElement.validity.valid;
  });
};

// Функция меняет состояние кнопки active/disabled
const toggleButtonState = (inputList, buttonElement) => {
  if (!isFormValid(inputList)) {
    console.log('форма ни черта не валидна')
    buttonElement.classList.add('button-submit_invalid');
    buttonElement.setAttribute('disabled', true);
  } else {
    console.log('форма валидна')
    buttonElement.classList.remove('button-submit_invalid');
    buttonElement.removeAttribute('disabled', true);
  };
};

// Функция навешивает слушатели каждому инпуту
const setEventListeners = (formElement) => {
  // делаем массив из всех инпутов в ДАННОЙ форме, находим кнопку в этой форме
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.button-submit');
  console.log(inputList)
  toggleButtonState(inputList, buttonElement);
  
  // Каждому инпуту ставим слушатель ввода
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);//показывать или убирать ошибку
      toggleButtonState(inputList, buttonElement);//менять статус кнопки
    });
  });
};

// Функция включение валидации. Для валидации нужно вызвать только ее
const enableValidation = () => {
  const formList = Array.from(document.forms); //массив из всех форм документа
  formList.forEach((formElement) => {//для каждой формы:
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
};

// Включаем валидацию документа
enableValidation();

// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.button-submit',
//   inactiveButtonClass: 'button-submit_invalid',
//   inputErrorClass: 'popup__input_type_error',
//   errorClass: 'popup__input-error_active'
// }); 