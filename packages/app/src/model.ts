import { Team } from "server/models";

export interface Model {
  teams?: Team[];
}

export const init: Model = {};