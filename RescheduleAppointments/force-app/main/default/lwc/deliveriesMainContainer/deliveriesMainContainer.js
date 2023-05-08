import { LightningElement, api, track, wire } from "lwc";
import {
  getFieldValue,
  getFieldDisplayValue,
  getRecords,
  updateRecord
} from "lightning/uiRecordApi";
import { refreshApex } from "@salesforce/apex";
import userId from "@salesforce/user/Id";
import getDeliveryIds from "@salesforce/apex/DeliveriesController.getDeliveryIds";
import getProductTransferIds from "@salesforce/apex/DeliveriesController.getProductTransferIds";

// Delivery fields
import DELIVERY_ID from "@salesforce/schema/L_Delivery__c.Id";
import DELIVERY_DELIVERY_NUMBER from "@salesforce/schema/L_Delivery__c.L_DeliveryNumber__c";
import DELIVERY_PRODUCT_REQUEST from "@salesforce/schema/L_Delivery__c.L_ProductRequest__c";
import DELIVERY_RECEIVED_BY_TECHNICIAN from "@salesforce/schema/L_Delivery__c.L_ReceivedByTechnician__c";
import DELIVERY_STATUS from "@salesforce/schema/L_Delivery__c.L_Status__c";
import DELIVERY_DESTINATION_LOCATION from "@salesforce/schema/L_Delivery__c.L_DestinationLocation__c";
import DELIVERY_OWNER_ID from "@salesforce/schema/L_Delivery__c.OwnerId";
import DELIVERY_NAME from "@salesforce/schema/L_Delivery__c.Name";
import DELIVERY_CREATED_DATE from "@salesforce/schema/L_Delivery__c.CreatedDate";
import WORK_ORDER_ID from "@salesforce/schema/L_Delivery__c.L_ProductRequest__r.WorkOrderId";
import WORK_ORDER_NUMBER from "@salesforce/schema/L_Delivery__c.L_ProductRequest__r.WorkOrder.WorkOrderNumber";
import WORK_ORDER_SUBJECT from "@salesforce/schema/L_Delivery__c.L_ProductRequest__r.WorkOrder.Subject";
import WORK_ORDER_ASSET_SERIALNUMBER from "@salesforce/schema/L_Delivery__c.L_ProductRequest__r.WorkOrder.L_AssetSerialNumber__c";
import WORK_ORDER_MANUFACTURER_SERIALNUMBER from "@salesforce/schema/L_Delivery__c.L_ProductRequest__r.WorkOrder.L_Manufacturers_Serial_Number__c";
import WORK_ORDER_FL_DESCRIPTION from "@salesforce/schema/L_Delivery__c.L_ProductRequest__r.WorkOrder.L_Functional_Location_Description__c";
// Product Transfer fields
import PT_ID from "@salesforce/schema/ProductTransfer.Id";
import PT_PRODUCT_ID from "@salesforce/schema/ProductTransfer.Product2Id";
import PT_PRODUCT_IS_SERIALIZED from "@salesforce/schema/ProductTransfer.Product2.L_IsSerialised__c";
import PT_QUANTITY_SENT from "@salesforce/schema/ProductTransfer.QuantitySent";
import PT_PT_LABEL from "@salesforce/schema/ProductTransfer.L_ProductTransferLabel__c";
import PT_QUANTITY_UNIT_OF_MEASURE from "@salesforce/schema/ProductTransfer.QuantityUnitOfMeasure";
import PT_CREATED_DATE from "@salesforce/schema/ProductTransfer.CreatedDate";
import PT_PT_NUMBER from "@salesforce/schema/ProductTransfer.ProductTransferNumber";
import PT_SERIAL_BATCHNUMBER from "@salesforce/schema/ProductTransfer.L_SerialBatchNumber__c";
import PT_DELIVERY from "@salesforce/schema/ProductTransfer.L_Delivery__c";
import PT_RECEIVED_BY_TECHNICIAN from "@salesforce/schema/ProductTransfer.L_ReceivedByTechnician__c";
import PT_RECEIVED_BY_ID from "@salesforce/schema/ProductTransfer.ReceivedById";
import PT_DESTINATION_LOCATION_ID from "@salesforce/schema/ProductTransfer.DestinationLocationId";
import PT_QUANTITY_RECEIVED from "@salesforce/schema/ProductTransfer.QuantityReceived";

