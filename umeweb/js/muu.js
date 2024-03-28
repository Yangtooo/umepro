// 選擇標籤和元素
// 返回第一個元素
const wrapper = document.querySelector(".wrapper"),
musicImg = wrapper.querySelector(".img-area img"),
musicName = wrapper.querySelector(".song-details .name"),
musicArtist = wrapper.querySelector(".song-details .artist"),
mainAudio = wrapper.querySelector("#main-audio"),
playPauseBtn = wrapper.querySelector(".play-pause"),
// 播放前一首的按鈕
prevBtn = wrapper.querySelector("#prev"),
// 播放下一首的按鈕
nextBtn = wrapper.querySelector("#next"),
progressArea = wrapper.querySelector(".progress-area"),
progressBar = wrapper.querySelector(".progress-bar"),
musicList = wrapper.querySelector(".music-list"),
showMoreBtn = wrapper.querySelector("#more-music"),
hideMusiceBtn = musicList.querySelector("#close");

// 查看第三首歌曲
let musicIndex = 1; 

// 當頁面加載完後執行loadMusic函數
window.addEventListener("load", ()=>{
    loadMusic(musicIndex);
    playingNow();
})

// indexNumb可以取出特定表格的資料
function loadMusic(indexNumb){
    musicName.innerText = allMusic[indexNumb - 1].name;
    musicArtist.innerText = allMusic[indexNumb - 1].artist;
    musicImg.src = `img/${allMusic[indexNumb - 1].img}.jpg`;
    mainAudio.src = `music/${allMusic[indexNumb - 1].src}.mp3`;
}

// play music function
// 切換播放/暫停鍵
function playMusic(){
    wrapper.classList.add("paused");
    playPauseBtn.querySelector("i").innerText="pause";
    // 播放下一首
    mainAudio.play();
}

// pause music function
function pauseMusic(){
    wrapper.classList.remove("paused");
    playPauseBtn.querySelector("i").innerText="play_arrow";
    // 播放下一首
    mainAudio.pause();
}

// next music function
function nextMusic(){
    // 歌曲控制向遞增
    musicIndex++;
    // 檢查music有無超出allMusic的範圍 ?為真 :為假
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}

// prev music function
function prevMusic(){
    // 歌曲控制向遞增
    musicIndex--;
    // 檢查music有無超出allMusic的範圍 ?為真 :為假
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
}


playPauseBtn.addEventListener("click",()=>{
    const isMusicPaused = wrapper.classList.contains("paused");
    // 如果音樂是暫停的，會調用pauseMusic，否則會調用playMusic
    isMusicPaused ? pauseMusic() : playMusic();
});

// nextbtn click event
nextBtn.addEventListener("click",()=>{
    nextMusic();
});

// nextbtn click event
prevBtn.addEventListener("click",()=>{
    prevMusic();
});

