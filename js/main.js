document.addEventListener('DOMContentLoaded', function(){
	checkInvalidAccess();

	let signInButtons = document.getElementsByClassName("signin-button");
	let loginModalBackground = document.querySelector(".login-modal-background");
	let loginModalClose = document.querySelector(".close-login-button");
	let loginForm = document.querySelector(".login-form");

	let signUpButtons = document.getElementsByClassName("signup-button");
	let registerModalBackground = document.querySelector(".register-modal-background");
	let registerModalClose = document.querySelector(".close-register-button");
	let signUpForm = document.querySelector(".register-form");

	loginModalBackground.addEventListener("click", disableLoginModal);
	loginModalClose.addEventListener("click", disableLoginModal);

	registerModalBackground.addEventListener("click", disableRegisterModal);
	registerModalClose.addEventListener("click", disableRegisterModal);

	for(let i = 0; i < signUpButtons.length; i++){
		signInButtons.item(i).addEventListener("click", activeLoginModal);
		signUpButtons.item(i).addEventListener("click", activeRegisterModal);
	}
	
	signUpForm.addEventListener("submit", function (event){
		event.preventDefault();
		onSignUpRequest();
	});

	loginForm.addEventListener("submit", function (event){
		event.preventDefault();
		onSignInRequest();
	});
});

function activeLoginModal() {
	let doc = document.querySelector(".login-modal");
	let body = document.querySelector(".site-body");
	let modalBackground = document.querySelector(".login-modal-background");

	body.classList.add("disable-scroll");
	doc.classList.add("login-modal-active");
	modalBackground.classList.add("login-m-background-active");
}

function disableLoginModal(){
	let doc = document.querySelector(".login-modal");
	let body = document.querySelector(".site-body");
	let modalBackground = document.querySelector(".login-modal-background");

	body.classList.remove("disable-scroll");
	doc.classList.remove("login-modal-active");
	modalBackground.classList.remove("login-m-background-active");
}

function activeRegisterModal(prefix) {
	let doc = document.querySelector(".register-modal");
	let body = document.querySelector(".site-body");
	let modalBackground = document.querySelector(".register-modal-background");

	body.classList.add("disable-scroll");
	doc.classList.add("register-modal-active");
	modalBackground.classList.add("register-m-background-active");
}

function disableRegisterModal(prefix){
	let doc = document.querySelector(".register-modal");
	let body = document.querySelector(".site-body");
	let modalBackground = document.querySelector(".register-modal-background");

	body.classList.remove("disable-scroll");
	doc.classList.remove("register-modal-active");
	modalBackground.classList.remove("register-m-background-active");
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
				localStorage.setItem("loginToken", response.token);
				redirectToSearch();
			}
		});
	}
}

function onSignUpRequest(){

	let usernameField = document.querySelector(".register-username-field");
	let passwordField = document.querySelector(".register-password-field");
	let registerBoxError = document.querySelector(".register-box-error");

	if(usernameField.value != null && passwordField.value != null){
		requestRegister(usernameField.value, passwordField.value, function (response){
			if(response.error){
				registerBoxError.classList.add("active-error");
				registerBoxError.innerHTML = response.error;
				setErrorFields();
			}else{
				localStorage.setItem("loginToken",response.token);
				redirectToSearch();
			}
		});
	}
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

function requestRegister(email, password, callback){

    let request = new XMLHttpRequest();

    request.open("POST", "https://reqres.in/api/register", true);
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8");

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

function redirectToSearch(){
	window.location.href = "userIsLogged.html"
}

function checkInvalidAccess(){
	let data = new URLSearchParams(window.location.search);
	let invalidAccess = data.get("invalidAccess");
	let loginBoxError = document.querySelector(".login-box-error");

	if(invalidAccess != null){
		loginBoxError.classList.add("active-error");
		loginBoxError.innerHTML = "Você precisa realizar o login";
		activeModal();
	}
}

function search(query, limit, callback){

	let request = new XMLHttpRequest();

	request.open("GET", "https://api.lyrics.ovh/suggest/" + query, true);
	request.setRequestHeader("Content-Type", "application/json; charset=utf-8");

	request.onreadystatechange = function () {

		if(request.readyState !== 4){
			return;
		}

		let content = [];

		if(request.status === 200){

			let data = JSON.parse(request.responseText).data;

			limit = (limit >= 15 ? 15 : limit);
			let max = (limit > data.length ? data.length : limit);

			for(let i = 0; i < max ; i++ ) {

				let dt = data[i];

				content[i] = {

					artist: {
						name: dt.artist.name,
						picture: dt.artist.picture
					},

					album: {
						title: dt.album.title,
						cover: dt.album.cover
					},

					title: dt.title
				};
			}
		}

		callback(content);
	};

	request.send();
}

function searchLyric(music, callback){

	let request = new XMLHttpRequest();

	request.open("GET", "https://api.lyrics.ovh/v1/" + music.artist.name + "/" + music.title, true);
	request.setRequestHeader("Content-Type", "application/json; charset=utf-8");

	request.onreadystatechange = function () {

		if(request.readyState !== 4){
			return;
		}

		let content = "";

		if(request.status === 200){
			content = JSON.parse(request.responseText);
		}

		callback(content);
	};

	request.send();
}