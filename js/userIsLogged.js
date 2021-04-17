document.addEventListener("DOMContentLoaded", function(){
	if(!isLoggedIn()){
		redirectToHomepage({name:"invalidAccess", value:"1"});
	}
	document.querySelector(".logoff-button").addEventListener("click", logout);


	let searchForm = document.querySelector(".search-form");

	searchForm.addEventListener("submit", function(e){
		e.preventDefault();
		onSearchRequest();
	});
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

function onSearchRequest(){
	let searchQuery = document.querySelector(".music-field").value;

	search(searchQuery, 15, function(res){
		showResults(res);
	});
}

function showResults(res){

	let searchBox = document.querySelector(".search-box");
	let form = document.querySelector(".search-form");
	let list = document.querySelector(".music-box");
	form.style.display = 'none';

	for(let i = 0; i < res.length; i++){
		let img = document.createElement("img");
		let div = document.createElement("div");
		let p = document.createElement("p");

		img.classList.add("music-img");
		p.classList.add("music-name");
		div.classList.add("music-details");

		img.src = res[i].album.cover;
		p.innerHTML = res[i].title;
		p.setAttribute("data-artist",res[i].artist.name);

		div.appendChild(img);
		div.appendChild(p);
		list.appendChild(div);
	}

	searchBox.appendChild(list);
	list.classList.add("mbox-active");
}