import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";
import { Auth, Observer } from "@calpoly/mustang";

type TeamData = {
  id: string;
  name: string;
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
  private _authObserver = new Observer<Auth.Model>(this, "ff:auth");
  private _user?: Auth.User;

  connectedCallback() {
    super.connectedCallback();
    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      if (this.src && this._user?.authenticated) {
        this.hydrate(this.src);
      }
    });
  }

  get authorization() {
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${
          (this._user as Auth.AuthenticatedUser).token
        }`
      }
    );
  }

  private hydrate(src: string) {
    const headers = this.authorization || undefined;

    fetch(src, { headers })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Fetch failed: ${res.status}`);
        }
        return res.json();
      })
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
              team-name=${team.name}
              manager=${team.manager}
              record=${team.record}
              href=${team.href ?? "/app/teams"}
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