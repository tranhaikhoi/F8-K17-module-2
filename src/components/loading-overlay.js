function getOverlay() {
  return document.querySelector("#loading-overlay");
}
export function showLoading() {
  const load = getOverlay();
  if (!load) return;
  load.classList.remove("hidden");
  load.classList.add("flex");
}

export function hideLoading() {
  const load = getOverlay();
  if (!load) return;
  load.classList.add("hidden");
  load.classList.remove("flex");
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export async function navigateWithLoading(router, path, ms = 1000, item) {
  showLoading();
  await sleep(ms);
  router.navigate(path, item);
  await sleep(50);
  hideLoading();
}

export function installLoading(router, ms = 1000) {
  if (!router || router.__loadingInstalled) return;
  router.__loadingInstalled = true;

  const rawNavigate = router.navigate.bind(router);

  router.navigate = async (path, item) => {
    showLoading();
    await sleep(ms);
    rawNavigate(path, item);
    await sleep(50);
    hideLoading();
  };
}
