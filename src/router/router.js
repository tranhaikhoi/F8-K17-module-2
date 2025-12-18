//=======================================HOME=====================================================//
//=======================================HOME=====================================================//
import Mood, { moodScript } from "../pages/home";
import { recentListen } from "../pages/home";
import { AlbumForYou, initAlbumForYou, tranformAlbumSug } from "../pages/home";
import { quickPicks, initquickPicks } from "../pages/home";
import { todayHit, initTodayHit, tranformTodayHit } from "../pages/home";
import { albumViet, initAlbumViets, tranformAlbumViet } from "../pages/home";
//=======================================EXPLORE=====================================================//
//=======================================EXPLORE=====================================================//
import explore from "../pages/explore";
import {
  newAlbumExplore,
  initNewAlbumExplore,
  tranformNewAlbum,
} from "../pages/explore";
import { Fellings, initfeelings, tranformFeeling } from "../pages/explore";
import {
  newVideosExplore,
  initNewVideosExplore,
  tranformVideo,
} from "../pages/explore";
//======================================LOGIN=========================================================//
//======================================LOGIN=========================================================//
import login from "../pages/login";
import { initRegister, initLogin } from "../pages/login";
import Navigo from "navigo";
export default function router() {
  const router = new Navigo("/");
  router
    .on("/", () => {
      document.querySelector(
        "#main-content"
      ).innerHTML = `${Mood()}${recentListen()}${quickPicks()}${AlbumForYou()}${todayHit()}${albumViet()}`;

      moodScript();
      initquickPicks();
      initAlbumForYou();
      tranformAlbumSug();
      initTodayHit();
      tranformTodayHit();
      initAlbumViets();
      tranformAlbumViet();
    })
    .on("/explore", () => {
      document.querySelector(
        "#main-content"
      ).innerHTML = `${explore()}${newAlbumExplore()}${Fellings()}${newVideosExplore()}`;
      initNewAlbumExplore();
      tranformNewAlbum();
      initfeelings();
      tranformFeeling();
      initNewVideosExplore();
      tranformVideo();
    })
    .on("/login", () => {
      document.querySelector("#main-content").innerHTML = login();
      initRegister();
      initLogin();
    });

  router.resolve();
}
