import { View } from "@calpoly/mustang";
import { css, html } from "lit";
import { state } from "lit/decorators.js";

import { Model } from "../model";
import { Msg } from "../messages";
import type { Team } from "server/models";

export class TeamsViewElement extends View<Model, Msg> {
  constructor() {
    super("ff:model");
  }

  @state()
  get teams(): Team[] | undefined {
    return this.model.teams;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.model.teams) {
      this.dispatchMessage(["teams/request", {}]);
    }
  }

  static styles = css`
    :host {
      display: block;
    }

    .teams-section {
      padding: var(--space-2);
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    .roster {
      margin-top: 0.5rem;
      font-size: 0.85rem;
    }

    .roster h3 {
      margin: 0 0 0.25rem 0;
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--color-muted);
    }

    .roster-table {
      width: 100%;
      border-collapse: collapse;
    }

    .roster-table th,
    .roster-table td {
      padding: 0.25rem 0.5rem;
      text-align: left;
      border-bottom: 1px solid var(--color-border);
    }

    .roster-table th {
      font-weight: 600;
      background: var(--color-surface-alt, var(--color-surface));
    }

    .roster-table tr:last-child td {
      border-bottom: none;
    }

    .empty {
      font-style: italic;
      color: var(--color-muted);
      margin: 0.25rem 0 0 0;
    }
  `;

  render() {
    const teams = this.teams;

    if (!teams) {
      return html`<p>Loading teams…</p>`;
    }

    return html`
      <section class="page-grid">
        <section class="span-12 card teams-section">
          <h2>Teams</h2>
          <ul>
            ${teams.map((team) => {
              const roster = team.roster ?? [];
              return html`
                <li>
                  <ff-team-card .team=${team}>
                    ${roster.length
                      ? html`
                          <div class="roster">
                            <h3>Full Roster</h3>
                            <table class="roster-table">
                              <thead>
                                <tr>
                                  <th>Pos</th>
                                  <th>Player</th>
                                  <th>NFL</th>
                                  <th>Proj</th>
                                </tr>
                              </thead>
                              <tbody>
                                ${roster.map(
                                  (p) => html`
                                    <tr>
                                      <td>${p.position}</td>
                                      <td>${p.name}</td>
                                      <td>${p.nflTeam}</td>
                                      <td>${p.projected.toFixed(1)} pts</td>
                                    </tr>
                                  `
                                )}
                              </tbody>
                            </table>
                          </div>
                        `
                      : html`<p class="empty">No players listed.</p>`}
                  </ff-team-card>
                </li>
              `;
            })}
          </ul>
        </section>
      </section>
    `;
  }
}