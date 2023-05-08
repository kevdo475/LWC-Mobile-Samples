import { LightningElement, api, track, wire } from "lwc";

export default class TileList extends LightningElement {
  @api enableFeatureValueEdit;
  @api actionName = "Create NCR";
  @api title = {
    fieldApiName: "L_DeliveryNumber__c",
    objectApiName: "L_Delivery__c"
  };
  @api featuredValue = {
    fieldApiName: "L_Status__c",
    objectApiName: "L_Delivery__c"
  };
  @api objectName = "Deliveries";

  @api fields = [
    { fieldApiName: "L_DeliveryNumber__c", objectApiName: "L_Delivery__c" },
    {
      fieldApiName: "L_ReceivedByTechnician__c",
      objectApiName: "L_Delivery__c"
    },
    { fieldApiName: "L_Status__c", objectApiName: "L_Delivery__c" },
    {
      fieldApiName: "L_DestinationLocation__c",
      objectApiName: "L_Delivery__c"
    },
    { fieldApiName: "Name", objectApiName: "L_Delivery__c" },
    {
      fieldApiName: "L_ProductRequest__r.WorkOrderId",
      objectApiName: "L_Delivery__c"
    },
    {
      fieldApiName: "L_ProductRequest__r.WorkOrder.WorkOrderNumber",
      objectApiName: "L_Delivery__c"
    }
  ];
  @api fieldLabels = new Map([
    ["Id", "Id"],
    ["L_DeliveryNumber__c", "Delivery Number"],
    ["L_ProductRequest__c", "Product Request"],
    ["L_ReceivedByTechnician__c", "Received"],
    ["L_Status__c", "Status"],
    ["L_DestinationLocation__c", "Destination"],
    ["OwnerId", "Owner"],
    ["Name", "Delivery Name"],
    ["L_ProductRequest__r.WorkOrderId", "Work Order Id"],
    ["L_ProductRequest__r.WorkOrder.WorkOrderNumber", "Work Order"]
  ]);

  _records = [
    {
      apiName: "L_Delivery__c",
      childRelationships: {},
      fields: {
        Id: {
          displayValue: null,
          value: "a4i3N000000Ddz1QAC"
        },
        L_DeliveryNumber__c: {
          displayValue: null,
          value: "800002741"
        },
        L_DestinationLocation__c: {
          displayValue: null,
          value: "1313N000000GYKZQA4"
        },
        L_ProductRequest__c: {
          displayValue: null,
          value: "0TS3N000000CgmsWAC"
        },
        L_ReceivedByTechnician__c: {
          displayValue: null,
          value: false
        },
        L_Status__c: {
          displayValue: "Goods Issued",
          value: "GI"
        },
        Name: {
          displayValue: null,
          value: "800002741"
        },
        OwnerId: {
          displayValue: null,
          value: "0053X00000F9keVQAR"
        }
      },
      id: "a4i3N000000Ddz1QAC",
      lastModifiedById: "0053X00000F9keVQAR",
      lastModifiedDate: "2023-03-10T11:57:08.000Z",
      recordTypeId: "012000000000000AAA",
      recordTypeInfo: null,
      systemModstamp: "2023-03-10T11:57:08.000Z"
    },
    {
      apiName: "L_Delivery__c",
      childRelationships: {},
      fields: {
        Id: {
          displayValue: null,
          value: "a4i3N000000Ddz2QAC"
        },
        L_DeliveryNumber__c: {
          displayValue: null,
          value: "800002740"
        },
        L_DestinationLocation__c: {
          displayValue: null,
          value: "1313N000000GYKZQA4"
        },
        L_ProductRequest__c: {
          displayValue: null,
          value: "0TS3N000000CgmtWAC"
        },
        L_ReceivedByTechnician__c: {
          displayValue: null,
          value: false
        },
        L_Status__c: {
          displayValue: "Goods Issued",
          value: "GI"
        },
        Name: {
          displayValue: null,
          value: "800002740"
        },
        OwnerId: {
          displayValue: null,
          value: "0053X00000F9keVQAR"
        }
      },
      id: "a4i3N000000Ddz2QAC",
      lastModifiedById: "0053X00000F9keVQAR",
      lastModifiedDate: "2023-03-10T11:57:08.000Z",
      recordTypeId: "012000000000000AAA",
      recordTypeInfo: null,
      systemModstamp: "2023-03-10T11:57:08.000Z"
    },
    {
      apiName: "L_Delivery__c",
      childRelationships: {},
      fields: {
        Id: {
          displayValue: null,
          value: "a4i3N000000Ddz3QAC"
        },
        L_DeliveryNumber__c: {
          displayValue: null,
          value: "800002739"
        },
        L_DestinationLocation__c: {
          displayValue: null,
          value: "1313N000000GYKZQA4"
        },
        L_ProductRequest__c: {
          displayValue: null,
          value: "0TS3N000000CgmuWAC"
        },
        L_ReceivedByTechnician__c: {
          displayValue: null,
          value: false
        },
        L_Status__c: {
          displayValue: "Goods Issued",
          value: "GI"
        },
        Name: {
          displayValue: null,
          value: "800002739"
        },
        OwnerId: {
          displayValue: null,
          value: "0053X00000F9keVQAR"
        }
      },
      id: "a4i3N000000Ddz3QAC",
      lastModifiedById: "0053X00000F9keVQAR",
      lastModifiedDate: "2023-03-10T11:57:08.000Z",
      recordTypeId: "012000000000000AAA",
      recordTypeInfo: null,
      systemModstamp: "2023-03-10T11:57:08.000Z"
    }
  ];

  @api
  get records() {
    return this._records;
  }
  set records(value) {
    console.log(`tileList::setRecords::${value}`);
    // this._records = JSON.parse(JSON.stringify(value));
    this._records = [...value];
    // console.log(`tileList::setRecords ${JSON.stringify(value)}`);

    // this.records.forEach(record => {
    //     console.log(`tileList::value${JSON.stringify(record.fields.get(this.featuredValue))}`);
    // });
  }

  connectedCallback() {
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    console.log(`featurevalueenabled::${this.enableFeatureValueEdit}`);
    // this.processData();
  }

  // processData() {
  //     this.records = this.records.map(record => {
  //         record.fields = record.fields.map(field => {
  //             return {
  //                 ...field,
  //                 ...(SHOW_FIELDS.includes(field.fieldName) && {
  //                     show: true
  //                 })
  //             };
  //         });
  //         return {
  //             ...record
  //         };
  //     });
  //     console.log(this.records);
  // }

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

  handleTileValueChange(event) {
    const eventDetail = event.detail;
    const tileValueChangeEvent = new CustomEvent("tilevaluechange", {
      detail: eventDetail
    });
    console.log(
      `tileList::handleTileValueChange ${JSON.stringify(
        tileValueChangeEvent.detail
      )}`
    );
    this.dispatchEvent(tileValueChangeEvent);
  }

  get numberOfRecords() {
    return `${this.objectName} (${this.records.length})`;
  }
}
