document.addEventListener("DOMContentLoaded", function(){
    let isAdmCheck = document.getElementById("is_adm");
    let createForm = document.querySelector('.create-form');

    createForm.addEventListener('submit', validateFields);

    isAdmCheck.addEventListener("click", function(e){
        let admCodeBox = document.querySelector(".is_adm_code_box");
        if(e.target.checked){
            admCodeBox.classList.add("active");
        }else{
            admCodeBox.classList.remove("active");
        }
    });
});

function validateFields(e){
    let username = document.getElementById('username');
    let name = document.getElementById('name');
    let email = document.getElementById('email');
    let pass = document.getElementById('password');
    let errorBox = document.querySelector('.create-error');
    let error = false;

    if(username.value.length <= 0){
        username.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }

    if(name.value.length <= 0){
        name.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }

    if(email.value.length <= 0){
        email.classList.add('field-empty');
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