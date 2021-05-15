document.addEventListener("DOMContentLoaded", function(){
    let loginForm = document.querySelector('.login-form');
    loginForm.addEventListener('submit', validateFields);
});

function validateFields(e){
    let username = document.getElementById('username');
    let pass = document.getElementById('password');
    let errorBox = document.querySelector('.login-error');
    let error = false;

    if(username.value.length <= 0){
        username.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }
    
    if(pass.value.length <= 0){
        pass.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }

    if(error){
        errorBox.classList.add('active');
    }
}