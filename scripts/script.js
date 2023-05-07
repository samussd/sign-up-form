pwField = document.getElementById('userpassword');
pwConfirmField = document.getElementById('userpassword-confirm');
inputs = document.querySelectorAll('div.form > input');
forms = document.querySelectorAll('.form');


function checkValidityFocus(form) {
  input = form.children[1];
  textArea = form.nextElementSibling;

  if (input.validity.valid && input.id !== 'userpassword-confirm') {
    form.classList.add('valid');
    textArea.innerHTML = '&nbsp';
  }
  else form.classList.remove('valid');
};

function checkValidityBlur(form) {
  input = form.children[1];
  textArea = form.nextElementSibling;

  if (input.value != '' && input.validity.patternMismatch) {
    if (input.id == 'firstname') textArea.textContent = '* First name must contain only letters';
    if (input.id == 'lastname') textArea.textContent = '* Last name must contain only letters';
    if (input.id == 'useremail') textArea.textContent = '* Email must follow this format: name@mail.com';
    if (input.id == 'userphone') textArea.textContent = '* Phone number must contain only numbers';
  }
  else if (input.id !== 'userpassword-confirm') textArea.innerHTML = '&nbsp';
};

function checkPassword(pwField) {
  textArea = pwField.parentElement.nextElementSibling;
  finalText = '';

  if (pwField.value != '' && pwField.validity.patternMismatch) {
    if (pwField.value.length < 8) finalText += '* Must be at least 8 characters long <br>';
    if (!/[a-z]/.test(pwField.value)) finalText += '* Must have at least 1 lowercase letter <br>';
    if (!/[A-Z]/.test(pwField.value)) finalText += '* Must have at least 1 uppercase letter <br>';
    if (!/[@$!%*?&]/.test(pwField.value)) finalText += '* Must have at least 1 special character <br>';
    if (!/\d/.test(pwField.value)) finalText += '* Must have at least 1 number <br>';

    console.log(finalText);
    textArea.innerHTML = finalText;
  }
  else textArea.innerHTML = '&nbsp';
}

function confirmPassword() {
  textArea = pwConfirmField.parentElement.nextElementSibling;

  if (pwField.value != pwConfirmField.value) {
    textArea.textContent = '* The passwords do not match';
    pwConfirmField.parentElement.classList.remove('valid');
    pwConfirmField.validity.valid = false;
  }
  else textArea.innerHTML = '&nbsp';
}

forms.forEach(form => form.querySelector('input')
  .addEventListener('input', () => checkValidityFocus(form)));

forms.forEach(form => form.querySelector('input')
  .addEventListener('blur', () => checkValidityBlur(form)));

pwField
  .addEventListener('input', () => {checkPassword(pwField); confirmPassword()});

pwConfirmField
  .addEventListener('input', () => confirmPassword());
