import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import Teams from "./services/team-svc";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("fantasyfootball");

app.use(express.static(staticDir));

// test
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});

app.get("/api/teams", (req: Request, res: Response) => {
  Teams.index()
    .then((teams) => {
      res.json(teams);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server error");
    });
});

app.get("/api/teams/:teamid", (req: Request, res: Response) => {
  const { teamid } = req.params;

  Teams.get(teamid)
    .then((team) => {
      if (team) res.json(team);
      else res.status(404).send("Not found");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Server error");
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});