import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./hax-image.js";

export class HaxSearch extends DDDSuper(I18NMixin(LitElement)) {
  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
        color: var(--ddd-theme-primary, black);
        background-color: var(--ddd-theme-accent, white);
        font-family: var(--ddd-font-navigation, sans-serif);
      }
      .wrapper {
        margin: var(--ddd-spacing-2, 10px);
        padding: var(--ddd-spacing-4, 20px);
      }
      h3 span {
        font-size: var(--hax-search-label-font-size, 16px);
      }
    `];
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      url: { type: String },
      isValid: { type: Boolean, reflect: true },
      value: { type: String },
      loading: { type: Boolean },
      searchResults: { type: Array },
      data: { type: Object }
    };
  }

  constructor() {
    super();
    this.value = '';
    this.title = 'Search HAX Articles';
    this.loading = false;
    this.searchResults = [];
    this.data = null;
    this.url = 'https://haxthweb.org/sites.json';
    this.isValid = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.updateResults(); // Initial data fetch on component load
  }

  updated(changedProperties) {
    if (changedProperties.has('url')) {
      this.isValid = this.url && this.url.endsWith('site.json');
    }
  }

  render() {
    return html`
      <h2>${this.title}</h2>

      <div class="container">
        <input id="input" placeholder="Search" @input=${this.searchQuery}/>
        <button type="button" @click="${this.updateResults}">Analyze</button>
      </div>

      ${this.loading ? html`<p>Loading results for '${this.url}'...</p>` : ''}

      ${this.data === null ? 
        html`<div>The site '${this.url}' is not compatible</div>` : 
        html`
          <div class="content">
            <hax-image 
              title="${this.data.title}"
              description="${this.data.description}"
              logo="${this.url}${this.data.metadata.site.logo}"      
              dateCreated="${this.dateToString(this.data.metadata.site.created)}"
              dateUpdated="${this.dateToString(this.data.metadata.site.updated)}"
              hexCode="${this.data.metadata.theme.variables.hexCode}"
              theme="${this.data.metadata.theme.name}"
              icon="${this.data.metadata.theme.variables.icon}"  
              url="${this.url}"   
            ></hax-image>  
          </div>

          <div class="results content">
            ${this.searchResults.length === 0 ? 
              html`<p>No results found.</p>` : 
              this.searchResults.map((item) =>
                html`
                  <hax-image 
                    title="${item.title}"
                    description="${item.description}"
                    imageSrc="${this.getImgSrc(item)}"
                    dateUpdated="${this.dateToString(item.metadata.updated)}"
                    pageLink="${this.url}${item.slug}"
                    pageHtml="${this.url}${item.location}"
                    readTime="${item.metadata.readtime}"
                  ></hax-image>
                `
              )
            }
          </div>
        `
      }
    `;
  }

  searchQuery(event) {
    this.value = event.target.value;
  }

  updateResults() {
    this.loading = true;
    const jsonUrl = `${this.url}site.json`;

    fetch(jsonUrl)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
        return response.json();
      })
      .then(data => {
        this.searchResults = data.items || [];
        this.data = data;
        this.loading = false;
        this.requestUpdate();
      })
      .catch(error => {
        this.loading = false;
        this.searchResults = [];
        this.data = null;
        console.error('Fetch error:', error);
      });
  }

  dateToString(date) {
    return new Date(date).toLocaleDateString();
  }

  getImgSrc(item) {
    return item?.metadata?.image || '';
  }

  static get tag() {
    return 'hax-search';
  }
}

customElements.define(HaxSearch.tag, HaxSearch);
