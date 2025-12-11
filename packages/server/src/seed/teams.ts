import { connect } from "../services/mongo";
import Teams from "../services/team-svc";
import type { Team } from "../models/team";

const TEAMS: Team[] = [
  {
    id: "vasquez",
    name: "Team Vasquez",
    manager: "Alex Vasquez",
    record: "0-0",
    projection: 129.4,
    roster: [
      { name: "Patrick Mahomes", position: "QB", nflTeam: "KC", projected: 23.5 },
      { name: "Christian McCaffrey", position: "RB", nflTeam: "SF", projected: 22.0 },
      { name: "Jahmyr Gibbs", position: "RB", nflTeam: "DET", projected: 18.1 },
      { name: "Amon-Ra St. Brown", position: "WR", nflTeam: "DET", projected: 19.6 },
      { name: "Puka Nacua", position: "WR", nflTeam: "LAR", projected: 17.3 },
      { name: "Sam LaPorta", position: "TE", nflTeam: "DET", projected: 13.4 },
      { name: "Cowboys D/ST", position: "DST", nflTeam: "DAL", projected: 8.5 }
    ]
  },

  {
    id: "gridiron-gurus",
    name: "Gridiron Gurus",
    manager: "Jamie Nguyen",
    record: "0-0",
    projection: 126.8,
    roster: [
      { name: "Josh Allen", position: "QB", nflTeam: "BUF", projected: 24.2 },
      { name: "Bijan Robinson", position: "RB", nflTeam: "ATL", projected: 19.8 },
      { name: "Rhamondre Stevenson", position: "RB", nflTeam: "NE", projected: 15.2 },
      { name: "Ja'Marr Chase", position: "WR", nflTeam: "CIN", projected: 20.4 },
      { name: "Tee Higgins", position: "WR", nflTeam: "CIN", projected: 14.7 },
      { name: "Mark Andrews", position: "TE", nflTeam: "BAL", projected: 14.9 },
      { name: "49ers D/ST", position: "DST", nflTeam: "SF", projected: 8.1 }
    ]
  },

  {
    id: "fantasy-fanatics",
    name: "Fantasy Fanatics",
    manager: "Chris Lee",
    record: "0-0",
    projection: 121.9,
    roster: [
      { name: "Lamar Jackson", position: "QB", nflTeam: "BAL", projected: 23.1 },
      { name: "Saquon Barkley", position: "RB", nflTeam: "PHI", projected: 18.2 },
      { name: "Aaron Jones", position: "RB", nflTeam: "MIN", projected: 14.1 },
      { name: "Davante Adams", position: "WR", nflTeam: "LV", projected: 17.0 },
      { name: "DeVonta Smith", position: "WR", nflTeam: "PHI", projected: 15.5 },
      { name: "George Kittle", position: "TE", nflTeam: "SF", projected: 12.3 },
      { name: "Ravens D/ST", position: "DST", nflTeam: "BAL", projected: 8.0 }
    ]
  },

  {
    id: "endzone-empire",
    name: "Endzone Empire",
    manager: "Morgan Reyes",
    record: "0-0",
    projection: 118.6,
    roster: [
      { name: "Joe Burrow", position: "QB", nflTeam: "CIN", projected: 22.4 },
      { name: "Jonathan Taylor", position: "RB", nflTeam: "IND", projected: 18.6 },
      { name: "James Cook", position: "RB", nflTeam: "BUF", projected: 14.9 },
      { name: "Stefon Diggs", position: "WR", nflTeam: "HOU", projected: 16.8 },
      { name: "DJ Moore", position: "WR", nflTeam: "CHI", projected: 15.2 },
      { name: "Dalton Kincaid", position: "TE", nflTeam: "BUF", projected: 11.1 },
      { name: "Bills D/ST", position: "DST", nflTeam: "BUF", projected: 7.9 }
    ]
  },

  {
    id: "fourth-and-long",
    name: "Fourth & Long",
    manager: "Taylor Brooks",
    record: "0-0",
    projection: 116.4,
    roster: [
      { name: "Justin Herbert", position: "QB", nflTeam: "LAC", projected: 21.6 },
      { name: "Breece Hall", position: "RB", nflTeam: "NYJ", projected: 20.5 },
      { name: "Isiah Pacheco", position: "RB", nflTeam: "KC", projected: 15.0 },
      { name: "Keenan Allen", position: "WR", nflTeam: "CHI", projected: 14.8 },
      { name: "Tank Dell", position: "WR", nflTeam: "HOU", projected: 14.2 },
      { name: "Evan Engram", position: "TE", nflTeam: "JAX", projected: 11.6 },
      { name: "Jets D/ST", position: "DST", nflTeam: "NYJ", projected: 8.3 }
    ]
  },

  {
    id: "sack-lords",
    name: "Sack Lords",
    manager: "Jordan Patel",
    record: "0-0",
    projection: 114.9,
    roster: [
      { name: "Tua Tagovailoa", position: "QB", nflTeam: "MIA", projected: 21.0 },
      { name: "Raheem Mostert", position: "RB", nflTeam: "MIA", projected: 14.8 },
      { name: "Josh Jacobs", position: "RB", nflTeam: "GB", projected: 15.5 },
      { name: "Tyreek Hill", position: "WR", nflTeam: "MIA", projected: 21.9 },
      { name: "Jaylen Waddle", position: "WR", nflTeam: "MIA", projected: 15.9 },
      { name: "Kyle Pitts", position: "TE", nflTeam: "ATL", projected: 9.8 },
      { name: "Dolphins D/ST", position: "DST", nflTeam: "MIA", projected: 7.0 }
    ]
  },

  {
    id: "bootleg-blitz",
    name: "Bootleg Blitz",
    manager: "Sam Carter",
    record: "0-0",
    projection: 113.7,
    roster: [
      { name: "Dak Prescott", position: "QB", nflTeam: "DAL", projected: 22.0 },
      { name: "Tony Pollard", position: "RB", nflTeam: "TEN", projected: 13.8 },
      { name: "Kenneth Walker III", position: "RB", nflTeam: "SEA", projected: 16.1 },
      { name: "CeeDee Lamb", position: "WR", nflTeam: "DAL", projected: 20.3 },
      { name: "Brandon Aiyuk", position: "WR", nflTeam: "SF", projected: 15.0 },
      { name: "Trey McBride", position: "TE", nflTeam: "ARI", projected: 13.7 },
      { name: "Seahawks D/ST", position: "DST", nflTeam: "SEA", projected: 7.4 }
    ]
  },

  {
    id: "hail-mary",
    name: "Hail Mary Heroes",
    manager: "Luis Gomez",
    record: "0-0",
    projection: 112.1,
    roster: [
      { name: "Jalen Hurts", position: "QB", nflTeam: "PHI", projected: 23.9 },
      { name: "D'Andre Swift", position: "RB", nflTeam: "CHI", projected: 13.9 },
      { name: "Najee Harris", position: "RB", nflTeam: "PIT", projected: 14.0 },
      { name: "AJ Brown", position: "WR", nflTeam: "PHI", projected: 18.8 },
      { name: "Chris Olave", position: "WR", nflTeam: "NO", projected: 16.1 },
      { name: "Pat Freiermuth", position: "TE", nflTeam: "PIT", projected: 9.4 },
      { name: "Eagles D/ST", position: "DST", nflTeam: "PHI", projected: 8.1 }
    ]
  },

  {
    id: "redzone-raiders",
    name: "Redzone Raiders",
    manager: "Emily Chen",
    record: "0-0",
    projection: 111.5,
    roster: [
      { name: "Kirk Cousins", position: "QB", nflTeam: "ATL", projected: 20.8 },
      { name: "Travis Etienne", position: "RB", nflTeam: "JAX", projected: 17.4 },
      { name: "James Conner", position: "RB", nflTeam: "ARI", projected: 13.1 },
      { name: "DK Metcalf", position: "WR", nflTeam: "SEA", projected: 15.4 },
      { name: "Calvin Ridley", position: "WR", nflTeam: "TEN", projected: 13.8 },
      { name: "Cole Kmet", position: "TE", nflTeam: "CHI", projected: 9.0 },
      { name: "Steelers D/ST", position: "DST", nflTeam: "PIT", projected: 8.4 }
    ]
  },

  {
    id: "fantasy-unlimited",
    name: "Fantasy Unlimited",
    manager: "Riley Adams",
    record: "0-0",
    projection: 110.2,
    roster: [
      { name: "Trevor Lawrence", position: "QB", nflTeam: "JAX", projected: 21.2 },
      { name: "Austin Ekeler", position: "RB", nflTeam: "WAS", projected: 14.6 },
      { name: "Brian Robinson Jr.", position: "RB", nflTeam: "WAS", projected: 13.7 },
      { name: "Garrett Wilson", position: "WR", nflTeam: "NYJ", projected: 17.2 },
      { name: "Drake London", position: "WR", nflTeam: "ATL", projected: 14.3 },
      { name: "David Njoku", position: "TE", nflTeam: "CLE", projected: 10.5 },
      { name: "Browns D/ST", position: "DST", nflTeam: "CLE", projected: 8.0 }
    ]
  },

  {
    id: "two-minute-drill",
    name: "Two-Minute Drill",
    manager: "Noah Park",
    record: "0-0",
    projection: 109.6,
    roster: [
      { name: "Brock Purdy", position: "QB", nflTeam: "SF", projected: 20.5 },
      { name: "Christian Kirk", position: "WR", nflTeam: "JAX", projected: 14.0 },
      { name: "DeAndre Hopkins", position: "WR", nflTeam: "TEN", projected: 13.4 },
      { name: "Alvin Kamara", position: "RB", nflTeam: "NO", projected: 15.9 },
      { name: "Zamir White", position: "RB", nflTeam: "LV", projected: 12.2 },
      { name: "Dallas Goedert", position: "TE", nflTeam: "PHI", projected: 10.1 },
      { name: "Saints D/ST", position: "DST", nflTeam: "NO", projected: 7.5 }
    ]
  },
  
  {
    id: "goal-line-grinders",
    name: "Goal Line Grinders",
    manager: "Avery Collins",
    record: "0-0",
    projection: 112.7,
    roster: [
      { name: "Jordan Love", position: "QB", nflTeam: "GB", projected: 20.2 },
      { name: "Derrick Henry", position: "RB", nflTeam: "BAL", projected: 17.8 },
      { name: "Joe Mixon", position: "RB", nflTeam: "HOU", projected: 15.3 },
      { name: "Mike Evans", position: "WR", nflTeam: "TB", projected: 15.0 },
      { name: "Amari Cooper", position: "WR", nflTeam: "CLE", projected: 14.1 },
      { name: "Hunter Henry", position: "TE", nflTeam: "NE", projected: 9.2 },
      { name: "Chiefs D/ST", position: "DST", nflTeam: "KC", projected: 7.6 }
    ]
  }
];

async function main() {
  connect("fantasyfootball");

  const existing = await Teams.index();
  await Promise.all(existing.map((t) => Teams.remove(t.id)));

  await Promise.all(TEAMS.map((t) => Teams.create(t)));

  console.log(`Seeded ${TEAMS.length} teams.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});