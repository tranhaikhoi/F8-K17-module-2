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
      const suggestions = response.data?.suggestions || [];
      if (!suggestions.length) {
        listEl.innerHTML = `<li class="px-3 py-2 text-white/70">Không tìm thấy kết quả</li>`;
        boxSug.classList.remove("hidden");
        boxSug.classList.add("flex");
        return;
      }
      listEl.innerHTML = suggestions
        .slice(0, 5)
        .map(
          (text) =>
            `<li class="px-3 py-2 hover:bg-white/10 text-white cursor-pointer">${text}</li>`
        )
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

    inputEl.value = li.textContent.trim();
    boxSug.classList.add("hidden");
    boxSug.classList.remove("flex");
  });

  document.addEventListener("click", (e) => {
    if (inputEl.contains(e.target) || boxSug.contains(e.target)) return;
    boxSug.classList.add("hidden");
    boxSug.classList.remove("flex");
  });
}
