import express, { Request, Response } from "express";
import type { Team } from "../models/team";
import Teams from "../services/team-svc";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
  Teams.index()
    .then((list: Team[]) => res.json(list))
    .catch((err: Error) => {
      console.error("Error listing teams:", err);
      res.status(500).send("Failed to list teams");
    });
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Teams.get(id)
    .then((team: Team | null) => {
      if (!team) return res.status(404).send("Team not found");
      res.json(team);
    })
    .catch((err: Error) => {
      console.error(`Error loading team ${id}:`, err);
      res.status(500).send("Failed to load team");
    });
});


router.post("/", (req: Request, res: Response) => {
  const newTeam = req.body as Team;

  Teams.create(newTeam)
    .then((team: Team) => res.status(201).json(team))
    .catch((err: Error) => {
      console.error("Error creating team:", err);
      res.status(500).send("Failed to create team");
    });
});


router.put("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const updatedTeam = req.body as Team;

  Teams.update(id, updatedTeam)
    .then((team: Team | null) => {
      if (!team) return res.status(404).send("Team not found");
      res.json(team);
    })
    .catch((err: Error) => {
      console.error(`Error updating team ${id}:`, err);
      res.status(500).send("Failed to update team");
    });
});

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  Teams.remove(id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err: Error) => {
      console.error(`Error deleting team ${id}:`, err);
      res.status(500).send("Failed to delete team");
    });
});


export default router;