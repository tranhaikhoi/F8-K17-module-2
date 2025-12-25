//HTML
import instance from "../httpRequest";
import { profile } from "../pages/profile";
export const Header = () => {
  return `
    <header class="fixed top-0 left-0 right-0 flex items-center bg-black/80 h-20 z-30">
      <button
        type="button"
        class="grid h-10 w-10 place-items-center rounded-full text-white hover:bg-white/10 mx-7 cursor-pointer js-bar"
        aria-label="Toggle menu"
      >
        <i class="fa-solid fa-bars text-xl"></i>
      </button>

      <div class="flex items-center gap-2 mr-[60px] cursor-pointer">
        <svg width="28" height="28" viewBox="0 0 24 24" class="text-red-600">
          <path
            fill="currentColor"
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
          />
          <path fill="#fff" d="M10 8v8l6-4-6-4z" />
        </svg>
        <span class="font-semibold text-white text-2xl">Music</span>
      </div>

      <div class="flex flex-1 items-center mx-auto">
        <div class="relative flex w-full max-w-[550px] items-center gap-2 rounded-lg bg-white/10 px-3 py-2 ring-1 ring-white/10 focus-within:ring-white/20">
          <span class="text-white/70">
            <span class="material-symbols-outlined text-xl leading-none">
              search
            </span>
          </span>

          <input
            type="text"
            placeholder="Tìm bài hát, đĩa nhạc, nghệ sĩ"
            class="js-inputSearch relative w-full bg-transparent text-sm text-white placeholder:text-white/50 outline-none"
          />

            <div class="suggestions absolute top-full left-0 mt-2 hidden w-full max-w-[550px] flex-col rounded-xl bg-black/95 ring-1 ring-white/10 overflow-hidden z-50">
              <div class="px-3 py-2 text-gray-400 text-xs border-b border-white/10"></div>
                <ul class="js-suggest-list text-white"></ul>

              </div>
            </div>
      </div>

      <div class="mr-11 flex items-center gap-2">
        <button
          class="flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"
          type="button"
        >
          <span class="material-symbols-outlined text-2xl leading-none">
            cast
          </span>
        </button>

        <button
          class="flex items-center rounded-full p-2 text-white hover:bg-white/10 cursor-pointer"
          type="button"
        >
          <span class="material-symbols-outlined text-2xl leading-none">
            more_vert
          </span>
        </button>

        <a
          href="/login"
          data-navigo
          id="btnHeaderLogin"
          class="ml-1 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black hover:bg-white/90 cursor-pointer"
        >
          Đăng nhập
        </a>

        <div class="relative">
  <a
    id="userAvatar"
    class="ml-1 hidden h-10 w-10 flex items-center justify-center rounded-full bg-white/30 font-bold text-white hover:bg-white/50"
    title="Tài khoản"
  ></a>

  <ul
    id="menu"
    class="absolute right-0 top-full mt-2  w-52 rounded-lg bg-black/90  text-white shadow-lg hidden"
  >
    <li class="cursor-pointer  px-3 py-2 hover:bg-white/10 hover:border-b js-profile "><a href="/auth/profile" data-navigo>Thông tin người dùng</a></li>
    <li class="cursor-pointer  px-3 py-2 hover:bg-white/10 hover:border-b js-change-password"><a href="/auth/change-password">Đổi mật khẩu</a></li>
    <li class="cursor-pointer rounded-md px-3 py-2 hover:border-b hover:bg-white/10 text-red-500 js-logout">Đăng xuất</li>
  </ul>
</div>

      </div>
    </header>
  `;
};

//======================================================Xử lý newsidebar===========================================================//
export function initHeader() {
  const btnBar = document.querySelector(".js-bar");
  const icon = btnBar.querySelector("i");
  const mainContent = document.querySelector("#main-content");
  const miniSidebar = document.querySelector("aside.fixed.left-0.top-20");

  if (!btnBar || !icon || !mainContent || !miniSidebar) return;

  // Tạo newSidebar
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
    mainContent.classList.toggle("ml-[200px]", open);
    mainContent.classList.toggle("ml-[5%]", !open);
    icon.className = open ? "fa-solid fa-x" : "fa-solid fa-bars text-xl";
  };
  btnBar.classList.remove("is-open");
  renderNewSidebar(false);
  btnBar.addEventListener("click", () => {
    btnBar.classList.toggle("is-open");
    const open = btnBar.classList.contains("is-open");
    renderNewSidebar(open);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      btnBar.classList.remove("is-open");
      renderNewSidebar(false);
    }
  });
}

//======================================================Xử lý nút đăng nhập --> avartar tên==============================================//
export function updateLoginAuth() {
  const loginBtn = document.querySelector("#btnHeaderLogin");
  const avatar = document.querySelector("#userAvatar");

  if (!loginBtn || !avatar) return;

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  if (user?.name) {
    loginBtn.classList.add("hidden");
    avatar.classList.remove("hidden");
    avatar.textContent = user.name.trim().charAt(0).toUpperCase();
  } else {
    loginBtn.classList.remove("hidden");
    avatar.classList.add("hidden");
    avatar.textContent = "";
  }
}
//=================================================click avatar để mở custom menu=============================================================//
export function menuCustom() {
  const userAvatar = document.querySelector("#userAvatar");
  const menu = document.querySelector("#menu");
  if (!userAvatar || !menu) return;

  userAvatar.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    menu.classList.toggle("hidden");
  });

  menu.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    menu.classList.add("hidden");
  });
}
