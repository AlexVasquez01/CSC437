import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

export class FfTeamCardElement extends LitElement {
  @property({ attribute: "team-name" })
  teamName = "";

  @property()
  name = "";

  @property()
  manager = "";

  @property()
  record = "";

  @property()
  href = "/team.html";

  @property()
  icon: "helmet" | "football" | "" = "helmet";

  override render() {
    const title = this.teamName || this.name || "Fantasy team";

    return html`
      <article class="card">
        <header class="card-header">
          ${this.renderIcon()}
          <div class="title-block">
            <a class="team-link" href=${this.href}>${title}</a>
            ${this.manager
              ? html`<p class="manager">${this.manager}</p>`
              : null}
          </div>
          ${this.record
            ? html`<p class="record">${this.record}</p>`
            : null}
        </header>
        <div class="card-body">
          <slot>Projected: —</slot>
        </div>
      </article>
    `;
  }

  private renderIcon() {
    const id =
      this.icon === "football" ? "icon-football" : "icon-helmet";
    return html`
      <svg class="icon">
        <use href=${`/icons/fantasy.svg#${id}`}></use>
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

    .team-link {
      font-weight: 600;
      color: inherit;
      text-decoration: none;
    }

    .team-link:hover {
      text-decoration: underline;
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
    }
  `;
}
