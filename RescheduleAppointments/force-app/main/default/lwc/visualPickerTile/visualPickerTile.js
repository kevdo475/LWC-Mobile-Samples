import { LightningElement, api, wire, track } from "lwc";

export default class VisualPickerTile extends LightningElement {
  @api type = "radio";
  @api first = false;
  @api last = false;
  @api object = "Delivery";
  @api recordId = "123";
  @api title = "Title";
  @api fields = [
    { fieldName: "Work Order", value: "0048001" },
    { fieldName: "Subject", value: "3024-ArcNetReconfigMaxLimit!" },
    { fieldName: "Status", value: "Goods Issued" },
    { fieldName: "Created Date", value: "01/04/2023, 08:40" }
  ];

  connectedCallback() {
    console.log(this.first);
  }

  handleClick(event) {
    event.preventDefault();
    console.log("clicked!");
    const itemSelected = event.target.value;
    console.log(itemSelected);

    const itemSelectedEvent = new CustomEvent("itemselected", {
      detail: itemSelected,
      bubbles: true
    });
    this.dispatchEvent(itemSelectedEvent);
  }

  get visualPickerFigureClass() {
    const checkbox = this.type === "checkbox" ? "slds-visual-picker__text" : ""; // toggles checkbox in upper right corner of the tile
    const firstOrLastClass = this.first
      ? "visual-picker_first"
      : this.last
      ? "visual-picker_last"
      : "";
    return `slds-visual-picker__figure visual-picker__figure ${checkbox} slds-align_absolute-center ${firstOrLastClass}`;
  }
}
