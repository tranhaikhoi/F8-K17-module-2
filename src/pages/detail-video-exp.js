import instance from "../httpRequest";

import {
  formatTime,
  formatTotalVN,
  formatDateVN,
  formatTotalVNN,
} from "./format";
export default function videoDetailexp() {
  return `
    <section class="fixed inset-0  z-50 flex">

      <div class="flex-1 flex flex-col items-center justify-center p-6">
        <div class="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden">
          <div
            id="video-player"
            class="w-full h-full"
          ></div>
        </div>
        <h2 id="video-title" class="mt-6 text-2xl font-bold text-cyan-400"></h2>
        <p class="text-white/60 mt-5">Không rõ</p>
        <div class="flex gap-15 text-2xl mt-10">
        <span class="relative">        <button
          class="flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer js-detail-video-more"
          type="button-video-detail"
        >
          <span class="material-symbols-outlined text-2xl leading-none ">
            more_vert
          </span>
        </button>
          <ul
    id="menu-video"
    class="absolute -right-5 -top-30  mt-2  w-52 rounded-lg bg-blue-900 text-sm  text-white shadow-lg hidden"
  >
    <li class="cursor-pointer  px-3 py-2 hover:bg-white/10 hover:border-b js-profile "><a href="/auth/profile" data-navigo>Thêm vào Playlist</a></li>
    <li class="cursor-pointer  px-3 py-2 hover:bg-white/10 hover:border-b js-change-password"><a href="/auth/change-password">Chia sẻ</a></li>
    <li class="cursor-pointer rounded-md px-3 py-2 hover:border-b hover:bg-white/10 text-white-500 js-logout">Chi tiết bài hát</li>
  </ul>
  </span>        
        <span class="btn-repeat  flex items-center justify-center rounded-full w-12 h-12 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-repeat"></i></span>        
        <span class="btn-back flex items-center justify-center rounded-full w-12 h-12 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-backward-step"></i></span>        
        <span class="play-button flex items-center justify-center rounded-full w-12 h-12 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-play "></i></span>
        <span class="hidden btn-pause flex items-center justify-center rounded-full w-12 h-12 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-pause"></i></span>
        <span class="btn-next flex items-center justify-center rounded-full w-12 h-12 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-forward-step"></i> </span>      
        <span class="btn-shuffle flex items-center justify-center rounded-full w-12 h-12 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-shuffle"></i></span>    
            
       <span class="btn-speaker relative flex items-center justify-center rounded-full w-12 h-12 text-white hover:bg-white/10 cursor-pointer">
        <i class="fa-solid fa-volume-high"></i>
        <input
        type="range"
        min="0"
        max="100"
        value="100"
        class=" absolute  left-16 w-24 cursor-pointer hidden"
          id="volume-range"
          />
        </span>             
        </div>
        <div class="relative w-[88%] h-2 bg-white mt-15 rounded-2xl js-slider-bar-video cursor-pointer ">
        <div class="js-slider-video h-full w-0 bg-blue-600 rounded"></div>
        <div class="js-slider-knob-video absolute -top-3 left-0 text-blue-800 select-none text-xl ">●</div>
        
        </div>
        <div class="flex justify-between w-[88%]">
        <span class="js-current-time">0:00</span> 
        <span class="js-duration">0:00</span>
        </div>
      </div>

      <div class="w-180 p-4 overflow-y-auto mt-10">
        <h3 class="text-white font-bold mb-4 text-3xl ">Danh sách phát liên quan</h3>
        <p class="border-b border-blue-700/20"></p>
        <div class="js-related-videos flex flex-col gap-3"></div>
      </div>
      <button class="absolute top-6 right-13 w-12 h-12 flex items-center justify-center rounded-full hover:bg-blue-600 hover:text-blue-800 cursor-pointer
       text-white text-2xl js-close-video">✕</button>
    </section>
  `;
}

