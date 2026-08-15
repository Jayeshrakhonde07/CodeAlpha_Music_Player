let songIndex = 0;

let songs = [
    { songName:"Shri Hanuman Chalisa", filePath:"/Songs/Song1.mp3", coverPath:"/Images/Cover1.jpeg" },
    { songName:"Dhrundhar Title Song", filePath:"/Songs/Song1.mp3", coverPath:"/Images/Cover2.jpeg" },
    { songName:"Vaaroon - Mirzapur", filePath:"/Songs/Song1.mp3", coverPath:"/Images/Cover3.jpeg" },
    { songName:"Ishq Jalakar - Karvaan", filePath:"/Songs/Song1.mp3", coverPath:"/Images/Cover4.webp" },
    { songName:"Ishq Di Baajiyaan", filePath:"/Songs/Song1.mp3", coverPath:"/Images/Cover5.jpeg" },
    { songName:"Apna Bana Le", filePath:"/Songs/Song1.mp3", coverPath:"/Images/Cover6.jpeg" },
    { songName:"Sundari", filePath:"/Songs/Song1.mp3", coverPath:"/Images/Cover7.webp" },
    { songName:"Tum ho to", filePath:"/Songs/Song1.mp3", coverPath:"/Images/Cover8.jpeg" },
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