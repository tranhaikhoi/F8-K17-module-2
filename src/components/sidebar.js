export const Sidebar = () => {
  return `
    <aside class="fixed left-0 top-20 h-[calc(100vh-64px)] w-[5%] bg-black text-white z-30 ">
      <div class="flex h-full flex-col items-center px-2 pt-5 ">

        <a href="/" data-navigo class="w-full rounded-2xl bg-gray-600 py-3 cursor-pointer hover:bg-gray-500">
          <span class="block text-center"><i class="fa-solid fa-house text-xl"></i></span>
          <p class="mt-2 text-[10px] text-center">Trang chủ</p>
        </a>

        <a href="/explore" data-navigo class="mt-1 w-full rounded-2xl py-3 cursor-pointer hover:bg-gray-600">
          <span class="block text-center"><i class="fa-regular fa-compass text-xl"></i></span>
          <p class="mt-2 text-[10px] text-center">Khám phá</p>
        </a href="">

        <a href="/library" data-navigo class="mt-1 w-full rounded-2xl py-3 cursor-pointer hover:bg-gray-600">
          <span class="block text-center"><i class="fa-solid fa-bookmark text-xl"></i></span>
          <p class="mt-2 text-[10px] text-center">Thư viện</p>
        </a href="">

        <!-- gạch dưới -->
        <div class="my-2 h-px w-full bg-white/15"></div>

        <a href="" class="w-full rounded-2xl py-3 cursor-pointer hover:bg-gray-600">
          <span class="block text-center"><i class="fa-solid fa-crown"></i></span>
          <p class="mt-2 text-[10px] text-center">Nâng cấp</p>
        </a href="">
      </div>
    </aside>
  `;
};
