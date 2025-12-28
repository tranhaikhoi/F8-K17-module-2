// export default function detailCategory(item) {
//     return`
//     <section>
//         <h2 class="text-5xl font-bold text-white mt-20 ">${item.name}</h2>
//         <div class="js-category-detail-items flex gap-8 scrollbar scroll-smooth overflow-x-auto pb-10 mt-20"></div>
//     </section>`;
// }
// export async function initDetailCategory(slug, router) {
//     const response = await instance.get(`/explore/categories/${slug}`);
//     const data = response.data;
//     const items = data.items || [];
//     const container = document.querySelector(".js-category-detail-items");
//     if (!container) return;
//     container.innerHTML = items
