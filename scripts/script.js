pwField = document.getElementById('userpassword');
pwConfirmField = document.getElementById('userpassword-confirm');
inputs = document.querySelectorAll('div.form > input');

function checkValidity() {
  inputs.forEach(n => {
    if (n.validity.valid) {
      n.classList.add('valid');
    }
  });
}
