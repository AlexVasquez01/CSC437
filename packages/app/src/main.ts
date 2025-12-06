import {
  Auth,
  History,
  Switch,
  Store,
  define
} from "@calpoly/mustang";
import { html } from "lit";

import { HeaderAuthElement } from "./components/header-auth";
import { FfTeamCardElement } from "./components/ff-team-card";
import { FfTeamListElement } from "./components/ff-team-list";

import { HomeViewElement } from "./views/home-view";
import { AboutViewElement } from "./views/about-view";
import { TeamsViewElement } from "./views/teams-view";
import { TeamEditViewElement } from "./views/team-edit-view";
import { MatchupsViewElement } from "./views/matchups-view";
import { ScoringViewElement } from "./views/scoring-view";

import { Model, init } from "./model";
import type { Msg } from "./messages";
import update from "./update";

const routes: Switch.Route[] = [
  {
    path: "/app/teams/:id/edit",
    view: (params: Switch.Params) =>
      html`<ff-team-edit-view team-id=${params.id}></ff-team-edit-view>`
  },
  {
    path: "/app/teams",
    view: () => html`<ff-teams-view></ff-teams-view>`
  },
  {
    path: "/app/matchups",
    view: () => html`<ff-matchups-view></ff-matchups-view>`
  },
  {
    path: "/app/scoring",
    view: () => html`<ff-scoring-view></ff-scoring-view>`
  },
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

class AppStore extends Store.Provider<Model, Msg> {
  constructor() {
    super(update as any, init, "ff:auth");
  }
}

define({
  "mu-auth": Auth.Provider,
  "mu-history": History.Provider,
  "mu-switch": AppSwitch,
  "mu-store": AppStore,

  "ff-header-auth": HeaderAuthElement,
  "ff-team-card": FfTeamCardElement,
  "ff-team-list": FfTeamListElement,

  "ff-home-view": HomeViewElement,
  "ff-about-view": AboutViewElement,
  "ff-teams-view": TeamsViewElement,
  "ff-team-edit-view": TeamEditViewElement,
  "ff-matchups-view": MatchupsViewElement,
  "ff-scoring-view": ScoringViewElement
});