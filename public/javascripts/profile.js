document.addEventListener("DOMContentLoaded", function(){
    let form = document.querySelector(".search-form");
    let switchButton = document.querySelector(".switch-button");
    form.addEventListener("submit", searchMusics);

    switchButton.addEventListener("click", switchAction);
});

function searchMusics(e){
    let request = new XMLHttpRequest();
    let musicName = document.getElementById("music-name").value;

    e.preventDefault();

    request.open("POST", "/musics/get-musics", true);
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    request.onreadystatechange = function () {

        if(request.readyState !== 4){
            return;
        }
        showMusics(JSON.parse(request.responseText));
    };

    request.send(JSON.stringify({
        music: musicName
    }));
}

function showMusics(musics){
    let musicBox = document.querySelector(".music-box");
    cleanMusics(musicBox);

    for(let i = 0; i < musics.length; i++){
        let musicItem = document.createElement("div");
        let albumCover = document.createElement("div");
        let musicData = document.createElement("div");
        let playButton = document.createElement("div");
        let musicName = document.createElement("h1");
        let musicArtist = document.createElement("h2");
        let musicDuration = document.createElement("h3");
        let cover = document.createElement("img");

        albumCover.classList.add("album-cover");
        musicData.classList.add("music-data");
        playButton.classList.add("play-button");
        musicName.classList.add("music-name");
        musicDuration.classList.add("music-duration");
        musicArtist.classList.add("music-artist");
        musicItem.classList.add("music-item");

        cover.src = "../public/images/Spotify-Play-Button-1.png";

        musicName.innerHTML = musics[i].music_name;
        musicDuration.innerHTML = musics[i].music_duration;
        musicArtist.innerHTML = musics[i].singer_name;

        musicData.appendChild(musicName);
        musicData.appendChild(musicArtist);
        musicData.appendChild(musicDuration);

        playButton.appendChild(cover);

        musicItem.appendChild(albumCover);
        musicItem.appendChild(musicData);
        musicItem.appendChild(playButton);
        musicBox.appendChild(musicItem);
    }

}

function cleanMusics(musicBox){
    while (musicBox.firstChild) {
        musicBox.removeChild(musicBox.firstChild);
    }
}

function switchAction(e){
    let button = e.target;
    
    if(button.getAttribute('data-current') === 'search'){
        button.innerHTML = "Buscar";
        button.setAttribute("data-current", "my_musics");
        myMusicsContext();
    }else{
        button.innerHTML = "Minhas Músicas";
        button.setAttribute("data-current", "search");
        searchContext();
    }
}

function searchContext(){
    let musicBox = document.querySelector(".music-box");
    let form = document.createElement("form");
    let searchBox = document.createElement("div");
    let dashboardContent = document.querySelector(".dashboard-content");
    let input = document.createElement("input");
    let button = document.createElement("button");

    button.classList.add("search-button");
    button.innerHTML = "Buscar";

    input.setAttribute("id", "music-name");
    input.setAttribute("name", "music-name");
    input.setAttribute("type", "text");

    form.classList.add("search-form");
    form.setAttribute("method", "post");
    form.setAttribute("action", "#");
    form.appendChild(input);
    form.appendChild(button);

    searchBox.classList.add("search-box");
    searchBox.appendChild(form);
    musicBox.classList.remove("my-musics-box");
    dashboardContent.insertBefore(searchBox, musicBox);
    form.addEventListener("submit", searchMusics);
    cleanMusics(musicBox);
}

function myMusicsContext(){
    let request = new XMLHttpRequest();
    let searchBox = document.querySelector(".search-box");
    let musicBox = document.querySelector(".music-box");
    musicBox.classList.add("my-musics-box");
    searchBox.remove();

    request.open("GET", "/musics/get-admin-musics", true);
    request.setRequestHeader("Content-Type", "application/json; charset=utf-8")
    request.onreadystatechange = function () {

        if(request.readyState !== 4){
            return;
        }
        showMusics(JSON.parse(request.responseText));
    };

    request.send();
    cleanMusics(musicBox);
}