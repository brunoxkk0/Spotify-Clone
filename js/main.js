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
				checkSpotifyAuth()
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

		if(request.status === 200){
			callback(JSON.parse(request.responseText).token);
		}

	};

	request.send(JSON.stringify({
		email: email,
		password: password
	}));
}

function checkSpotifyAuth(){

	let cached_auth_credentials = localStorage.getItem('auth_credentials');

	let auth_data = {
		credentials_validity: undefined
	}

	if(cached_auth_credentials !== null){
		auth_data = JSON.parse(cached_auth_credentials);
	}

	let expire_time = new Date().getTime();

	if(auth_data.credentials_validity >= expire_time){
		return auth_data;
	}

	let data = new URLSearchParams(window.location.search);
	let access_token = data.get("access_token");

	if(access_token != null){

		let last_auth = localStorage.getItem("last_auth");

		if(last_auth != null && new Date().getTime() < last_auth + (3600000)){

			auth_data = {
				credentials_validity: last_auth + 3600000,
				access_token: access_token,
				token_type: data.get("token_type")
			}

			localStorage.setItem("auth_credentials", JSON.stringify(auth_data));

			return auth_data;
		}

	}

	callSpotifyAuth();

}

function callSpotifyAuth(){

	let Scopes = [
		"user-read-private"
	]

	let Params = {
		client_id: "16b2643340d04892ab30d20bfe554546",
		response_type: "token",
		redirect_uri: "https://brunoxkk0.github.io/Spotify-Clone/",
		scope: encodeURI(Scopes.join(' '))
	}

	let auth_url = "https://accounts.spotify.com/authorize?" + Object.keys(Params).map(key => key + '=' + Params[key]).join('&');

	let width 	= 450
	let height 	= 730
	let left 	= (screen.width / 2) - (width / 2)
	let top 	= (screen.height / 2) - (height / 2);

	localStorage.setItem('last_auth', "" + new Date().getTime());
	window.open(auth_url, '_self', 'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left );
}