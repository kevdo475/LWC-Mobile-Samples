import { LightningElement, api } from "lwc";

export default class ObjectIcon extends LightningElement {
  @api iconUrl = "standard:address";
  @api color;

  connectedCallback() {}

  get iconStyle() {
    return `background-color: ${this.color}`;
  }
}
