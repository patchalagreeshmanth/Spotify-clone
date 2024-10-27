console.log("Welcome to Spotify");

let songIndex = 0; 
let audioElement = new Audio('songs/1.mp3'); 
let masterPlay = document.getElementById('masterPlay'); 
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {songName: "Saripodha Sanivaram", filepath: "songs/1.mp3", coverpath: "covers/1.jpg"},
  {songName: "Devara Fear", filepath: "songs/2.mp3", coverpath: "covers/2.jpg"},
  {songName: "Guntur Karam", filepath: "songs/3.mp3", coverpath: "covers/3.jpg"},
  {songName: "Mathuvadalara", filepath: "songs/4.mp3", coverpath: "covers/4.jpg"},
  {songName: "Hanuman", filepath: "songs/5.mp3", coverpath: "covers/5.jpg"},
  {songName: "Rayaan", filepath: "songs/6.mp3", coverpath: "covers/6.jpg"},
  {songName: "Vikram", filepath: "songs/7.mp3", coverpath: "covers/7.jpg"},
];

// Set up song items (image and song name)
songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverpath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

// Handle play/pause for the master control
masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
  makeAllPlays();  // Ensure all songItemPlay buttons are reset
});

// Update the progress bar
audioElement.addEventListener('timeupdate', () => {
  let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  myProgressBar.value = progress;
});

// Handle progress bar change
myProgressBar.addEventListener('change', () => {
  audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
  if (audioElement.paused) {
    audioElement.play();  // Ensure the song plays when progress is manually changed
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  }
});

// Make all song play icons show play (not pause)
const makeAllPlays = () => {
  Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.classList.remove('fa-pause-circle');
    element.classList.add('fa-play-circle');
  });
};

// Handle individual song play buttons
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, i) => {
  element.addEventListener('click', (e) => {
    makeAllPlays();  
    songIndex = i;  // Get the clicked song index
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    
    audioElement.src = songs[songIndex].filepath;  // Use songs array to get filepath
    masterSongName.innerText = songs[songIndex].songName;  // Update song name
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  });
});

// Handle the 'previous' button click
document.getElementById('previous').addEventListener('click', () => {
  if (songIndex <= 0) {
    songIndex = songs.length - 1;  // Loop to the last song if at the beginning
  } else {
    songIndex -= 1;
  }
  audioElement.src = songs[songIndex].filepath;  // Play the previous song
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
  gif.style.opacity = 1;
});

// Handle the 'next' button click
document.getElementById('next').addEventListener('click', () => {
  if (songIndex >= songs.length - 1) {
    songIndex = 0;  // Loop back to the first song if at the end
  } else {
    songIndex += 1;
  }
  audioElement.src = songs[songIndex].filepath;  // Play the next song
  masterSongName.innerText = songs[songIndex].songName;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
  gif.style.opacity = 1;
});
