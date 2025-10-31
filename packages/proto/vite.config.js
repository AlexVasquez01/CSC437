import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        manager: resolve(__dirname, "public/manager.html"),
        team: resolve(__dirname, "public/team.html"),
        matchup: resolve(__dirname, "public/matchup.html"),
        player: resolve(__dirname, "public/player.html"),
        scoring: resolve(__dirname, "public/scoring_rules.html")
      }
    }
  }
});
