// import instance from "../httpRequest";
// // import { formatTime, formatTotalVN, formatDateVN } from "./format"; // hiện chưa dùng

// export default function videoDetailCharts() {
//   return `
//     <section class="js-video-detail-modal fixed inset-0 z-50 flex">
//       <div class="flex-1 flex flex-col items-center justify-center p-6">
//         <div class="w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden">
//           <iframe
//             id="video-player"
//             class="w-full h-full"
//             src=""
//             frameborder="0"
//             allow="autoplay; encrypted-media"
//             allowfullscreen
//           ></iframe>
//         </div>

//         <h2 id="video-title" class="mt-6 text-2xl font-bold text-cyan-400"></h2>
//         <p class="text-white/60 mt-5">Không rõ</p>

//         <div class="flex gap-15 text-2xl mt-10 hidden">
//           <span>
//             <button
//               class="flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"
//               type="button-video-detail"
//             >
//               <span class="material-symbols-outlined text-2xl leading-none">
//                 more_vert
//               </span>
//             </button>
//           </span>
//           <span class="btn-repeat flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-repeat"></i></span>
//           <span class="btn-back flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-backward-step"></i></span>
//           <span class="play-button flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-play "></i></span>
//           <span class="hidden btn-pause flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-pause"></i></span>
//           <span class="btn-next flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-forward-step"></i></span>
//           <span class="btn-shuffle flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"><i class="fa-solid fa-shuffle"></i></span>

//           <span class="btn-speaker relative flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer">
//             <i class="fa-solid fa-volume-high"></i>
//             <input
//               type="range"
//               min="0"
//               max="100"
//               value="100"
//               class="hidden absolute bottom-12 left-1/2 -translate-x-1/2 w-24"
//               id="volume-range"
//             />
//           </span>
//         </div>

//         <div class="relative w-[80%] h-2 bg-white mt-15 rounded-2xl hidden">
//           <div class="absolute rounded-full bg-red-600"></div>
//         </div>

//         <div class="flex justify-between hidden">
//           <span>0:00</span>
//           <span>0:00:00</span>
//         </div>
//       </div>

//       <div class="w-96 p-4 overflow-y-auto">
//         <h3 class="text-white font-semibold mb-4">Danh sách phát liên quan</h3>
//         <div class="js-related-videos flex flex-col gap-3"></div>
//       </div>

//       <button class="absolute top-4 right-25 text-white text-2xl js-close-video">✕</button>
//     </section>
//   `;
// }

// export async function initvideoDetailCharts(key, router) {
//   toggleLayout(true);
//   if (!key) return;

//   const modal = document.querySelector(".js-video-detail-modal");
//   const iframe = document.querySelector("#video-player");
//   const titleEl = document.querySelector("#video-title");
//   const relatedContainer = document.querySelector(".js-related-videos");
//   const closeBtn = document.querySelector(".js-close-video");

//   if (!iframe || !titleEl || !relatedContainer) {
//     console.error("Missing DOM nodes for video detail modal.");
//     toggleLayout(false);
//     return;
//   }
//   async function fetchDetails(param) {
//     const safe = encodeURIComponent(param);
//     const res = await instance.get(`/videos/details/${safe}`);
//     return res.data;
//   }

//   function renderPlayer(data) {
//     iframe.src = `https://www.youtube.com/embed/${data.videoId}?autoplay=1`;
//     titleEl.textContent = data.title || "";
//   }

//   function renderRelated(related = []) {
//     relatedContainer.innerHTML = related
//       .map(
//         (video) => `
//           <div
//             class="flex gap-3 cursor-pointer hover:bg-white/10 p-2 rounded js-related-item"
//             data-id="${video.id || ""}"
//           >
//             <img
//               src="${video.thumbnails?.[0] || ""}"
//               class="w-24 h-14 rounded object-cover"
//             />
//             <div class="flex-1">
//               <p class="text-white text-sm font-medium line-clamp-2">
//                 ${video.title || ""}
//               </p>
//               <p class="text-white/50 text-xs">Không rõ</p>
//             </div>
//           </div>
//         `
//       )
//       .join("");
//   }
//   try {
//     const data = await fetchDetails(key);
//     renderPlayer(data);
//     renderRelated(data.related || []);
//     relatedContainer.onclick = async (e) => {
//       const item = e.target.closest(".js-related-item");
//       if (!item) return;

//       const id = item.dataset.id;
//       if (!id) return;

//       try {
//         const next = await fetchDetails(id);
//         renderPlayer(next);
//         renderRelated(next.related || []);
//       } catch (err) {
//         console.error(
//           "Fetch related detail failed:",
//           err?.response?.status,
//           err?.response?.data || err
//         );
//       }
//     };
//     if (closeBtn) {
//       closeBtn.onclick = () => {
//         iframe.src = "";
//         toggleLayout(false);
//         if (modal) modal.remove();
//         router?.navigate?.("/explore");
//       };
//     }
//   } catch (err) {
//     console.error(
//       "Fetch video details failed:",
//       err?.response?.status,
//       err?.response?.data || err
//     );
//     toggleLayout(false);
//     if (modal) modal.remove();
//   }
// }

// function toggleLayout(hidden) {
//   const header = document.querySelector("header");
//   const sidebar = document.querySelector("aside");

//   if (header) header.style.display = hidden ? "none" : "";
//   if (sidebar) sidebar.style.display = hidden ? "none" : "";
// }
