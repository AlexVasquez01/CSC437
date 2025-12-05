import { Auth, ThenUpdate, Message } from "@calpoly/mustang";
import { Msg } from "./messages";
import { Model } from "./model";
import type { Team } from "server/models";

export default function update(
  message: Msg,
  model: Model,
  user: Auth.User
): Model | ThenUpdate<Model, Msg> {
  const [command, payload, callbacks] = message;

  switch (command) {
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
      const { teams } = payload;
      return { ...model, teams };
    }

    case "team/request": {
      const { id } = payload;
      const existing =
        model.teams?.find((t: any) => t._id === id || t.id === id) ??
        model.team;

      if (existing) {
        return { ...model, team: existing };
      }

      return [
        model,
        requestTeam(payload, user).then(
          (team) => ["team/load", { team }] as Msg
        )
      ];
    }

    case "team/load": {
      const { team } = payload;
      const teamId = (team as any)._id ?? (team as any).id;

      const updatedTeams = model.teams
        ? model.teams.map((t: any) => {
            const id = t._id ?? t.id;
            return id === teamId ? team : t;
          })
        : [team];

      return { ...model, teams: updatedTeams, team };
    }

    case "team/save": {
      const { id, team } = payload;
      const reactions = callbacks as Message.Reactions | undefined;

      return [
        model,
        saveTeam({ id, team: team as Team }, user, reactions).then(
          (saved) => ["team/load", { team: saved }] as Msg
        )
      ];
    }

    default: {
      const unhandled: never = command;
      throw new Error(`Unhandled message "${unhandled}"`);
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

function requestTeam(
  payload: { id: string },
  user: Auth.User
): Promise<Team> {
  return fetch(`/api/teams/${payload.id}`, {
    headers: Auth.headers(user)
  })
    .then((res) => {
      if (res.status !== 200)
        throw new Error(`Failed to load team: ${res.status}`);
      return res.json();
    })
    .then((json) => json as Team);
}

function saveTeam(
  msg: { id: string; team: Team },
  user: Auth.User,
  callbacks?: Message.Reactions
): Promise<Team> {
  return fetch(`/api/teams/${msg.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...Auth.headers(user)
    },
    body: JSON.stringify(msg.team)
  })
    .then((res) => {
      if (res.status !== 200)
        throw new Error(`Failed to save team: ${res.status}`);
      return res.json();
    })
    .then((json) => {
      const team = json as Team;
      callbacks?.onSuccess?.();
      return team;
    })
    .catch((err) => {
      callbacks?.onFailure?.(err);
      throw err;
    });
}