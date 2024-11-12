import { LitElement, html, css } from "lit";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./hax-image.js";

export class HaxSearch extends I18NMixin(LitElement) {
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
        font-family: var(--font-family, Arial, sans-serif);
        color: var(--primary-color, #333);
        background-color: var(--background-color, #d0e8ff);
        padding: 20px;
        border-radius: 8px;
      }
      h2 {
        font-size: 24px;
        color: var(--title-color, #000);
      }
      .container {
        display: flex;
        gap: 10px;
        margin-bottom: 15px;
      }
      input, button {
        padding: 8px;
        font-size: 16px;
        border-radius: 4px;
      }
      input {
        border: 1px solid #ddd;
        flex: 1;
      }
      button {
        color: #fff;
        background-color: #007bff;
        border: none;
        cursor: pointer;
      }
      button:hover {
        background-color: #0056b3;
      }
      .results {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 15px;
      }
    `;
  }

  render() {
    return html`
      <h2>${this.title}</h2>
      <div class="container">
        <input placeholder="Search" @input=${e => (this.url = e.target.value)} />
        <button @click="${this.fetchData}">Analyze</button>
      </div>
      ${this.loading ? html`<p>Loading results...</p>` : ''}
      ${this.data
        ? html`
            <hax-image
              .title=${this.data.title}
              .description=${this.data.description}
              .logo=${`${this.url}${this.data.metadata?.site?.logo || ''}`}
              .dateCreated=${this.formatDate(this.data.metadata?.site?.created)}
              .dateUpdated=${this.formatDate(this.data.metadata?.site?.updated)}
              .hexCode=${this.data.metadata?.theme?.variables?.hexCode}
              .theme=${this.data.metadata?.theme?.name}
              .icon=${this.data.metadata?.theme?.variables?.icon}
              .url=${this.url}
            ></hax-image>
          `
        : html`<p>The site '${this.url}' is not compatible</p>`}
      <div class="results">
        ${this.searchResults.map(
          item => html`
            <hax-image
              .title=${item.title}
              .description=${item.description}
              .imageSrc=${item.metadata?.image || ''}
              .dateUpdated=${this.formatDate(item.metadata?.updated)}
              .pageLink=${`${this.url}${item.slug}`}
              .pageHtml=${`${this.url}${item.location}`}
              .readTime=${item.metadata?.readtime}
            ></hax-image>
          `
        )}
      </div>
    `;
  }

  fetchData() {
    this.loading = true;
    fetch(`${this.url}/site.json`)
      .then(response => (response.ok ? response.json() : Promise.reject('Error loading data')))
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
    return date ? new Date(date).toLocaleDateString() : '';
  }

  static get tag() {
    return 'hax-search';
  }
}

customElements.define(HaxSearch.tag, HaxSearch);
