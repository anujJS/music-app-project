const musicContainer= document.getElementById("music-container");

const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");

const audio = document.getElementById("audio")
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
  

const tittle = document.getElementById("tittle");
const cover = document.getElementById("cover");


// song title 
const songs = ["music1", "music2", "music3"];
 
// keep tracking song
let songIndex = 2;

// loadsong from dom
loadSong(songs[songIndex]);


// update song details

function loadSong(song){
    tittle.innerText = song;
    cover.src =`./assets/${song}.jpg`;
    audio.src = `./assets/${song}.mp3`;
}

console.log(audio);




function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fas").classList.remove("fa-play");
    playBtn.querySelector("i.fas").classList.add("fa-pause");

 audio.play();
};


function pauseSong() {
    musicContainer.classList.remove("play");

    playBtn.querySelector("i.fas").classList.add("fa-play");
    playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
};


// previousSong function

function prevSong(){
    songIndex--;
    if(songIndex < 0){
    songIndex = songs.length -1;
    }

    loadSong(songs[songIndex]);

    playSong();
}


// next song function
function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1){
    songIndex = 0;
    }

    loadSong(songs[songIndex]);

    playSong();
}


// progress update function 

 function updateprogress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPresent = (currentTime / duration) * 100;
    progress.style.width = `${progressPresent}%`
 }

//  set progress bar 
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}


// add event listner 

playBtn.addEventListener("click", () =>{
  let  isPlaying = musicContainer.classList.contains("play");
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});


prevBtn.addEventListener("click",prevSong);
nextBtn.addEventListener("click",nextSong);

audio.addEventListener("timeupdate",updateprogress);

//  add eventlistner on progress bar

progressContainer.addEventListener("click", setProgress);

// auto next song play 
audio.addEventListener("ended", nextSong)