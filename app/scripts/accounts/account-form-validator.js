/**
 * AccountFormValidator class that holds the logic for account creation validation
 */
function AccountFormValidator () {
  this.validations = {
    sybmol: [/[\!\@\#\$\%\^\&\*]/g, 'Should have a symbol (!, @, #, $, %, ^, &, *)'],
    number: [/\d/g, 'Should have a number'],
    lowercase: [/[a-z]/g, 'Should have a lowercase letter'],
    uppercase: [/[A-Z]/g, 'Should have uppercase letter'],
    illegalCharacter: [/[^A-z0-9\!\@\#\$\%\^\&\*]/g, 'Illegal Character']
  };

  this.minPasswordLength = 8;
}

AccountFormValidator.prototype.validatePassword = function (firstPasswordValue) {
  var validationMessages = [];
  var validationMessage = '';

  validationMessages = this._validatePassword(firstPasswordValue);

  if (validationMessages.length) {
    validationMessage = 'Please fix these issues:\n' + validationMessages.join('\n');
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

  if (password.length < minPasswordLength) {
      validationMessages.push('Should be at least ' + minPasswordLength + ' characters');
  }

  for(var issue in this.validations) {
    var validation = this.validations[issue];
    if (!password.match(validation[0])) {
      validationMessages.push(validation[1]);
    }
  }

  return validationMessages;
};

/**
 * Checks for equality between the two passwords
 * @param  {String} firstPasswordValue   The original password
 * @param  {String} confirmPasswordValue the retyped password
 * @return {String}                      A validation message, null if nothing wrong
 */
AccountFormValidator.prototype.validateConfirmPassword = function (firstPasswordValue, confirmPasswordValue) {
  if (firstPasswordValue && firstPasswordValue !== confirmPasswordValue) {
    return  'Passwords should match';
  }
};

export default AccountFormValidator;
