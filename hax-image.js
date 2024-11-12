import { LitElement, html, css } from "lit";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class HaxImage extends I18NMixin(LitElement) {
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
    return css`
      :host {
        display: block;
        font-family: var(--font-family, Arial, sans-serif);
        color: var(--primary-color, #333);
      }
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: var(--background-color, #d0e8ff);
      }
      .title {
        font-size: 20px;
        font-weight: bold;
        text-align: center;
        color: var(--title-color, #000);
      }
      img {
        height: 150px;
        border-radius: 4px;
      }
      .label {
        font-weight: bold;
        color: #555;
      }
      a {
        color: var(--link-color, #1a73e8);
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    `;
  }

  render() {
    return html`
      <div class="container">
        ${this.title
          ? html`
              <a href="${this.url || this.pageLink}" class="title" target="_blank">
                ${this.icon ? html`<simple-icon icon="${this.icon}"></simple-icon>` : ''}
                ${this.title}
              </a>
            `
          : ''}
        ${this.logo || this.imageSrc
          ? html`<img src="${this.logo || this.imageSrc}" alt="${this.title || 'Image'}" />`
          : ''}
        <div>
          ${this.description ? html`<p><span class="label">Description:</span> ${this.description}</p>` : ''}
          ${this.dateCreated ? html`<p><span class="label">Date Created:</span> ${this.dateCreated}</p>` : ''}
          ${this.dateUpdated ? html`<p><span class="label">Last Updated:</span> ${this.dateUpdated}</p>` : ''}
          ${this.readTime ? html`<p><span class="label">Read Time:</span> ${this.readTime} minutes</p>` : ''}
          ${this.theme ? html`<p><span class="label">Theme:</span> ${this.theme}</p>` : ''}
          ${this.pageHtml
            ? html`<a href="${this.pageHtml}" target="_blank"><strong>View page source</strong></a>`
            : ''}
        </div>
      </div>
    `;
  }

  static get tag() {
    return "hax-image";
  }
}

customElements.define(HaxImage.tag, HaxImage);
