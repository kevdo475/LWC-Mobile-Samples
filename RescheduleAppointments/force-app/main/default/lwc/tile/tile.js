import { getFieldValue } from "lightning/uiRecordApi";
import { LightningElement, api, wire, track } from "lwc";

export default class Tile extends LightningElement {
  @api type = "radio";
  @api first = false;
  @api last = false;
  @api recordId = "123";

  _title = "800002741";
  @api
  get title() {
    return this._title;
  }
  set title(value) {
    this._title = getFieldValue(this.item, value);
    console.log(`this._title ${this.title}`);
  }
  @api buttonName = "Create NCR";
  @api enableFeaturedValueEdit = false;

  @api
  get item() {
    console.log(`tile::getItem`);
    return this._item;
  }
  set item(value) {
    console.log(`tile::setItem`);
    this._item = Object.assign({}, value);
  }

  @track _item = {
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
      L_ProductRequest__r: {
        displayValue: "PR-70926",
        value: {
          apiName: "ProductRequest",
          childRelationships: {},
          fields: {
            WorkOrder: {
              displayValue: null,
              value: null
            },
            WorkOrderId: {
              displayValue: null,
              value: null
            }
          },
          id: "0TS3N000000CgmsWAC",
          lastModifiedById: "0053X00000F9keVQAR",
          lastModifiedDate: "2023-03-10T11:17:51.000Z",
          recordTypeId: "0123X000000Nea0QAC",
          recordTypeInfo: {
            available: true,
            defaultRecordTypeMapping: false,
            master: false,
            name: "Advance Shipment",
            recordTypeId: "0123X000000Nea0QAC"
          },
          systemModstamp: "2023-03-10T11:17:52.000Z"
        }
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
  };

  // @api fieldLabels = new Map([
  //     ["Id", "Id" ],
  //     ["L_DeliveryNumber__c", "Delivery Number" ],
  //     ["L_ProductRequest__c", "Product Request" ],
  //     ["L_ReceivedByTechnician__c", "Received" ],
  //     ["L_Status__c", "Status" ],
  //     ["L_DestinationLocation__c", "Destination" ],
  //     ["OwnerId", "Owner" ],
  //     ["Name", "Delivery Name" ],
  //     ["L_ProductRequest__r.WorkOrderId", "Work Order Id" ],
  //     ["L_ProductRequest__r.WorkOrder.WorkOrderNumber", "Work Order" ]
  // ]);
  _fieldLabels;
  @api get labels() {
    return this._fieldLabels;
  }
  set labels(value) {
    const newMap = new Map(value);
    console.log(`hellohello ${[...newMap.entries()]}`);
    this._fieldLabels = newMap;
  }

  @track _fields;
  @api
  get fields() {
    console.log(`tile::_fields::${JSON.stringify(this._fields)}`);
    return this._fields
      ? this._fields.map((field) => {
          // console.log(`field.fieldApiName::${field.fieldApiName}`);
          // console.log(`field.fieldLabel::${this.fieldLabels.get(field.fieldApiName)}`);
          // console.log(`getFieldValue(this._item, field)::${getFieldValue(this._item, field)}`);
          return {
            key: field.fieldApiName,
            value: {
              fieldName:
                this._fieldLabels?.get(field.fieldApiName) ??
                field.fieldApiName,
              fielApiName: field.fieldApiName,
              value: getFieldValue(this._item, field)
            }
          };
        })
      : [];
  }
  set fields(value) {
    console.log(`value::${value}`);
    // console.log(`hellohellohello ${[...this._fieldLabels]}`);
    this._fields = value /* ? value.map(field => {
            // console.log(`field.fieldApiName::${field.fieldApiName}`);
            // console.log(`field.fieldLabel::${this.fieldLabels.get(field.fieldApiName)}`);
            // console.log(`getFieldValue(this._item, field)::${getFieldValue(this._item, field)}`);
            return {
                "key": field.fieldApiName, 
                "value": {
                    fieldName: this._fieldLabels?.get(field.fieldApiName) ?? field.fieldApiName,
                    fielApiName: field.fieldApiName,
                    value: getFieldValue(this._item, field),
                }
            };
        }) : [] */;
    // console.log(`this._fields::::${JSON.stringify(this._fields.get("L_DeliveryNumber__c"))}`);
  }

  @api isLoading = false;

  connectedCallback() {
    console.log(this.first);
    console.log(`featurevalueenabled::${this.enableFeaturedValueEdit}`);
    // console.log(this._fields.find(field => field.fieldName == this.editField));
    // this.enableFeaturedValueEdit = true;

    // debug
    // this.fields = [
    //     {"fieldApiName":"L_DeliveryNumber__c","objectApiName":"L_Delivery__c"},
    //     {"fieldApiName":"L_ReceivedByTechnician__c","objectApiName":"L_Delivery__c"},
    //     {"fieldApiName":"L_Status__c","objectApiName":"L_Delivery__c"},
    //     {"fieldApiName":"L_DestinationLocation__c","objectApiName":"L_Delivery__c"},
    //     {"fieldApiName":"OwnerId","objectApiName":"L_Delivery__c"},
    //     {"fieldApiName":"Name","objectApiName":"L_Delivery__c"},
    //     {"fieldApiName":"L_ProductRequest__r.WorkOrderId","objectApiName":"L_Delivery__c"},
    //     {"fieldApiName":"L_ProductRequest__r.WorkOrder.WorkOrderNumber","objectApiName":"L_Delivery__c"},
    // ];
    console.log(`::::${JSON.stringify(this.fields)}`);
  }

  handleValueChange(event) {
    const eventTargetName = event.target.name;
    const inputElement = this.template.querySelector("lightning-input");
    if (eventTargetName == "subtract") {
      if (inputElement.value > 0) --inputElement.value;
    } else if (eventTargetName == "add") {
      ++inputElement.value;
    }
    const tileValueChangeEvent = new CustomEvent("tilevaluechange", {
      detail: {
        id: this.item.id,
        field: this.featuredValue,
        value: inputElement.value
      }
    });
    console.log(`tile::handleValueChange ${inputElement.value}`);
    this.dispatchEvent(tileValueChangeEvent);
  }

  handleButtonClick(event) {
    const tileButtonClickEvent = new CustomEvent("tilebuttonclick", {
      detail: {
        name: "tileButtonClick",
        detail: this.fields
      }
    });
    console.log(`tile::tileButtonClick ${tileButtonClickEvent.detail}`);
    this.dispatchEvent(tileButtonClickEvent);
  }

  handleClick(event) {
    console.log("clicked!");
    const selectedItem = event.target.value;
    console.log(selectedItem);

    const selectedItemEvent = new CustomEvent("selectedItem", {
      detail: {
        name: "selectedItem",
        item: selectedItem
      }
    });
    this.dispatchEvent(selectedItemEvent);
  }

  get visualPickerFigureClass() {
    let firstOrLastClass = this.first
      ? "visual-picker_first"
      : this.last
      ? "visual-picker_last"
      : "";
    return `slds-visual-picker__figure visual-picker__figure slds-visual-picker__text slds-align_absolute-center ${firstOrLastClass}`;
  }

  _featuredValue;
  @api
  get featuredValue() {
    return getFieldValue(this._item, this._featuredValue) ?? "0";
  }
  set featuredValue(value) {
    console.log(`tile::featuredValue::${JSON.stringify(value)}`);
    console.log(`tile::featuredValue::this._item${JSON.stringify(this._item)}`);
    this._featuredValue = value;
    console.log(`tile::_featuredValue${this._featuredValue}`);
    console.log(
      `tile::featuredValue::getFieldValue::${JSON.stringify(
        getFieldValue(this._item, {
          fieldApiName: "CreatedDate",
          objectApiName: "ProductTransfer"
        })
      )}`
    );
  }
}
