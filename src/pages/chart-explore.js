import instance from "../httpRequest";

export default function Charts() {
  return `
    <section>
      <h2 class="text-5xl font-bold text-white mb-20">
        Bảng xếp hạng
      </h2>

      <select 
        class="js-charts px-6 py-3 rounded-full bg-black text-white border border-white outline-none cursor-pointer"
      >
      </select>
    </section>

    <section class="relative">
      <h2 class="text-5xl font-bold text-white mt-20 mb-20">
        Bảng xếp hạng video
      </h2>

      <div class="absolute right-0 top-15 flex items-center gap-4">
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer prev-new-album">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer next-new-album">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>

      <div class="flex flex-nowrap gap-3 overflow-x-auto pb-10 scroll-smooth scrollbar">
        <div class="flex gap-10 shrink-0 js-chart-ranks"></div>
      </div>
    </section>
    <section>
      <h2 class="text-5xl font-bold text-white mb-20">
        Nghệ sĩ hàng đầu
      </h2>
      <div class="absolute right-0 top-15 flex items-center gap-4">
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer prev-new-artist">
          <i class="fa-solid fa-chevron-left"></i>
        </a>
        <a class="text-white w-8 h-8 flex items-center justify-center bg-cyan-900 rounded-full cursor-pointer next-new-artist">
          <i class="fa-solid fa-chevron-right"></i>
        </a>
      </div>
      <div class="flex flex-nowrap gap-3 overflow-x-auto pb-10 scroll-smooth scrollbar">
        <div class="flex flex-col gap-10 shrink-0 js-artist-ranks"></div>
      </div>
    </section>
  `;
}

export async function initChart() {
  const response = await instance.get("/charts/countries");
  const select = document.querySelector(".js-charts");
  if (!select) return;

  const countries = response.data.countries;
  select.innerHTML = countries
    .map(
      (item) => `
        <option 
          value="${item.code}" 
          ${item.code === "GLOBAL" ? "selected" : ""}
        >
          ${item.name}
        </option>
      `
    )
    .join("");

  initVideoRank("GLOBAL");
  select.addEventListener("change", (e) => {
    initVideoRank(e.target.value);
    initArtistRank(e.target.value);
  });
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

export async function initVideoRank(router, country = "GLOBAL") {
  const response = await instance.get("/charts/videos", {
    params: {
      country,
      period: "latest",
    },
  });

  const videos = response.data.items;
  const container = document.querySelector(".js-chart-ranks");
  if (!container) return;

  container.innerHTML = videos
    .map(
      (video) => `
        <a href="/explore/videos/${
          video.id
        }" data-navigo class="w-80 block shrink-0 cursor-pointer group">
          <div class="relative overflow-hidden rounded-xl">
            <img
              src="${video.thumb}"
              alt="${video.title}"
              class="w-full h-48 object-cover rounded-xl"
            />
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100"></div>
            <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <i class="fa-solid fa-play text-white text-4xl"></i>
            </div>
          </div>

          <p class="text-white font-semibold mt-3 truncate">
            ${video.title}
          </p>

          <p class="text-gray-400 text-sm mt-1">
            ${formatViews(video.views)}
          </p>
        </a>
      `
    )
    .join("");
  router?.updatePageLinks();
}
export async function initArtistRank(country = "GLOBAL") {
  const response = await instance.get("/charts/top-artists", {
    params: {
      country,
      period: "latest",
    },
  });
  const artists = response.data.items;
  const container = document.querySelector(".js-artist-ranks");
  if (!container) return;
  container.innerHTML = artists
    .map(
      (artist) => `
      <a href="/artist/${
        artist.rank
      }" data-navigo="" class="flex items-center gap-8 py-3 hover:bg-white/5 rounded-lg transition cursor-pointer px-2">
        <div class="flex gap-2 items-center text-2xl font-bold text-gray-300 w-10 text-center">
          ${artist.rank}
          <span class="text-green-500 text-sm ml-1">▲</span>
        </div>

        <div class="flex flex-col gap-2">
          <div class="flex items-center gap-1">
            <h3 class="text-white font-semibold truncate">${artist.name}</h3>
            
          </div>

          <p class="text-gray-400 text-xs">
            ${formatViews(artist.totalViews)} views
          </p>
        </div>
      </a>
    `
    )
    .join("");
}
