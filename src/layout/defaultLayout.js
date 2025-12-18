import { Header, initHeader } from "../components/header";
import { Sidebar } from "../components/sidebar";

export function defaultLayout() {
  setTimeout(() => initHeader(), 0);

  return `
    ${Header()}
    <div class="pt-20">
      ${Sidebar()}
      <main id="main-content" class="p-2 relative ml-[250px] mt-10 mr-10">
      <!--Main content will be rendered here-->
      
      </main>
    </div>
  `;
}
