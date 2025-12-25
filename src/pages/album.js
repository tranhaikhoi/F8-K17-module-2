import instance from "../httpRequest";
import { formatTime, formatTotalVN, formatDateVN } from "./format";
import { playSongs } from "./album-today";
export default function album() {
  return `
    <section>
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-y-12 md:px-8 lg:px-0 gap-x-4">
        <div class="shrink-0 flex flex-col gap-5 items-center">
          
          <!-- Không dùng ảnh placeholder nữa: src rỗng + khung nền -->
          <div class="w-100 h-100 rounded-xl shadow-lg bg-white/10 overflow-hidden flex items-center justify-center">
            <img
              id="album-cover"
              src=""
              alt="album"
              class="w-full h-full object-cover hidden"
            />
            <div id="album-cover-load" class="text-white/40 text-sm">
              Loading cover...
            </div>
          </div>

          <h1 id="album-title" class="text-[20px] xl:text-[28px] font-bold text-center text-white">
            Album title
          </h1>

          <div class="text-[14px] xl:text-base text-white/80 text-center flex flex-col gap-2">
            <div class="flex items-center justify-center">
              <span id="album-song-count">0 bài hát</span>
              <span class="mx-2">•</span>
              <span id="album-duration">0 phút</span>
            </div>

            <p id="album-popularity">0 lượt nghe</p>
            <p id="album-type">Loại album: </p>
            <p id="album-release">Phát hành: </p>
          </div>
        </div>

        <div class="flex-1">
          <div class="js-tracks flex flex-col gap-3"></div>
        </div>
      </div>
    </section>
  `;
}

export async function initSongsug(slug) {
  const response = await instance.get(`/albums/details/${slug}`);
  const data = response.data;
  const songs = data.tracks;

  const coverEl = document.querySelector("#album-cover");
  const coverload = document.querySelector("#album-cover-load");

  const titleEl = document.querySelector("#album-title");
  const countEl = document.querySelector("#album-song-count");
  const durationEl = document.querySelector("#album-duration");
  const popEl = document.querySelector("#album-popularity");
  const typeEl = document.querySelector("#album-type");
  const releaseEl = document.querySelector("#album-release");
  const coverFromTrack = songs?.[0]?.thumbnails?.[0];
  const coverFromAlbum = data.thumbnails?.[0];
  const albumCover = coverFromTrack || coverFromAlbum || "";

  if (coverEl && albumCover) {
    coverEl.src = albumCover;
    coverEl.classList.remove("hidden");
    if (coverload) coverload.classList.add("hidden");
  }

  if (titleEl) titleEl.textContent = data.title || "Album title";
  if (countEl)
    countEl.textContent = `${data.songCount ?? songs.length} bài hát`;
  if (durationEl) durationEl.textContent = formatTotalVN(data.duration);
  if (popEl) popEl.textContent = `${data.popularity ?? 0} lượt nghe`;
  if (typeEl) typeEl.textContent = `Loại album: ${data.albumType || ""}`;
  if (releaseEl)
    releaseEl.textContent = `Phát hành: ${formatDateVN(data.releaseDate)}`;

  const tracksEl = document.querySelector(".js-tracks");
  if (!tracksEl) return;

  tracksEl.innerHTML = songs
    .map(
      (song, index) => `
        <a href="#!"
           class="flex items-center gap-4 py-3 px-4 text-white hover:bg-white/10 cursor-pointer transition group rounded-xl js-song-detail"
           data-audio-url="${song.audioUrl}" data-title="${
        song.title
      }" data-thumb="${song.thumbnails?.[0]}">
           
          <div class="w-6 text-center text-white/70">${index + 1}</div>

          <div class="relative overflow-hidden rounded-xl w-12 h-12 shrink-0 bg-white/10">
            <img
              src="${song.thumbnails?.[0]}"
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
