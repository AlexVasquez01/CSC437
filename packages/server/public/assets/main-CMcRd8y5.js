import{r as f,i as l,O as T,e as L,x as o,a as c,n as k,V as R,d as q,f as N,h as z,b as y,_ as U,s as G}from"./state-oyQc6TAy.js";var J=Object.defineProperty,M=(i,e,t,s)=>{for(var a=void 0,n=i.length-1,r;n>=0;n--)(r=i[n])&&(a=r(e,t,a)||a);return a&&J(e,t,a),a};class P extends l{constructor(){super(...arguments),this._authObserver=new T(this,"ff:auth"),this.loggedIn=!1}createRenderRoot(){return this}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{const{user:t}=e;t&&t.authenticated?(this.loggedIn=!0,this.userid=t.username):(this.loggedIn=!1,this.userid=void 0)})}renderSignOutButton(){return o`
      <button
        class="signout-btn"
        @click=${e=>{L.relay(e,"auth:message",["auth/signout"])}}
      >
        Sign Out
      </button>
    `}renderSignInLink(){return o`
      <a href="/login.html" data-router-ignore>Sign In…</a>
    `}render(){return o`
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
              ${this.loggedIn?this.userid:"Guest"}
            </span>

            ${this.loggedIn?this.renderSignOutButton():this.renderSignInLink()}
          </div>
        </div>
      </header>
    `}}M([f()],P.prototype,"loggedIn");M([f()],P.prototype,"userid");var H=Object.defineProperty,K=(i,e,t,s)=>{for(var a=void 0,n=i.length-1,r;n>=0;n--)(r=i[n])&&(a=r(e,t,a)||a);return a&&H(e,t,a),a};const I=class I extends l{get routeId(){const e=this.team;return(e==null?void 0:e.id)??(e==null?void 0:e._id)}render(){const e=this.team??{},t=e.name??"(no name)",s=e.manager??"",a=e.record??"",n=e.projection,r=this.routeId;return o`
      <article class="card">
        <header class="card-header">
          ${this.renderIcon()}
          <div class="title-block">
            <div class="team-name">${t}</div>
            <p class="manager">${s}</p>
          </div>
          <p class="record">${a}</p>
        </header>
        <div class="card-body">
          <div class="projection">
            ${n!=null?o`Projected: ${n.toFixed(1)} pts`:o`Projected: —`}
          </div>
          <slot></slot>

          ${r?o`
                <a class="edit-link" href=${`/app/teams/${r}/edit`}>
                  Edit team
                </a>
              `:null}
        </div>
      </article>
    `}renderIcon(){return o`
      <svg class="icon">
        <use href="/icons/fantasy.svg#icon-helmet"></use>
      </svg>
    `}};I.styles=c`
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

    .team-name {
      font-weight: 600;
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
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .edit-link {
      font-size: 0.8rem;
      text-decoration: underline;
      align-self: flex-start;
    }
  `;let v=I;K([k({type:Object})],v.prototype,"team");var Q=Object.defineProperty,B=(i,e,t,s)=>{for(var a=void 0,n=i.length-1,r;n>=0;n--)(r=i[n])&&(a=r(e,t,a)||a);return a&&Q(e,t,a),a};const O=class O extends l{constructor(){super(...arguments),this.teams=[],this._authObserver=new T(this,"ff:auth")}connectedCallback(){super.connectedCallback(),this._authObserver.observe(e=>{var t;this._user=e.user,this.src&&((t=this._user)!=null&&t.authenticated)&&this.hydrate(this.src)})}get authorization(){var e;return((e=this._user)==null?void 0:e.authenticated)&&{Authorization:`Bearer ${this._user.token}`}}hydrate(e){const t=this.authorization||void 0;fetch(e,{headers:t}).then(s=>{if(!s.ok)throw new Error(`Fetch failed: ${s.status}`);return s.json()}).then(s=>{Array.isArray(s)?this.teams=s:this.teams=[]}).catch(s=>{console.error("Error loading teams:",s),this.teams=[]})}render(){return o`
      <div class="team-list">
        ${this.teams.map(e=>o`
            <ff-team-card .team=${e}></ff-team-card>
          `)}
      </div>
    `}};O.styles=c`
    :host {
      display: block;
    }
    .team-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
    ff-team-card {
      flex: 1 1 280px;
      min-width: 260px;
    }
  `;let p=O;B([k()],p.prototype,"src");B([f()],p.prototype,"teams");const S=class S extends l{render(){return o`
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
          <p><a href="/app/scoring">PPR Standard</a></p>
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
    `}};S.styles=c`
    :host {
      display: block;
    }
  `;let w=S;const j=class j extends l{createRenderRoot(){return this}render(){return o`
      <main class="page-grid">
        <section class="span-8">
          <h2>About This League</h2>
          <p>
            This is my Fantasy Football single page app. The header, auth
            state, and league data all live on one page, and navigation
            between views happens without full page reloads.
          </p>
          <p>
            Try going back to the home view:
            <a href="/app">Back to league home</a>
          </p>
        </section>
      </main>
    `}};j.styles=c`
    :host {
      display: block;
    }
  `;let x=j;var W=Object.defineProperty,X=Object.getOwnPropertyDescriptor,Y=(i,e,t,s)=>{for(var a=X(e,t),n=i.length-1,r;n>=0;n--)(r=i[n])&&(a=r(e,t,a)||a);return a&&W(e,t,a),a};const C=class C extends R{constructor(){super("ff:model")}get teams(){return this.model.teams}connectedCallback(){super.connectedCallback(),this.model.teams||this.dispatchMessage(["teams/request",{}])}render(){return this.teams?o`
      <section class="page-grid">
        <section class="span-12 card">
          <h2>Teams</h2>
          <ul>
            ${this.teams.map(e=>o`
                <li>
                  <ff-team-card .team=${e}></ff-team-card>
                </li>
              `)}
          </ul>
        </section>
      </section>
    `:o`<p>Loading teams…</p>`}};C.styles=c`
    :host {
      display: block;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    li {
      margin-bottom: 0.5rem;
    }
  `;let g=C;Y([f()],g.prototype,"teams");var Z=Object.defineProperty,E=Object.getOwnPropertyDescriptor,D=(i,e,t,s)=>{for(var a=s>1?void 0:s?E(e,t):e,n=i.length-1,r;n>=0;n--)(r=i[n])&&(a=(s?r(e,t,a):r(a))||a);return s&&a&&Z(e,t,a),a};const b=class b extends R{constructor(){super("ff:model")}get team(){var t;return this.teamId?((t=this.model.teams)==null?void 0:t.find(s=>s.id===this.teamId||s._id===this.teamId))??this.model.team:void 0}connectedCallback(){super.connectedCallback(),this.teamId&&this.dispatchMessage(["team/request",{id:this.teamId}])}render(){if(!this.teamId)return o`<p>No team selected.</p>`;const e=this.team??{};return o`
      <main class="page-grid">
        <section class="span-6 card">
          <h2>Edit Team</h2>

          <mu-form
            .init=${e}
            @mu-form:submit=${t=>this.handleSubmit(t)}
          >
            <label>
              <span>Team name</span>
              <input name="name" .value=${e.name??""} />
            </label>

            <label>
              <span>Manager</span>
              <input name="manager" .value=${e.manager??""} />
            </label>

            <button type="submit">Save changes</button>
          </mu-form>
        </section>
      </main>
    `}handleSubmit(e){this.teamId&&this.dispatchMessage(["team/save",{id:this.teamId,team:e.detail,reactions:{onSuccess:()=>z.dispatch(this,"history/navigate",{href:"/app/teams"}),onFailure:t=>console.error("Failed to save team:",t)}}])}};b.uses=q({"mu-form":N.Element}),b.styles=c`
    :host {
      display: block;
    }

    .card {
      padding: var(--space-3);
      background: var(--color-surface);
      border-radius: var(--radius);
      border: 1px solid var(--color-border);
      display: flex;
      flex-direction: column;
      gap: var(--space-2);
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
      background: var(--color-surface);
      color: var(--color-text);
    }

    button {
      margin-top: 1rem;
      align-self: flex-start;
      padding: 0.5rem 0.75rem;
      border-radius: var(--radius);
      border: none;
      background: var(--color-accent);
      color: var(--color-text-inverted);
      cursor: pointer;
      font-weight: 600;
    }
  `;let m=b;D([k({attribute:"team-id"})],m.prototype,"teamId",2);D([f()],m.prototype,"team",1);const A=class A extends l{render(){return o`
      <main class="page-grid">
        <section class="span-12 card">
          <h2>Matchups</h2>
          <p>
            This is a placeholder Matchups view
          </p>
        </section>
      </main>
    `}};A.styles=c`
    :host {
      display: block;
    }
  `;let $=A;const F=class F extends l{render(){return o`
      <main class="page-grid">
        <section class="span-12 card">
          <h2>Scoring Rules</h2>
          <p>
            PPR standard scoring (placeholder view)
          </p>
        </section>
      </main>
    `}};F.styles=c`
    :host {
      display: block;
    }
  `;let _=F;const V={};function ee(i,e,t){var n;const[s,a]=i;switch(s){case"teams/request":return e.teams?e:[e,te(t).then(r=>["teams/load",{teams:r}])];case"teams/load":{const{teams:r}=a;return{...e,teams:r}}case"team/request":{const{id:r}=a,h=((n=e.teams)==null?void 0:n.find(d=>d._id===r||d.id===r))??e.team;return h?{...e,team:h}:[e,ae({id:r},t).then(d=>["team/load",{team:d}])]}case"team/load":{const{team:r}=a,h=r._id??r.id,d=e.teams?e.teams.map(u=>(u._id??u.id)===h?r:u):[r];return{...e,teams:d,team:r}}case"team/save":{const{id:r,team:h,reactions:d}=a;return[e,se({id:r,team:h},t,d).then(u=>["team/load",{team:u}])]}default:throw new Error(`Unhandled message "${s}"`)}}function te(i){return fetch("/api/teams",{headers:y.headers(i)}).then(e=>{if(e.status!==200)throw new Error(`Failed to load teams: ${e.status}`);return e.json()}).then(e=>e)}function ae(i,e){return fetch(`/api/teams/${i.id}`,{headers:y.headers(e)}).then(t=>{if(t.status!==200)throw new Error(`Failed to load team: ${t.status}`);return t.json()}).then(t=>t)}function se(i,e,t){return fetch(`/api/teams/${i.id}`,{method:"PUT",headers:{"Content-Type":"application/json",...y.headers(e)},body:JSON.stringify(i.team)}).then(s=>{if(s.status!==200)throw new Error(`Failed to save team: ${s.status}`);return s.json()}).then(s=>{var n;const a=s;return(n=t==null?void 0:t.onSuccess)==null||n.call(t),a}).catch(s=>{var a;throw(a=t==null?void 0:t.onFailure)==null||a.call(t,s),s})}const re=[{path:"/app/teams/:id/edit",view:i=>o`<ff-team-edit-view team-id=${i.id}></ff-team-edit-view>`},{path:"/app/teams",view:()=>o`<ff-teams-view></ff-teams-view>`},{path:"/app/matchups",view:()=>o`<ff-matchups-view></ff-matchups-view>`},{path:"/app/scoring",view:()=>o`<ff-scoring-view></ff-scoring-view>`},{path:"/app/about",view:()=>o`<ff-about-view></ff-about-view>`},{path:"/app",view:()=>o`<ff-home-view></ff-home-view>`},{path:"/",redirect:"/app"}];class ie extends U.Element{constructor(){super(re,"ff:history","ff:auth")}}class ne extends G.Provider{constructor(){super(ee,V,"ff:auth")}}q({"mu-auth":y.Provider,"mu-history":z.Provider,"mu-switch":ie,"mu-store":ne,"ff-header-auth":P,"ff-team-card":v,"ff-team-list":p,"ff-home-view":w,"ff-about-view":x,"ff-teams-view":g,"ff-team-edit-view":m,"ff-matchups-view":$,"ff-scoring-view":_});
