document.addEventListener('DOMContentLoaded', function(){

	let signInButtons = document.getElementsByClassName("signin-button");

	for(let i = 0; i < signInButtons.length; i++)
		signInButtons.item(i).addEventListener("click", onLoginClick);

});

function onLoginClick() {
	let doc = document.querySelector(".login-modal");

	doc.classList.add("login-modal-active");
}
