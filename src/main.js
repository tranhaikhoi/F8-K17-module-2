import config from "./config.json";
import "./assets/style.css";
import { defaultLayout } from "./layout/defaultLayout";
import { controlScript } from "./pages/control";
import router from "./router/router";
export const appStatus = {
  isPlaying: false,
  song: null,
  songs: [],
};

window.appStatus = appStatus;
async function app() {
  document.body.innerHTML = await defaultLayout();
  controlScript();
  router();
}

app();
