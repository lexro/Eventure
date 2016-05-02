import FormValidation from '../forms/form-validation';
import AccountFormValidator from './account-form-validator';

/**
 * Account Form class that handles the account creation.
 */
function AccountForm() {
  this.selector = '.account-form';
  this.selectors = {
    firstPasswordInput: '#account-form__password',
    confirmPasswordInput: '#account-form__confirm-password',
    submitButton: '.account-form__submit-button'
  };
  var formElement = document.querySelector(this.selector);
  this.formValidation = new FormValidation(formElement);
  this.accountFormValidator = new AccountFormValidator();
  this._setupValidation();
}

/**
 * Adds listeners on form elements for validation
 * @return {[type]} [description]
 */
AccountForm.prototype._setupValidation = function () {
  var submitButton = document.querySelector(this.selectors.submitButton);
  submitButton.addEventListener('click', this._validateAccount.bind(this));

  var firstPasswordInput = document.querySelector(this.selectors.firstPasswordInput);
  firstPasswordInput.addEventListener('change', function () {
    this._validatePassword();
  }.bind(this));

  var confirmPasswordInput = document.querySelector(this.selectors.confirmPasswordInput);
  confirmPasswordInput.addEventListener('change', function () {
    this._validateConfirmPassword();
  }.bind(this));
};

/**
 * Validates all fields for account creation
 */
AccountForm.prototype._validateAccount = function () {
  this._validatePassword();
  this._validateConfirmPassword();
};

/**
 * Validates the password field and sets the validation message
 */
AccountForm.prototype._validatePassword = function () {
  var firstPasswordInput = document.querySelector(this.selectors.firstPasswordInput);
  var firstPasswordValue = firstPasswordInput.value;
  var validationMessage = this.accountFormValidator.validatePassword(firstPasswordValue);

  firstPasswordInput.setCustomValidity(validationMessage);
};

/**
 * Validates the confirm password field and sets the validation message
 */
AccountForm.prototype._validateConfirmPassword = function () {
  var firstPasswordValue = document.querySelector(this.selectors.firstPasswordInput).value;
  var confirmPasswordInput = document.querySelector(this.selectors.confirmPasswordInput);
  var confirmPasswordValue = confirmPasswordInput.value;
  var validationMessage = this.accountFormValidator.validateConfirmPassword(firstPasswordValue, confirmPasswordValue);

  confirmPasswordInput.setCustomValidity(validationMessage);
};

export default AccountForm;
