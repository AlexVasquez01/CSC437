import{i as f,a as b,x as v,r as u,n as p,d as g,b as y}from"./state-oyQc6TAy.js";var x=Object.defineProperty,c=(s,t,r,n)=>{for(var e=void 0,o=s.length-1,d;o>=0;o--)(d=s[o])&&(e=d(t,r,e)||e);return e&&x(t,r,e),e};const m=class m extends f{constructor(){super(...arguments),this.formData={},this.redirect="/app"}get canSubmit(){return!!(this.api&&this.formData.username&&this.formData.password)}render(){return v`
      <form
        @input=${t=>this.handleChange(t)}
        @submit=${t=>this.handleSubmit(t)}
      >
        <slot></slot>

        <slot name="button">
          <button ?disabled=${!this.canSubmit} type="submit">
            Login
          </button>
        </slot>

        <p class="error">${this.error??""}</p>
      </form>
    `}handleChange(t){const r=t.target,n=r==null?void 0:r.name,e=r==null?void 0:r.value;this.formData={...this.formData,[n]:e}}handleSubmit(t){t.preventDefault(),this.canSubmit&&fetch(this.api||"",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.formData)}).then(r=>{if(r.status!==200&&r.status!==201)throw new Error(`Login failed (status ${r.status})`);return r.json()}).then(r=>{const{token:n}=r,e=new CustomEvent("auth:message",{bubbles:!0,composed:!0,detail:["auth/signin",{token:n,redirect:this.redirect}]});this.dispatchEvent(e)}).catch(r=>{console.error(r),this.error=r.toString()})}};m.styles=b`
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
      padding: 0.5rem 0.75rem;
      border-radius: var(--radius);
      border: 1px solid var(--color-border);
    }
    button {
      padding: 0.5rem 0.75rem;
      border-radius: var(--radius);
      border: none;
      background: var(--color-accent);
      color: var(--color-text-inverted);
      cursor: pointer;
    }
    button:disabled {
      opacity: 0.5;
      cursor: default;
    }
    .error:not(:empty) {
      color: var(--color-error, red);
      border: 1px solid var(--color-error, red);
      padding: 0.5rem;
    }
  `;let i=m;c([u()],i.prototype,"formData");c([p()],i.prototype,"api");c([p()],i.prototype,"redirect");c([u()],i.prototype,"error");var w=Object.defineProperty,l=(s,t,r,n)=>{for(var e=void 0,o=s.length-1,d;o>=0;o--)(d=s[o])&&(e=d(t,r,e)||e);return e&&w(t,r,e),e};const h=class h extends f{constructor(){super(...arguments),this.form={},this.api="/auth/register",this.redirect="/login.html"}render(){return v`
      <form
        @input=${t=>this.updateField(t)}
        @submit=${t=>this.submit(t)}
      >
        <slot></slot>
        <button type="submit">Create Account</button>
        <p class="error">${this.error??""}</p>
      </form>
    `}updateField(t){const r=t.target;this.form={...this.form,[r.name]:r.value}}submit(t){if(t.preventDefault(),this.form.password!==this.form.confirm){this.error="Passwords do not match.";return}fetch(this.api,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:this.form.username,password:this.form.password})}).then(r=>{if(!r.ok)throw new Error("Account creation failed.");window.location.href=this.redirect}).catch(r=>{this.error=r.message})}};h.styles=b`
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
  `;let a=h;l([u()],a.prototype,"form");l([p()],a.prototype,"api");l([p()],a.prototype,"redirect");l([u()],a.prototype,"error");g({"mu-auth":y.Provider,"login-form":i,"newuser-form":a});
