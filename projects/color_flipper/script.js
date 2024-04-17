/* Get the data from the form */
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const usernameERRORMsg = 'Username is required';
const emailERRORMsg = 'Email is required';
const passwordERRORMsg = 'Password is required';
const password2ERRORMsg = 'Password confirmation required';

/* Functions */
function showError(input, message) {
    // Queremos tomar el TAG padre un elemento, .parentElement 
    // nos permite hacerlo
    const formControl = input.parentElement;
    // Tomamos ese TAG padre de Input y le vamos a agregar una clase nueva
    formControl.className = 'form-control error';
    // Luego vamos a tomar ese elemento formControl que contiene varios 
    // .querySelector nos permite buscar dentro de un grupo un TAG 
    // de nombre 'small'
    const small = formControl.querySelector('small');
    // Usando .innerText nos permite cambiar el texto en un TAG por otro
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
    const small = formControl.querySelector('small');
    small.innerText = "Approved"
}

// Check email is valid
const checkEmail = (input) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(input)) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

// Revisar los fields necesarios
function checkRequired(inputArr) {
    inputArr.forEach(function(input) {
        if(input.value.trim() === '') {
            // Retornar el error con base en el valor obtenido y el input id a tratar
            showError(input, `${getFieldName(input)} is required`);
        } else {
            // Retornar un mensaje de Aprobado
            showSuccess(input);
        }
    })
}

// Verificar largo del INPUT
function checkLength(input, max, min) {
    if(input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldname(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

// Verificar que el password coincida
function checkPasswordsMatch(input1, input2) {
    if(input1.value !== input2.value){
        showError(input2, 'Password does not match');
    }
}

// Obtener el fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

/* The function takes event parameters, that's why we set it as function(e) */
form.addEventListener('submit', function(e) {
    /* 
        Nos ayuda a evitar comportamientos default de algunos objetos como este 
        de evitar que se envié directamente y lo interceptaremos 
    */
    e.preventDefault();
    
    // Se puede simplificar mas el proceso para mejorar el codigo
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);

    /*
    Una opcion basica principiante que se puede aplicar

    if(username.value === '') {
        console.log(usernameERRORMsg);
        showError(username, usernameERRORMsg);
    } else {
        showSuccess(username);
    }

    if(email.value === '') {
        console.log(emailERRORMsg);
        showError(email, emailERRORMsg);
    } else if (!isValidEmail(email.value)){
        showError(email, 'Email is not valid');
    } else {
        showSuccess(email);
    }

    if(password.value === '') {
        console.log(passwordERRORMsg);
        showError(password, passwordERRORMsg);
    } else {
        showSuccess(password);
    }

    if(password2.value === '') {
        console.log(password2ERRORMsg);
        showError(password2, password2ERRORMsg);
    } else {
        showSuccess(password2);
    }
    */
});

/**
 * I can try a simple encryption to apply knowledge to the concept as like
 * the following link: https://www.npmjs.com/package/crypto-js
 * Source: https://stackoverflow.com/questions/18279141/javascript-string-encryption-and-decryption
 * NPM install Source: https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Understanding_client-side_tools/Package_management
 */
