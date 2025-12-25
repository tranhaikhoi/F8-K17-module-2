import instance from "../httpRequest";
import { formatTime, formatTotalVN } from "./format";

export default function playlistDetail() {
  return `
    <section>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-12 md:px-8 lg:px-0 gap-x-4">
        <div class="shrink-0 flex flex-col gap-5 items-center">

          <div class="w-100 h-100 rounded-xl shadow-lg bg-white/10 overflow-hidden flex items-center justify-center">
            <img
              id="playlist-cover"
              src="data:image/gif;base64,R0lGODlhAQABAAAAACw="
              alt="playlist"
              class="w-full h-full object-cover hidden"
            />
            <div id="playlist-cover-load" class="text-white/40 text-sm">
              Loading cover...
            </div>
          </div>

          <h1 id="playlist-title" class="text-[20px] xl:text-[28px] font-bold text-center text-white">
            Playlist title
          </h1>

          <div class="text-[14px] xl:text-base text-white/80 text-center flex flex-col gap-2">
            <div class="flex items-center justify-center">
              <span id="playlist-song-count">0 bài hát</span>
              <span class="mx-2">•</span>
              <span id="playlist-duration">0 phút</span>
            </div>

            <p id="playlist-desc" class="text-white/60"></p>
          </div>
        </div>

        <div class="flex-1">
          <div class="js-tracks flex flex-col gap-3"></div>
        </div>
      </div>
    </section>
  `;
}

export async function initPlaylistDetail(slug) {
  const response = await instance.get(`/playlists/details/${slug}`);
  const data = response.data;
  const songs = data.tracks || [];

  const coverEl = document.querySelector("#playlist-cover");
  const coverLoadEl = document.querySelector("#playlist-cover-load");
  const titleEl = document.querySelector("#playlist-title");
  const countEl = document.querySelector("#playlist-song-count");
  const durationEl = document.querySelector("#playlist-duration");
  const descEl = document.querySelector("#playlist-desc");

  const coverFromFirstTrack = songs?.[0]?.thumbnails?.[0];
  const coverFromPlaylist = data.thumbnails?.[0];
  const coverUrl = coverFromFirstTrack || coverFromPlaylist || "";

  if (coverEl) {
    if (coverUrl) {
      coverEl.src = coverUrl;
      coverEl.classList.remove("hidden");
      coverLoadEl?.classList.add("hidden");
    } else {
      coverEl.classList.add("hidden");
      coverLoadEl?.classList.remove("hidden");
    }
  }

  titleEl && (titleEl.textContent = data.title || "Playlist title");
  countEl &&
    (countEl.textContent = `${data.songCount ?? songs.length} bài hát`);
  durationEl && (durationEl.textContent = formatTotalVN(data.duration));
  descEl && (descEl.textContent = data.description ?? "");

  const tracksEl = document.querySelector(".js-tracks");
  if (!tracksEl) return;

  tracksEl.innerHTML = songs
    .map(
      (song, index) => `
        <a href="#!"
           class="flex items-center gap-4 py-3 px-4 text-white hover:bg-white/10 cursor-pointer transition group rounded-xl js-song-detail"
           data-audio-url="${song.audioUrl}"
           data-title="${song.title}"
           data-thumb="${song.thumbnails?.[0] || ""}">

          <div class="w-6 text-center text-white/70">${index + 1}</div>

          <div class="relative overflow-hidden rounded-xl w-12 h-12 shrink-0 bg-white/10">
            <img
              src="${song.thumbnails?.[0] || ""}"
              alt="${song.title}"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <i class="fa-solid fa-play text-white text-sm"></i>
            </div>
          </div>

          <div class="flex flex-col justify-between flex-1">
            <div class="font-semibold">${song.title}</div>
          </div>

          <div class="text-white/60 text-sm w-14 text-right">
            ${formatTime(song.duration)}
          </div>
        </a>
      `
    )
    .join("");

  playSongs(songs, ".js-tracks");
}
export function playSongs(songs = [], containerSelector = ".js-tracks") {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  window.appStatus ||= { isPlaying: false, song: null, songs: [] };
  window.appStatus.songs = songs.map((s) => s.audioUrl);
  container.onclick = (e) => {
    const songDetailEl = e.target.closest(".js-song-detail");
    if (!songDetailEl) return;

    const audioSrc = songDetailEl.dataset.audioUrl;
    const title = songDetailEl.dataset.title;
    const thumb = songDetailEl.dataset.thumb;

    const audioPlayer = document.querySelector(".js-audio-player");
    const controlEl = document.querySelector(".js-control");
    if (!audioPlayer || !controlEl) return;

    window.appStatus.song = audioSrc;
    window.appStatus.isPlaying = true;

    audioPlayer.src = audioSrc;
    audioPlayer.play();

    document.querySelector(".js-control-title").textContent = title || "";
    document.querySelector(".js-control-thumb").src = thumb || "";
    controlEl.classList.remove("hidden");

    document.querySelector(".play-button")?.classList.add("hidden");
    document.querySelector(".pause-button")?.classList.remove("hidden");

    audioPlayer.onloadedmetadata = () => {
      const durationEl = document.querySelector(".js-time-info .duration");
      if (!durationEl) return;

      const total = Math.floor(audioPlayer.duration || 0);
      const m = Math.floor(total / 60);
      const s = total % 60;
      durationEl.textContent = `${m}:${s < 10 ? "0" : ""}${s}`;
    };
  };
}
