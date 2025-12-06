import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import type { Team } from "server/models";

export class FfTeamCardElement extends LitElement {
  @property({ type: Object })
  team?: Team;

  private get routeId(): string | undefined {
    const t: any = this.team;
    return t?.id ?? t?._id;
  }

  override render() {
    const t: any = this.team ?? {};
    const name = t.name ?? "(no name)";
    const manager = t.manager ?? "";
    const record = t.record ?? "";
    const projection: number | undefined = t.projection;
    const id = this.routeId;

    return html`
      <article class="card">
        <header class="card-header">
          ${this.renderIcon()}
          <div class="title-block">
            <div class="team-name">${name}</div>
            <p class="manager">${manager}</p>
          </div>
          <p class="record">${record}</p>
        </header>
        <div class="card-body">
          <div class="projection">
            ${projection != null
              ? html`Projected: ${projection.toFixed(1)} pts`
              : html`Projected: —`}
          </div>
          <slot></slot>

          ${id
            ? html`
                <a class="edit-link" href=${`/app/teams/${id}/edit`}>
                  Edit team
                </a>
              `
            : null}
        </div>
      </article>
    `;
  }

  private renderIcon() {
    return html`
      <svg class="icon">
        <use href="/icons/fantasy.svg#icon-helmet"></use>
      </svg>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      padding: var(--space-2);
      display: flex;
      flex-direction: column;
      gap: var(--space-1);
    }

    .card-header {
      display: flex;
      align-items: center;
      gap: var(--space-1);
    }

    .icon {
      width: 1.5rem;
      height: 1.5rem;
      flex: 0 0 auto;
    }

    .title-block {
      display: flex;
      flex-direction: column;
      gap: 0.2rem;
    }

    .team-name {
      font-weight: 600;
    }

    .manager {
      font-size: 0.8rem;
      color: var(--color-muted);
      margin: 0;
    }

    .record {
      margin-left: auto;
      font-weight: 600;
    }

    .card-body {
      font-size: 0.85rem;
      color: var(--color-text);
      margin-top: 0.25rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .edit-link {
      font-size: 0.8rem;
      text-decoration: underline;
      align-self: flex-start;
    }
  `;
}