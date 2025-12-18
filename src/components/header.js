//HTML
import instance from "../httpRequest";
export const Header = () => {
  return `
    <header class="fixed top-0 left-0 right-0 flex items-center bg-black h-20 z-30">
      <button
        type="button"
        class="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 mx-7 cursor-pointer js-bar"
        aria-label="Toggle menu"
      >
        <i class="fa-solid fa-bars text-xl"></i>
      </button>

      <div class="flex items-center gap-2 mr-[60px] cursor-pointer">
        <svg width="28" height="28" viewBox="0 0 24 24" class="text-red-600">
          <path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
          <path fill="#fff" d="M10 8v8l6-4-6-4z" />
        </svg>
        <span class="font-semibold text-white text-2xl">Music</span>
      </div>

      <div class="flex flex-1 items-center mx-auto">
        <div class="flex w-full max-w-[550px] items-center gap-2 rounded-lg bg-white/10 px-3 py-2 ring-1 ring-white/10 focus-within:ring-white/20">
          <span class="text-white/70">
            <span class="material-symbols-outlined text-xl leading-none">search</span>
          </span>
          <input
            type="text"
            placeholder="Tìm bài hát, đĩa nhạc, nghệ sĩ"
            class="w-full bg-transparent text-sm text-white placeholder:text-white/50 outline-none js-inputSearch relative"
          />
          <div class="suggestions absolute bottom-[-50px] bg-black w-full max-w-[530px] h-10 flex flex-col hidden">
            <ul class="border-b border-gray pt-5 text-gray-500 h-10 ">Gợi ý
            <li></li>
            </ul>
            <ul class="pt-5 text-gray-500 h-10"> Kết quả
            <li></li>
            </ul>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-2 mr-11">
        <button class="flex p-2 items-center rounded-full text-white hover:bg-white/10 cursor-pointer" type="button">
          <span class="material-symbols-outlined text-2xl leading-none">cast</span>
        </button>

        <button class="flex p-2 items-center rounded-full text-white hover:bg-white/10 cursor-pointer" type="button">
          <span class="material-symbols-outlined text-2xl leading-none">more_vert</span>
        </button>

        <a href="/login" data-navigo class="ml-1 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90 cursor-pointer">
          Đăng nhập
        </a>
      </div>
    </header>
  `;
};
//======================================================Xử lý newsidebar===========================================================//
export function initHeader() {
  const btnBar = document.querySelector(".js-bar");
  const icon = btnBar?.querySelector("i");
  const mainContent = document.querySelector("#main-content");
  const miniSidebar = document.querySelector("aside.fixed.left-0.top-20");

  if (!btnBar || !icon || !mainContent || !miniSidebar) return;

  // Tạo newSidebar nếu chưa có
  let newSidebar = document.querySelector(".js-newSidebar");
  if (!newSidebar) {
    newSidebar = document.createElement("aside");
    newSidebar.className =
      "fixed left-0 top-20 h-[calc(100vh-80px)] w-[200px] bg-black text-white z-[100] " +
      "-translate-x-full transition-transform duration-300 ease-in-out js-newSidebar";

    newSidebar.innerHTML = `
      <nav class="flex h-full flex-col px-2 pt-4">
        <a href="/" data-navigo class="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/10">
          <i class="fa-solid fa-house text-lg"></i>
          <span class="text-sm font-medium">Trang chủ</span>
        </a>

        <a href="/explore" data-navigo class="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/10">
          <i class="fa-regular fa-compass text-lg"></i>
          <span class="text-sm font-medium">Khám phá</span>
        </a>

        <a href="/library" data-navigo class="mt-1 flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/10">
          <i class="fa-solid fa-bookmark text-lg"></i>
          <span class="text-sm font-medium">Thư viện</span>
        </a>

        <div class="my-3 h-px w-full bg-white/15"></div>

        <a href="#" class="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-white/10">
          <i class="fa-solid fa-crown text-lg"></i>
          <span class="text-sm font-medium">Nâng cấp</span>
        </a>
      </nav>
    `;
    document.body.appendChild(newSidebar);
  }

  mainContent.classList.add("transition-all", "duration-300");

  const renderNewSidebar = (open) => {
    newSidebar.classList.toggle("-translate-x-full", !open);
    newSidebar.classList.toggle("translate-x-0", open);

    miniSidebar.style.opacity = open ? "0" : "1";
    miniSidebar.style.pointerEvents = open ? "none" : "auto";

    // đẩy main
    mainContent.classList.toggle("ml-[200px]", open);
    mainContent.classList.toggle("ml-[5%]", !open);

    // đổi icon
    icon.className = open ? "fa-solid fa-x" : "fa-solid fa-bars text-xl";
  };

  // Trạng thái ban đầu: đóng
  btnBar.classList.remove("is-open");
  renderNewSidebar(false);

  // Toggle khi click
  btnBar.addEventListener("click", () => {
    btnBar.classList.toggle("is-open");
    const open = btnBar.classList.contains("is-open");
    renderNewSidebar(open);
  });

  // ESC để đóng
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      btnBar.classList.remove("is-open");
      renderNewSidebar(false);
    }
  });
}

//==========================================================Xử lý suggest input=========================================================//
// export function initInput (){
//   async function fetchSearch(){
//     const res= await instance.get("/search/suggestions",{
//       param: p.suggestions
//     })
//     const searchs = document
//   }
//   const inputEl =document.querySelector(".js-inputSearch")

//   inputEl.addEventListener("input",()=>{
//     if()
//   })
// }
//======================================================
