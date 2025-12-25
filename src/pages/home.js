import instance from "../httpRequest";
import login from "../pages/login";
import { initLogin } from "../pages/login";
export default function Mood() {
  return `
    <section class="relative">
      <h2 class="text-5xl font-semibold text-white mb-20 js-hello">
        <i class="fa-solid fa-hand-peace"></i> Chào mừng<span class="js-hello-name"></span>
      </h2>

      <div class="absolute right-0 top-20 flex items-center gap-4">
        <button
          class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>

        <button
          class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div class="flex items-center gap-6 pb-10 js-moods"></div>
    </section>
  `;
}

export function moodScript(router) {
  async function fetchMoods() {
    // Step 2
    const response = await instance.get("/moods");
    const moods = response.data.items;

    // Step 3
    const moodsContainer = document.querySelector(".js-moods");
    if (!moodsContainer) return;
    moodsContainer.innerHTML = moods
      .map(
        (mood) => `
          <div class="flex items-center px-3 py-2 rounded-lg text-sm shrink-0 cursor-pointer bg-white/10 text-white hover:bg-white/20">
            <a href="/moods/${mood.slug}" data-navigo>${mood.name}</a>
          </div>
        `
      )
      .join("");
    router?.updatePageLinks?.();
  }
  fetchMoods();
}

//==========================================hello người dùng==================================================//
export function initHelloUser() {
  const helloName = document.querySelector(".js-hello-name");
  if (!helloName) return;
  const nameDisplay = localStorage.getItem("user");
  const user = nameDisplay ? JSON.parse(nameDisplay) : null;
  const name = user?.name || localStorage.getItem("register_name") || "";
  helloName.textContent = name ? ` ${name}` : "";
}

// ======================================================
// Nghe gần đây
// ======================================================
export function recentListen() {
  return `
    <h2 class="text-5xl font-semibold text-white mb-20">
      Nghe gần đây <span></span>
    </h2>
  `;
}

// ======================================================
// Quick Pick
// ======================================================
export function quickPicks() {
  return `
    <section class="relative mt-10">
      <h2 class="text-5xl font-semibold text-white mb-10">Quick Picks</h2>

      <div class="absolute right-0 top-15 flex items-center gap-4">
        <button class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div class="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden pb-10 scroll-smooth scrollbar">
        <div class="flex flex-col gap-3 shrink-0 js-picks"></div>
      </div>
    </section>
  `;
}

export async function initquickPicks(router) {
  const res = await instance.get("/quick-picks");

  const picksContainer = document.querySelector(".js-picks");
  if (!picksContainer) return;

  picksContainer.innerHTML = res.data
    .map(
      (pick) => `
        <a href="/quick-picks/${
          pick.slug
        }" data-navigo class="group flex items-center gap-4 py-2 px-3 rounded-lg hover:bg-white/10">
          <div class="relative w-12 h-12 shrink-0 overflow-hidden rounded">
            <img
              src="${pick.thumbnails?.[0] ?? ""}"
              alt="${pick.title}"
              class="w-12 h-12 object-cover group-hover:brightness-50"
            />
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <i class="fa-solid fa-play text-white text-lg"></i>
            </div>
          </div>

          <div class="flex flex-col gap-1">
            <h3 class="text-white font-normal">${pick.title}</h3>
            <div class="flex items-center text-gray-400">
              <span>${pick.artists?.[0] ?? ""}</span>
              <span class="mx-2">•</span>
              <span>${pick.popularity} lượt nghe</span>
            </div>
          </div>
        </a>
      `
    )
    .join("");
  router?.updatePageLinks?.();
}

// ======================================================
// Gợi ý album cho bạn
// ======================================================
export function AlbumForYou() {
  return `
    <section class="relative mt-10">
      <h2 class="text-5xl font-semibold text-white mb-20">Gợi ý album cho bạn</h2>

      <div class="absolute right-0 top-20 flex items-center gap-4">
        <button class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer prev-suggestion">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer next-suggestion">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div class="js-sugs flex gap-8 scrollbar scroll-smooth overflow-x-auto pb-10"></div>
    </section>
  `;
}

export async function initAlbumForYou(router) {
  const res = await instance.get("/home/albums-for-you", {
    params: { country: "GLOBAL", limit: 12 },
  });

  const sugsContainer = document.querySelector(".js-sugs");
  if (!sugsContainer) return;

  sugsContainer.innerHTML = res.data
    .map(
      (sug) => `
        <a href="/albums/details/${sug.slug}" data-navigo class="w-55 block cursor-pointer group shrink-0 js-block-suggestion">
          <div class="relative overflow-hidden rounded-xl">
            <img
              src="${sug.thumbnails}"
              alt="${sug.title}"
              class="w-full h-55 rounded-xl object-cover"
            />
            <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <i class="fa-solid fa-play text-white text-4xl"></i>
            </div>
          </div>

          <p>${sug.title}</p>
          <p>${sug.artists}</p>
        </a>
      `
    )
    .join("");
  router?.updatePageLinks?.();
  tranformAlbumSug();
}
//==========================pre-next album gợi ý cho bạn==============================//
export function tranformAlbumSug() {
  const sugBlock = document.querySelector(".js-sugs");
  const prevSug = document.querySelector(".prev-suggestion");
  const nextSug = document.querySelector(".next-suggestion");
  if (!sugBlock || !prevSug || !nextSug) return;

  function getScroll() {
    return sugBlock.clientWidth;
  }

  function updateBtn() {
    const maxBlock = sugBlock.scrollWidth - sugBlock.clientWidth;

    prevSug.disabled = sugBlock.scrollLeft <= 0;
    nextSug.disabled = sugBlock.scrollLeft >= maxBlock - 1;
  }

  nextSug.onclick = function () {
    if (nextSug.disabled) return;
    sugBlock.scrollBy({ left: getScroll(), behavior: "smooth" });
  };

  prevSug.onclick = function () {
    if (prevSug.disabled) return;
    sugBlock.scrollBy({ left: -getScroll(), behavior: "smooth" });
  };

  sugBlock.addEventListener("scroll", updateBtn);
  window.addEventListener("resize", updateBtn);

  updateBtn();
}
// ======================================================
// Today's Hit
// ======================================================
export function todayHit() {
  return `
    <section class="relative mt-25">
      <h2 class="text-5xl font-semibold text-white mb-20">Today's Hit</h2>

      <div class="absolute right-0 top-20 flex items-center gap-4">
        <button class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer prev-today-hit">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer next-today-hit">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div class="js-hits flex gap-8 scrollbar scroll-smooth overflow-x-auto pb-10"></div>
    </section>
  `;
}

