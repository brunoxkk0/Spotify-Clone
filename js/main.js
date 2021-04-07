document.addEventListener('DOMContentLoaded', function(){

	let signInButtons = document.getElementsByClassName("signin-button");
	let loginModalBackground = document.querySelector(".login-modal-background");
	let loginModalClose = document.querySelector(".close-button");
	let loginForm = document.querySelector(".login-form");

	loginModalBackground.addEventListener("click", disableModal);
	loginModalClose.addEventListener("click", disableModal);

	for(let i = 0; i < signInButtons.length; i++)
		signInButtons.item(i).addEventListener("click", activeModal);

	loginForm.addEventListener("submit", function (event){
		event.preventDefault();
		onSignInRequest();
	})

});

function activeModal() {
	let doc = document.querySelector(".login-modal");
	let body = document.querySelector(".site-body");
	let modalBackground = document.querySelector(".login-modal-background");

	body.classList.add("disable-scroll");
	doc.classList.add("login-modal-active");
	modalBackground.classList.add("login-m-background-active");
}

function disableModal(){
	let doc = document.querySelector(".login-modal");
	let body = document.querySelector(".site-body");
	let modalBackground = document.querySelector(".login-modal-background");

	body.classList.remove("disable-scroll");
	doc.classList.remove("login-modal-active");
	modalBackground.classList.remove("login-m-background-active");
}

function onSignInRequest(){

	let usernameField = document.querySelector(".login-username-field");
	let passwordField = document.querySelector(".login-password-field");
	let loginBoxError = document.querySelector(".login-box-error");

	if(usernameField.value != null && passwordField.value != null){
		requestLogin(usernameField.value, passwordField.value, function (response){
			if(response.error){
				loginBoxError.classList.add("active-error");
				loginBoxError.innerHTML = response.error;
				setErrorFields();
			}else{
				localStorage.setItem("loginToken",response.token)
			}
		});
	}
}

function requestLogin(email, password, callback){

	let request = new XMLHttpRequest();

	request.open("POST", "https://reqres.in/api/login", true);
	request.setRequestHeader("Content-Type", "application/json; charset=utf-8")
	request.onreadystatechange = function () {

		if(request.readyState !== 4){
			return;
		}

		callback(JSON.parse(request.responseText));	
	};

	request.send(JSON.stringify({
		email: email,
		password: password
	}));
}

function setErrorFields(){
	if(usernameField.value == ""){
		usernameField.classList.add("error-field");
	}else{
		usernameField.classList.remove("error-field");
	}

	if(passwordField.value == ""){
		passwordField.classList.add("error-field");
	}else{
		passwordField.classList.remove("error-field");
	}
}