//=======================================HOME=====================================================//
//=======================================HOME=====================================================//
import Mood, { moodScript } from "../pages/home";
import { recentListen } from "../pages/home";
import { AlbumForYou, initAlbumForYou, tranformAlbumSug } from "../pages/home";
import { quickPicks, initquickPicks } from "../pages/home";
import { todayHit, initTodayHit, tranformTodayHit } from "../pages/home";
import { albumViet, initAlbumViets, tranformAlbumViet } from "../pages/home";
import { updateLoginAuth } from "../components/header";
import { initHelloUser } from "../pages/home";
// import { initProfile } from "../components/header";
//=======================================DETAIL======================================================//
//=======================================DETAIL======================================================//
import {
  energizeMoods,
  features,
  initEnergizeMood,
  morePick,
  initMorePick,
} from "../pages/detailMoods";
import {
  textEnergize,
  initTextEnergize,
  initFeature,
  initChangePage,
} from "../pages/detailMoods";
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
//======================================PLAYBAR=========================================================//
//======================================PLAYBAR=========================================================//
import playBar from "../components/playBar";
// import { control } from "../pages/control";
//======================================LOGIN=========================================================//
//======================================LOGIN=========================================================//

import login, { initLogOut } from "../pages/login";
import { initRegister, initLogin } from "../pages/login";
import { logoutPress } from "../pages/login";
import { profile, initUpdateProfile } from "../pages/profile";
import Navigo from "navigo";
export default function router() {
  const router = new Navigo("/");
  router
    .on("/", () => {
      document.querySelector(
        "#main-content"
      ).innerHTML = `${Mood()}${recentListen()}${quickPicks()}${AlbumForYou()}${todayHit()}${albumViet()}}`;

      moodScript();
      initHelloUser();
      initquickPicks();
      initAlbumForYou();
      tranformAlbumSug();
      initTodayHit();
      tranformTodayHit();
      initAlbumViets();
      tranformAlbumViet();
      updateLoginAuth();
      logoutPress();
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
      updateLoginAuth();
      logoutPress();
    })
    .on("/login", () => {
      document.querySelector("#main-content").innerHTML = login();
      initRegister();
      initLogin();
    })
    .on("/moods/:slug", (item) => {
      const slug = item.data.slug;
      document.querySelector(
        "#main-content"
      ).innerHTML = `${energizeMoods()}${textEnergize()}${features()}${morePick()}`;
      initEnergizeMood();
      initTextEnergize(slug);
      initFeature(slug);
      logoutPress();
      initMorePick(slug);
      initChangePage(slug);
    })
    .on("/playBar", () => {
      document.querySelector("#main-content").innerHTML = playBar();
    })
    .on("/auth/profile", () => {
      document.querySelector("#main-content").innerHTML = profile();
      initUpdateProfile();
    });

  router.resolve();
}
