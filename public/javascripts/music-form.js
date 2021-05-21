document.addEventListener("DOMContentLoaded", function(){
    let musicForm = document.querySelector('.music-form');
    musicForm.addEventListener('submit', validateFields);
});

function validateFields(e){
    let musicName = document.getElementById('music_name');
    let singerName = document.getElementById('singer_name');
    let albumName = document.getElementById('album_name');
    let musicDuration = document.getElementById('music_duration');
    let albumCover = document.getElementById('cover');
    let errorBox = document.querySelector('.music-error');
    let error = false;


    if(musicName.value.length <= 0){
        musicName.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }else{
        musicName.classList.remove('field-empty');
    }

    if(singerName.value.length <= 0){
        singerName.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }else{
        singerName.classList.remove('field-empty');
    }

    if(albumName.value.length <= 0){
        albumName.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }else{
        albumName.classList.remove('field-empty');
    }

    if(musicDuration.value.length <= 0){
        musicDuration.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }else{
        musicDuration.classList.remove('field-empty');
    }

    if(albumCover.value.length <= 0){
        e.preventDefault();
        error = true;
    }

    if(error){
        errorBox.classList.add('active');
    }
}