import { LightningElement, api } from "lwc";

export default class LdnTileList extends LightningElement {
  @api itemName = "Items";
  @api showLegend = "false";

  @api items = [
    {
      id: "482736482",
      title: "Hello, World",
      subTitle: "SEALANT SIKAFLEX's 521UV R9010 300 ML",
      fields: [
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
      ],
      featuredValue: {
        key: "QuantityReceived",
        fieldName: "Received",
        fieldApiName: "QuantityReceived",
        value: 0,
        max: 5,
        step: 1,
        editable: true,
        type: "number"
      },
      action: {
        disabled: false,
        label: "Create NCR",
        name: "Create NCR"
      },
      badges: [
        {
          key: "CIF",
          value: {
            label: "CIF",
            class: "slds-theme_inverse"
          }
        },
        {
          key: "DEF",
          value: {
            label: "DEF",
            class: "slds-theme_warning"
          }
        }
      ]
    },
    {
      id: "48273623482",
      title: "Hello, World",
      subTitle: "SEALANT SIKAFLEX 521UV R9010 300 ML",
      fields: [
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
      ],
      featuredValue: {
        key: "QuantityReceived",
        fieldName: "Received",
        fieldApiName: "QuantityReceived",
        value: 0,
        max: 5,
        step: 1,
        editable: true,
        type: "number"
      },
      action: {
        disabled: false,
        label: "Create NCR",
        name: "Create NCR"
      }
    },
    {
      id: "482734326482",
      title: "Hello, World",
      subTitle: "SEALANT SIKAFLEX 521UV R9010 300 ML",
      fields: [
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
      ],
      featuredValue: {
        key: "QuantityReceived",
        fieldName: "Received",
        fieldApiName: "QuantityReceived",
        value: 0,
        max: 5,
        step: 1,
        editable: true,
        type: "number"
      },
      action: {
        disabled: false,
        label: "Create NCR",
        name: "Create NCR"
      }
    }
  ];

  // Child Event Handlers

  handleActionClick(event) {
    const eventDetail = event.detail;
    const actionClickEvent = new CustomEvent("actionclick", {
      detail: eventDetail
    });
    console.log(
      `ldnTileList::handleActionClick::${JSON.stringify(
        actionClickEvent.detail
      )}`
    );
    this.dispatchEvent(actionClickEvent);
  }

  handleFieldValueChange(event) {
    const eventDetail = event.detail;
    const fieldValueChangeEvent = new CustomEvent("fieldvaluechange", {
      detail: eventDetail
    });
    console.log(
      `ldnTileList::handleFieldValueChange::${JSON.stringify(
        fieldValueChangeEvent.detail
      )}`
    );
    this.dispatchEvent(fieldValueChangeEvent);
  }

  // Getters
  get numberOfItems() {
    return `${this.itemName} (${this.items.length})`;
  }
}