const ACTION_CONFIRM = {
  name: "Confirm",
  label: "Confirm",
  variant: "brand",
  disabled: false,
  size: "full"
};
const TOGGLE_RECEIVE_ALL = {
  name: "ReceiveAll",
  label: "Receive all in exact quantities",
  checked: false
};
const NAVIGATION_HOME = {
  showNavigateBack: false,
  showRefresh: true,
  title: "Deliveries",
  iconName: "custom:custom98"
};

export default class DeliveriesMainContainer extends LightningElement {
  userId = userId;
  init = false;

  deliveriesLoading = true;
  productTransfersLoading = true;

  @api navigation = NAVIGATION_HOME;
  @api actions = [ACTION_CONFIRM];
  @api toggles = [TOGGLE_RECEIVE_ALL];

  itemSelected = false; // controls whether to show deliveries or product transfers

  _selectedDeliveryId;
  _deliveries = [];
  _productTransfers = [];
  _relatedProductTransfers = [];

  // Called when user selects a delivery.
  // Now we need to show all product transfers related to the selected delivery
  handleItemSelected(event) {
    const selectedDeliveryId = event.detail.id;
    this._selectedDeliveryId = selectedDeliveryId;

    // filter product transfers to only display those related to the selected delivery
    this._relatedProductTransfers = this._productTransfers.flatMap((record) => {
      return getFieldValue(record, PT_DELIVERY) == selectedDeliveryId
        ? [
            {
              id: getFieldValue(record, PT_ID),
              title: getFieldValue(record, PT_PT_NUMBER),
              subTitle: getFieldValue(record, PT_PT_LABEL),
              fields: [
                ...(getFieldValue(record, PT_SERIAL_BATCHNUMBER)
                  ? [
                      {
                        key: PT_SERIAL_BATCHNUMBER.fieldApiName,
                        fieldName: getFieldValue(
                          record,
                          PT_PRODUCT_IS_SERIALIZED
                        )
                          ? "Serial No."
                          : "Batch No.",
                        value: getFieldValue(record, PT_SERIAL_BATCHNUMBER)
                      }
                    ]
                  : []),
                {
                  key: PT_QUANTITY_SENT.fieldApiName,
                  fieldName: "Sent",
                  fieldApiName: PT_QUANTITY_SENT.fieldApiName,
                  value: `${getFieldValue(record, PT_QUANTITY_SENT)} ${
                    getFieldValue(record, PT_QUANTITY_UNIT_OF_MEASURE) ?? ""
                  }`
                }
              ],
              featuredValue: {
                key: PT_QUANTITY_RECEIVED.fieldApiName,
                fieldName: "Received",
                fieldApiName: PT_QUANTITY_RECEIVED.fieldApiName,
                value: 0,
                min: 0,
                max: getFieldValue(record, PT_QUANTITY_SENT),
                step: 1,
                editable: true,
                type: "number"
              },
              action: {
                disabled: true,
                label: "Create NCR",
                name: "Create NCR"
              }
            }
          ]
        : [];
    });

    // Change screen and navigation
    this.itemSelected = true;
    this.navigation = {
      showNavigateBack: true,
      showRefresh: false,
      title: this._deliveries.get(selectedDeliveryId).title,
      iconName: "custom:custom98"
    };
    window.scrollTo(0, 0);
    // Disable confirm button if there are no Product Transfers
    this.actions = this.actions.map((action) => {
      return {
        ...action,
        disabled: this._relatedProductTransfers.length === 0
      };
    });
  }

  // Handle changes to quantity received
  handleFieldValueChange(event) {
    this.toggles = [...this.toggles];
    const eventDetail = event.detail;
    this._relatedProductTransfers = this._relatedProductTransfers.map(
      (record) => {
        return eventDetail.id.includes(record.id)
          ? {
              //needed to use inncludes because for some reason -<number> is appended to id...
              ...record,
              featuredValue: {
                ...record.featuredValue,
                value: eventDetail.value
              }
            }
          : record;
      }
    );
  }

  handleNavigateBack(event) {
    this.itemSelected = false;
    this.navigation = NAVIGATION_HOME;
    console.log(
      `list-container::${JSON.stringify(
        this.template.querySelector(".list-container")
      )}`
    );
    // this.template.querySelector('.list-container').scrollIntoView();
    window.scrollTo(0, 0);
  }

  handleRefresh(event) {
    this.refreshWires();
  }

  // This will trigger a server-trip to get the latest data
  async refreshWires() {
    this.deliveriesLoading = this.productTransfersLoading = true;
    await Promise.all([
      refreshApex(this._wiredDeliveriesResult),
      refreshApex(this._wiredProductTransferResult)
    ]);
    this.deliveriesLoading = this.productTransfersLoading = false;
  }

