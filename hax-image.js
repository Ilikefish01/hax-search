import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class HaxImage extends DDDSuper(I18NMixin(LitElement)) {
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
        font-family: var(--ddd-font-primary, sans-serif);
      }
      .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        padding: 20px;
        border: 2px solid black;
        background-color: var(--site-hex-code, lightgray);
      }
      .title {
        font-size: 18px;
        font-weight: bold;
        text-align: center;
      }
      .container img {
        height: 150px;
      }
      .info-row {
        display: flex;
        flex-direction: column;
      }
      .label {
        font-weight: bold;
      }
    `;
  }

  render() {
    return html`
      <div class="container" style="--site-hex-code: ${this.hexCode};">
        <div class="title" ?hidden="${!this.title}">
          <a href="${this.url || this.pageLink}" target="_blank">
            ${this.icon ? html`<simple-icon icon="${this.icon}"></simple-icon>` : ''}
            ${this.title}
          </a>
        </div>
        
        ${this.logo || this.imageSrc ? html`
          <img src="${this.logo || this.imageSrc}" alt="${this.title}">
        ` : ''}

        <div class="info-row">
          ${this.description ? html`<p><span class="label">Description:</span> ${this.description}</p>` : ''}
          ${this.dateCreated ? html`<p><span class="label">Date Created:</span> ${this.dateCreated}</p>` : ''}
          ${this.dateUpdated ? html`<p><span class="label">Last Updated:</span> ${this.dateUpdated}</p>` : ''}
          ${this.readTime ? html`<p><span class="label">Read Time:</span> ${this.readTime} minutes</p>` : ''}
          ${this.theme ? html`<p><span class="label">Theme:</span> ${this.theme}</p>` : ''}
          ${this.pageHtml ? html`
            <a href="${this.pageHtml}" target="_blank"><strong>View page source</strong></a>
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
