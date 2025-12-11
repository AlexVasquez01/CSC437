export interface Player {
  name: string;       // "Christian McCaffrey"
  position: string;   // "RB"
  nflTeam: string;    // "SF"
  projected: number;  // 18.5
}

export interface Team {
  id: string;          // unique key, e.g. "vasquez"
  name: string;        // "Team Vasquez"
  manager: string;     // "Alex Vasquez"
  record: string;      // "1-0"
  projection?: number; // 128.4 (team total)
  avatar?: string;     // optional URL
  roster?: Player[];   // fantasy roster
}