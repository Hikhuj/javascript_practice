const video = document.getElementById('video');
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const progress = document.getElementById('progress');
const timestamp = document.getElementById('timestamp');

// Play & Pause Video
function toggleVideoStatus () {
    if (video.paused) {
        video.play();
    } else {
        video.pause();
    }
}

// Update the play/pause icon
function updatePlayIcon() {
    if(video.paused) {
        play.innerHTML = '<i class="fa fa-play fa-2x"></i>';
    } else {
        play.innerHTML = '<i class="fa fa-pause fa-2x"></i>';
    }
}

//update progress & timestamp
function updateProgress() {
    progress.value = (video.currentTime / video.duration) * 100;

    // Get minutes
    let mins = Math.floor(video.currentTime / 60);
    if(mins < 10) {
        mins = '0' + String(mins);
    }

    // Get seconds
    let secs = Math.floor(video.currentTime % 60);
    if(secs < 10) {
        secs = '0' + String(secs);
    }

    // El timestamp es parte del API de video, parte del DOM
    // Remember the .innerHTML allows to change data inside the element
    // we want to work on
    timestamp.innerHTML = `${mins}:${secs}`;
}

// Set video time to progress
function setVideoProgress() {
    // With the + sign we make sure is a number
    video.currentTime = (+progress.value * video.duration) / 100;
}

// Stop video
function stopVideo() {
    video.currentTime = 0;
    video.pause();
}


// Even listeners
video.addEventListener('click', toggleVideoStatus);
video.addEventListener('pause', updatePlayIcon);
video.addEventListener('play', updatePlayIcon);
video.addEventListener('timeupdate', updateProgress);


play.addEventListener('click', toggleVideoStatus);
stop.addEventListener('click', stopVideo);
progress.addEventListener('change', setVideoProgress);

