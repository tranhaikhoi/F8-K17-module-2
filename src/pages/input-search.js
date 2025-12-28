import instance from "../httpRequest";

export function initSearchSuggest() {
  const inputEl = document.querySelector(".js-inputSearch");
  const boxSug = document.querySelector(".suggestions");
  const listEl = document.querySelector(".js-suggest-list");
  if (!inputEl || !boxSug || !listEl) return;

  inputEl.addEventListener("input", async () => {
    const q = inputEl.value.trim();

    if (!q) {
      listEl.innerHTML = "";
      boxSug.classList.add("hidden");
      boxSug.classList.remove("flex");
      return;
    }

    try {
      const response = await instance.get("/search/suggestions", {
        params: { q },
      });

      const completed = response.data?.completed || [];
      if (!completed.length) {
        listEl.innerHTML = `<li class="px-3 py-2 text-white/70">Không tìm thấy kết quả</li>`;
        boxSug.classList.remove("hidden");
        boxSug.classList.add("flex");
        return;
      }

      listEl.innerHTML = completed
        .slice(0, 5)
        .map((item) => {
          const thumb = item.thumbnails?.[0] || "";
          return `
            <li
              class="px-3 py-2 hover:bg-white/10 text-white cursor-pointer flex items-center justify-between gap-3"
              data-title="${item.title}"
              data-slug="${item.slug}"
              data-type="${item.type}"
            >
              <div class="flex items-center gap-3 min-w-0">
                <img src="${thumb}" class="w-10 h-10 rounded object-cover shrink-0" alt="" />
                <div class="min-w-0">
                  <div class="truncate">${item.title}</div>
                  <div class="text-xs text-white/60 truncate">${
                    item.subtitle || ""
                  }</div>
                </div>
              </div>
              <span class="text-xs text-white/60">${item.type}</span>
            </li>
          `;
        })
        .join("");

      boxSug.classList.remove("hidden");
      boxSug.classList.add("flex");
    } catch (err) {
      listEl.innerHTML = `<li class="px-3 py-2 text-white/70">Không tìm thấy kết quả</li>`;
      boxSug.classList.remove("hidden");
      boxSug.classList.add("flex");
    }
  });

  listEl.addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (!li) return;

    if (li.textContent.trim() === "Không tìm thấy kết quả") return;

    const title = li.dataset.title || li.textContent.trim();
    inputEl.value = title;

    boxSug.classList.add("hidden");
    boxSug.classList.remove("flex");
  });

  document.addEventListener("click", (e) => {
    if (inputEl.contains(e.target) || boxSug.contains(e.target)) return;
    boxSug.classList.add("hidden");
    boxSug.classList.remove("flex");
  });
}
