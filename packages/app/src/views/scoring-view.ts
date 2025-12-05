import { LitElement, css, html } from "lit";

export class ScoringViewElement extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <main class="page-grid">
        <section class="span-12 card">
          <h2>Scoring Rules</h2>
          <p>
            PPR standard scoring (placeholder view)
          </p>
        </section>
      </main>
    `;
  }
}