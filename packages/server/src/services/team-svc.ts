import { Schema, model } from "mongoose";
import { Team } from "../models/team";

const TeamSchema = new Schema<Team>(
  {
    teamid: { type: String, required: true, trim: true },
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

function get(teamid: string): Promise<Team | null> {
  // return one team by teamid
  return TeamModel.findOne({ teamid }).exec();
}

export default { index, get };