document.addEventListener("DOMContentLoaded", function(){
    let musicForm = document.querySelector('.music-form');
    musicForm.addEventListener('submit', validateFields);
});

function validateFields(e){
    let music_name = document.getElementById('music_name');
    let singer_name = document.getElementById('singer_name');
    let album_name = document.getElementById('album_name');
    let music_length = document.getElementById('music_length');

    let errorBox = document.querySelector('.music-error');
    let error = false;

    if(music_name.value.length <= 0){
        music_name.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }

    if(singer_name.value.length <= 0){
        singer_name.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }

    if(album_name.value.length <= 0){
        album_name.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }

    if(music_length.value.length <= 0){
        music_length.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }

    if(error){
        errorBox.classList.add('active');
    }
}