  handleConfirm(event) {
    this.deliveriesLoading = this.productTransfersLoading = true;
    this.createRecordsForUpdate();
  }

  // This updates the selected delivery and related product transfers
  async createRecordsForUpdate() {
    const productTransfersToUpdate = this._relatedProductTransfers.map(
      (record) => {
        const fields = {};
        fields[PT_ID.fieldApiName] = record.id;
        fields[PT_QUANTITY_RECEIVED.fieldApiName] =
          record.featuredValue.value ?? 0;
        fields[PT_RECEIVED_BY_ID.fieldApiName] = this.userId;
        return { fields };
      }
    );

    const deliveriesToUpdate = [
      {
        fields: {
          [DELIVERY_ID.fieldApiName]: this._deliveries.get(
            this._selectedDeliveryId
          ).id,
          [DELIVERY_RECEIVED_BY_TECHNICIAN.fieldApiName]: true
        }
      }
    ];

    const recordsToUpdate = [
      ...productTransfersToUpdate,
      ...deliveriesToUpdate
    ];

    try {
      const recordUpdatePromises = recordsToUpdate.map((record) => {
        updateRecord(record);
      });
      await Promise.all(recordUpdatePromises);

      // Navigate back
      this.handleNavigateBack();
    } catch (error) {
      console.error(`recordUpdate::ERROR::${JSON.stringify(error)}`);
    }
  }

  // This sets quantity received equal to quantity sent for all product transfers in view
  handleToggle(event) {
    this._relatedProductTransfers = this._relatedProductTransfers.map(
      (record) => {
        return {
          //needed to use inncludes because for some reason -<number> is appended to id...
          ...record,
          featuredValue: {
            ...record.featuredValue,
            value:
              event.detail.checked === true
                ? record.fields
                    .find(
                      (field) => field.key === PT_QUANTITY_SENT.fieldApiName
                    )
                    ?.value.replace(/[^0-9]/g, "")
                : 0
          }
        };
      }
    );
  }

  //----------------DELIVERIES----------------------
  // use apex wire to get DeliveryIds
  @api DELIVERY_FIELDS = [
    DELIVERY_ID,
    DELIVERY_DELIVERY_NUMBER,
    DELIVERY_PRODUCT_REQUEST,
    DELIVERY_RECEIVED_BY_TECHNICIAN,
    DELIVERY_STATUS,
    DELIVERY_DESTINATION_LOCATION,
    DELIVERY_OWNER_ID,
    DELIVERY_NAME,
    DELIVERY_CREATED_DATE,
    WORK_ORDER_ID,
    WORK_ORDER_NUMBER,
    WORK_ORDER_SUBJECT,
    WORK_ORDER_ASSET_SERIALNUMBER,
    WORK_ORDER_MANUFACTURER_SERIALNUMBER,
    WORK_ORDER_FL_DESCRIPTION
  ];
  @api _deliveryIds;
  @api _deliveryParameters = []; // Needs to be public https://github.com/salesforce/eslint-plugin-lwc-graph-analyzer/blob/v0.5.0/lib/docs/no-private-wire-config-property.md
  @api _wiredDeliveriesResult; // Wired Apex result so it can be refreshed programmatically
  @wire(getDeliveryIds)
  wiredDeliveryIds(result) {
    this._wiredDeliveriesResult = result;
    const { data, error } = result;
    if (data) {
      this._deliveryIds = JSON.parse(data).map((element) => element.Id);
      const deliveryParameterObject = {
        recordIds: this._deliveryIds,
        fields: this.DELIVERY_FIELDS
      };
      this._deliveryParameters = [deliveryParameterObject];
    } else if (error) {
      console.log(`wiredDeliveryIds::error::${JSON.stringify(error)}`);
    }
  }

