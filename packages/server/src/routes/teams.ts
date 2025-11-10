import express, { Request, Response } from "express";
import { Team } from "../models/team";
import Teams from "../services/team-svc";

const router = express.Router();

// list all teams
router.get("/", (_: Request, res: Response) => {
  Teams.index()
    .then((list: Team[]) => res.json(list))
    .catch((err) => res.status(500).send(err));
});

// get one team
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Teams.get(id)
    .then((team: Team) => res.json(team))
    .catch((err) => res.status(404).send(err));
});

// create a team
router.post("/", (req: Request, res: Response) => {
  const newTeam = req.body as Team;

  Teams.create(newTeam)
    .then((team: Team) => res.status(201).json(team))
    .catch((err) => res.status(500).send(err));
});

// update a team
router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedTeam = req.body as Team;

  Teams.update(id, updatedTeam)
    .then((team: Team) => res.json(team))
    .catch((err) => res.status(404).send(err));
});

// remove a team
router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Teams.remove(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;