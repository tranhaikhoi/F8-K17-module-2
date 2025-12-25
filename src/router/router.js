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
import newRelease, { initNewRelease } from "../pages/new-release";
import Charts, { initChart } from "../pages/chart-explore";
import moodGenres, {
  initGenres,
  initMoodOthers,
  initLines,
} from "../pages/moods-genres";
import { initArtistRank } from "../pages/chart-explore";
//======================================PLAYBAR=========================================================//
//======================================PLAYBAR=========================================================//
import playBar from "../components/playBar";
// import { control } from "../pages/control";
//======================================LOGIN=========================================================//
//======================================LOGIN=========================================================//

import login from "../pages/login";
import { initRegister, initLogin } from "../pages/login";
import { logoutPress } from "../pages/login";
import { profile, initUpdateProfile, initAvailProfile } from "../pages/profile";
import { changePassword, initChangePassword } from "../pages/change-password";
//======================================DETAIL ALBUM=================================================//
import album, { initSongsug } from "../pages/album";
import playlistDetail, { initPlaylistDetail } from "../pages/album-today";
import Navigo from "navigo";
import playlistParty, { initplaylistParty } from "../pages/detail-pick";
import newAlbumDetail, {
  initnewAlumDetail,
} from "../pages/detail-new-album-exp";
import feelingDetail, {
  initfeelingDetail,
} from "../pages/detail-feeling-explore";
import videoDetailexp, { initvideoDetailexp } from "../pages/detail-video-exp";
import newReleaseDetail, {
  initnewReleaseDetail,
} from "../pages/detail-new-release";
import { installLoading } from "../components/loading-overlay";
// import videoDetailCharts, {
//   initvideoDetailCharts,
// } from "../pages/detail-video-chart";
//======================================ROUTER=========================================================//
//======================================ROUTER=========================================================//
export default function router() {
  const router = new Navigo("/");
  installLoading(router, 1000);
  router
    .on("/", () => {
      document.querySelector(
        "#main-content"
      ).innerHTML = `${Mood()}${recentListen()}${quickPicks()}${AlbumForYou()}${todayHit()}${albumViet()}`;
      router.updatePageLinks();
      moodScript(router);
      initHelloUser();
      initquickPicks(router);
      initAlbumForYou(router);
      tranformAlbumSug();
      initTodayHit(router);
      tranformTodayHit();
      initAlbumViets();
      tranformAlbumViet();
      updateLoginAuth();
      logoutPress(router);
    })
    .on("/explore", () => {
      document.querySelector(
        "#main-content"
      ).innerHTML = `${explore()}${newAlbumExplore()}${Fellings()}${newVideosExplore()}`;
      router.updatePageLinks();
      initNewAlbumExplore();
      tranformNewAlbum();
      initfeelings();
      tranformFeeling();
      initNewVideosExplore();
      tranformVideo();
      updateLoginAuth();
      logoutPress(router);
    })
    .on("/login", () => {
      document.querySelector("#main-content").innerHTML = login();
      router.updatePageLinks();
      initRegister();
      initLogin(router);
    })
    .on("/moods/:slug", (item) => {
      const slug = item.data.slug;
      document.querySelector(
        "#main-content"
      ).innerHTML = `${energizeMoods()}${textEnergize()}${features()}${morePick()}`;
      router.updatePageLinks();
      initEnergizeMood();
      initTextEnergize(slug);
      initFeature(slug);
      logoutPress(router);
      initMorePick(slug);
      initChangePage(slug);
    })
    .on("/playBar", () => {
      document.querySelector("#main-content").innerHTML = playBar();
    })
    .on("/auth/profile", () => {
      document.querySelector("#main-content").innerHTML = profile();
      router.updatePageLinks();
      initUpdateProfile();
      initAvailProfile();
    })
    .on("/auth/change-password", () => {
      document.querySelector("#main-content").innerHTML = changePassword();
      router.updatePageLinks();
      initChangePassword(router);
    })
    .on("/explore/new-release", () => {
      document.querySelector(
        "#main-content"
      ).innerHTML = `${newRelease()}${newVideosExplore()}`;
      router.updatePageLinks();
      initNewRelease(router);
      initNewVideosExplore();
      tranformVideo();
    })
    .on("/explore/charts", () => {
      document.querySelector("#main-content").innerHTML = Charts();
      router.updatePageLinks();
      initChart();
      initArtistRank();
    })
    .on("/explore/moods-and-genres", () => {
      document.querySelector("#main-content").innerHTML = moodGenres();
      router.updatePageLinks();
      initGenres(router);
      initMoodOthers(router);
      initLines(router);
    })
    .on("/albums/details/:slug", (item) => {
      const slug = item.data.slug;
      document.querySelector("#main-content").innerHTML = album();
      router.updatePageLinks();
      initSongsug(slug);
    })
    .on("/playlists/details/:slug", (item) => {
      const slug = item.data.slug;
      document.querySelector("#main-content").innerHTML = playlistDetail();
      router.updatePageLinks();
      initPlaylistDetail(slug);
    })
    .on("/quick-picks/:slug", (item) => {
      const slug = item.data.slug;
      document.querySelector("#main-content").innerHTML = playlistDetail();
      router.updatePageLinks();
      initPlaylistDetail(slug);
    })
    .on("/explore/:slug", (item) => {
      const slug = item.data.slug;
      document.querySelector("#main-content").innerHTML = newAlbumDetail();
      initnewAlumDetail(slug);
    })
    .on("/explore/lines/:slug", (item) => {
      const slug = item.data.slug;
      document.querySelector("#main-content").innerHTML = feelingDetail();
      initfeelingDetail();
    })
    .on("/videos/details/:slug", (item) => {
      const slug = item.data.slug;
      document.querySelector("#main-content").innerHTML = videoDetailexp();
      initvideoDetailexp(slug, router);
    })
    // .on("/videos/details/:id", (item) => {
    //   const id = item.data.id;
    //   document.querySelector("#main-content").innerHTML = videoDetailCharts();
    //   initvideoDetailCharts(id, router);
    // })

    .on("/new-release/details/:id", (item) => {
      const id = item.data.id;
      document.querySelector("#main-content").innerHTML = newReleaseDetail();
      router.updatePageLinks();
      initnewReleaseDetail(id);
    });

  router.resolve();
}
