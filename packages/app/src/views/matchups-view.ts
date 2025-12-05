import { LitElement, css, html } from "lit";

export class MatchupsViewElement extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <main class="page-grid">
        <section class="span-12 card">
          <h2>Matchups</h2>
          <p>
            This is a placeholder Matchups view
          </p>
        </section>
      </main>
    `;
  }
}