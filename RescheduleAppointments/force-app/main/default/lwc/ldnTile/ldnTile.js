import { LightningElement, api, wire, track } from "lwc";

export default class LdnTile extends LightningElement {
  @api first;
  @api last;

  @api id = "123456789112345";
  @api title = "149572";
  @api subTitle = "SEALANT SIKAFLEX 521UV R9010 300 ML";

  @api action = {
    disabled: false,
    label: "Create NCR",
    name: "Create NCR"
  };

  @api fields = [
    {
      key: "BatchNumber",
      fieldName: "Batch Number",
      fieldApiName: "BatchNumber",
      value: "0001387899"
    },
    {
      key: "Sent",
      fieldName: "Sent",
      fieldApiName: "Sent",
      value: "12"
    }
  ];

  @api featuredValue = {
    key: "QuantityReceived",
    fieldName: "Received",
    fieldApiName: "QuantityReceived",
    value: 0,
    max: 5,
    step: 1,
    editable: true,
    type: "number"
  };

  @api badges = [
    {
      key: "CIR",
      label: "CIR",
      class: "slds-theme_inverse"
    },
    {
      key: "DEF",
      label: "DEF",
      class: "slds-theme_warning"
    }
  ];

  // Event Handlers
  handleActionClick(event) {
    const actionClickEvent = new CustomEvent("actionclick", {
      detail: {
        id: this.id,
        action: this.action.name
      }
    });
    console.log(
      `ldnTile::handleActionClick${JSON.stringify(actionClickEvent.detail)}`
    );
    this.dispatchEvent(actionClickEvent);
  }

  // Child Event Handlers
  handleInputCounterChange(event) {
    const value = event.detail.value;
    console.log(
      `ldnTile::handleInputCounterChange${JSON.stringify(event.detail)}`
    );
    const fieldValueChange = new CustomEvent("fieldvaluechange", {
      detail: {
        id: this.id,
        field: this.featuredValue,
        value: value
      }
    });
    this.dispatchEvent(fieldValueChange);
    console.log(
      `ldnTile::handleInputCounterChange${JSON.stringify(
        fieldValueChange.detail
      )}`
    );
  }

  // Styling
  get tileClass() {
    let borderRadius;
    if (this.first && this.last) {
      borderRadius = "border-radius_around";
    } else if (this.first) {
      borderRadius = "border-radius_top";
    } else if (this.last) {
      borderRadius = "border-radius_bottom";
    }
    // const firstClass = this.first ? 'border-radius_first' : '';
    // const lastClass = this.last ? 'border-radius_last' : '';
    return `visual-picker__figure slds-visual-picker__text slds-align_absolute-center ${borderRadius}`;
  }
}
