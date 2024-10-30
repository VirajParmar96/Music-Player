let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list = [
    {
        name: "Amplifier",
        image: "m1.jpg",
        path: "song/Amplifier - Imran Khan (DJJOhAL.Com)"
    },
    {
        name: "Brodha V - Aathma Raama",
        image: "m2.jpg",
        path: "song/Brodha V - Aathma Raama [Music Video](MP3_160K)"
    },
    {
        name: "Brown Rang",
        image: "m3.jpg",
        path: "song/Brown Rang - Yo Yo Honey Singh India_s No.1 Video 2012(MP3_160K)"
    },
    {
        name: "Dil Lutiya",
        image: "m4.jpg",
        path: "song/Dil Lutiya _ Jazzy B _ Ft. Apache Indian _ Sukshinder _ Romeo _ Jihne Mera Dil Luteya _ Punjabi Hits(MP3_160K)"
    },
    {
        name: "DjArviN-Ahzee _Amp_ Faydee - Burn it Down",
        image: "m5.jpg",
        path: "song/DjArviN-Ahzee _Amp_ Faydee - Burn it Down (Indian Folk Style)(MP3_160K)"
    },
    {
        name: "Future - Mask Of",
        image: "m6.jpg",
        path: "song/Future - Mask Off (Aesthetic Remix)(MP3_160K)"
    },
    {
        name: "Jo Tu Mera Humdard Hai",
        image: "m7.jpg",
        path: "song/Jo Tu Mera Humdard Hai Full Song (Lyrics) - Arijit Singh _ Lyrics - बोल(MP3_160K)"
    },
    {
        name: "Kya Mujhe Pyaar Hai",
        image: "m8.jpg",
        path: "song/Kya Mujhe Pyaar Hai - Unplugged Cover _ Vicky Singh _ Woh Lamhe(MP3_160K)"
    },
    {
        name: "Mi Amor",
        image: "m9.jpg",
        path: "song/Mi Amor (Lyrics) - Sharn_ 40k _ The Paul(MP3_160K)"
    },
    {
        name: "O Sanam",
        image: "m10.jpg",
        path: "song/O Sanam (Reprise) _ JalRaj _ Lucky Ali _ Latest Hindi Cover 2021(MP3_160K)"
    },
    {
        name: "Sub Urban - Cradles",
        image: "m11.jpg",
        path: "song/Sub Urban - Cradles [Official Music Video](MP3_160K)"
    },
    {
        name: "Trevor Daniel - Falling",
        image: "m11.jpg",
        path: "song/Trevor Daniel - Falling (Lyrics)(MP3_160K)"
    }
];

function loadTrack(track_index) {
    clearInterval(updateTimer);
    resetValues();
    
    curr_track.src = track_list[track_index].path;
    curr_track.load();
    
    track_art.style.backgroundImage = `url(${track_list[track_index].image})`;
    track_name.textContent = track_list[track_index].name;
    track_artist.textContent = track_list[track_index].artist;
    
    updateTimer = setInterval(seekUpdate, 1000);
    
    curr_track.addEventListener("ended", nextTrack);
}

function resetValues() {
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}

function playpauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack() {
    curr_track.play();
    isPlaying = true;
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
    curr_track.pause();
    isPlaying = false;
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

function nextTrack() {
    if (track_index < track_list.length - 1)
        track_index += 1;
    else track_index = 0;
    
    loadTrack(track_index);
    playTrack();
}

function prevTrack() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = track_list.length - 1;
    
    loadTrack(track_index);
    playTrack();
}

function seekTo() {
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}

function setVolume() {
    curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
    let seekPosition = 0;
    
    if (!isNaN(curr_track.duration)) {
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;
        
        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
        
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
        
        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationSeconds;
    }
}

// Load the first track
loadTrack(track_index);
