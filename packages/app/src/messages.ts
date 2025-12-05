import type { Message } from "@calpoly/mustang";
import { Team } from "server/models";

export type Msg =
  | ["teams/request", {}]
  | ["teams/load", { teams: Team[] }]
  | ["team/request", { id: string }]
  | ["team/load", { team: Team }]
  | [
      "team/save",
      {
        id: string;
        team: Partial<Team>;
      },
      Message.Reactions
    ];