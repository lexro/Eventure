function FormValidation (formElement) {
  this.formElement = formElement;
  this.setup();
}

FormValidation.prototype.setup = function () {
  var form = this.formElement;

  // prevent the default validation bubble from showing for all
  // child elements of this form
  form.addEventListener('invalid', function (event) {
    event.preventDefault();
  }, true);

  // some browsers such as safari will submit when there are
  // errors in the form
  form.addEventListener('submit', function (event) {
    if(!this.checkValidity()) {
      event.preventDefault();
    }
  });

  // show the validation message on focus out of an input element
  form.addEventListener('focusout', function (event) {
    var input = event.target;
    var errorElement = input.parentElement.querySelector('.form__error-message') || {};

    if (!input.validity.valid) {
      var validationMessage = input.validationMessage;

      // add validation message
      errorElement.textContent = validationMessage;
    } else {
      // remove any validation message for valid values
      errorElement.textContent = '';
    }
  });
};

export default FormValidation;
