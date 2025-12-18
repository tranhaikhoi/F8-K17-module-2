import config from "./config.json";
import "./assets/style.css";
import { defaultLayout } from "./layout/defaultLayout";
import router from "./router/router";
const app = document.querySelector("#app");
app.innerHTML = defaultLayout();
router();
