import FormValidation from '../forms/form-validation';
import AccountFormValidator from './account-form-validator';
import debounce from '../utils/debounce';

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
  this.debounceTime = 250;
  var formElement = document.querySelector(this.selector);
  var submitButton = formElement.querySelector(this.selectors.submitButton);
  this.formValidation = new FormValidation(formElement, submitButton);
  this.accountFormValidator = new AccountFormValidator();
  this._setupValidation();
}

AccountForm.prototype.getAccountForm = function () {
  return document.querySelector(this.selector);
};

/**
 * Adds listeners on form elements for validation
 */
AccountForm.prototype._setupValidation = function () {
  var submitButton = document.querySelector(this.selectors.submitButton);
  submitButton.addEventListener('click', this._validateAccount.bind(this));

  var firstPasswordInput = document.querySelector(this.selectors.firstPasswordInput);
  var confirmPasswordInput = document.querySelector(this.selectors.confirmPasswordInput);
  var validateFunc = debounce(function () {
    this._validatePassword();
    this._validateConfirmPassword();
    this.formValidation.addErrorMessage(firstPasswordInput);
    this.formValidation.addErrorMessage(confirmPasswordInput);
  }.bind(this), this.debounceTime);

  firstPasswordInput.addEventListener('input', validateFunc);
  confirmPasswordInput.addEventListener('input', validateFunc);
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
