import instance from "../httpRequest";

export default function explore() {
  return `
    <section class="text-white flex gap-5 w-full h-4 mb-35">
      <a href="/explore/new-release" data-navigo
        class="flex items-center gap-3 px-6 py-8 bg-white/10 rounded-xl text-xl font-bold w-1/3 hover:bg-white/20 cursor-pointer"
      >
        <i class="fa-solid fa-compact-disc text-2xl"></i>
        <p>Bản phát hành mới</p>
      </a>

      <a href="/explore/charts" data-navigo
        class="flex items-center gap-3 px-6 py-8 bg-white/10 rounded-xl text-xl font-bold w-1/3 hover:bg-white/20 cursor-pointer"
      >
        <i class="fa-solid fa-chart-line text-2xl"></i>
        <p>Bảng xếp hạng</p>
      </a>

      <a href="/explore/moods-and-genres" data-navigo
        class="flex items-center gap-3 px-6 py-8 bg-white/10 rounded-xl text-xl font-bold w-1/3 hover:bg-white/20 cursor-pointer"
      >
        <i class="fa-regular fa-face-smile text-2xl"></i>
        <p>Tâm trạng và thể loại</p>
      </a>
    </section>
  `;
}

// ======================================================
// Khám phá Albums mới
// ======================================================
export function newAlbumExplore() {
  return `
    <section class="relative">
      <h2 class="text-5xl font-bold text-white mb-20">Khám phá Albums mới</h2>

      <div class="absolute right-0 top-15 flex items-center gap-4">
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer prev-new-album">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer next-new-album">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>

      <div class="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden pb-10 scroll-smooth scrollbar js-new-album-scroll">
        <div class="flex gap-10 shrink-0 js-newsAlbum"></div>
      </div>
    </section>
  `;
}

export async function initNewAlbumExplore(router) {
  const res = await instance.get("/explore/albums");
  const newAlbums = res.data.items;

  const container = document.querySelector(".js-newsAlbum");
  if (!container) return;

  container.innerHTML = newAlbums
    .map(
      (newsAlbum) => `
        <a href="/explore/${newsAlbum.slug}" data-navigo class="w-55 block cursor-pointer group shrink-0">
          <div class="relative overflow-hidden rounded-xl">
            <img
              src="${newsAlbum.thumb}"
              alt="${newsAlbum.name}"
              class="w-full h-55 rounded-xl object-cover"
            />
            <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <i class="fa-solid fa-play text-white text-4xl"></i>
            </div>
          </div>

          <p class="truncate w-50">${newsAlbum.name}</p>
          <p>${newsAlbum.albumType}</p>
        </a>
      `
    )
    .join("");
  tranformNewAlbum();
  router?.updatePageLinks();
}
export function tranformNewAlbum() {
  const scrollBox = document.querySelector(".js-new-album-scroll");
  const prevNewAlbum = document.querySelector(".prev-new-album");
  const nextNewAlbum = document.querySelector(".next-new-album");
  if (!scrollBox || !prevNewAlbum || !nextNewAlbum) return;

  function getScrollAmount() {
    return scrollBox.clientWidth;
  }

  function updateBtnNewAlbum() {
    const max = scrollBox.scrollWidth - scrollBox.clientWidth;
    prevNewAlbum.disabled = scrollBox.scrollLeft <= 0;
    nextNewAlbum.disabled = scrollBox.scrollLeft >= max - 1;
  }

  nextNewAlbum.onclick = function () {
    if (nextNewAlbum.disabled) return;
    scrollBox.scrollBy({ left: getScrollAmount(), behavior: "smooth" });
  };

  prevNewAlbum.onclick = function () {
    if (prevNewAlbum.disabled) return;
    scrollBox.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
  };

  scrollBox.addEventListener("scroll", updateBtnNewAlbum);
  window.addEventListener("resize", updateBtnNewAlbum);

  updateBtnNewAlbum();
}

// ======================================================
// Tâm trạng và thể loại
// ======================================================
export function Fellings() {
  return `
    <section class="relative mt-30">
      <h2 class="text-5xl font-bold text-white mb-20">Tâm trạng và thể loại</h2>

      <div class="absolute right-0 top-15 flex items-center gap-4">
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer prev-feeling">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer next-feeling">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>

      <div class="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden pb-10 scroll-smooth scrollbar js-feeling-scroll">
        <div class="js-feelings flex flex-col flex-wrap gap-x-10 gap-y-6 h-[296px] w-max"></div>
      </div>
    </section>
  `;
}

