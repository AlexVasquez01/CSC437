export interface Team {
  id: string;      // unique key
  name: string;        // "Team Vasquez"
  manager: string;     // "Alex Vasquez"
  record: string;      // "1-0"
  projection?: number; // 128.4
  avatar?: string;     // optional image URL/icon ref
}