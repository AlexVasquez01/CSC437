import { Team } from "server/models";

export type Msg =
  | ["teams/request", {}]
  | ["teams/load", { teams: Team[] }];