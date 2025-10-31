import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

type TeamData = {
  teamName: string;
  manager: string;
  record: string;
  href?: string;
  projection?: string;
  icon?: "helmet" | "football" | "";
};

export class FfTeamListElement extends LitElement {
  @property()
  src?: string;

  @state()
  teams: Array<TeamData> = [];

  connectedCallback() {
    super.connectedCallback();
    if (this.src) this.hydrate(this.src);
  }

  private hydrate(src: string) {
    fetch(src)
      .then((res) => res.json())
      .then((json: unknown) => {
        if (Array.isArray(json)) {
          this.teams = json as Array<TeamData>;
        } else {
          this.teams = [];
        }
      })
      .catch((err) => {
        console.error("Error loading teams:", err);
        this.teams = [];
      });
  }

  override render() {
    return html`
      <div class="team-list">
        ${this.teams.map(
          (team) => html`
            <ff-team-card
              team-name=${team.teamName}
              manager=${team.manager}
              record=${team.record}
              href=${team.href ?? "/team.html"}
              icon=${team.icon ?? "helmet"}
            >
              ${team.projection
                ? html`<span slot="projection">${team.projection}</span>`
                : html`<span slot="projection">Projected: —</span>`}
            </ff-team-card>
          `
        )}
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    .team-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
    ff-team-card {
      flex: 1 1 280px;
      min-width: 260px;
    }
  `;
}