// 更新播放音樂的進度條
mainAudio.addEventListener("timeupdate",(e)=>{
    // 取得當前播放時間
    const currentTime = e.target.currentTime;
    // 取得音樂元素的總時長
    const duration = e.target.duration;
    // 計算播放進度的百分比
    let progressWidth = (currentTime / duration)*100;
    // 設定進度條的寬度
    progressBar.style.width = `${progressWidth}%`;

    let musicCurrentTime = wrapper.querySelector(".current"),
    musicDuration = wrapper.querySelector(".duration");

    mainAudio.addEventListener("loadeddata",()=>{
        // 更新歌曲總時長
        let audioDuration = mainAudio.duration;
        let totalMin = Math.floor(audioDuration / 60);
        // 獲取歌曲更新的餘數
        let totalSec = Math.floor(audioDuration % 60);
        // 確保秒數後的格式是兩位數
        if(totalSec < 10){
        totalSec = `0${totalSec}`;
        }
        musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

         // 更新歌曲目前時長
         let currentMin = Math.floor(currentTime / 60);
         // 獲取歌曲更新的餘數
         let currentSec = Math.floor(currentTime % 60);
         // 確保秒數後的格式是兩位數
         if(currentSec < 10){
            currentSec = `0${currentSec}`;
         }
         musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
    });

    // 點選進度條的觸發事件
    progressArea.addEventListener("click", (e)=>{
    // 獲取進度條寬度
    let progressWidthval = progressArea.clientWidth;
    let clickedOffSetx = e.offsetX;    
    let songDuration = mainAudio.duration;

    mainAudio.currentTime = (clickedOffSetx / progressWidthval) * songDuration;
    playMusic();
    });

    // set repeatBtn
    const repeatBtn = wrapper.querySelector("#repeat-plist");
    repeatBtn.addEventListener("click",()=>{
        // 獲取repeat icon
        let getText = repeatBtn.innerText;
        switch(getText){
            case "repeat":
                repeatBtn.innerText = "repeat_one";
                repeatBtn.setAttribute("title","Song looped");
                break;
            case "repeat_one":
                repeatBtn.innerText = "shuffle";
                repeatBtn.setAttribute("title","Playback shuffle");
                break;
            case "shuffle":
                repeatBtn.innerText = "repeat";
                repeatBtn.setAttribute("title","Playlist looped");
                break;
        }

    });


    // 當音樂結束時所做的動作
    mainAudio.addEventListener("ended",()=>{
        let getText = repeatBtn.innerText;
        switch(getText){
            case "repeat":
                nextMusic();
                break;
            case "repeat_one":
                // 重新加載當前音樂
                mainAudio.currentTime=0;
                loadMusic(musicIndex);
                playMusic();
                break;
            case "shuffle":
                // 隨機播放
                let randIndex = Math.floor((Math.random() * allMusic.length)+1);
                do{
                    randIndex = Math.floor((Math.random() * allMusic.length)+1);
                }
                while(musicIndex == randIndex);
                musicIndex = randIndex;
                loadMusic(musicIndex);
                playMusic();
                break;
        }

    });

    showMoreBtn.addEventListener("click",()=>{
        musicList.classList.toggle("show");
    });
    
    hideMusiceBtn.addEventListener("click",()=>{
        showMoreBtn.click();
    });

    const ulTag = wrapper.querySelector("ul");

    for(let i=0; i < allMusic.length; i++){
        // 添加字符串
        // ${i + 1} = 0+1
        let liTag = `<li li-index="${i + 1}">
                    <div class="row">
                        <span>${allMusic[i].name}</span>
                        <p>${allMusic[i].artist}</p>
                        </div>
                        <audio class="${allMusic[i].src}" src="music/${allMusic[i].src}.mp3"></audio>
                        <span id="${allMusic[i].src}" class="audio-duration">3:15</span>
                    </li>`;
        
        // 將 li 插入到 ul 中
        ulTag.insertAdjacentHTML("beforeend",liTag);
        let liAudioTagDuration = ulTag.querySelector(`#${allMusic[i].src}`);
        let liAudioTag = ulTag.querySelector(`.${allMusic[i].src}`);

        liAudioTag.addEventListener("loadeddata",()=>{
            // 更新歌曲總時長
            let audioDuration = liAudioTag.duration;
            let totalMin = Math.floor(audioDuration / 60);
            // 獲取歌曲更新的餘數
            let totalSec = Math.floor(audioDuration % 60);
            // 確保秒數後的格式是兩位數
            if(totalSec < 10){
            totalSec = `0${totalSec}`;
            }
            liAudioTagDuration.innerText = `${totalMin}:${totalSec}`;
        });
    } 
    
    // 點擊選單歌曲播放音樂
    const allLiTags = ulTag.querySelectorAll("li");
    function playingNow(){
        for(let j = 0;j < allLiTags.length; j++){
            let audioTag = allLiTags[j].querySelector(".audio-duration");
            if(allLiTags[j].classList.contains("playing")){
                allLiTags[j].classList.remove("playing");
            }
            if(allLiTags[j].getAttribute("li-index") == musicIndex){
                // 創建playing類別，當點選時可以做顏色上的設定
                allLiTags[j].classList.add("playing");
                audioTag.innerText="Playing";
            }
    
            allLiTags[j].setAttribute("onclick","clicked(this)");
        }
    }
    // 點選li中的歌曲來播放
        function clicked(element){
            let getLiIndex = element.getAttribute("li-index");
            musicIndex = getLiIndex;
            loadMusic(musicIndex);
            playMusic();
        }


    



