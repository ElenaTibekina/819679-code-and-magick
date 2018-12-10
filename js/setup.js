'use strict';

var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = document.querySelector('.setup-close');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var setupWindow = document.querySelector('.setup');
var similarTemplate = document.querySelector('#similar-wizard-template').content;
var similarList = document.querySelector('.setup-similar-list');
var similarWizard = similarTemplate.querySelector('.setup-similar-item');
var wizardNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizardSurnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0, #e848d5', '#e6e848'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var wizards = [];

var renderWizard = function (wizard) {
  var wizardElement = similarWizard.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name + ' ' + wizard.surname;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var fragment = document.createDocumentFragment();

var getRandomValue = function (array) {
  return Math.floor(Math.random() * array.length);
};

var x = 1;
var getValueInOrder = function (array) {

  var value = array[x++];
  if (x > array.length - 1) {
    x = 0;
  }

  return value;
};

var setWizardFill = function (element, array) {
  element.style.fill = getValueInOrder(array);
};

var setWizardBackground = function (element, array) {
  element.style.backgroundColor = getValueInOrder(array);
};

var wizardCoat = setupWindow.querySelector('.setup-wizard .wizard-coat');
var setCoatColor = function () {
  setWizardFill(wizardCoat, coatColors);
};

wizardCoat.addEventListener('click', setCoatColor);

var wizardEyes = setupWindow.querySelector('.setup-wizard .wizard-eyes');
var setEyesColor = function () {
  setWizardFill(wizardEyes, eyesColors);
};

wizardEyes.addEventListener('click', setEyesColor);

var wizardFireball = setupWindow.querySelector('.setup-fireball-wrap');
var setFireballColor = function () {
  setWizardBackground(wizardFireball, fireballColors);
};

wizardFireball.addEventListener('click', setFireballColor);

for (var i = 0; i < 4; i++) {
  var wizard = {
    name: wizardNames[getRandomValue(wizardNames)],
    surname: wizardSurnames[getRandomValue(wizardSurnames)],
    coatColor: coatColors[getRandomValue(coatColors)],
    eyesColor: eyesColors[getRandomValue(eyesColors)],
    fireballColor: fireballColors[getRandomValue(fireballColors)]
  };

  wizards[i] = wizard;

  fragment.appendChild(renderWizard(wizards[i]));
}

similarList.appendChild(fragment);
setupWindow.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

var userNameInput = setup.querySelector('.setup-user-name');

userNameInput.addEventListener('invaid', function (evt) {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.tooLong) {
    userNameInput.setCustomValidity('Имя не должно превышать 25-ти символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < 2) {
    target.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else {
    target.setCustomValidity('');
  }
});
