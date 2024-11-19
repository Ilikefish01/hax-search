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
        font-family: var(--font-family-default, Arial, sans-serif);
        color: var(--text-primary-color, #2c3e50); /* Dark slate gray */
      }
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--spacing-medium, 15px);
        padding: var(--spacing-large, 20px);
        border: var(--border-width, 1px) solid var(--border-color, #bdc3c7); /* Light gray border */
        border-radius: var(--border-radius-medium, 8px);
        background-color: var(--background-primary-color, #f4f8fb); /* Soft blue-gray */
      }
      .title {
        font-size: var(--font-size-medium, 20px);
        font-weight: var(--font-weight-bold, bold);
        text-align: center;
        color: var(--text-title-color, #34495e); /* Dark blue-gray */
      }
      img {
        height: var(--image-height-medium, 150px);
        border-radius: var(--border-radius-small, 4px);
      }
      .label {
        font-weight: var(--font-weight-bold, bold);
        color: var(--text-secondary-color, #7f8c8d); /* Medium gray */
      }
      a {
        color: var(--link-color-primary, #3498db); /* Brighter blue */
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
        color: var(--link-hover-color, #1f78c0); /* Darker hover blue */
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
