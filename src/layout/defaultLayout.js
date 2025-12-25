import {
  Header,
  initHeader,
  updateLoginAuth,
  menuCustom,
} from "../components/header";
import { Sidebar } from "../components/sidebar";
import control from "../pages/control";

export function defaultLayout() {
  setTimeout(() => {
    initHeader();
    updateLoginAuth();
    menuCustom();
  }, 0);

  return `
    ${Header()}
    <div class="pt-20">
      ${Sidebar()}
      <main id="main-content" class="p-2 relative ml-[250px] mt-10 mr-10">
      <!--Main content will be rendered here-->
      
      </main>
      ${control()}
      
    </div>
    <div id="loading-overlay"
      class="fixed inset-0 z-[9999] hidden items-center justify-center bg-black/60 backdrop-blur-sm">
      <div class="h-14 w-14 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>
    </div>
  `;
}
