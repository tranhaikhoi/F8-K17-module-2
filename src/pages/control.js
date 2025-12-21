export function control() {
  return `
    <div
      class="fixed left-0 right-0 bottom-0 h-16 bg-black/50
             flex items-center px-4 py-2 z-50 justify-between hidden"
    >
      <!-- Left -->
      <div class="flex gap-5 items-center text-white">
        <i class="fa-solid fa-backward-step"></i>
        <i class="fa-solid fa-play"></i>
        <i class="fa-solid fa-forward-step"></i>
      </div>

      <!-- Center -->
      <div class="flex gap-2 items-center text-white">
        <img src="" />
        <div>
          <p>-Bài 1</p>
          <p class="text-xs opacity-70"></p>
        </div>

        <div class="flex gap-2">
          <i class="fa-regular fa-thumbs-up"></i>
          <i class="fa-regular fa-thumbs-down"></i>
        </div>

        <i class="fa-solid fa-ellipsis-vertical"></i>
      </div>

      <!-- Right -->
      <div class="flex gap-4 items-center text-white">
        <!-- Volume -->
        <div class="relative group flex items-center">
          <input
            type="range"
            min="0"
            max="100"
            value="50"
            id="volumeRange"
            class="
              absolute right-10 top-1/2 -translate-y-1/2
              w-24 opacity-0 pointer-events-none
              group-hover:opacity-100 group-hover:pointer-events-auto
              transition-opacity duration-200
              h-1 cursor-pointer
            "
          />

          <div
            class="w-9 h-9 bg-neutral-700 rounded-full
                   flex items-center justify-center cursor-pointer"
          >
            <i class="fa-solid fa-volume-high"></i>
          </div>
        </div>

        <!-- Repeat -->
        <div
          class="w-9 h-9 hover:bg-neutral-700 rounded-full
                 flex items-center justify-center cursor-pointer"
        >
          <i class="fa-solid fa-repeat"></i>
        </div>

        <!-- Shuffle -->
        <div
          class="w-9 h-9 hover:bg-neutral-700 rounded-full
                 flex items-center justify-center cursor-pointer"
        >
          <i class="fa-solid fa-shuffle"></i>
        </div>
      </div>
    </div>
  `;
}
