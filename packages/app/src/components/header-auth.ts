import { LitElement, html } from "lit";
import { state } from "lit/decorators.js";
import { Auth, Observer, Events } from "@calpoly/mustang";

export class HeaderAuthElement extends LitElement {
  createRenderRoot() {
    return this;
  }

  private _authObserver = new Observer<Auth.Model>(this, "ff:auth");

  @state()
  loggedIn = false;

  @state()
  userid?: string;

  connectedCallback() {
    super.connectedCallback();

    this._authObserver.observe((auth: Auth.Model) => {
      const { user } = auth;

      if (user && user.authenticated) {
        this.loggedIn = true;
        this.userid = user.username;
      } else {
        this.loggedIn = false;
        this.userid = undefined;
      }
    });
  }

  private renderSignOutButton() {
    return html`
      <button
        class="signout-btn"
        @click=${(e: Event) => {
          Events.relay(e, "auth:message", ["auth/signout"]);
        }}
      >
        Sign Out
      </button>
    `;
  }

  private renderSignInLink() {
    return html`
      <a class="signin-link" href="/login.html">Sign In…</a>
    `;
  }

  override render() {
    return html`
      <header class="site-header">
        <div class="site-brand">
          <svg class="icon">
            <use href="/icons/fantasy.svg#icon-helmet"></use>
          </svg>
          AV Fantasy
        </div>

        <div class="spacer"></div>

        <nav class="site-nav" aria-label="Primary">
          <a href="/app">League</a>
          <a href="/app/teams">Teams</a>
          <a href="/app/matchups">Matchups</a>
          <a href="/app/scoring">Scoring</a>
        </nav>

        <div class="site-actions">
          <label class="mode-toggle">
            <input id="darkmode-toggle" type="checkbox" autocomplete="off" />
            Dark mode
          </label>

          <div class="site-user">
            <svg class="icon">
              <use href="/icons/fantasy.svg#icon-helmet"></use>
            </svg>

            <span class="username">
              ${this.loggedIn ? this.userid : "Guest"}
            </span>

            ${this.loggedIn
              ? this.renderSignOutButton()
              : this.renderSignInLink()}
          </div>
        </div>
      </header>
    `;
  }
}