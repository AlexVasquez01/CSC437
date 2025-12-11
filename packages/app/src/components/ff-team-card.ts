import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";
import type { Team, Player } from "server/models";

export class FfTeamCardElement extends LitElement {
  @property({ type: Object })
  team?: Team;

  private get routeId(): string | undefined {
    const t: any = this.team;
    return t?.id ?? t?._id;
  }

  override render() {
    const t: any = this.team ?? {};
    const name: string = t.name ?? "(no name)";
    const manager: string = t.manager ?? "";
    const record: string = t.record ?? "";
    const projection: number | undefined = t.projection;
    const id = this.routeId;

    const roster: Player[] = Array.isArray(t.roster) ? t.roster : [];
    const preview = roster.slice(0, 3);

    return html`
      <article class="card">
        <header class="card-header">
          ${this.renderHelmetIcon()}
          <div class="title-block">
            <div class="team-name">${name}</div>
            <p class="manager">${manager}</p>
          </div>
          <p class="record">${record}</p>
        </header>

        <div class="card-body">
          <div class="projection">
            <span class="projection-label">
              <svg class="icon projection-icon">
                <use href="/icons/fantasy.svg#icon-football"></use>
              </svg>
              Projected
            </span>
            <span class="projection-value">
              ${projection != null ? `${projection.toFixed(1)} pts` : "—"}
            </span>
          </div>

          ${preview.length
            ? html`
                <div class="roster-preview">
                  <div class="roster-heading">Key Players</div>
                  <ul>
                    ${preview.map(
                      (p) => html`
                        <li>
                          <span class="pos">${p.position}</span>
                          <span class="name">${p.name}</span>
                          <span class="pts">${p.projected.toFixed(1)} pts</span>
                        </li>
                      `
                    )}
                  </ul>
                </div>
              `
            : null}

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

  private renderHelmetIcon() {
    return html`
      <svg class="icon header-icon">
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

    .projection {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.5rem;
    }

    .projection-label {
      display: inline-flex;
      align-items: center;
      gap: 0.25rem;
      font-weight: 500;
    }

    .projection-icon {
      width: 1.25rem;
      height: 1.25rem;
    }

    .projection-value {
      font-weight: 600;
    }

    .roster-preview {
      margin-top: 0.25rem;
    }

    .roster-heading {
      font-size: 0.75rem;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: var(--color-muted);
      margin-bottom: 0.25rem;
    }

    .roster-preview ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .roster-preview li {
      display: grid;
      grid-template-columns: 2.5rem minmax(0, 1fr) auto;
      column-gap: 0.5rem;
      font-size: 0.8rem;
      align-items: baseline;
    }

    .roster-preview .pos {
      font-weight: 600;
    }

    .roster-preview .name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .roster-preview .pts {
      font-variant-numeric: tabular-nums;
      color: var(--color-muted);
    }

    .edit-link {
      font-size: 0.8rem;
      text-decoration: underline;
      align-self: flex-start;
    }
  `;
}