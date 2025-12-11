import { LitElement, css, html } from "lit";
import { state } from "lit/decorators.js";
import { Auth, Observer } from "@calpoly/mustang";
import type { Team } from "server/models";

type TeamWithProj = Team & { projection: number };

export class MatchupsViewElement extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .matchups-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: var(--space-2);
    }

    .matchup-card {
      background: var(--color-surface);
      border-radius: var(--radius);
      border: 1px solid var(--color-border);
      padding: var(--space-2);
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .teams {
      display: flex;
      justify-content: space-between;
      font-weight: 600;
    }

    .projections {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      color: var(--color-muted);
    }

    .week-label {
      margin-bottom: var(--space-2);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .week-label .icon {
      width: 1.5rem;
      height: 1.5rem;
    }
  `;

  private _authObserver = new Observer<Auth.Model>(this, "ff:auth");
  private _user?: Auth.User;

  @state()
  private teams: TeamWithProj[] = [];

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe((auth: Auth.Model) => {
      this._user = auth.user;
      if (this._user?.authenticated) {
        this.loadTeams();
      } else {
        this.teams = [];
      }
    });
  }

  private get authorization() {
    return (
      this._user?.authenticated && {
        Authorization: `Bearer ${
          (this._user as Auth.AuthenticatedUser).token
        }`
      }
    );
  }

  private loadTeams() {
    const headers = this.authorization || undefined;

    fetch("/api/teams", { headers })
      .then((res) => (res.ok ? res.json() : []))
      .then((json: Team[]) => {
        this.teams = (json ?? []).map((t) => ({
          ...t,
          projection: t.projection ?? 0
        }));
      })
      .catch((err) => {
        console.error("Failed to load teams for matchups", err);
        this.teams = [];
      });
  }

  private get weeklyMatchups() {
    const sorted = [...this.teams].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    const pairs: [TeamWithProj, TeamWithProj][] = [];
    for (let i = 0; i + 1 < sorted.length; i += 2) {
      pairs.push([sorted[i], sorted[i + 1]]);
    }
    return pairs;
  }

  render() {
    const pairs = this.weeklyMatchups;

    return html`
      <main class="page-grid">
        <section class="span-12">
          <div class="week-label">
            <svg class="icon">
              <use href="/icons/fantasy.svg#icon-football"></use>
            </svg>
            <h2>Week 1 Matchups</h2>
          </div>

          ${!pairs.length
            ? html`<p>Sign in to view league matchups.</p>`
            : html`
                <div class="matchups-grid">
                  ${pairs.map(
                    ([home, away], i) => html`
                      <article class="matchup-card">
                        <header class="teams">
                          <span>Game ${i + 1}</span>
                          <span>${home.name} vs ${away.name}</span>
                        </header>
                        <div class="projections">
                          <span>${home.projection.toFixed(1)} pts</span>
                          <span>${away.projection.toFixed(1)} pts</span>
                        </div>
                      </article>
                    `
                  )}
                </div>
              `}
        </section>
      </main>
    `;
  }
}