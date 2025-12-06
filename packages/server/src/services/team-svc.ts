import mongoose, { Schema, model } from "mongoose";
import type { Team } from "../models/team";

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

function byAnyId(id: string) {
  if (mongoose.Types.ObjectId.isValid(id)) {
    return { $or: [{ id }, { _id: id }] };
  }
  return { id };
}

// list all teams
function index(): Promise<Team[]> {
  return TeamModel.find().exec();
}

// get one team by id or _id
function get(id: string): Promise<Team> {
  return TeamModel.findOne(byAnyId(id))
    .exec()
    .then((team) => {
      if (!team) throw new Error(`${id} not found`);
      return team;
    });
}

// create new team
function create(json: Team): Promise<Team> {
  const t = new TeamModel(json);
  return t.save();
}

// update existing team by id or _id
function update(id: string, team: Team): Promise<Team> {
  return TeamModel.findOneAndUpdate(byAnyId(id), team, {
    new: true,
    runValidators: true
  })
    .exec()
    .then((updated) => {
      if (!updated) throw new Error(`${id} not updated`);
      return updated as Team;
    });
}

// remove team by id or _id
function remove(id: string): Promise<void> {
  return TeamModel.findOneAndDelete(byAnyId(id))
    .exec()
    .then((deleted) => {
      if (!deleted) throw new Error(`${id} not deleted`);
    });
}

export default { index, get, create, update, remove };