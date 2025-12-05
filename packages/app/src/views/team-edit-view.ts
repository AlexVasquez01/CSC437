import { define, Form, History, View } from "@calpoly/mustang";
import { css, html } from "lit";
import { property, state } from "lit/decorators.js";

import { Model } from "../model";
import { Msg } from "../messages";
import type { Team } from "server/models";

export class TeamEditViewElement extends View<Model, Msg> {
  static uses = define({
    "mu-form": Form.Element
  });

  @property({ attribute: "team-id" })
  teamId?: string;

  constructor() {
    super("ff:model");
  }

  @state()
  get team(): Team | undefined {
    if (!this.teamId) return undefined;

    const fromList =
      this.model.teams?.find(
        (t: any) => t._id === this.teamId || t.id === this.teamId
      );

    return (fromList as Team | undefined) ?? this.model.team;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.teamId) {
      this.dispatchMessage(["team/request", { id: this.teamId }]);
    }
  }

  render() {
    if (!this.teamId) {
      return html`<p>No team selected.</p>`;
    }

    const team = (this.team as any) ?? {};

    return html`
      <main class="page-grid">
        <section class="span-6 card">
          <h2>Edit Team</h2>

          <mu-form
            .init=${team}
            @mu-form:submit=${(e: Form.SubmitEvent<Team>) =>
              this.handleSubmit(e)}
          >
            <label>
              <span>Team name</span>
              <input name="name" .value=${team.name ?? ""} />
            </label>

            <label>
              <span>Manager</span>
              <input name="manager" .value=${team.manager ?? ""} />
            </label>

            <button type="submit">Save changes</button>
          </mu-form>
        </section>
      </main>
    `;
  }

  handleSubmit(event: Form.SubmitEvent<Team>) {
    if (!this.teamId) return;

    this.dispatchMessage([
      "team/save",
      {
        id: this.teamId,
        team: event.detail
      },
      {
        onSuccess: () =>
          History.dispatch(this, "history/navigate", {
            href: "/app/teams"
          }),
        onFailure: (err: Error) =>
          console.error("Failed to save team:", err)
      }
    ]);
  }

  static styles = css`
    :host {
      display: block;
    }

    .card {
      padding: var(--space-3);
      background: var(--color-surface);
      border-radius: var(--radius);
      border: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
    }

    label {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    input {
      padding: 0.5rem 0.75rem;
      border-radius: var(--radius);
      border: 1px solid var(--color-border);
      background: var(--color-surface);
      color: var(--color-text);
    }

    button {
      margin-top: 1rem;
      align-self: flex-start;
      padding: 0.5rem 0.75rem;
      border-radius: var(--radius);
      border: none;
      background: var(--color-accent);
      color: var(--color-text-inverted);
      cursor: pointer;
      font-weight: 600;
    }
  `;
}