document.addEventListener("DOMContentLoaded", function(){
    let musicForm = document.querySelector('.music-form');
    musicForm.addEventListener('submit', validateFields);
});

function validateFields(e){
    let musicName = document.getElementById('music_name');
    let singerName = document.getElementById('singer_name');
    let albumName = document.getElementById('album_name');
    let musicDuration = document.getElementById('music_duration');

    let errorBox = document.querySelector('.music-error');
    let error = false;

    if(music_name.value.length <= 0){
        music_name.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }

    if(singerName.value.length <= 0){
        singerName.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }

    if(albumName.value.length <= 0){
        albumName.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }

    if(musicLength.value.length <= 0){
        musicLength.classList.add('field-empty');
        e.preventDefault();
        error = true;
    }

    if(error){
        errorBox.classList.add('active');
    }
}