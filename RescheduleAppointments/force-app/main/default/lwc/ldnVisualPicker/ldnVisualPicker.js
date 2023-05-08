import { LightningElement, api } from "lwc";

export default class LdnVisualPicker extends LightningElement {
  @api type = "checkbox";
  @api itemName = "Items";
  @api showLegend = "false";

  @api
  get items() {
    return this._items;
  }
  set items(value) {
    this._items = [...value.values()];
  }
  _items = [
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
        editable: false,
        type: "number"
      }
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
        editable: false,
        type: "number"
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
        editable: false,
        type: "number"
      }
    }
  ];

  // connectedCallback() {
  //     try { // prevent exception on browsers not supporting DOM styleSheets properly
  //         for (var si in document.styleSheets) {
  //             var styleSheet = document.styleSheets[si];
  //             if (!styleSheet.rules) continue;

  //             for (var ri = styleSheet.rules.length - 1; ri >= 0; ri--) {
  //                 if (!styleSheet.rules[ri].selectorText) continue;

  //                 if (styleSheet.rules[ri].selectorText.match(':hover')) {
  //                     styleSheet.deleteRule(ri);
  //                 }
  //                 console.log(`removed::hover::`)
  //             }
  //         }
  //     } catch (ex) {}
  // }

  // Event Handlers

  handleClick(event) {
    // event.preventDefault();
    const selectedItem = event.target.value;
    const itemSelectedEvent = new CustomEvent("itemselected", {
      detail: {
        id: selectedItem
      }
    });
    console.log(
      `ldnVisualPicker::handleClick::${JSON.stringify(
        itemSelectedEvent.detail
      )}`
    );
    this.dispatchEvent(itemSelectedEvent);
  }

  // Getters

  get numberOfItems() {
    return `${this.itemName} (${this.items.length})`;
  }
}