export async function initvideoDetailexp(slug, router) {
  toggleLayout(true);
  if (!slug) return;
  const res = await instance.get(`/videos/details/${slug}`);
  const data = res.data;
  const titleEl = document.querySelector("#video-title");
  titleEl.textContent = data.title;
  const playlist = [
    { videoId: data.videoId, title: data.title },
    ...(data.related || []).map((v) => ({
      videoId: v.videoId,
      title: v.title,
    })),
  ];

  videoStart(playlist, titleEl);
  const relatedContainer = document.querySelector(".js-related-videos");
  if (!relatedContainer) return;

  const related = data.related || [];

  relatedContainer.innerHTML = related
    .map(
      (video, index) => `
      <div class="js-related-item js-related-active flex items-center gap-4 py-3 px-4 text-white hover:bg-white/10 cursor-pointer transition group rounded-xl"
      data-video-id="${video.videoId}"
      data-title="${video.title}"
    >
      <div class="w-6 text-center text-white/70">${index + 1}</div>

      <div class="relative overflow-hidden rounded-xl w-12 h-12 shrink-0 bg-white/10">
        <img
          src="${video.thumbnails?.[0] || ""}"
          alt="${video.title}"
          class="w-24 h-14 object-cover"
        />
        <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100"></div>
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <i class="fa-solid fa-play text-white text-sm"></i>
        </div>
      </div>

      <div class="flex flex-col justify-between flex-1">
        <div class="font-semibold">${video.title}</div>
        <p class="text-white/50 text-xs">Không rõ</p>
      </div>

      <div class="text-white/60 text-sm w-14 text-right">
        ${formatTotalVNN(video.duration)}
      </div>
    </div>
      `
    )
    .join("");
  document.querySelectorAll(".js-related-item").forEach((item) => {
    item.onclick = () => {
      const videoId = item.dataset.videoId;
      const title = item.dataset.title;
      videoPlay(videoId, title);
      activeVideos(videoId);
    };
  });
  document.querySelector(".js-close-video").onclick = () => {
    videoStop();
    toggleLayout(false);
    router.navigate("/explore");
  };
}
function activeVideos(videoId) {
  document.querySelectorAll(".js-related-item").forEach((el) => {
    el.classList.toggle("bg-white/10", el.dataset.videoId === videoId);
  });
}

function toggleLayout(hidden) {
  const header = document.querySelector("header");
  const sidebar = document.querySelector("aside");

  if (header) header.style.display = hidden ? "none" : "";
  if (sidebar) sidebar.style.display = hidden ? "none" : "";
}
function getVideoState() {
  window.appStatus ||= {};
  window.appStatus.video ||= {
    player: null,
    playlist: [],
    index: 0,
    repeat: false,
    shuffle: false,
    timer: null,
    titleEl: null,
  };
  return window.appStatus.video;
}

function loadYTScript() {
  if (window.YT && window.YT.Player) return;
  if (document.getElementById("yt-api")) return;

  const s = document.createElement("script");
  s.id = "yt-api";
  s.src = "https://www.youtube.com/iframe_api";
  document.head.appendChild(s);
}
function showPlayPause(isPlaying) {
  const playBtn = document.querySelector(".play-button");
  const pauseBtn = document.querySelector(".btn-pause");
  playBtn?.classList.toggle("hidden", isPlaying);
  pauseBtn?.classList.toggle("hidden", !isPlaying);
}

export function videoStart(playlist, titleEl) {
  videoStop();

  const st = getVideoState();
  st.playlist = playlist || [];
  st.index = 0;
  st.repeat = false;
  st.shuffle = false;
  st.titleEl = titleEl;

  showPlayPause(false);
  const curEl = document.querySelector(".js-current-time");
  const durEl = document.querySelector(".js-duration");
  if (curEl) curEl.textContent = "0:00";
  if (durEl) durEl.textContent = "0:00";
  const fill = document.querySelector(".js-slider-video");
  const knob = document.querySelector(".js-slider-knob-video");
  if (fill) fill.style.width = "0%";
  if (knob) knob.style.left = "0px";

  loadYTScript();
  window.onYouTubeIframeAPIReady = function () {
    createPlayer();
  };

  if (window.YT && window.YT.Player) createPlayer();
}

function createPlayer() {
  const st = getVideoState();
  if (st.player) return;
  const holder = document.getElementById("video-player");
  if (!holder) return;
  //ẩn toàn bộ thanh điều khiển của YouTube
  st.player = new YT.Player("video-player", {
    videoId: st.playlist[0]?.videoId || "",
    playerVars: { autoplay: 1, controls: 0, rel: 0, playsinline: 1 },
    events: {
      onReady: function () {
        bindButtons();
        startTimer();

        const first = st.playlist[0];
        if (first) videoPlay(first.videoId, first.title);
      },
      onStateChange: function (e) {
        if (e.data === YT.PlayerState.PLAYING) showPlayPause(true);
        if (e.data === YT.PlayerState.PAUSED) showPlayPause(false);
        if (e.data === YT.PlayerState.ENDED) {
          if (st.repeat) {
            st.player.seekTo(0, true);
            st.player.playVideo();
          } else {
            next();
          }
        }
      },
    },
  });
}

export function videoPlay(videoId, title) {
  const st = getVideoState();
  if (!st.player) return;

  if (st.titleEl) st.titleEl.textContent = title || "";

  const pos = st.playlist.findIndex((x) => x.videoId === videoId);
  if (pos >= 0) st.index = pos;

  st.player.loadVideoById(videoId);
  st.player.playVideo();
}

