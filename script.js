let songIndex = 0;

let songs = [
    { songName:"Shri Hanuman Chalisa", filePath:"/Songs/Song1.mp3", coverPath:"/Images/Cover1.jpeg" },
    { songName:"Dhrundhar Title Song", filePath:"/Songs/Song2.mp3", coverPath:"/Images/Cover2.jpeg" },
    { songName:"Vaaroon - Mirzapur", filePath:"/Songs/Song3.mp3", coverPath:"/Images/Cover3.jpeg" },
    { songName:"Ishq Jalakar - Karvaan", filePath:"/Songs/Song4.mp3", coverPath:"/Images/Cover4.webp" },
    { songName:"Ishq Di Baajiyaan", filePath:"/Songs/Song5.mp3", coverPath:"/Images/Cover5.jpeg" },
    { songName:"Apna Bana Le", filePath:"/Songs/Song6.mp3", coverPath:"/Images/Cover6.jpeg" },
    { songName:"Sundari", filePath:"/Songs/Song7.mp3", coverPath:"/Images/Cover7.webp" },
    { songName:"Tum ho to", filePath:"/Songs/Song8.mp3", coverPath:"/Images/Cover8.jpeg" },
];

// DOM Elements
let audioElement = new Audio(songs[songIndex].filePath);

let songItems = document.getElementsByClassName("songitems");
let songItemsPlay = document.getElementsByClassName("songItemsPlay");
let start = document.getElementsByClassName("song-start");
let progressBar = document.getElementById("progressbar");
let end = document.getElementsByClassName("song-end");
let previous = document.getElementById("previous");
let masterPlay = document.getElementById("master");
let next = document.getElementById("next");
let gif = document.getElementById("gif");
let masterName = document.getElementsByClassName("song-master-title");


// Calculating Song Length
function songDuration(duration) {
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration % 60);
    if (seconds < 10) seconds = "0" + seconds;
    return `${minutes}:${seconds}`;
}


// Access Song UI
Array.from(songItems).forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("song-title")[0].innerText = songs[i].songName;

    let tempAudio = new Audio(songs[i].filePath);
    tempAudio.addEventListener("loadedmetadata", () => {
        element.getElementsByClassName("song-length")[0].innerText =
            songDuration(tempAudio.duration);
    });
});


// duration for master (FIXED – once only)
audioElement.addEventListener("loadedmetadata", () => {
    end[0].innerText = songDuration(audioElement.duration);
});

function makeAllPlay() {
    Array.from(songItemsPlay).forEach((element) => {
        element.classList.replace("fa-circle-pause", "fa-circle-play");
    });
}

// FIXED ORDER (src → play)
function allSongPlay() {
    masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");
    audioElement.src = songs[songIndex].filePath;
    audioElement.play();
    masterName[0].innerText = songs[songIndex].songName;
    gif.style.opacity = 1;
}