export async function initTodayHit(router) {
  const res = await instance.get("/home/todays-hits", {
    params: { country: "GLOBAL", limit: 12 },
  });

  const hitsContainer = document.querySelector(".js-hits");
  if (!hitsContainer) return;

  hitsContainer.innerHTML = res.data
    .map(
      (hit) => `
        <a href="/playlists/details/${hit.slug}" data-navigo class="w-55 block cursor-pointer group shrink-0">
          <div class="relative overflow-hidden rounded-xl">
            <img
              src="${hit.thumbnails}"
              alt="${hit.title}"
              class="w-full h-55 rounded-xl object-cover"
            />
            <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <i class="fa-solid fa-play text-white text-4xl"></i>
            </div>
          </div>

          <p class="truncate w-50">${hit.title}</p>
          <p>${hit.artists}</p>
        </a>
      `
    )
    .join("");
  router?.updatePageLinks?.();
  tranformTodayHit();
}
//==========================pre-next hôm nay hot==============================//
export function tranformTodayHit() {
  const hitBlock = document.querySelector(".js-hits");
  const preToday = document.querySelector(".prev-today-hit");
  const nextToday = document.querySelector(".next-today-hit");
  if (!hitBlock || !preToday || !nextToday) return;

  function getScrollTodayHit() {
    return hitBlock.clientWidth;
  }

  function updateBtnToday() {
    const maxBlockToday = hitBlock.scrollWidth - hitBlock.clientWidth;

    preToday.disabled = hitBlock.scrollLeft <= 0;
    nextToday.disabled = hitBlock.scrollLeft >= maxBlockToday - 1;
  }

  nextToday.onclick = function () {
    if (nextToday.disabled) return;
    hitBlock.scrollBy({ left: getScrollTodayHit(), behavior: "smooth" });
  };

  preToday.onclick = function () {
    if (preToday.disabled) return;
    hitBlock.scrollBy({ left: -getScrollTodayHit(), behavior: "smooth" });
  };

  hitBlock.addEventListener("scroll", updateBtnToday);
  window.addEventListener("resize", updateBtnToday);

  updateBtnToday();
}
// ======================================================
// Nhạc Việt
// ======================================================
export function albumViet() {
  return `
    <section class="relative mt-25">
      <h2 class="text-5xl font-semibold text-white mb-20">Nhạc Việt</h2>

      <div class="absolute right-0 top-20 flex items-center gap-4">
        <button class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer prev-album-viet">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer next-album-viet">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div class="js-viets flex gap-8 scrollbar scroll-smooth overflow-x-auto pb-10"></div>
    </section>
  `;
}

export async function initAlbumViets() {
  const res = await instance.get("/quick-picks");

  const vietsContainer = document.querySelector(".js-viets");
  if (!vietsContainer) return;

  vietsContainer.innerHTML = res.data
    .map(
      (viet) => `
        <a href="/quick-picks/${viet.slug}" data-navigo class="w-55 block cursor-pointer group shrink-0">
          <div class="relative overflow-hidden rounded-xl">
            <img
              src="${viet.thumbnails}"
              alt="${viet.title}"
              class="w-full h-55 rounded-xl object-cover"
            />
            <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <i class="fa-solid fa-play text-white text-4xl"></i>
            </div>
          </div>

          <p class="truncate w-50">${viet.title}</p>
          <p>${viet.artists}</p>
        </a>
      `
    )
    .join("");
  tranformAlbumViet();
}
//==========================pre-next album Việt==============================//
export function tranformAlbumViet() {
  const vietBlock = document.querySelector(".js-viets");
  const prevAlbumViet = document.querySelector(".prev-album-viet");
  const nextAlbumViet = document.querySelector(".next-album-viet");
  if (!vietBlock || !prevAlbumViet || !nextAlbumViet) return;

  function getScrollAlbumViet() {
    return vietBlock.clientWidth;
  }

  function updateBtnViet() {
    const maxBlock = vietBlock.scrollWidth - vietBlock.clientWidth;

    prevAlbumViet.disabled = vietBlock.scrollLeft <= 0;
    nextAlbumViet.disabled = vietBlock.scrollLeft >= maxBlock - 1;
  }

  nextAlbumViet.onclick = function () {
    if (nextAlbumViet.disabled) return;
    vietBlock.scrollBy({ left: getScrollAlbumViet(), behavior: "smooth" });
  };

  prevAlbumViet.onclick = function () {
    if (prevAlbumViet.disabled) return;
    vietBlock.scrollBy({ left: -getScrollAlbumViet(), behavior: "smooth" });
  };

  vietBlock.addEventListener("scroll", updateBtnViet);
  window.addEventListener("resize", updateBtnViet);

  updateBtnViet();
}
