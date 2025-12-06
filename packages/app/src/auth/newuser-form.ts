import { LitElement, html, css } from "lit";
import { property, state } from "lit/decorators.js";

interface NewUserData {
  username?: string;
  password?: string;
  confirm?: string;
}

export class NewUserFormElement extends LitElement {
  @state() form: NewUserData = {};
  @property() api: string = "/auth/register";
  @property() redirect: string = "/login.html";
  @state() error?: string;

  static styles = css`
    form {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    input {
      padding: 0.5rem;
      border-radius: var(--radius);
      border: 1px solid var(--color-border);
    }
    button {
      padding: 0.5rem;
      border-radius: var(--radius);
      border: none;
      background: var(--color-accent);
      color: var(--color-text-inverted);
      cursor: pointer;
    }
    .error:not(:empty) {
      color: var(--color-error, red);
      border: 1px solid var(--color-error, red);
      padding: 0.5rem;
    }
  `;

  override render() {
    return html`
      <form
        @input=${(e: Event) => this.updateField(e)}
        @submit=${(e: SubmitEvent) => this.submit(e)}
      >
        <slot></slot>
        <button type="submit">Create Account</button>
        <p class="error">${this.error ?? ""}</p>
      </form>
    `;
  }

  updateField(e: Event) {
    const input = e.target as HTMLInputElement;
    this.form = { ...this.form, [input.name]: input.value };
  }

  submit(e: SubmitEvent) {
    e.preventDefault();

    if (this.form.password !== this.form.confirm) {
      this.error = "Passwords do not match.";
      return;
    }

    fetch(this.api, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.form.username,
        password: this.form.password
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Account creation failed.");
        window.location.href = this.redirect;
      })
      .catch((err: Error) => {
        this.error = err.message;
      });
  }
}