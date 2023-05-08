import { LightningElement, api, track, wire } from "lwc";

export default class VisualPicker extends LightningElement {
  @api objectName = "Deliveries";
  @api records = [
    {
      title: "0048001",
      id: "a4i3X000001r3vLQAQ",
      fields: [
        { fieldName: "Work Order", value: "01241389" },
        { fieldName: "Subject", value: "B - Service 6 months" },
        { fieldName: "Asset", value: "33236" },
        { fieldName: "", value: "BECERRIL DE CAMPOS pos 002" },
        // { fieldName: "Status", value: "Goods Issued" },
        { fieldName: "Created", value: "01/04/2023" }
      ]
    },
    {
      title: "0048002",
      id: "a4i3X000001r3vGQAQ",
      fields: [
        { fieldName: "Work Order", value: "01226379" },
        {
          fieldName: "Subject",
          value: "Alarm: 351 - Tip brake braking too slow"
        },
        { fieldName: "Asset Serial Number", value: "235462" },
        { fieldName: "FL Description", value: "Auroa - Pad T-73" },
        // { fieldName: "Status", value: "Goods Issued" },
        { fieldName: "Created Date", value: "01/04/2023, 08:40" }
      ]
    },
    {
      title: "0048003",
      id: "a4i3X000001r3vBQAQ",
      fields: [
        { fieldName: "Work Order", value: "01223249" },
        { fieldName: "Subject", value: "546-High Water Temp Gen" },
        { fieldName: "Asset Serial Number", value: "238234" },
        {
          fieldName: "FL Description",
          value: "Truscott Gilliland East - Pad-T18"
        },
        // { fieldName: "Status", value: "Goods Issued" },
        { fieldName: "Created Date", value: "01/04/2023, 08:40" }
      ]
    },
    {
      title: "0048003",
      id: "a4i3X000001r3vBQAQ",
      fields: [
        { fieldName: "Work Order", value: "01223249" },
        { fieldName: "Subject", value: "546-High Water Temp Gen" },
        { fieldName: "Asset Serial Number", value: "238234" },
        {
          fieldName: "FL Description",
          value: "Truscott Gilliland East - Pad-T18"
        },
        // { fieldName: "Status", value: "Goods Issued" },
        { fieldName: "Created Date", value: "01/04/2023, 08:40" }
      ]
    },
    {
      title: "0048003",
      id: "a4i3X000001r3vBQAQ",
      fields: [
        { fieldName: "Work Order", value: "01223249" },
        { fieldName: "Subject", value: "546-High Water Temp Gen" },
        { fieldName: "Asset Serial Number", value: "238234" },
        {
          fieldName: "FL Description",
          value: "Truscott Gilliland East - Pad-T18"
        },
        // { fieldName: "Status", value: "Goods Issued" },
        { fieldName: "Created Date", value: "01/04/2023, 08:40" }
      ]
    },
    {
      title: "0048003",
      id: "a4i3X000001r3vBQAQ",
      fields: [
        { fieldName: "Work Order", value: "01223249" },
        { fieldName: "Subject", value: "546-High Water Temp Gen" },
        { fieldName: "Asset Serial Number", value: "238234" },
        {
          fieldName: "FL Description",
          value: "Truscott Gilliland East - Pad-T18"
        },
        // { fieldName: "Status", value: "Goods Issued" },
        { fieldName: "Created Date", value: "01/04/2023, 08:40" }
      ]
    },
    {
      title: "0048003",
      id: "a4i3X000001r3vBQAQ",
      fields: [
        { fieldName: "Work Order", value: "01223249" },
        { fieldName: "Subject", value: "546-High Water Temp Gen" },
        { fieldName: "Asset Serial Number", value: "238234" },
        {
          fieldName: "FL Description",
          value: "Truscott Gilliland East - Pad-T18"
        },
        // { fieldName: "Status", value: "Goods Issued" },
        { fieldName: "Created Date", value: "01/04/2023, 08:40" }
      ]
    }
  ];

  connectedCallback() {
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }

  // handleClick(event) {
  //     const itemSelected = event.target.value;
  //     console.log(itemSelected);
  //     const itemSelectedEvent = new CustomEvent('itemselected', { detail: itemSelected });
  //     this.dispatchEvent(itemSelectedEvent);
  // }

  handleItemSelected(event) {
    event.preventDefault();

    const itemSelected = event.detail;
    console.log(`visualPicker ${itemSelected}`);
    const itemSelectedEvent = new CustomEvent("itemselected", {
      detail: itemSelected,
      bubbles: true
    });
    this.dispatchEvent(itemSelectedEvent);
  }

  get numberOfRecords() {
    return `${this.objectName} (${this.records.length})`;
  }
}
