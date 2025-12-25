export default function control() {
  return `
    <div class="js-control hidden">
      <div class="fixed left-0 right-0 bottom-20 z-50 px-4">
        <div class="slider relative">
          <audio class="js-audio-player" src=""></audio>

          <div class="js-slider-bar relative bg-gray-300 h-[8px] rounded cursor-pointer">
            <div class="js-slider-fill h-full w-0 bg-cyan-400 rounded"></div>
            <span class="js-slider-knob absolute -top-2.5 text-white select-none ">●</span>
          </div>
        </div>
      </div>

      <div
        class="fixed left-0 right-0 bottom-0 h-20 bg-black/50
               flex items-center px-4 py-2 z-50 justify-between"
      >
        <div class="flex gap-10 items-center text-white text-2xl">
          <span class="prev-button cursor-pointer w-12 h-12 hover:bg-neutral-700 rounded-full flex items-center justify-center"><i class="fa-solid fa-backward-step"></i></span>

          <span class="play-button cursor-pointer w-12 h-12 hover:bg-neutral-700 rounded-full flex items-center justify-center"><i class="fa-solid fa-play"></i></span>
          <span class="pause-button hidden cursor-pointer w-12 h-12 hover:bg-neutral-700 rounded-full flex items-center justify-center"><i class="fa-solid fa-pause"></i></span>

          <span class="next-button cursor-pointer w-12 h-12 hover:bg-neutral-700 rounded-full flex items-center justify-center"><i class="fa-solid fa-forward-step"></i></span>

          <div class="js-time-info text-xl">
            <span class="current-time">0:00</span> / <span class="duration">0:00</span>
          </div>
        </div>

        <div class="flex gap-2 items-center text-white">
          <img class="js-control-thumb w-10 h-10 object-cover rounded" src="" />
          <div>
            <p class="js-control-title text-xl"></p>
          </div>
        </div>

        <div class="flex gap-4 items-center text-white text-xl">
          <div class="relative flex items-center volume-wrap">
            <input
              type="range"
              min="0"
              max="100"
              value="50"
              id="volumeRange"
              class="hidden absolute right-10 top-1/2 -translate-y-1/2 w-24 h-1 cursor-pointer"
            />
            <div class="w-12 h-12 hover:bg-neutral-700 rounded-full flex items-center justify-center cursor-pointer volume-button">
              <i class="fa-solid fa-volume-high"></i>
            </div>
          </div>

          <div class="w-12 h-12 hover:bg-neutral-700 rounded-full flex items-center justify-center cursor-pointer repeat-button opacity-70">
            <i class="fa-solid fa-repeat"></i>
          </div>

          <div class="w-12 h-12 hover:bg-neutral-700 rounded-full flex items-center justify-center cursor-pointer shuffle-button opacity-70">
            <i class="fa-solid fa-shuffle"></i>
          </div>
          <div class="w-12 h-12 hover:bg-neutral-700 rounded-full flex items-center justify-center cursor-pointer opacity-70 exit-button">
            <i class="fa-solid fa-circle-xmark"></i>
          </div>
        </div>
      </div>
    </div>
  `;
}

