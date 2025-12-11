import { LitElement, css, html } from "lit";

export class ScoringViewElement extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    h1 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 1rem;
    }

    .icon {
      width: 2rem;
      height: 2rem;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: var(--color-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius);
      overflow: hidden;
      font-size: 0.9rem;
    }

    th,
    td {
      padding: 0.5rem 0.75rem;
      border-bottom: 1px solid var(--color-border);
      text-align: left;
    }

    th {
      background: var(--color-surface-alt, var(--color-surface));
      color: var(--color-text);
      font-weight: 600;
    }

    tr:last-child td {
      border-bottom: none;
    }
  `;

  render() {
    return html`
      <main class="page-grid">
        <section class="span-12">
          <h1>
            <svg class="icon">
              <use href="/icons/fantasy.svg#icon-football"></use>
            </svg>
            PPR Standard Scoring
          </h1>
        </section>

        <section class="span-12">
          <table>
            <tr><th>Stat</th><th>Points</th></tr>
            <tr><td>Reception</td><td>1</td></tr>
            <tr><td>Receiving Yards</td><td>0.1 / yard</td></tr>
            <tr><td>Receiving TD</td><td>6</td></tr>
            <tr><td>Rushing Yards</td><td>0.1 / yard</td></tr>
            <tr><td>Rushing TD</td><td>6</td></tr>
            <tr><td>Passing Yards</td><td>0.04 / yard</td></tr>
            <tr><td>Passing TD</td><td>4</td></tr>
            <tr><td>Interception</td><td>-2</td></tr>
          </table>
        </section>
      </main>
    `;
  }
}