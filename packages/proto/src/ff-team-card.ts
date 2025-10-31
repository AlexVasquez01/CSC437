import { LitElement, html, css } from "lit";
import { property } from "lit/decorators.js";

export class FfTeamCardElement extends LitElement {
  @property({ attribute: "team-name" })
  teamName = "";

  @property()
  manager = "";

  @property()
  record = "";

  @property()
  href = "#";

  @property()
  icon: "helmet" | "football" | "" = "helmet";

  override render() {
    return html`
      <article class="card">
        <header class="card-header">
          ${this.renderIcon()}
          <div class="title">
            <a href=${this.href}>${this.teamName}</a>
            <p class="manager">${this.manager}</p>
          </div>
          <p class="record">${this.record}</p>
        </header>
        <div class="body">
          <slot>—</slot>
        </div>
      </article>
    `;
  }

  private renderIcon() {
    const id =
      this.icon === "football"
        ? "icon-football"
        : "icon-helmet";
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
      gap: var(--space-1);
      align-items: center;
    }
    .title a {
      font-weight: 600;
      color: inherit;
      text-decoration: none;
    }
    .title a:hover {
      text-decoration: underline;
    }
    .manager {
      font-size: 0.85rem;
      color: var(--color-muted);
    }
    .record {
      margin-left: auto;
      font-weight: 600;
    }
    .body {
      font-size: 0.87rem;
      color: var(--color-text);
    }
    .icon {
      width: 1.5rem;
      height: 1.5rem;
    }
  `;
}
