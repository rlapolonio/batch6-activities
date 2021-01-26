function disable_enable() {
    if(document.getElementById("add-courses").checked) {
        document.getElementById("specify-field").style.display="block";
        document.getElementById("specify").style.display="block";
    } else {
        document.getElementById("specify-field").style.display="none";
        document.getElementById("specify").style.display="none";
    }
}


const form = document.getElementsByTagName('form')[0];

const nameInput = document.getElementById("name");
const nameError = document.getElementById("name-error");

const email = document.getElementById("email");
const emailError1 = document.getElementById("email-error1");
const emailError2 = document.getElementById("email-error2");

const num = document.getElementById("number");
const numError1 = document.getElementById("num-error1");
const numError2 = document.getElementById("num-error2");


email.addEventListener("input", emailErrorInitial);

nameInput.addEventListener("input", nameErrorInitial);

num.addEventListener("input", function(input) {
    if (num.validity.valid) {
        numError1.style.display = 'none';
        numError2.style.display = 'none';
    } else if (num.value > 99) {
        numError2.style.display = 'block';
    } else if (isNaN(input)) {
        numError1.style.display = 'block';
        num.validity.valid = 'false';
    }
});


form.addEventListener("submit", function (event) {
    nameInput.required = "true";
    email.required = "true";
    num.required = "true";
    
    if (!email.validity.valid || email.validity.valueMissing) {
        showError();
        event.preventDefault();
        email.focus();
    } else if (!num.validity.valid || email.validity.valueMissing) {
        showError();
        event.preventDefault();
        num.focus();
    } else if (!nameInput.validity.valid || nameInput.validity.valueMissing) {
        showError();
        event.preventDefault();
        nameInput.focus();
    }
});

function emailErrorInitial() {
    if (email.validity.valid) {
        emailError1.style.display = 'none';
        emailError2.style.display = 'none';
    } else {
        showEmailError();
    }
}

function nameErrorInitial() {
    if (nameInput.validity.valid) {
        nameError.style.display = 'none';
    } else {
        showNameError();
    }
}

function showNameError() {
    if (nameInput.validity.valueMissing) {
        nameError.style.display = "block";
    }
}

function showEmailError() {
    if (email.validity.typeMismatch) {
        emailError2.style.display = 'block';
    } else if (email.validity.valueMissing) {
        emailError1.style.display = 'block';
    }
}

function showNumError() {
    if (num.validity.valueMissing) {
        numError1.style.display = "block";
    }

}

function showError() {
    showNameError();
    showEmailError();
    showNumError();
}
