function AccountFormValidator () {
  var SELECTORS = {
    firstPasswordInput: '#account-form__password',
    confirmPasswordInput: '#account-form__confirm-password',
    submitButton: '.account-form__submit-button'
  };

  var firstPasswordInput = document.querySelector(SELECTORS.firstPasswordInput);
  var confirmPasswordInput = document.querySelector(SELECTORS.confirmPasswordInput);
  var submitButton = document.querySelector(SELECTORS.submitButton);

  var VALIDATIONS = {
    sybmol: [/[\!\@\#\$\%\^\&\*]/g, 'Should have a symbol (!, @, #, $, %, ^, &, *)'],
    number: [/\d/g, 'Should have a number'],
    lowercase: [/[a-z]/g, 'Should have a lowercase letter'],
    uppercase: [/[A-Z]/g, 'Should have uppercase letter'],
    illegalCharacter: [/[^A-z0-9\!\@\#\$\%\^\&\*]/g, 'Illegal Character']
  };

  /**
   * Checks a password against certain criteria including character length and symbols.
   *
   * @param  {String} password - The password to validate
   * @return {Array<String>} - List of validation messages that the password needs to meet
   */
  function validatePassword(password) {
    var minPasswordLength = 8;
    var validationMessages = [];

    if (password.length < minPasswordLength) {
        validationMessages.push('Should be at least ' + minPasswordLength + ' characters');
    }

    for(var issue in VALIDATIONS) {
      var validation = VALIDATIONS[issue];
      if (!password.match(validation[0])) {
        validationMessages.push(validation[1]);
      }
    }

    return validationMessages;
  }

  submitButton.addEventListener('click', function () {
    var firstPasswordValue = firstPasswordInput.value;
    var confirmPasswordValue = confirmPasswordInput.value;
    var validationMessages = [];
    var validationMessage;

    if (firstPasswordValue && firstPasswordValue !== confirmPasswordValue) {
      validationMessages.push('Passwords should match');
    }  else {
      validationMessages = validatePassword(firstPasswordValue);
    }

    if (validationMessages.length) {
      validationMessage = 'Please fix these issues:\n' + validationMessages.join('\n');
      firstPasswordInput.setCustomValidity(validationMessage);
    }
  });

}

export default new AccountFormValidator();
