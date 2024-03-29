const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const audio = $("#audio");
const control = $(".control");
const name_song = $("header h2");
const cd_thumb = $(".cd-thumb");
const toggle_play = document.querySelector(".btn-toggle-play");
const btn_next = $(".btn-next");
const btn_prev = $(".btn-prev");
const progress = $(".progress");

// progress.value = "12";

progress.onchange = function () {
  console.log(progress.value);
};

const btn_repeat = $(".btn-repeat");
const btn_random = $(".btn-random");

// console.log([cd_thumb.style]);

const app = {
  songs: [
    {
      name: "iu là đây",
      singer: "Sean, Muooiji, Anfang",
      path: "/MusicPlayer/asset/music/iu-la-day-Sean-Muoii-Anfang.mp3",
      image: "/MusicPlayer/asset/img/iu_la_day.jpg",
    },
    {
      name: "Ánh nắng của anh",
      singer: "Đức Phúc",
      path: "/MusicPlayer/asset/music/Anh-Nang-Cua-Anh-Cho-Em-Den-Ngay-Mai-OST-Duc-Phuc.mp3",
      image: "/MusicPlayer/asset/img/anh_nang_cua_anh.jpg",
    },
    {
      name: "Chết trong em",
      singer: "Thịnh Suy",
      path: "/MusicPlayer/asset/music/ChetTrongEm-ThinhSuy-8261960.mp3",
      image: "/MusicPlayer/asset/img/thinhsuy.jpg",
    },
    {
      name: "Chưa được yêu như thế",
      singer: "Trang",
      path: "/MusicPlayer/asset/music/ChuaDuocYeuNhuThe-Trang-7774187.mp3",
      image: "/MusicPlayer/asset/img/trang.jpg",
    },
    {
      name: "Em dạo này",
      singer: "Ngọt",
      path: "/MusicPlayer/asset/music/Em-Dao-Nay-Ngot.mp3",
      image: "/MusicPlayer/asset/img/ngot.jpg",
    },
    {
      name: "Thì thôi",
      singer: "Reddy",
      path: "/MusicPlayer/asset/music/Thi-Thoi-Reddy.mp3",
      image: "/MusicPlayer/asset/img/trang.jpg",
    },
    {
      name: "Xin cho tôi",
      singer: "Ngọt",
      path: "/MusicPlayer/asset/music/Xin-Cho-Toi-Ngot.mp3",
      image: "/MusicPlayer/asset/img/ngot.jpg",
    },
    {
      name: "Yêu người có ước mơ",
      singer: "Ngọt",
      path: "/MusicPlayer/asset/music/YeuNguoiCoUocMo-buitruonglinh-8396692.mp3",
      image: "/MusicPlayer/asset/img/YeuNguoiCoUocMo.jpg",
    },
    {
      name: "Gác lại âu lo",
      singer: "Da Lab",
      path: "/MusicPlayer/asset/music/Gac-Lai-Au-Lo-Da-LAB-Miu-Le.mp3",
      image: "/MusicPlayer/asset/img/gac_lai_au_lo.jpeg",
    },
  ],

  currentSongInd: 0,
  repeat: false,
  random: false,

  loadSong: function () {
    audio.src = this.songs[this.currentSongInd].path;
    name_song.innerText = this.songs[this.currentSongInd].name;
    cd_thumb.style.background = `url(${this.songs[this.currentSongInd].image})`;
  },

  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
            <div class="song ${index == this.currentSongInd ? "active" : ""}">
            <div class="thumb" style="background-image: url('${song.image}')">
            </div>
            <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
            </div>
            <div class="option">
                <i class="fas fa-ellipsis-h"></i>
            </div>
            </div> 
            `;
    });
    $(".playlist").innerHTML = htmls.join("\n");

    // console.log(this.currentSongInd);
  },

  handleEvents: function () {
    const cd = $(".cd");
    const cdWidth = cd.offsetWidth;
    const songs = $$(".song");

    document.onscroll = function () {
      let newCdWidth = cdWidth - window.scrollY;
      // console.log(`${newCdWidth} px`);
      if (Number(newCdWidth) < 80) {
        // console.log("he")
        newCdWidth = "0";
      }
      const opacity = newCdWidth / cdWidth;
      Object.assign(cd.style, {
        width: newCdWidth + "px",
        opacity: opacity,
      });

      // cd.style.width = newCdWidth + 'px';
    };

    let cdanimate = cd.animate(
      [{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );
    cdanimate.pause();

    toggle_play.onclick = function () {
      if (audio.paused) {
        audio.play();
        cdanimate.play();
        toggle_play.children[1].style.display = "none";
        toggle_play.children[0].style.display = "block";
      } else {
        audio.pause();
        cdanimate.pause();
        toggle_play.children[0].style.display = "none";
        toggle_play.children[1].style.display = "block";
      }
    };

    audio.ontimeupdate = function () {
      progress.value = (audio.currentTime * 100) / audio.duration;
    };

    btn_next.onclick = function () {
      songs[app.currentSongInd].classList.remove("active");
      app.currentSongInd = (app.currentSongInd + 1) % app.songs.length;
      app.loadSong();
      songs[app.currentSongInd].classList.add("active");
      if (audio.played) {
        audio.play();
      }
    };

    btn_prev.onclick = function () {
      songs[app.currentSongInd].classList.remove("active");
      app.currentSongInd =
        (app.currentSongInd - 1 + app.songs.length) % app.songs.length;
      app.loadSong();
      songs[app.currentSongInd].classList.add("active");
      if (audio.played) {
        audio.play();
      }
    };

    btn_repeat.onclick = function () {
      app.repeat = !app.repeat;
      this.classList.toggle("active");
    };

    audio.onended = function () {
      if (
        app.repeat ||
        app.random ||
        app.currentSongInd + 1 < app.songs.length
      ) {
        if (app.random) {
          app.currentSongInd = Math.floor(Math.random() * app.songs.length);
          console.log(app.currentSongInd);
        } else {
          app.currentSongInd = (app.currentSongInd + 1) % app.songs.length;
        }

        app.loadSong();
        if (audio.played) {
          audio.play();
        }
      }
    };

    btn_random.onclick = function () {
      app.random = !app.random;
      this.classList.toggle("active");
    };

    progress.onchange = function () {
      audio.currentTime = (audio.duration * progress.value) / 100;
      console.log(audio.currentTime);
    };

    // console.log(song);

    songs.forEach(function (value, index) {
      value.onclick = function () {
        // console.log(index);
        app.currentSongInd = index;
        app.loadSong();
        audio.play();
        cdanimate.play();
        toggle_play.children[1].style.display = "none";
        toggle_play.children[0].style.display = "block";
        song.forEach((value) => {
          value.classList.remove("active");
        });
        this.classList.add("active");
      };
    });
  },

  start: function () {
    this.render();
    this.loadSong();
    this.handleEvents();
  },
};

app.start();
