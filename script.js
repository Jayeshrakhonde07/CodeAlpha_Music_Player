let songIndex = 0;

/* =========================
   Songs
========================= */

let songs = [
  {
    songName: "Shri Hanuman Chalisa",
    filePath: "/Songs/Song1.mp3",
    coverPath: "/Images/Cover1.jpeg",
  },

  {
    songName: "Dhrundhar Title Song",
    filePath: "/Songs/Song2.mp3",
    coverPath: "/Images/Cover2.jpeg",
  },

  {
    songName: "Vaaroon - Mirzapur",
    filePath: "/Songs/Song3.mp3",
    coverPath: "/Images/Cover3.jpeg",
  },

  {
    songName: "Ishq Jalakar - Karvaan",
    filePath: "/Songs/Song4.mp3",
    coverPath: "/Images/Cover4.webp",
  },

  {
    songName: "Ishq Di Baajiyaan",
    filePath: "/Songs/Song5.mp3",
    coverPath: "/Images/Cover5.jpeg",
  },

  {
    songName: "Apna Bana Le",
    filePath: "/Songs/Song6.mp3",
    coverPath: "/Images/Cover6.jpeg",
  },

  {
    songName: "Sundari",
    filePath: "/Songs/Song7.mp3",
    coverPath: "/Images/Cover7.webp",
  },

  {
    songName: "Tum ho to",
    filePath: "/Songs/Song8.mp3",
    coverPath: "/Images/Cover8.jpeg",
  },
];

/* =========================
   Audio Element
========================= */

let audioElement = new Audio(songs[songIndex].filePath);

/* =========================
   DOM Elements
========================= */

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
let volumeBar = document.getElementById("volumeBar");

let volumeIcon = document.getElementById("volumeIcon");

let volumeUp = document.getElementById("volumeUp");

/* =========================
   Song Duration Function
========================= */

function songDuration(duration) {
  if (!duration || isNaN(duration)) {
    return "00:00";
  }

  let minutes = Math.floor(duration / 60);

  let seconds = Math.floor(duration % 60);

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  return `${minutes}:${seconds}`;
}

/* =========================
   Load Songs Into UI
========================= */

Array.from(songItems).forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;

  element.getElementsByClassName("song-title")[0].innerText = songs[i].songName;

  let tempAudio = new Audio(songs[i].filePath);

  tempAudio.addEventListener("loadedmetadata", () => {
    element.getElementsByClassName("song-length")[0].innerText = songDuration(
      tempAudio.duration,
    );
  });
});

/* =========================
   Initial Song Metadata
========================= */

audioElement.addEventListener("loadedmetadata", () => {
  end[0].innerText = songDuration(audioElement.duration);

  start[0].innerText = "00:00";

  progressBar.value = 0;
});

/* =========================
   Make All Play Icons
========================= */

function makeAllPlay() {
  Array.from(songItemsPlay).forEach((element) => {
    element.classList.replace("fa-circle-pause", "fa-circle-play");
  });
}

/* =========================
   Play Current Song
========================= */

function allSongPlay() {
  masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");

  audioElement.src = songs[songIndex].filePath;

  audioElement.currentTime = 0;

  audioElement.play().catch((error) => {
    console.log("Audio play error:", error);
  });

  masterName[0].innerText = songs[songIndex].songName;

  gif.style.opacity = 1;

  progressBar.value = 0;

  start[0].innerText = "00:00";
}

/* =========================
   Song Item Play
========================= */

Array.from(songItemsPlay).forEach((element) => {
  element.addEventListener("click", (e) => {
    let clickIndex = parseInt(e.currentTarget.id);

    if (isNaN(clickIndex) || clickIndex < 0 || clickIndex >= songs.length) {
      return;
    }

    /* Same Song */

    if (songIndex === clickIndex) {
      if (audioElement.paused) {
        audioElement.play();

        e.currentTarget.classList.replace("fa-circle-play", "fa-circle-pause");

        masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");

        gif.style.opacity = 1;
      } else {
        audioElement.pause();

        e.currentTarget.classList.replace("fa-circle-pause", "fa-circle-play");

        masterPlay.classList.replace("fa-circle-pause", "fa-circle-play");

        gif.style.opacity = 0;
      }
    } else {

    /* Different Song */
      makeAllPlay();

      songIndex = clickIndex;

      audioElement.src = songs[songIndex].filePath;

      audioElement.currentTime = 0;

      audioElement.play().catch((error) => {
        console.log("Audio play error:", error);
      });

      e.currentTarget.classList.replace("fa-circle-play", "fa-circle-pause");

      masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");

      masterName[0].innerText = songs[songIndex].songName;

      gif.style.opacity = 1;

      progressBar.value = 0;

      start[0].innerText = "00:00";
    }
  });
});

