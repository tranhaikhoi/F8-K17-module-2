// import instance from "../httpRequest";

// export function initSearchSuggest() {
//   const input = document.querySelector(".js-inputSearch");
//   const box = document.querySelector(".suggestions");
//   const list = document.querySelector(".js-suggest-list");
//   if (!input || !box || !list) return;

//   input.addEventListener("input", async () => {
//     const q = input.value.trim();

//     if (!q) {
//       list.innerHTML = "Không tìm thấy kết quả";
//       box.classList.add("hidden");
//       box.classList.remove("flex");
//       return;
//     }

//     const res = await instance.get("/search/suggestions", { params: { q } });
//     const raw = res.data;
//     const items = Array.isArray(raw)
//       ? raw
//       : raw.items || raw.suggestions || raw.data || [];

//     list.innerHTML = items
//       .slice(0, 8)
//       .map(
//         (ten) =>
//           `<li class="px-3 py-2 hover:bg-white/10" style="color:#fff">${
//             ten.title || ten.name || ""
//           }</li>`
//       )
//       .join("");

//     box.classList.remove("hidden");
//     box.classList.add("flex");
//   });
// }
