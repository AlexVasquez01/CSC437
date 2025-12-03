import {
  Auth,
  define,
  History,
  Switch
} from "@calpoly/mustang";
import { html } from "lit";

import { HeaderAuthElement } from "./components/header-auth";
import { FfTeamCardElement } from "./components/ff-team-card";
import { FfTeamListElement } from "./components/ff-team-list";
import { HomeViewElement } from "./views/home-view";
import { AboutViewElement } from "./views/about-view";

const routes: Switch.Route[] = [
  {
    path: "/app/about",
    view: () => html`<ff-about-view></ff-about-view>`
  },
  {
    path: "/app",
    view: () => html`<ff-home-view></ff-home-view>`
  },
  {
    path: "/",
    redirect: "/app"
  }
];

class AppSwitch extends Switch.Element {
  constructor() {
    super(routes, "ff:history", "ff:auth");
  }

}
define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": AppSwitch,

  "ff-header-auth": HeaderAuthElement,
  "ff-team-card": FfTeamCardElement,
  "ff-team-list": FfTeamListElement,

  "ff-home-view": HomeViewElement,
  "ff-about-view": AboutViewElement
});