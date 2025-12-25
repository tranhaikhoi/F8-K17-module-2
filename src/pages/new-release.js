import instance from "../httpRequest";
export default function newRelease() {
  return `
    <section class="relative">
      <h2 class="text-5xl font-bold text-white mb-20">Bản phát hành mới</h2>

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

export async function initNewRelease(router) {
  const res = await instance.get("/explore/new-releases");
  const newAlbums = res.data.items;

  const container = document.querySelector(".js-newsAlbum");
  if (!container) return;

  container.innerHTML = newAlbums
    .map(
      (newsAlbum) => `
        <a href="/new-release/details/${newsAlbum.id}" data-navigo class="w-55 block cursor-pointer group shrink-0">
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
  tranformNewRelease();
  router?.updatePageLinks();
}
export function tranformNewRelease() {
  const scrollBox = document.querySelector(".js-new-album-scroll");
  const prevNewAlbum = document.querySelector(".prev-new-album");
  const nextNewAlbum = document.querySelector(".next-new-album");
  if (!scrollBox || !prevNewAlbum || !nextNewAlbum) return;

  function getScrollAmount() {
    return scrollBox.clientWidth; // cuộn theo 1 trang
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