/* =========================
   Master Play / Pause
========================= */

masterPlay.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play().catch((error) => {
      console.log("Audio play error:", error);
    });

    masterPlay.classList.replace("fa-circle-play", "fa-circle-pause");

    gif.style.opacity = 1;

    masterName[0].innerText = songs[songIndex].songName;

    document
      .getElementById(songIndex)
      ?.classList.replace("fa-circle-play", "fa-circle-pause");
  } else {
    audioElement.pause();

    masterPlay.classList.replace("fa-circle-pause", "fa-circle-play");

    gif.style.opacity = 0;

    document
      .getElementById(songIndex)
      ?.classList.replace("fa-circle-pause", "fa-circle-play");
  }
});

/* =========================
   Progress Bar
========================= */

audioElement.addEventListener("timeupdate", () => {
  if (!isNaN(audioElement.duration) && audioElement.duration > 0) {
    progressBar.value =
      (audioElement.currentTime / audioElement.duration) * 100;

    start[0].innerText = songDuration(audioElement.currentTime);
  }
});

/* =========================
   Progress Bar Change
========================= */

progressBar.addEventListener("input", () => {
  if (audioElement.duration && !isNaN(audioElement.duration)) {
    audioElement.currentTime =
      (progressBar.value * audioElement.duration) / 100;
  }
});

/* =========================
   Previous Song
========================= */

previous.addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex--;
  }

  makeAllPlay();

  allSongPlay();

  document
    .getElementById(songIndex)
    ?.classList.replace("fa-circle-play", "fa-circle-pause");
});

/* =========================
   Next Song
========================= */

next.addEventListener("click", () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }

  makeAllPlay();

  allSongPlay();

  document
    .getElementById(songIndex)
    ?.classList.replace("fa-circle-play", "fa-circle-pause");
});

/* =========================
   Automatically Next Song
========================= */

audioElement.addEventListener("ended", () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex++;
  }

  makeAllPlay();

  allSongPlay();

  document
    .getElementById(songIndex)
    ?.classList.replace("fa-circle-play", "fa-circle-pause");
});

/* =====================================================
   VOLUME CONTROL
===================================================== */

/* =========================
   Initial Volume
========================= */

audioElement.volume = 1;

volumeBar.value = 100;

updateVolumeIcon(audioElement.volume);

/* =========================
   Volume Slider
========================= */

volumeBar.addEventListener("input", () => {
  let volume = Number(volumeBar.value) / 100;

  audioElement.volume = volume;

  updateVolumeIcon(volume);
});

/* =========================
   Volume Up Button
========================= */

volumeUp.addEventListener("click", () => {
  let currentVolume = audioElement.volume;

  currentVolume += 0.1;

  if (currentVolume > 1) {
    currentVolume = 1;
  }

  audioElement.volume = currentVolume;

  volumeBar.value = Math.round(currentVolume * 100);

  updateVolumeIcon(currentVolume);
});

/* =========================
   Mute / Unmute
========================= */

volumeIcon.addEventListener("click", () => {
  if (audioElement.volume > 0) {
    audioElement.volume = 0;

    volumeBar.value = 0;
  } else {
    audioElement.volume = 1;

    volumeBar.value = 100;
  }

  updateVolumeIcon(audioElement.volume);
});

/* =========================
   Volume Icon
========================= */

function updateVolumeIcon(volume) {
  volumeIcon.classList.remove(
    "fa-volume-xmark",
    "fa-volume-low",
    "fa-volume-high",
  );

  if (volume === 0) {
    volumeIcon.classList.add("fa-volume-xmark");
  } else if (volume <= 0.5) {
    volumeIcon.classList.add("fa-volume-low");
  } else {
    volumeIcon.classList.add("fa-volume-high");
  }
}
