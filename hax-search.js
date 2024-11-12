import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./hax-image.js";

export class HaxSearch extends DDDSuper(I18NMixin(LitElement)) {
  static get properties() {
    return {
      title: { type: String },
      url: { type: String },
      loading: { type: Boolean },
      searchResults: { type: Array },
      data: { type: Object }
    };
  }

  constructor() {
    super();
    this.title = 'Search HAX Articles';
    this.url = 'https://haxthweb.org/sites.json';
    this.loading = false;
    this.searchResults = [];
    this.data = null;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--ddd-font-navigation, sans-serif);
        color: var(--ddd-theme-primary, black);
        background-color: var(--ddd-theme-accent, white);
      }
      .container {
        margin: 10px;
        padding: 20px;
      }
    `;
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <div class="container">
        <input placeholder="Search" @input=${this.handleInput}/>
        <button @click="${this.fetchData}">Analyze</button>
      </div>

      ${this.loading ? html`<p>Loading results...</p>` : ''}

      ${this.data ? html`
        <hax-image 
          .title=${this.data.title}
          .description=${this.data.description}
          .logo=${`${this.url}${this.data.metadata.site.logo}`}
          .dateCreated=${this.formatDate(this.data.metadata.site.created)}
          .dateUpdated=${this.formatDate(this.data.metadata.site.updated)}
          .hexCode=${this.data.metadata.theme.variables.hexCode}
          .theme=${this.data.metadata.theme.name}
          .icon=${this.data.metadata.theme.variables.icon}
          .url=${this.url}
        ></hax-image>
      ` : html`<p>The site '${this.url}' is not compatible</p>`}

      <div class="results">
        ${this.searchResults.map(item => html`
          <hax-image 
            .title=${item.title}
            .description=${item.description}
            .imageSrc=${this.getImageSource(item)}
            .dateUpdated=${this.formatDate(item.metadata.updated)}
            .pageLink=${`${this.url}${item.slug}`}
            .pageHtml=${`${this.url}${item.location}`}
            .readTime=${item.metadata.readtime}
          ></hax-image>
        `)}
      </div>
    `;
  }

  handleInput(event) {
    this.url = event.target.value;
  }

  fetchData() {
    this.loading = true;
    fetch(`${this.url}/site.json`)
      .then(response => response.ok ? response.json() : Promise.reject('Error loading data'))
      .then(data => {
        this.data = data;
        this.searchResults = data.items || [];
        this.loading = false;
      })
      .catch(() => {
        this.data = null;
        this.searchResults = [];
        this.loading = false;
      });
  }

  formatDate(date) {
    return new Date(date).toLocaleDateString();
  }

  getImageSource(item) {
    return item.metadata?.image || '';
  }

  static get tag() {
    return 'hax-search';
  }
}

customElements.define(HaxSearch.tag, HaxSearch);
