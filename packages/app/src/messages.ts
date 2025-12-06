import type { Team } from "server/models";

export type Reactions = {
  onSuccess?: () => void;
  onFailure?: (err: Error) => void;
};

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
        reactions?: Reactions;
      }
    ];