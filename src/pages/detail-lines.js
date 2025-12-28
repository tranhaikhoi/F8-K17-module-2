import instance from "../httpRequest";
import { tranformFeeling } from "./explore";
export default function detailLine() {
  return `
    <section class="relative mt-10">
      <h2 class="text-5xl font-bold text-white mt-15 ">Bài hát</h2>
      <div class="absolute right-0 top-15 flex items-center gap-4 ">
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer prev-songs">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer next-songs">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>

      <div class="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden pb-10 scroll-smooth scrollbar js-scroll-songs-detail mt-20">
        <div class="flex flex-wrap gap-6 w-full js-lines-songs"></div>
      </div>
    </section>

    <section class="relative">
      <h2 class="text-5xl font-bold text-white mt-15 ">Danh sách nổi bật</h2>
      <div class="absolute right-0 top-15 flex items-center gap-4 ">
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer prev-playlists">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer next-playlists">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>

      <div class="js-lines-playlists flex gap-8 scrollbar js-scroll-playlists-detail scroll-smooth overflow-x-auto pb-10 mt-20"></div>
    </section>

    <section class="relative ">
      <h2 class="text-5xl font-bold text-white mt-15 ">Video nhạc</h2>
      <div class="absolute right-0 top-15 flex items-center gap-4 ">
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer prev-videos">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer next-videos">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>

      <div class="js-lines-videos flex gap-8 scrollbar js-scroll-videos-detail scroll-smooth overflow-x-auto pb-10 mt-20"></div>
    </section>

    <section class="relative ">
      <h2 class="text-5xl font-bold text-white mt-15 ">Đĩa nhạc</h2>
      <div class="absolute right-0 top-15 flex items-center gap-4 ">
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer prev-albums">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer next-albums">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>

      <div class="js-lines-albums flex gap-8 scrollbar js-scroll-albums-detail scroll-smooth overflow-x-auto pb-10 mt-20"></div>
    </section>
  `;
}

export async function initdetailSongLines(router, slug) {
  const response = await instance.get(`/lines/${slug}/songs`);
  const data = response.data;
  const items = data.items || [];
  const container = document.querySelector(".js-lines-songs");
  if (!container) return;
  container.innerHTML = items
    .slice(0, 12)
    .map(
      (item) => `
      <a href="playlists/details/${item.slug}" data-navigo
         class="group flex items-center gap-4 p-3 rounded-lg hover:bg-white/10
                w-[calc(33.333%-16px)]">
        <div class="relative w-12 h-12 shrink-0 overflow-hidden rounded">
          <img
            src="${item.thumb || ""}"
            alt="${item.name}"
            class="w-12 h-12 object-cover group-hover:brightness-50"
          />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100"></div>
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <i class="fa-solid fa-play text-white text-lg"></i>
          </div>
        </div>

        <div class="flex flex-col gap-1 min-w-0">
          <h3 class="text-white font-normal truncate">${item.name}</h3>
          <div class="flex items-center text-gray-400 text-sm min-w-0">
            <span class="truncate">${item.albumName}</span>
            <span class="mx-2">•</span>
            <span class="shrink-0">${formatViews(item.views)} </span>
          </div>
        </div>
      </a>
    `
    )
    .join("");

  router.updatePageLinks();
  useOldTransform(".js-scroll-songs-detail", ".prev-songs", ".next-songs");
}
export async function initdetailPlaylistLines(router, slug) {
  const response = await instance.get(`/lines/${slug}/playlists`);
  const data = response.data;
  const items = data.items || [];
  const container = document.querySelector(".js-lines-playlists");
  if (!container) return;
  container.innerHTML = items
    .map(
      (item) => `
              <a href="/playlists/details/${item.id}" data-navigo class="w-55 block cursor-pointer group shrink-0 js-block-itemgestion">
          <div class="relative overflow-hidden rounded-xl">
            <img
              src="${item.thumb}"
              alt="${item.name}"
              class="w-full h-55 rounded-xl object-cover"
            />
            <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <i class="fa-solid fa-play text-white text-4xl"></i>
            </div>
          </div>

          <p class="truncate w-50">${item.name}</p>
          <p>${item.artists}</p>
        </a>
    `
    )
    .join("");

  router.updatePageLinks();
  useOldTransform(
    ".js-scroll-playlists-detail",
    ".prev-playlists",
    ".next-playlists"
  );
}
export async function initdetailVideoLines(router, slug) {
  const response = await instance.get(`/lines/${slug}/videos`);
  const data = response.data;
  const items = data.items || [];
  const container = document.querySelector(".js-lines-videos");
  if (!container) return;
  container.innerHTML = items
    .map(
      (item) => `
        <a href="/videos/details/${
          item.slug
        }" data-navigo class="w-85 block cursor-pointer group shrink-0">
          <div class="relative overflow-hidden rounded-xl">
            <img
              src="${item.thumb}"
              alt="${item.name}"
              class="w-full h-50 rounded-xl object-cover"
            />
            <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <i class="fa-solid fa-play text-white text-4xl"></i>
            </div>
          </div>

          <p class="truncate w-50">${item.name}</p>
          <p>${formatViews(item.views)}</p>
        </a>
    `
    )
    .join("");

  router.updatePageLinks();
  useOldTransform(".js-scroll-videos-detail", ".prev-videos", ".next-videos");
}
function formatViews(views) {
  if (views >= 1_000_000) {
    return `${(views / 1_000_000).toFixed(0)} Tr lượt xem`;
  }
  if (views >= 1_000) {
    return `${(views / 1_000).toFixed(0)} N lượt xem`;
  }
  return `${views} lượt xem`;
}
export async function initdetailAlbumLines(router, slug) {
  const response = await instance.get(`/lines/${slug}/albums`);
  const data = response.data;
  const items = data.items || [];
  const container = document.querySelector(".js-lines-albums");
  if (!container) return;
  container.innerHTML = items
    .map(
      (item) => `
                  <a href="/playlists/details/${item.id}" data-navigo class="w-55 block cursor-pointer group shrink-0 js-block-itemgestion">
          <div class="relative overflow-hidden rounded-xl">
            <img
              src="${item.thumb}"
              alt="${item.name}"
              class="w-full h-55 rounded-xl object-cover"
            />
            <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <i class="fa-solid fa-play text-white text-4xl"></i>
            </div>
          </div>

          <p class="truncate w-50">${item.name}</p>
          <p>${item.albumType}</p>
        </a> 
    `
    )
    .join("");

  router.updatePageLinks();
  useOldTransform(".js-scroll-albums-detail", ".prev-albums", ".next-albums");
}

function useOldTransform(scroll, prev, next) {
  const scrollEl = document.querySelector(scroll);
  const prevBtn = document.querySelector(prev);
  const nextBtn = document.querySelector(next);
  if (!scrollEl || !prevBtn || !nextBtn) return;
  scrollEl.classList.add("js-feeling-scroll");
  prevBtn.classList.add("prev-feeling");
  nextBtn.classList.add("next-feeling");
  tranformFeeling();

  scrollEl.classList.remove("js-feeling-scroll");
  prevBtn.classList.remove("prev-feeling");
  nextBtn.classList.remove("next-feeling");
}
