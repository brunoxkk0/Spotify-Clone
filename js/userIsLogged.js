document.addEventListener("DOMContentLoaded", function(){
	if(!isLoggedIn()){
		redirectToHomepage({name:"invalidAccess", value:"1"});
	}
	document.querySelector(".logoff-button").addEventListener("click", logout);
});

function redirectToHomepage(param){
	if(param != null){
		window.location.href = "index.html" + "?" + param.name + "=" + param.value;
	}else{
		window.location.href = "index.html";
	}
}

function isLoggedIn(){
	let token = localStorage.getItem("loginToken");

	if(token != null){
		return true;
	}
}

function logout(){
	let token = localStorage.removeItem("loginToken");

	redirectToHomepage({name:"logout", value:"1"});
}