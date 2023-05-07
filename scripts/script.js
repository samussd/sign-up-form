pwField = document.getElementById('userpassword');
pwConfirmField = document.getElementById('userpassword-confirm');
inputs = document.querySelectorAll('div.form > input');
forms = document.querySelectorAll('.form');

/** Adds a check next to the input if it's valid */
function addCheck(form) {
  input = form.children[1];
  textArea = form.nextElementSibling;

  if (input.validity.valid && input.id !== 'userpassword-confirm') {
    form.classList.add('valid');
    textArea.innerHTML = '&nbsp';
  }
  else form.classList.remove('valid');
};

/** Adds an error message with a requirement for the input if it's invalid */
function inputCheck(form) {
  input = form.children[1];
  textArea = form.nextElementSibling;

  if (input.value != '' && input.validity.patternMismatch) {
    if (input.id == 'firstname') textArea.textContent = '* First name must contain only letters';
    if (input.id == 'lastname') textArea.textContent = '* Last name must contain only letters';
    if (input.id == 'useremail') textArea.textContent = '* Email must follow this format: name@mail.com';
    if (input.id == 'userphone') textArea.textContent = '* Phone number must contain only numbers';
  }
  else textArea.innerHTML = '&nbsp';
};

/** Adds an error message with requirements for the password field if necessary */
function passwordCheck() {
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

function confirmPasswordCheck() {
  textArea = pwConfirmField.parentElement.nextElementSibling;

  if (pwField.value!=pwConfirmField.value) {
    textArea.textContent = '* The passwords do not match';
    pwConfirmField.parentElement.classList.remove('valid');
    pwConfirmField.validity.valid = false;
  }
  else {
    if (!pwConfirmField.validity.patternMismatch && pwConfirmField.value!='') 
      pwConfirmField.parentElement.classList.add('valid');
    textArea.innerHTML = '&nbsp'
  };
}

forms.forEach(form => form.querySelector('input')
  .addEventListener('input', () => addCheck(form)));

forms.forEach(form => form.querySelector('input')
  .addEventListener('blur', () => inputCheck(form)));

pwField
  .addEventListener('input', () => {passwordCheck(); confirmPasswordCheck()});

pwConfirmField
  .addEventListener('input', () => confirmPasswordCheck());

pwConfirmField
  .addEventListener('blur', () => confirmPasswordCheck());
