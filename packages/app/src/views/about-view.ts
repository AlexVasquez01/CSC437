import { css, html, LitElement } from "lit";

export class AboutViewElement extends LitElement {
  override render() {
    return html`
      <main class="page-grid">
        <section class="span-8">
          <h2>About This League</h2>
          <p>
            This is my Fantasy Football single page app. The header, auth state,
            and league data all live on one page, and navigation between
            views happens without full page reloads.
          </p>
          <p>
            Try going back to the home view:
            <a href="/app">Back to league home</a>
          </p>
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