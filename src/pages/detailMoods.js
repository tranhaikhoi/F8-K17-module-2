import instance from "../httpRequest";
import { moodScript } from "./home";
export function energizeMoods() {
  return `
  <section>
  <div class="flex items-center gap-6 pb-10 js-moods mt-15"></div>
  
  </section>`;
}
export async function initEnergizeMood() {
  moodScript();
}
export function textEnergize() {
  return `
  
  <div class="js-text-energize"></div>`;
}
export async function initTextEnergize(slug) {
  const response = await instance.get("/moods/" + slug);
  const textEnergize = document.querySelector(".js-text-energize");
  const item = response.data.hero;
  console.log(response.data);
  textEnergize.innerHTML = `
    <h2 class="text-5xl font-bold text-white mb-10 js-change-detail "></h2>
    <h2 class="text-2xl font-semibold text-white/90 mb-20 ">${item.subtitle} <span class="js-change-detail"></span></h2>
     `;
  await initChangePage(slug);
}
//====================================chuyển đến trang nào thì lấy tên trang đó===================================//
export async function initChangePage(slug) {
  const res = await instance.get("/moods");
  const moods = res.data && res.data.items ? res.data.items : [];

  const mood = moods.find(function (init) {
    return init.slug === slug;
  });

  const titleEl = document.querySelector(".js-change-detail");
  if (!titleEl) return;

  titleEl.textContent = mood && mood.name ? mood.name : slug;
}
export function features() {
  return `
     <h2 class="text-5xl font-bold text-white mt-20 ">Quick Picks</h2>
  <section class="relative mt-25 ">
        <h2 class="text-5xl font-bold text-white mt-20 ">Featured</h2>
      <div class="absolute right-0 top-20 flex items-center gap-4">
        <button class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer prev-today-hit">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer next-today-hit">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div class="js-features flex gap-8 scrollbar scroll-smooth overflow-x-auto pb-10 mt-20"></div>
    </section>
    
  `;
}
export async function initFeature(slug) {
  const response = await instance.get("/moods/" + slug);

  const featureContainer = document.querySelector(".js-features");
  if (!featureContainer) return;

  const data = response.data;
  const sections = data && data.sections ? data.sections : [];
  const featuredSection = sections.find(function (sec) {
    return sec.id === "featured";
  });
  const items =
    featuredSection && featuredSection.items ? featuredSection.items : [];
  featureContainer.innerHTML = items
    .map(function (item) {
      let img = "";
      if (item.thumbnails && item.thumbnails.length > 0) {
        img = item.thumbnails[0];
      }
      const description = item.description ? item.description : "";

      return `
        <a href="/playlists/details/${item.slug}" data-navigo class="w-55 block cursor-pointer group shrink-0">
          <div class="relative overflow-hidden rounded-xl">
            <img
              src="${img}"
              alt="${item.title}"
              class="w-full h-55 rounded-xl object-cover"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <i class="fa-solid fa-play text-white text-4xl"></i>
            </div>
          </div>

          <p class="truncate w-50 text-white mt-2">${description}</p>
        </a>
      `;
    })
    .join("");
  tranformFeatured();
}
export function tranformFeatured() {
  const transfor = document.querySelector(".js-features");
  const prevBtn = document.querySelector(".prev-today-hit");
  const nextBtn = document.querySelector(".next-today-hit");

  if (!transfor || !prevBtn || !nextBtn) return;

  prevBtn.onclick = function () {
    transfor.scrollLeft = transfor.scrollLeft - 320;
  };

  nextBtn.onclick = function () {
    transfor.scrollLeft = transfor.scrollLeft + 320;
  };
}
export function morePick() {
  return `
  <section class="relative mt-25 ">
        <h2 class="text-5xl font-bold text-white mt-20 ">More Pick</h2>
      <div class="absolute right-0 top-20 flex items-center gap-4">
        <button class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer prev-more-pick">
          <i class="fa-solid fa-chevron-left"></i>
        </button>
        <button class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer next-more-pick">
          <i class="fa-solid fa-chevron-right"></i>
        </button>
      </div>

      <div class="js-more-pick flex gap-8 scrollbar scroll-smooth overflow-x-auto pb-10 mt-20"></div>
    </section>
    
  `;
}
export async function initMorePick(slug) {
  const response = await instance.get("/moods/" + slug);

  const container = document.querySelector(".js-more-pick");
  if (!container) return;

  const data = response.data;
  const sections = data && data.sections ? data.sections : [];
  const moreSection = sections.find(function (sen) {
    return sen.id === "more";
  });
  const items = moreSection && moreSection.items ? moreSection.items : [];
  container.innerHTML = items
    .map(function (item) {
      let img = "";
      if (item.thumbnails && item.thumbnails.length > 0) {
        img = item.thumbnails[0];
      }
      const description = item.description ? item.description : "";

      return `
        <a href="#!" class="w-55 block cursor-pointer group shrink-0">
          <div class="relative overflow-hidden rounded-xl">
            <img
              src="${img}"
              alt="${item.title ? item.title : ""}"
              class="w-full h-55 rounded-xl object-cover"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-black/40 rounded-xl opacity-0 group-hover:opacity-100"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <i class="fa-solid fa-play text-white text-4xl"></i>
            </div>
          </div>

          <p class="truncate w-50 text-white mt-2">${description}</p>
        </a>
      `;
    })
    .join("");
  tranformMorePick();
}

export function tranformMorePick() {
  const transfor = document.querySelector(".js-more-pick");
  const prevBtn = document.querySelector(".prev-more-pick");
  const nextBtn = document.querySelector(".next-more-pick");

  if (!transfor || !prevBtn || !nextBtn) return;

  prevBtn.onclick = function () {
    transfor.scrollLeft = transfor.scrollLeft - 320;
  };
  nextBtn.onclick = function () {
    transfor.scrollLeft = transfor.scrollLeft + 320;
  };
}
