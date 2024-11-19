import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./hax-image.js";

export class HaxSearch extends I18NMixin(LitElement) {
  static get properties() {
    return {
      title: { type: String },
      url: { type: String },
      loading: { type: Boolean },
      searchResults: { type: Array },
      data: { type: Object },
      errorMessage: { type: String },
    };
  }

  constructor() {
    super();
    this.title = 'Search HAX Articles';
    this.url = '';
    this.loading = false;
    this.searchResults = [];
    this.data = null;
    this.errorMessage = '';
  }

  static get styles() {
    return css`
      :host {
        display: block;
        font-family: var(--font-family-default, Arial, sans-serif);
        color: var(--text-primary-color, #2c3e50);
        background-color: var(--background-primary-color, #f5f7fa);
        padding: var(--spacing-medium, 20px);
        border-radius: var(--border-radius-medium, 8px);
      }
      h2 {
        font-size: var(--font-size-large, 24px);
        color: var(--text-title-color, #34495e); 
      }
      .container {
        display: flex;
        gap: var(--spacing-small, 10px);
        margin-bottom: var(--spacing-medium, 15px);
      }
      input,
      button {
        padding: var(--spacing-small, 8px);
        font-size: var(--font-size-medium, 16px);
        border-radius: var(--border-radius-small, 4px);
      }
      input {
        border: var(--border-width, 1px) solid var(--border-color, #bdc3c7); 
        flex: 1;
      }
      button {
        color: var(--button-text-color, #ecf0f1); /* Soft white */
        background-color: var(--button-primary-background-color, #2980b9);
        border: none;
        cursor: pointer;
      }
      button:hover {
        background-color: var(--button-hover-background-color, #1a6393);
      }
      .results {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(var(--grid-min-column-width, 250px), 1fr));
        gap: var(--spacing-medium, 15px);
      }
      .error-message {
        color: var(--error-color, #e74c3c); 
        font-size: var(--font-size-small, 14px);
        margin-top: var(--spacing-small, 10px);
      }
    `;
  }


  render() {
    return html`
      <h2>${this.title}</h2>
      <div class="container">
        <input
          placeholder="Enter site location"
          @input=${e => (this.url = e.target.value.trim())}
        />
        <button @click="${this.fetchData}">Analyze</button>
      </div>
      ${this.errorMessage
        ? html`<p class="error-message">${this.errorMessage}</p>`
        : ''}
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
            ></hax-image>
          `
        )}
      </div>
    `;
  }

  validateInput(url) {
    if (!url) {
      this.errorMessage = 'URL is required. Please enter a valid site location.';
      return false;
    }

    try {
      const parsedUrl = new URL(url);
      if (!parsedUrl.protocol.startsWith('http')) {
        this.errorMessage = 'Invalid URL. Please enter a valid site location.';
        return false;
      }
    } catch (e) {
      this.errorMessage = 'Invalid URL format. Please enter a valid site location.';
      return false;
    }

    this.errorMessage = '';
    return true;
  }

  fetchData() {
    if (!this.validateInput(this.url)) {
      return; // Stop execution if validation fails
    }

    this.loading = true;
    fetch(`${this.url}/site.json`)
      .then(response => (response.ok ? response.json() : Promise.reject('Error loading data')))
      .then(data => {
        if (!data.items || !data.title) {
          throw new Error('Invalid site.json schema');
        }

        this.data = data;
        this.searchResults = data.items || [];
        this.loading = false;
      })
      .catch(error => {
        this.data = null;
        this.searchResults = [];
        this.errorMessage = error.message || 'Failed to fetch site data';
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
