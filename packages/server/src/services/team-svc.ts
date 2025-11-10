import { Schema, model } from "mongoose";
import { Team } from "../models/team";

const TeamSchema = new Schema<Team>(
  {
    id: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    manager: { type: String, required: true, trim: true },
    record: { type: String, required: true, trim: true },
    projection: { type: Number },
    avatar: { type: String }
  },
  { collection: "ff_teams" }
);

const TeamModel = model<Team>("Team", TeamSchema);

function index(): Promise<Team[]> {
  // return all teams
  return TeamModel.find().exec();
}

function get(id: string): Promise<Team> {
  return TeamModel.findOne({ id })
    .then((team) => {
      if (!team) throw `${id} not found`;
      return team;
    });
}

// add new team
function create(json: Team): Promise<Team> {
  const t = new TeamModel(json);
  return t.save();
}

// replace existing team
function update(id: string, team: Team): Promise<Team> {
  return TeamModel.findOneAndUpdate({ id }, team, {
    new: true
  }).then((updated) => {
    if (!updated) throw `${id} not updated`;
    return updated as Team;
  });
}

// remove team
function remove(id: string): Promise<void> {
  return TeamModel.findOneAndDelete({ id }).then((deleted) => {
    if (!deleted) throw `${id} not deleted`;
  });
}

export default { index, get, create, update, remove };