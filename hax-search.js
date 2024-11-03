/**
 * Copyright 2024 Krittanat Kulsakdinun
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `hax-search`
 * 
 * @demo index.html
 * @element hax-search
 */
export class haxSearch extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "hax-search";
  }

  constructor() {
    super();
    this.title = "";
    this.description = "";
    this.lastUpdated = "";
    this.contentLink = "";
    this.sourceLink = "";
    this.image = "";
  }

  // Lit reactive properties
  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      lastUpdated: { type: String },
      contentLink: { type: String },
      sourceLink: { type: String },
      image: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--hax-search-label-font-size, var(--ddd-font-size-s));
      }
    `];
  }

  // Lit render the HTML
  render() {
    return html`
    <details open>
      <summary>Search input</summary>
      <label for="input"> Search articles in HAX:</label>
      <input type = "text" id = "input" name = "name" @input="${this.inputChanged}"/>
    </details>
  `;
}

globalThis.customElements.define(haxSearch.tag, haxSearch);