let cursong=new Audio()
async function getsongs(folder) {
    let a = await fetch("http://127.0.0.1:3000/songs/")
    let response = await a.text()
    console.log(response)
    let div = document.createElement("div")
    div.innerHTML = response
    let as = div.getElementsByTagName("a")

    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1])
        }
    }
    return songs
}

const playmusic = (track) => {
   // let audio = new Audio("/songs/" + track)
   
   cursong.src="/songs/" + track

   
    cursong.play()
   
    play.src="pause.src"
    document.querySelector(".songinfo").innerHTML=  track;
    document.querySelector(".songtime").innerHTML= "00:00"
}
function secondsToMinutesSeconds(seconds) {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00";
    }

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}
async function main() {
   
    // get playlist of songs
    let songs = await getsongs()
    console.log(songs)
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0]
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li>
                            <img class="invert" src="music.svg">
                            <div class="info">
                                <div>${song.replaceAll("%20", " ")}</div>
                                <div>Artist</div>
                            </div>
                            <div class="playnow">
                            <img class="invert" src="play.svg">
                            </div>
                        </li>`
    }
    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playmusic((e.querySelector(".info").firstElementChild.innerHTML.trim()))
        })
    })
      //attach eventlistener to play pause prev next button
      playpause.addEventListener("click",()=>{
        if(cursong.paused){
            cursong.play()
            playpause.src="pause.svg"
        }
        else{
            cursong.pause()
            playpause.src="play.svg"
        }
      })
      //listen for timeupdtae event
      cursong.addEventListener("timeupdate",()=>{
        console.log(cursong.currentTime,cursong.duration);
        document.querySelector(".songtime").innerHTML=`${secondsToMinutesSeconds(cursong.currentTime)}:${secondsToMinutesSeconds(cursong.duration)}`
        document.querySelector(".circle").style.left=(cursong.currentTime/cursong.duration)*100+"%"
      })
      document.querySelector(".seekbar").addEventListener("click",e=>{
         console.log(e.offsetX)
      })
    // it's a client-side project so we are not bringing songs from the server with API

    // play first song
    if (songs.length > 0) {
        var audio = new Audio(songs[0]);
        audio.play();
        audio.addEventListener("loadeddata", () => {
            let duration = audio.duration;
            // to add user interactivity
            console.log(audio.duration, audio.currentSrc, audio.currentTime)
            // add button so when clicked song plays
        
    })
}
  //adding eventlistener for hamburger
  document.querySelector(".hamburger").addEventListener("click",()=>{
    document.querySelector(".left").style.left="0"
  })
  document.querySelector(".cross").addEventListener("click",()=>{
    document.querySelector(".left").style.left="-110"+"%"
  })

  //eventlistener for prev next button
  preplay.addEventListener("click",()=>{    
    console.log("pre click")
    let index=songs.indexOf(cursong.src.split("/").slice(-1)[0])
    if((index-1)>=0){

    
    playmusic(songs[index-1])
    }
  })
  nextplay.addEventListener("click",()=>{   
     
    let index=songs.indexOf(cursong.src.split("/").slice(-1)[0])
    if((index+1)>length){

    
    playmusic(songs[index+1])
    }
  })


}

main()
