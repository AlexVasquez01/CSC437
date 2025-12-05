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

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      margin-bottom: 0.5rem;
    }
  `;

  render() {
    if (!this.teams) {
      return html`<p>Loading teams…</p>`;
    }

    return html`
      <section class="page-grid">
        <section class="span-12 card">
          <h2>Teams</h2>
          <ul>
            ${this.teams.map(
              (team) => html`
                <li>
                  <ff-team-card .team=${team}></ff-team-card>
                </li>
              `
            )}
          </ul>
        </section>
      </section>
    `;
  }
}