export function videoStop() {
  const st = getVideoState();

  if (st.timer) clearInterval(st.timer);
  st.timer = null;

  try {
    if (st.player) st.player.destroy();
  } catch (e) {}
  st.player = null;

  st.playlist = [];
  st.index = 0;
  st.repeat = false;
  st.shuffle = false;
  st.titleEl = null;
}

function bindButtons() {
  const st = getVideoState();

  const playBtn = document.querySelector(".play-button");
  const pauseBtn = document.querySelector(".btn-pause");
  const nextBtn = document.querySelector(".btn-next");
  const backBtn = document.querySelector(".btn-back");
  const repeatBtn = document.querySelector(".btn-repeat");
  const shuffleBtn = document.querySelector(".btn-shuffle");
  const volumeRange = document.querySelector("#volume-range");
  const bar = document.querySelector(".js-slider-bar-video");

  if (playBtn) playBtn.onclick = () => st.player?.playVideo();
  if (pauseBtn) pauseBtn.onclick = () => st.player?.pauseVideo();
  if (nextBtn) nextBtn.onclick = () => next();
  if (backBtn) backBtn.onclick = () => back();

  if (repeatBtn)
    repeatBtn.onclick = () => {
      st.repeat = !st.repeat;
      repeatBtn.classList.toggle("opacity-100", st.repeat);
      repeatBtn.classList.toggle("opacity-70", !st.repeat);
    };
  if (shuffleBtn)
    shuffleBtn.onclick = () => {
      st.shuffle = !st.shuffle;
      shuffleBtn.classList.toggle("opacity-100", st.shuffle);
      shuffleBtn.classList.toggle("opacity-70", !st.shuffle);
    };

  if (volumeRange)
    volumeRange.oninput = (e) => {
      st.player?.setVolume(Number(e.target.value));
    };
  buttonVolume();
  if (bar)
    bar.onclick = (e) => {
      const dur = st.player?.getDuration();
      if (!dur || dur <= 0) return;

      const rect = bar.getBoundingClientRect();
      const percent = (e.clientX - rect.left) / rect.width;
      const newTime = Math.max(0, Math.min(1, percent)) * dur;

      st.player.seekTo(newTime, true);
    };
}

function next() {
  const st = getVideoState();
  const n = st.playlist.length;
  if (!n) return;

  if (st.shuffle && n > 1) {
    let r = st.index;
    while (r === st.index) r = Math.floor(Math.random() * n);
    st.index = r;
  } else {
    st.index = (st.index + 1) % n;
  }

  const item = st.playlist[st.index];
  videoPlay(item.videoId, item.title);
}

function back() {
  const st = getVideoState();
  const n = st.playlist.length;
  if (!n) return;

  st.index = (st.index - 1 + n) % n;
  const item = st.playlist[st.index];
  videoPlay(item.videoId, item.title);
}

function startTimer() {
  const st = getVideoState();
  if (st.timer) clearInterval(st.timer);

  st.timer = setInterval(() => {
    if (!st.player) return;

    const dur = st.player.getDuration();
    const cur = st.player.getCurrentTime();
    if (!dur || dur <= 0) return;

    const curEl = document.querySelector(".js-current-time");
    const durEl = document.querySelector(".js-duration");
    if (curEl) curEl.textContent = formatTotalVNN(cur);
    if (durEl) durEl.textContent = formatTotalVNN(dur);

    const percent = (cur / dur) * 100;
    const fill = document.querySelector(".js-slider-video");
    const knob = document.querySelector(".js-slider-knob-video");
    if (fill) fill.style.width = percent + "%";
    if (knob) knob.style.left = `calc(${percent}% - 6px)`;
  }, 300);
}
// function activeDragVideo() {
//   const status = getVideoState();
//   const barEl = document.querySelector(".js-slider-bar-video");
//   const knobEl = document.querySelector(".js-slider-knob-video");
//   if (!barEl || !knobEl) return;
//   let dragging = false;
//   knobEl.addEventListener("mousedown", (e) => {
//     e.preventDefault();
//     dragging = true;
//   });
//   document.addEventListener("mouseup", (e) => {

//   }
export function customVideo() {
  const detailEl = document.querySelector(".js-detail-video-more");
  const menuEl = document.querySelector("#menu-video");

  if (!detailEl || !menuEl) return;
  detailEl.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    menuEl.classList.toggle("hidden");
  });
  menuEl.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    menuEl.classList.add("hidden");
  });
}
function buttonVolume() {
  const speakerBtn = document.querySelector(".btn-speaker");
  const volPop = document.querySelector("#volume-range");
  if (!speakerBtn || !volPop) return;
  if (speakerBtn.dataset.bound === "1") return;
  speakerBtn.dataset.bound = "1";
  speakerBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    volPop.classList.toggle("hidden");
  });
  volPop.addEventListener("click", (e) => e.stopPropagation());
  document.addEventListener("click", () => {
    volPop.classList.add("hidden");
  });
}
