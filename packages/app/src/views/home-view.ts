import { css, html, LitElement } from "lit";

export class HomeViewElement extends LitElement {
  override render() {
    return html`
      <main class="page-grid">
        <section class="span-4">
          <h2>Basics</h2>
          <dl>
            <dt>Format</dt><dd>Head-to-head</dd>
            <dt>Teams</dt><dd>12</dd>
            <dt>Season</dt><dd>2025</dd>
          </dl>
        </section>

        <section class="span-8">
          <h2>Scoring</h2>
          <p><a href="/scoring_rules.html">PPR Standard</a></p>
        </section>

        <section class="span-6">
          <h2>
            <svg class="icon">
              <use href="/icons/fantasy.svg#icon-helmet"></use>
            </svg>
            Teams
          </h2>
          <ff-team-list src="/api/teams"></ff-team-list>
        </section>

        <section class="span-6">
          <h2>More</h2>
          <ul>
            <li><a href="/app/about">About this league (SPA view)</a></li>
          </ul>
        </section>
      </main>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
  `;
}