function fmt(sec) {
  sec = Math.floor(sec || 0);
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function togglePlayPauseButtons(isPlaying) {
  const playBtn = document.querySelector(".play-button");
  const pauseBtn = document.querySelector(".pause-button");
  if (!playBtn || !pauseBtn) return;

  playBtn.classList.toggle("hidden", isPlaying);
  pauseBtn.classList.toggle("hidden", !isPlaying);
}

export function controlScript() {
  const audio = document.querySelector(".js-audio-player");
  const controlEl = document.querySelector(".js-control");
  if (!audio || !controlEl) return;

  window.appStatus ||= { isPlaying: false, song: null, songs: [] };
  const appStatus = window.appStatus;

  const playBtn = document.querySelector(".play-button");
  const pauseBtn = document.querySelector(".pause-button");
  const prevBtn = document.querySelector(".prev-button");
  const nextBtn = document.querySelector(".next-button");

  const sliderBar = document.querySelector(".js-slider-bar");
  const sliderFill = document.querySelector(".js-slider-fill");
  const sliderKnob = document.querySelector(".js-slider-knob");

  const currentTimeEl = document.querySelector(".js-time-info .current-time");
  const durationEl = document.querySelector(".js-time-info .duration");

  playBtn?.addEventListener("click", () => {
    if (!appStatus.song) return;
    audio.play();
  });

  pauseBtn?.addEventListener("click", () => {
    audio.pause();
  });

  audio.addEventListener("play", () => {
    appStatus.isPlaying = true;
    togglePlayPauseButtons(true);
  });

  audio.addEventListener("pause", () => {
    appStatus.isPlaying = false;
    togglePlayPauseButtons(false);
  });

  audio.addEventListener("loadedmetadata", () => {
    if (durationEl) durationEl.textContent = fmt(audio.duration);
  });

  audio.addEventListener("timeupdate", () => {
    const dur = audio.duration;
    if (!Number.isFinite(dur) || dur <= 0) return;

    if (currentTimeEl) currentTimeEl.textContent = fmt(audio.currentTime);
    if (durationEl) durationEl.textContent = fmt(dur);

    const percent = (audio.currentTime / dur) * 100;

    if (sliderFill) sliderFill.style.width = `${percent}%`;
    if (sliderKnob) sliderKnob.style.left = `calc(${percent}% - 6px)`;
  });

  sliderBar?.addEventListener("click", (e) => {
    const dur = audio.duration;
    if (!Number.isFinite(dur) || dur <= 0) return;

    const rect = sliderBar.getBoundingClientRect();
    const p = (e.clientX - rect.left) / rect.width;
    audio.currentTime = Math.max(0, Math.min(1, p)) * dur;
  });

  function playByIndex(i) {
    if (!appStatus.songs.length) return;
    const idx = (i + appStatus.songs.length) % appStatus.songs.length;

    appStatus.song = appStatus.songs[idx];
    audio.src = appStatus.song;
    audio.play();
  }

  nextBtn?.addEventListener("click", () => {
    if (!appStatus.songs.length) return;

    const idx = appStatus.song ? appStatus.songs.indexOf(appStatus.song) : -1;
    playByIndex(idx + 1);
  });

  prevBtn?.addEventListener("click", () => {
    if (!appStatus.songs.length) return;

    const idx = appStatus.song ? appStatus.songs.indexOf(appStatus.song) : 0;
    playByIndex(idx - 1);
  });

  audio.addEventListener("ended", () => {
    nextBtn?.click();
  });

  const volumeBtn = document.querySelector(".volume-button");
  const volumeWrap = document.querySelector(".volume-wrap");
  const volumeRange = document.querySelector("#volumeRange");

  function hideVolume() {
    volumeRange?.classList.add("hidden");
  }
  function toggleVolume() {
    volumeRange?.classList.toggle("hidden");
  }

  volumeBtn?.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleVolume();
  });

  volumeRange?.addEventListener("click", (e) => e.stopPropagation());
  volumeRange?.addEventListener("input", (e) => {
    audio.volume = Number(e.target.value) / 100;
  });

  document.addEventListener("click", (e) => {
    if (!volumeWrap) return;
    if (!volumeWrap.contains(e.target)) hideVolume();
  });

  const repeatBtn = document.querySelector(".repeat-button");
  const shuffleBtn = document.querySelector(".shuffle-button");

  appStatus.repeatOne ||= false;
  appStatus.shuffle ||= false;

  repeatBtn?.addEventListener("click", () => {
    appStatus.repeatOne = !appStatus.repeatOne;
    repeatBtn.classList.toggle("opacity-100", appStatus.repeatOne);
    repeatBtn.classList.toggle("opacity-70", !appStatus.repeatOne);
  });

  shuffleBtn?.addEventListener("click", () => {
    appStatus.shuffle = !appStatus.shuffle;
    shuffleBtn.classList.toggle("opacity-100", appStatus.shuffle);
    shuffleBtn.classList.toggle("opacity-70", !appStatus.shuffle);
  });

  audio.removeEventListener("ended", () => {});
  audio.addEventListener("ended", () => {
    if (appStatus.repeatOne) {
      audio.currentTime = 0;
      audio.play();
      return;
    }

    if (appStatus.shuffle && appStatus.songs.length > 1) {
      const curIdx = appStatus.song
        ? appStatus.songs.indexOf(appStatus.song)
        : -1;
      let r = curIdx;
      while (r === curIdx)
        r = Math.floor(Math.random() * appStatus.songs.length);
      playByIndex(r);
      return;
    }

    nextBtn?.click();
  });
  const exitBtn = document.querySelector(".exit-button");
  exitBtn?.addEventListener("click", () => {
    audio.pause();
    appStatus.song = null;
    appStatus.songs = [];
    audio.src = "";
    alert("Bạn có chắc chắn muốn dừng phát không?");
    controlEl.classList.add("hidden");
  });
}
