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

    .week-label {
      margin-bottom: var(--space-2);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .week-label .icon {
      width: 1.5rem;
      height: 1.5rem;
      flex: 0 0 auto;
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

    .names {
      text-align: right;
    }

    .projections {
      display: flex;
      justify-content: space-between;
      font-size: 0.9rem;
      color: var(--color-muted);
    }

    .empty {
      font-size: 0.9rem;
      color: var(--color-muted);
    }
  `;

  private _authObserver = new Observer<Auth.Model>(this, "ff:auth");

  @state()
  private teams: TeamWithProj[] = [];

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe((auth: Auth.Model) => {
      const user = auth.user;
      if (user && user.authenticated && "token" in user) {
        const headers: HeadersInit = {
          Authorization: `Bearer ${user.token as string}`
        };
        this.loadTeams(headers);
      } else {
        this.teams = [];
      }
    });
  }

  private loadTeams(headers: HeadersInit) {
    fetch("/api/teams", { headers })
      .then((res: Response) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json: Team[]) => {
        const list: Team[] = Array.isArray(json) ? json : [];
        this.teams = list.map((t: Team) => ({
          ...t,
          projection: t.projection ?? 0
        }));
      })
      .catch((err: unknown) => {
        console.error("Failed to load teams for matchups", err);
        this.teams = [];
      });
  }

  private get weeklyMatchups(): [TeamWithProj, TeamWithProj][] {
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

          ${pairs.length === 0
            ? html`<p class="empty">
                No matchups to show yet. Add some teams or check that your
                league is seeded.
              </p>`
            : html`
                <div class="matchups-grid">
                  ${pairs.map(([home, away], i) => html`
                    <article class="matchup-card">
                      <header class="teams">
                        <span>Game ${i + 1}</span>
                        <div class="names">
                          <div>${home.name}</div>
                          <div>vs</div>
                          <div>${away.name}</div>
                        </div>
                      </header>
                      <div class="projections">
                        <span>${home.projection.toFixed(1)} pts</span>
                        <span>${away.projection.toFixed(1)} pts</span>
                      </div>
                    </article>
                  `)}
                </div>
              `}
        </section>
      </main>
    `;
  }
}