export const Sidebar = () => {
  return `
    <aside class="fixed left-0 top-20 h-[calc(100vh-64px)] w-25 md:w-25 lg1400:w-[5%] bg-black text-white z-30 ">
      <div class="flex h-full flex-col items-center px-2 pt-5 ">

        <a href="/" data-navigo class="w-full rounded-2xl bg-gray-600 py-3 cursor-pointer hover:bg-gray-500">
          <span class="block text-center"><i class="fa-solid fa-house text-xl"></i></span>
          <p class="mt-2 text-[10px] text-center">Trang chủ</p>
        </a>

        <a href="/explore" data-navigo class="mt-1 w-full rounded-2xl py-3 cursor-pointer hover:bg-gray-600">
          <span class="block text-center"><i class="fa-regular fa-compass text-xl"></i></span>
          <p class="mt-2 text-[10px] text-center">Khám phá</p>
        </a>

        <a href="/library" data-navigo class="mt-1 w-full rounded-2xl py-3 cursor-pointer hover:bg-gray-600">
          <span class="block text-center"><i class="fa-solid fa-bookmark text-xl"></i></span>
          <p class="mt-2 text-[10px] text-center">Thư viện</p>
        </a>

        <!-- gạch dưới -->
        <div class="my-2 h-px w-full bg-white/15"></div>

        <a href="/upgrade" data-navigo class="w-full rounded-2xl py-3 cursor-pointer hover:bg-gray-600 js-upgrade-icon">
          <span class="block text-center"><i class="fa-solid fa-crown"></i></span>
          <p class="mt-2 text-[10px] text-center">Nâng cấp</p>
        </a>
        <a href="#!" class="w-full rounded-2xl py-3 cursor-pointer hover:bg-gray-600 hidden js-login-icon">
          <span class="block text-center"><i class="fa-solid fa-user"></i></span>
          <p class="mt-2 text-[10px] text-center">Đăng nhập</p>
        </a>
      </div>
    </aside>
  `;
};
export function updateSidebarAuth() {
  const upgradeEl = document.querySelector(".js-upgrade-icon");
  const loginEl = document.querySelector(".js-login-icon");
  if (!upgradeEl || !loginEl) return;

  const token = localStorage.getItem("access_token");
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isLoggedIn = !!token && !!user;

  upgradeEl.classList.toggle("hidden", !isLoggedIn);
  loginEl.classList.toggle("hidden", isLoggedIn);
}
