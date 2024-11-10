import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class HaxImage extends DDDSuper(I18NMixin(LitElement)){
  constructor() {
    super();
    this.title = '';
    this.description = '';
    this.logo = '';
    this.imageSrc = '';
    this.dateCreated = '';
    this.dateUpdated= '';
    this.pageLink = '';
    this.pageHtml = '';
    this.readTime = '';
    this.hexCode= '';
    this.theme= '';
    this.icon= '';
    this.url= '';
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      logo: { type: String },
      imageSrc: { type: String },
      dateCreated: { type: String },
      dateUpdated: { type: String },
      pageLink: { type: String },
      pageHtml: { type: String },
      readTime: { type: String },
      hexCode: { type: String },
      theme: { type: String },
      icon: { type: String },
      url: { type: String },
    };
  }

  static get styles() {
    return [super.styles, css`
      :host {
        display: block;
      }

      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--ddd-spacing-3, 20px);
        padding: var(--ddd-spacing-5, 20px);
        border: var(--ddd-border-sm, black solid 3px);
        font-family: var(--ddd-font-primary, roboto);
        font-size: 16px;
        color: var(--ddd-theme-primary);
        background-color: var(--site-hex-code, --ddd-theme-accent);
      }

      .title {
        font-size: 18px;
        font-weight: var(--ddd-font-weight-bold, bold);
        text-align: center;
      }

      .container img {
        display: block;
        height: 150px;
        margin: auto;
      }

      .info-row {
        display: flex;
        flex-direction: column;
        gap: 5px;
      }

      .label {
        font-weight: bold;
      }

      a[target="_blank"].text::after,
      a[target="_blank"]::after {
        content: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAQElEQVR42qXKwQkAIAxDUUdxtO6/RBQkQZvSi8I/pL4BoGw/XPkh4XigPmsUgh0626AjRsgxHTkUThsG2T/sIlzdTsp52kSS1wAAAABJRU5ErkJggg==);
        margin-left: 5px;
      }

      .text-container {
        display: flex;
        flex-direction: column;
        gap: var(--ddd-spacing-3, 20px);
      }
    `];
  }

  render() {
    return html`
      <div class="container" style="--site-hex-code: ${this.hexCode};">
        
        <div class="title" ?hidden="${!this.title}">
          <a href="${this.url || this.pageLink}" target="_blank" rel="noopener noreferrer">
            <span class="icon" ?hidden="${!this.icon}">
              <simple-icon icon="${this.icon}"></simple-icon>
            </span>
            ${this.title}
          </a>
        </div>

        <div class="image-container">
          ${this.logo ? html`<img src="${this.logo}" alt="${this.logo}" />` : ''}
          ${this.imageSrc ? html`<a href="${this.imageSrc}" target="_blank" rel="noopener noreferrer">
            <img src="${this.imageSrc}" alt="${this.imageSrc}">
          </a>` : ''}
        </div>

        <div class="text-container">

          ${this.description ? html`
            <div class="info-row">
              <span class="label">Description:</span>
              <span>${this.description}</span>
            </div>
          ` : ''}

          ${this.dateCreated ? html`
            <div class="info-row">
              <span class="label">Date Created:</span>
              <span>${this.dateCreated}</span>
            </div>
          ` : ''}

          ${this.dateUpdated ? html`
            <div class="info-row">
              <span class="label">Last Updated:</span>
              <span>${this.dateUpdated}</span>
            </div>
          ` : ''}

          ${this.readTime ? html`
            <div class="info-row">
              <span class="label">Read Time:</span>
              <span>${this.readTime} minutes</span>
            </div>
          ` : ''}

          ${this.pageHtml ? html`
            <div class="info-row">
              <a href="${this.pageHtml}" target="_blank" rel="noopener noreferrer"><strong>View page source</strong></a>
            </div>
          ` : ''}

          ${this.theme ? html`
            <div class="info-row">
              <span class="label">Theme:</span>
              <span>${this.theme}</span>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  static get tag() {
    return "hax-image";
  }
}

customElements.define(HaxImage.tag, HaxImage);