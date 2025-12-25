import instance from "../httpRequest";
import { playSongs } from "./album-today";
import { formatTime, formatTotalVN, formatDateVN } from "./format";
export default function videoDetailexp() {
  return `
    <section class="fixed inset-0  z-50 flex">

      <div class="flex-1 flex flex-col items-center justify-center p-6">
        <div class="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden">
          <iframe
            id="video-player"
            class="w-full h-full"
            src=""
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
          ></iframe>
        </div>
        <h2 id="video-title" class="mt-6 text-2xl font-bold text-cyan-400"></h2>
        <p class="text-white/60 mt-5">Không rõ</p>
        <div class="flex gap-15 text-2xl mt-10 hidden">
        <span>        <button
          class="flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"
          type="button-video-detail"
        >
          <span class="material-symbols-outlined text-2xl leading-none">
            more_vert
          </span>
        </button></span>        
        <span class="btn-repeat flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-repeat"></i></span>        
        <span class="btn-back flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-backward-step"></i></span>        
        <span class="play-button flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-play "></i></span>
          <span class="hidden btn-pause flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-pause"></i></span>
          <span class="btn-next flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-forward-step"></i> </span>      
        <span class="btn-shuffle flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-shuffle"></i></span>    
            
       <span class="btn-speaker relative flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer">
        <i class="fa-solid fa-volume-high"></i>
        <input
        type="range"
        min="0"
        max="100"
        value="100"
        class="hidden absolute bottom-12 left-1/2 -translate-x-1/2 w-24"
          id="volume-range"
          />
        </span>             
        </div>
        <div class="relative w-[80%] h-2 bg-white mt-15 rounded-2xl hidden">
        <div class="absolute rounded-full bg-red-600">
        
        </div>
        
        </div>
        <div class="flex justify-between hidden">
        <span>0:00</span> 
        <span>0:00:00</span></div>
      </div>

      <div class="w-96 p-4 overflow-y-auto mt-30">
        <h3 class="text-white font-bold mb-4">Danh sách phát liên quan</h3>
        <div class="js-related-videos flex flex-col gap-3"></div>
      </div>
      <button class="absolute top-4 right-20
       text-white text-2xl js-close-video">✕</button>
    </section>
  `;
}

export async function initvideoDetailexp(slug, router) {
  toggleLayout(true);
  if (!slug) return;

  const res = await instance.get(`/videos/details/${slug}`);
  const data = res.data;

  const iframe = document.querySelector("#video-player");
  const titleEl = document.querySelector("#video-title");

  iframe.src = `https://www.youtube.com/embed/${data.videoId}?autoplay=1`;
  titleEl.textContent = data.title;

  const relatedContainer = document.querySelector(".js-related-videos");
  if (!relatedContainer) return;

  const related = data.related || [];

  relatedContainer.innerHTML = related
    .map(
      (video) => `
        <div
          class="flex gap-3 cursor-pointer hover:bg-white/10 p-2 rounded js-related-item"
          data-video-id="${video.videoId}"
          data-title="${video.title}"
        >
          <img
            src="${video.thumbnails?.[0]}"
            class="w-24 h-14 rounded object-cover"
          />
          <div class="flex-1">
            <p class="text-white text-sm font-medium line-clamp-2">
              ${video.title}
            </p>
            <p class="text-white/50 text-xs">Không rõ</p>
          </div>
        </div>
      `
    )
    .join("");
  document.querySelectorAll(".js-related-item").forEach((item) => {
    item.onclick = () => {
      const videoId = item.dataset.videoId;
      const title = item.dataset.title;
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      titleEl.textContent = title;
    };
  });
  document.querySelector(".js-close-video").onclick = () => {
    iframe.src = "";
    toggleLayout(false);
    router.navigate("/explore");
  };
}

function toggleLayout(hidden) {
  const header = document.querySelector("header");
  const sidebar = document.querySelector("aside");

  if (header) header.style.display = hidden ? "none" : "";
  if (sidebar) sidebar.style.display = hidden ? "none" : "";
}
