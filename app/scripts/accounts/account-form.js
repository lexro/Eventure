import FormValidation from '../forms/form-validation';
import AccountFormValidator from './account-form-validator';

/**
 * Account Form class that handles the account creation.
 */
function AccountForm() {
  this.selector = '.account-form';
  var formElement = document.querySelector(this.selector);
  this.formValidation = new FormValidation(formElement);
}

export default AccountForm;
