/**
 * AccountFormValidator class that holds the logic for account creation validation
 */
function AccountFormValidator () {

  // error if password doesn't have these
  this.positiveValidations = {
    sybmol: [/[\!\@\#\$\%\^\&\*]/g, 'Should have a symbol (!, @, #, $, %, ^, &, *)'],
    number: [/\d/g, 'Should have a number'],
    lowercase: [/[a-z]/g, 'Should have a lowercase letter'],
    uppercase: [/[A-Z]/g, 'Should have an uppercase letter']
  };

  // error if password has these
  this.negativeValidations = {
    illegalCharacter: [/[^A-z0-9\!\@\#\$\%\^\&\*]/g, 'Illegal Character']
  };

  this.minPasswordLength = 8;
}

/**
 * Returns a single validation message to display
 *
 * @param  {String} firstPasswordValue the password
 * @return {String}                    Validation message, empty string if no errors
 */
AccountFormValidator.prototype.validatePassword = function (firstPasswordValue) {
  var validationMessages = [];
  var validationMessage = '';

  validationMessages = this._validatePassword(firstPasswordValue);

  if (validationMessages.length) {
    validationMessage = validationMessages[0];
  }

  return validationMessage;
};

/**
 * Checks a password against certain criteria including character length and symbols.
 *
 * @param  {String} password - The password to validate
 * @return {Array<String>} - List of validation messages that the password needs to meet
 */
AccountFormValidator.prototype._validatePassword = function (password) {
  var minPasswordLength = this.minPasswordLength;
  var validationMessages = [];
  var issue;

  if (password.length < minPasswordLength) {
      validationMessages.push('Should be at least ' + minPasswordLength + ' characters');
  }

  for (issue in this.positiveValidations) {
    let validation = this.positiveValidations[issue];
    if (!password.match(validation[0])) {
      validationMessages.push(validation[1]);
    }
  }

  for (issue in this.negativeValidations) {
    let validation = this.negativeValidations[issue];
    if (password.match(validation[0])) {
      validationMessages.push(validation[1]);
    }
  }

  return validationMessages;
};

/**
 * Checks for equality between the two passwords
 * @param  {String} firstPasswordValue   The original password
 * @param  {String} confirmPasswordValue the retyped password
 * @return {String}                      A validation message, empty string if nothing wrong
 */
AccountFormValidator.prototype.validateConfirmPassword = function (firstPasswordValue, confirmPasswordValue) {
  if (firstPasswordValue !== confirmPasswordValue) {
    return 'Passwords should match';
  }

  return '';
};

export default AccountFormValidator;