export async function initfeelings() {
  const res = await instance.get("/explore/meta");

  const categories = res.data.categories || [];
  const lines = res.data.lines || [];

  const allItems = [];
  //lấy item trong categories
  for (let i = 0; i < categories.length; i++) {
    const item = categories[i];
    allItems.push({
      slug: item.slug,
      name: item.name,
      color: item.color,
      type: "category",
    });
  }
  //lấy item trong lines
  for (let i = 0; i < lines.length; i++) {
    const item = lines[i];
    allItems.push({
      slug: item.slug,
      name: item.name,
      color: item.color,
      type: "line",
    });
  }

  const feelingContainer = document.querySelector(".js-feelings");
  if (!feelingContainer) return;

  feelingContainer.innerHTML = allItems
    .map((item) => {
      const href =
        item.type === "category"
          ? `/explore/categories/${item.slug}`
          : `/explore/lines/${item.slug}`;

      return `
        <a href="${href}" data-navigo class="block w-72 shrink-0">
          <div class="relative h-14 rounded-xl bg-zinc-800 overflow-hidden flex items-center justify-center">
            <span class="absolute left-0 top-0 h-full w-2" style="background:${item.color}"></span>
            <span class="absolute left-0 top-0 h-full w-8 opacity-30 blur-md" style="background:${item.color}"></span>
            <span class="relative text-white font-bold truncate">${item.name}</span>
          </div>
        </a>
      `;
    })
    .join("");

  tranformFeeling();
}

export function tranformFeeling() {
  const scrollFeel = document.querySelector(".js-feeling-scroll");
  const prevFeeling = document.querySelector(".prev-feeling");
  const nextFeeling = document.querySelector(".next-feeling");
  if (!scrollFeel || !prevFeeling || !nextFeeling) return;

  function getScrollFeel() {
    return scrollFeel.clientWidth;
  }

  function updateBtnFeel() {
    const max = scrollFeel.scrollWidth - scrollFeel.clientWidth;
    prevFeeling.disabled = scrollFeel.scrollLeft <= 0;
    nextFeeling.disabled = scrollFeel.scrollLeft >= max - 1;
  }

  nextFeeling.onclick = function () {
    if (nextFeeling.disabled) return;
    scrollFeel.scrollBy({ left: getScrollFeel(), behavior: "smooth" });
  };

  prevFeeling.onclick = function () {
    if (prevFeeling.disabled) return;
    scrollFeel.scrollBy({ left: -getScrollFeel(), behavior: "smooth" });
  };

  scrollFeel.addEventListener("scroll", updateBtnFeel);
  window.addEventListener("resize", updateBtnFeel);

  updateBtnFeel();
}
// ======================================================
// Video nhạc mới
// ======================================================
export function newVideosExplore() {
  return `
    <section class="relative mt-30">
      <h2 class="text-5xl font-bold text-white mb-20">Video nhạc mới</h2>

      <div class="absolute right-0 top-15 flex items-center gap-4">
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer prev-video">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer next-video">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>

      <div class="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden pb-10 scroll-smooth scrollbar js-video-scroll">
        <div class="js-videos flex flex-col flex-wrap gap-x-10 gap-y-6 h-[296px] w-max"></div>
      </div>
    </section>
  `;
}

export async function initNewVideosExplore(router) {
  const res = await instance.get("/explore/videos");
  const videos = res.data.items;

  const videosContainer = document.querySelector(".js-videos");
  if (!videosContainer) return;

  videosContainer.innerHTML = videos
    .map(
      (video) => `
        <a href="/videos/details/${
          video.slug
        }" class="w-85 block cursor-pointer group shrink-0">
          <div class="relative overflow-hidden rounded-xl">
            <img
              src="${video.thumb}"
              alt="${video.name}"
              class="w-full h-50 rounded-xl object-cover"
            />
            <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <i class="fa-solid fa-play text-white text-4xl"></i>
            </div>
          </div>

          <p class="truncate w-50">${video.name}</p>
          <p>${formatViews(video.views)} lượt xem</p>
        </a>
      `
    )
    .join("");
  tranformVideo();
  router?.updatePageLinks();
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
export function tranformVideo() {
  const scrollVideo = document.querySelector(".js-video-scroll");
  const prevVideo = document.querySelector(".prev-video");
  const nextVideo = document.querySelector(".next-video");
  if (!scrollVideo || !prevVideo || !nextVideo) return;

  function getScrollVideo() {
    return scrollVideo.clientWidth;
  }

  function updateBtnVideo() {
    const max = scrollVideo.scrollWidth - scrollVideo.clientWidth;
    prevVideo.disabled = scrollVideo.scrollLeft <= 0;
    nextVideo.disabled = scrollVideo.scrollLeft >= max - 1;
  }

  nextVideo.onclick = function () {
    if (nextVideo.disabled) return;
    scrollVideo.scrollBy({ left: getScrollVideo(), behavior: "smooth" });
  };

  prevVideo.onclick = function () {
    if (prevVideo.disabled) return;
    scrollVideo.scrollBy({ left: -getScrollVideo(), behavior: "smooth" });
  };

  scrollVideo.addEventListener("scroll", updateBtnVideo);
  window.addEventListener("resize", updateBtnVideo);

  updateBtnVideo();
}
