import FormValidation from '../forms/form-validation';

function AccountForm() {
  this.selector = '.account-form';
  var formElement = document.querySelector(this.selector);
  this.formValidation = new FormValidation(formElement);
}

export default AccountForm;
