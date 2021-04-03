document.addEventListener('DOMContentLoaded', function(){

	let signInButtons = document.getElementsByClassName("signin-button");
	let loginModalBackground = document.querySelector(".login-modal-background");
	let loginModalClose = document.querySelector(".close-button");

	loginModalBackground.addEventListener("click", disableModal);
	loginModalClose.addEventListener("click", disableModal);

	for(let i = 0; i < signInButtons.length; i++)
		signInButtons.item(i).addEventListener("click", activeModal);
	
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
