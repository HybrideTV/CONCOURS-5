var listAudio = [
  {
    name:"Rick Astley  - Never Give You UP",
    file:"./sons/never-give-you-up.mp3",
    img: "./img/never-give-you-up.jpg",
    duration:"03:32"
  },
  {
    name:"Mariah Carey - Without You",
    file:"./sons/without-you.mp3",
    img: "./img/without-you.jpg",
    duration:"03:33"
  },
  {
    name:"Mariah Carey - Hero",
    file:"./sons/hero.mp3",
    img: "./img/hero.png",
    duration:"04:19"
  },
  {
    name:"A-ha - Take On Me",
    file:"./sons/take-on-me.mp3",
    img: "./img/take-on-me.jpg",
    duration:"04:04"
  },
  {
    name:"TOBU - Candyland",
    file:"./sons/candyland.mp3",
    img: "./img/candyland.jpg",
    duration:"03:18"
  },
  {
    name:"TOBU - Colors",
    file:"./sons/colors.mp3",
    img: "./img/colors.jpg",
    duration:"04:39"
  },
  {
    name:"TOBU - Infectious",
    file:"./sons/infectious.mp3",
    img: "./img/infectious.jpg",
    duration:"05:17"
  },
  {
    name:"Alessandra - Queen of kings",
    file:"./sons/queen-of-kings.mp3",
    img: "./img/queen-of-kings.jpg",
    duration:"02:28"
  }    
]

function soundItem(index,name,duration){
    var trackItem = document.createElement('div');
    trackItem.setAttribute("class", "playlist-track");
    trackItem.setAttribute("id", "ptc-"+index);
    trackItem.setAttribute("data-index", index);
    document.querySelector(".playlist").appendChild(trackItem);

    var playBtnItem = document.createElement('div');
    playBtnItem.setAttribute("class", "playlist-btn-play");
    playBtnItem.setAttribute("id", "pbp-"+index);
    document.querySelector("#ptc-"+index).appendChild(playBtnItem);

    var btnImg = document.createElement('i');
    btnImg.setAttribute("class", "fas fa-play");
    btnImg.setAttribute("height", "30");
    btnImg.setAttribute("width", "30");
    btnImg.setAttribute("id", "p-img-"+index);
    document.querySelector("#pbp-"+index).appendChild(btnImg);

    var trackInfoItem = document.createElement('div');
    trackInfoItem.setAttribute("class", "playlist-info-track");
    trackInfoItem.innerHTML = name
    document.querySelector("#ptc-"+index).appendChild(trackInfoItem);


    var trackDurationItem = document.createElement('div');
    trackDurationItem.setAttribute("class", "playlist-duration");
    trackDurationItem.innerHTML = duration
    document.querySelector("#ptc-"+index).appendChild(trackDurationItem);
  }

  
  for (var i = 0; i < listAudio.length; i++) {
      soundItem(i,listAudio[i].name,listAudio[i].duration);
      
  }
  var indexAudio = 0;

  function loadNewTrack(index){
    var player = document.querySelector('#source-audio')
    player.src = listAudio[index].file
    document.querySelector('.title').innerHTML = listAudio[index].name
    this.currentSong = document.getElementById("current");
    this.currentSong.load()
    this.toggleAudio()
    this.updateStylePlaylist(this.indexAudio,index)
    this.indexAudio = index;
  }

  var playlistItems = document.querySelectorAll(".playlist-track");

  for (let i = 0; i < playlistItems.length; i++){
    playlistItems[i].addEventListener("click", getClickedElement.bind(this));
  }

  function getClickedElement(e) {
    for (let i = 0; i < playlistItems.length; i++){
      if(playlistItems[i] == e.target){
        var clickedIndex = e.target.getAttribute("data-index")
        if (clickedIndex == this.indexAudio ) { 
            this.toggleAudio()
        }else{
            loadNewTrack(clickedIndex);
        }
      }
    }
  }

  document.querySelector('#source-audio').src = listAudio[indexAudio].file
  document.querySelector('.title').innerHTML = listAudio[indexAudio].name

  var currentSong = document.getElementById("current");
  currentSong.load()
  currentSong.onloadedmetadata = function() {
        document.getElementsByClassName('duration')[0].innerHTML = " / "  + this.getMinutes(this.currentSong.duration)
        document.querySelector('.img').innerHTML = "<img src='" + listAudio[indexAudio].img + "''>";

  }.bind(this);

  var interval1; 

  function toggleAudio() {

    if (this.currentSong.paused) {
      document.querySelector('#icon-play').style.display = 'none';
      document.querySelector('#icon-pause').style.display = 'block';
      document.querySelector('#ptc-'+this.indexAudio).classList.add("active-track");
      this.playToPause(this.indexAudio)
      this.currentSong.play();
    }else{
      document.querySelector('#icon-play').style.display = 'block';
      document.querySelector('#icon-pause').style.display = 'none';
      this.pauseToPlay(this.indexAudio)
      this.currentSong.pause();
    }
  }

  function pauseAudio() {
    this.currentSong.pause();
    clearInterval(interval1);
  }

  var time = document.getElementsByClassName('time')[0]
  var barProgress = document.getElementById("bar");
  var width = 0;

  function onTimeUpdate() {
    var t = this.currentSong.currentTime
    time.innerHTML = this.getMinutes(t);
    this.setBarProgress();
    if (this.currentSong.ended) {
      document.querySelector('#icon-play').style.display = 'block';
      document.querySelector('#icon-pause').style.display = 'none';
      this.pauseToPlay(this.indexAudio)
      if (this.indexAudio < listAudio.length-1) {
          var index = parseInt(this.indexAudio)+1
          this.loadNewTrack(index)
      }
    }
  }
  
  function setBarProgress(){
    var progress = (this.currentSong.currentTime/this.currentSong.duration)*100;
    document.getElementById("bar").style.width = progress + "%";
  }

  function getMinutes(t){
    var min = parseInt(parseInt(t)/60);
    var sec = parseInt(t%60);
    if (sec < 10) {
      sec = "0"+sec
    }
    if (min < 10) {
      min = "0"+min
    }
    return min+":"+sec
  }

  var progressbar = document.querySelector('#progress')
  progressbar.addEventListener("click", pg.bind(this));

  function pg(e) {
    var percent = e.offsetX / progressbar.offsetWidth;
    this.currentSong.currentTime = percent * this.currentSong.duration;
    barProgress.style.width = percent*100 + "%";
  }

  function next(){
    if (this.indexAudio <listAudio.length-1) {
        var oldIndex = this.indexAudio
        this.indexAudio++;
        updateStylePlaylist(oldIndex,this.indexAudio)
        this.loadNewTrack(this.indexAudio);
    }
  }

  function prev(){
    if (this.indexAudio>0) {
        var oldIndex = this.indexAudio
        this.indexAudio--;
        updateStylePlaylist(oldIndex,this.indexAudio)
        this.loadNewTrack(this.indexAudio);
    }
  }

  function updateStylePlaylist(oldIndex,newIndex){
    document.querySelector('#ptc-'+oldIndex).classList.remove("active-track");
    this.pauseToPlay(oldIndex);
    document.querySelector('#ptc-'+newIndex).classList.add("active-track");
    this.playToPause(newIndex)
  }

  function playToPause(index){
    var p = document.querySelector('#p-img-'+index)
    p.classList.remove("fa-play");
    p.classList.add("fa-pause");
  }

  function pauseToPlay(index){
    var p = document.querySelector('#p-img-'+index)
    p.classList.remove("fa-pause");
    p.classList.add("fa-play");
  }


  