  // call getRecords wire adapter to actually get the deliveries
  @wire(getRecords, { records: "$_deliveryParameters" })
  wiredDeliveries({ error, data }) {
    if (data) {
      refreshApex(this._wiredDeliveriesResult);
      let deliveries = new Map();
      for (const result of data.results) {
        const delivery = result.result; //record

        if (
          getFieldValue(delivery, DELIVERY_STATUS) !== "GI" ||
          getFieldValue(delivery, DELIVERY_RECEIVED_BY_TECHNICIAN) !== false
        ) {
          continue;
        }

        deliveries.set(getFieldValue(delivery, DELIVERY_ID), {
          id: getFieldValue(delivery, DELIVERY_ID),
          title: getFieldValue(delivery, DELIVERY_DELIVERY_NUMBER),
          fields: [
            {
              key: WORK_ORDER_NUMBER.fieldApiName,
              fieldName: "Work Order",
              fieldApiName: WORK_ORDER_NUMBER.fieldApiName,
              value: getFieldValue(delivery, WORK_ORDER_NUMBER)
            },
            {
              key: WORK_ORDER_SUBJECT.fieldApiName,
              fieldName: "Subject",
              fieldApiName: WORK_ORDER_SUBJECT.fieldApiName,
              value: getFieldValue(delivery, WORK_ORDER_SUBJECT)
            },
            {
              key: WORK_ORDER_ASSET_SERIALNUMBER.fieldApiName,
              fieldName: "Asset",
              fieldApiName: WORK_ORDER_ASSET_SERIALNUMBER.fieldApiName,
              value: getFieldValue(delivery, WORK_ORDER_ASSET_SERIALNUMBER)
            },
            {
              key: WORK_ORDER_FL_DESCRIPTION.fieldApiName,
              fieldName: "",
              fieldApiName: WORK_ORDER_FL_DESCRIPTION.fieldApiName,
              value: getFieldValue(delivery, WORK_ORDER_FL_DESCRIPTION)
            },
            {
              key: DELIVERY_CREATED_DATE.fieldApiName,
              fieldName: "Created",
              fieldApiName: DELIVERY_CREATED_DATE.fieldApiName,
              value: getFieldDisplayValue(
                delivery,
                DELIVERY_CREATED_DATE
              ).split(",")[0]
            }
          ]
        });
      }
      this._deliveries = deliveries;
      this.deliveriesLoading = false;
    } else if (error) {
      console.log(`getRecords::error::${JSON.stringify(error)}`);
    }
  }
  //----------------DELIVERIES----------------------

  //----------------PRODUCT TRANSFERS---------------
  // use apex wire to get productTransferIds
  @api PRODUCT_TRANSFER_FIELDS = [
    PT_ID,
    PT_PRODUCT_ID,
    PT_PRODUCT_IS_SERIALIZED,
    PT_QUANTITY_SENT,
    PT_QUANTITY_UNIT_OF_MEASURE,
    PT_CREATED_DATE,
    PT_PT_NUMBER,
    PT_PT_LABEL,
    PT_SERIAL_BATCHNUMBER,
    PT_DELIVERY,
    PT_RECEIVED_BY_TECHNICIAN,
    PT_DESTINATION_LOCATION_ID,
    PT_QUANTITY_RECEIVED
  ];
  @api _productTransferIds;
  @api _productTransferParameters = []; //needs to be public https://github.com/salesforce/eslint-plugin-lwc-graph-analyzer/blob/v0.5.0/lib/docs/no-private-wire-config-property.md
  @api _wiredProductTransferResult; // Wired Apex result so it can be refreshed programmatically
  @wire(getProductTransferIds)
  wiredProductTransferIds(result) {
    this._wiredProductTransferResult = result;
    const { data, error } = result;
    if (data) {
      this._productTransferIds = JSON.parse(data).map((element) => element.Id);
      const productTransferParameterObject = {
        recordIds: this._productTransferIds,
        fields: this.PRODUCT_TRANSFER_FIELDS
      };
      this._productTransferParameters = [productTransferParameterObject];
    } else if (error) {
      console.log(
        `deliviresMainContainer::getDeliveryIds::error::${JSON.stringify(
          error
        )}`
      );
    }
  }

  @api _productTransfers;
  @wire(getRecords, { records: "$_productTransferParameters" })
  wiredProductTransfers({ error, data }) {
    if (data) {
      refreshApex(this._wiredProductTransferResult);
      const productTransfers = data?.results?.flatMap((result) => {
        const record = result.result;
        return getFieldValue(record, PT_RECEIVED_BY_TECHNICIAN) === false
          ? [record]
          : [];
      });

      this._productTransfers = productTransfers;
      this.productTransfersLoading = false;
    } else if (error) {
      console.log(
        `deliviresMainContainer::getRecords::error::${JSON.stringify(error)}`
      );
    }
  }
  //----------------PRODUCT TRANSFERS---------------

  @api
  get deliveries() {
    return this._deliveries;
  }
  set deliveries(value) {
    this._deliveries = [...value];
  }

  @api
  get relatedProductTransfers() {
    return this._relatedProductTransfers;
  }
  set relatedProductTransfers(value) {
    this._relatedProductTransfers = value;
  }

  get isLoading() {
    return this.deliveriesLoading || this.productTransfersLoading;
  }
}
