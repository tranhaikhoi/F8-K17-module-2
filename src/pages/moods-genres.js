import instance from "../httpRequest";
import { tranformFeeling } from "./explore";

export default function moodGenres() {
  return `
    <!-- GENRES -->
    <section class="relative mt-20">
      <h2 class="text-5xl font-bold text-white mb-20">Dành cho bạn</h2>

      <div class="absolute right-0 top-15 flex items-center gap-4">
        <a class="prev-genres text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <a class="next-genres text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>

      <div class="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden pb-10 scroll-smooth scrollbar js-scroll-genres">
        <div class="js-genres flex flex-col flex-wrap gap-x-10 gap-y-6 h-[296px] w-max"></div>
      </div>
    </section>

    <!-- MOOD + OTHER -->
    <section class="relative mt-20">
      <h2 class="text-5xl font-bold text-white mb-20">Tâm trạng và khoảnh khắc</h2>

      <div class="absolute right-0 top-15 flex items-center gap-4">
        <a class="prev-mood text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <a class="next-mood text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>

      <div class="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden pb-10 scroll-smooth scrollbar js-scroll-mood">
        <div class="js-moods-others flex flex-col flex-wrap gap-x-10 gap-y-6 h-[296px] w-max"></div>
      </div>
    <!--DÒNG NHẠC-->
    </section>
        <section class="relative mt-20">
      <h2 class="text-5xl font-bold text-white mb-20">Dòng nhạc</h2>

      <div class="absolute right-0 top-15 flex items-center gap-4">
        <a class="prev-lines text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <a class="next-lines text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>

      <div class="flex flex-nowrap gap-3 overflow-x-auto overflow-y-hidden pb-10 scroll-smooth scrollbar js-scroll-lines">
        <div class="js-lines flex flex-col flex-wrap gap-x-10 gap-y-6 h-[296px] w-max"></div>
      </div>
    </section>
  `;
}
//=================================genres=================================//
export async function initGenres(router) {
  const res = await instance.get("/categories");

  const genres = res.data.items.filter((item) => item.type === "genre");

  const container = document.querySelector(".js-genres");
  if (!container) return;

  container.innerHTML = genres
    .map(
      (genre) => `
        <a href="/explore/moods-and-genres/${genre.slug}" data-navigo
           class="block w-72 shrink-0">
          <div class="relative h-14 rounded-xl bg-zinc-800 overflow-hidden flex items-center justify-center">
            <span class="absolute left-0 top-0 h-full w-2"
                  style="background:${genre.color}"></span>

            <span class="absolute left-0 top-0 h-full w-8 opacity-30 blur-md"
                  style="background:${genre.color}"></span>

            <span class="relative text-white font-bold truncate">
              ${genre.name}
            </span>
          </div>
        </a>
      `
    )
    .join("");

  useOldTransform(".js-scroll-genres", ".prev-genres", ".next-genres");

  router.updatePageLinks();
}
//===========================================mood other===================================//
export async function initMoodOthers(router) {
  const res = await instance.get("/categories");

  const moodOthers = res.data.items.filter(
    (item) => item.type === "mood" || item.type === "other"
  );

  const container = document.querySelector(".js-moods-others");
  if (!container) return;

  container.innerHTML = moodOthers
    .map(
      (item) => `
        <a href="/explore/moods-and-genres/${item.slug}" data-navigo
           class="block w-72 shrink-0">
          <div class="relative h-14 rounded-xl bg-zinc-800 overflow-hidden flex items-center justify-center">
            <span class="absolute left-0 top-0 h-full w-2"
                  style="background:${item.color}"></span>
            <span class="absolute left-0 top-0 h-full w-8 opacity-30 blur-md"
                  style="background:${item.color}"></span>
            <span class="relative text-white font-bold truncate">
              ${item.name}
            </span>
          </div>
        </a>
      `
    )
    .join("");

  useOldTransform(".js-scroll-mood", ".prev-mood", ".next-mood");

  router.updatePageLinks();
}
//=======================================================lines======================================//
export async function initLines(router) {
  const res = await instance.get("/lines");
  const lines = res.data?.items;
  const container = document.querySelector(".js-lines");
  if (!container) return;

  container.innerHTML = lines
    .map(
      (line) => `
        <a href="/explore/moods-and-genres/${line.slug}" data-navigo
           class="block w-72 shrink-0">
          <div class="relative h-14 rounded-xl bg-zinc-800 overflow-hidden flex items-center justify-center">
            <span class="absolute left-0 top-0 h-full w-8 opacity-30 blur-md"
                  style="background:${line.color}"></span>           
            <span class="absolute left-0 top-0 h-full w-2"
                  style="background:${line.color}"></span>

            <span class="relative text-white font-bold truncate">
              ${line.name}
            </span>
          </div>
        </a>
      `
    )
    .join("");

  useOldTransform(".js-scroll-lines", ".prev-lines", ".next-lines");

  router.updatePageLinks();
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
