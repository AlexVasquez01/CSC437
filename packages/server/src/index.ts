import express, { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";

import { connect } from "./services/mongo";
import auth, { authenticateUser } from "./routes/auth";
import teams from "./routes/teams";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("fantasyfootball");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticDir));
app.use("/auth", auth);
app.use("/api/teams", authenticateUser, teams);
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello, World");
});
app.use("/app", (req: Request, res: Response) => {
  const indexHtml = path.resolve(staticDir, "index.html");
  fs.readFile(indexHtml, { encoding: "utf8" }).then((html) =>
    res.send(html)
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});