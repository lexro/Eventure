function FormValidation (formElement, submitButtonElement) {
  this.formElement = formElement;
  this.submitButtonElement = submitButtonElement;
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
    if(!form.checkValidity()) {
      event.preventDefault();
    }
  }.bind(this));

  // show the validation message on focus out of an input element
  form.addEventListener('focusout', function (event) {
    var element = event.target;
    if (element.nodeName.toLowerCase() === 'input') {
      this.addErrorMessage(element);
    }
  }.bind(this));

  if (this.submitButtonElement) {
    this.submitButtonElement.addEventListener('click', function (event) {
      if(!form.checkValidity()) {
        var elements = form.querySelectorAll('input');
        var scrollToErrorInput = true;

        for(var i = 0; i < elements.length; i++) {
          let inputElement = elements[i];
          this.addErrorMessage(inputElement);

          if (scrollToErrorInput && !inputElement.validity.valid) {
            scrollToErrorInput = false;
            inputElement.scrollIntoView();
          }
        }
      }
    }.bind(this));
  }
};

/**
 * Adds the error validation message underneath the input element
 *
 * @param {HTMLElement} input - the input element
 */
FormValidation.prototype.addErrorMessage = function (input) {
  var errorElement = input.parentElement.querySelector('.form__error-message') || {};

  if (!input.validity.valid) {
    var validationMessage = input.validationMessage;

    // add validation message
    errorElement.textContent = validationMessage;
    input.classList.remove('form__input-valid');
    input.classList.add('form__input-invalid');
  } else if (input.value) {
    // remove any validation message for valid values
    errorElement.textContent = '';
    input.classList.remove('form__input-invalid');
    input.classList.add('form__input-valid');
  }
};

FormValidation.prototype.reset = function (input) {
  if (input) {
    input.classList.remove('form__input-valid');
    input.classList.remove('form__input-invalid');
    var errorElement = input.parentElement.querySelector('.form__error-message') || {};
    errorElement.textContent = '';
  }
};

export default FormValidation;
