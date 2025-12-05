import { Auth, ThenUpdate } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import { Team } from "server/models";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  switch (message[0]) {
    case "teams/request": {
      if (model.teams) return model;

      return [
        model, 
        requestTeams(user).then(
          (teams) => ["teams/load", { teams }] as Msg
        )
      ];
    }

    case "teams/load": {
      const { teams } = message[1];
      return { ...model, teams };
    }

    default: {
      console.warn("Unhandled message:", message[0]);
      return model;
    }
  }
}

function requestTeams(user: Auth.User): Promise<Team[]> {
  return fetch("/api/teams", {
    headers: Auth.headers(user)
  })
    .then((res) => {
      if (res.status !== 200)
        throw new Error(`Failed to load teams: ${res.status}`);
      return res.json();
    })
    .then((json) => json as Team[]);
}