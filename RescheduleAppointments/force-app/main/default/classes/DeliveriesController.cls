public with sharing class DeliveriesController {
  @AuraEnabled(cacheable=true)
  public static String getServiceResourceId() {
    return JSON.serialize(
      [
        SELECT Id
        FROM ServiceResource
        WHERE RelatedRecordId = :UserInfo.getUserId()
        LIMIT 1
      ]
      ?.Id
    );
  }

  @AuraEnabled(cacheable=true)
  public static String getDeliveryIds() {
    String locationId = [
      SELECT LocationId
      FROM ServiceResource
      WHERE RelatedRecordId = :UserInfo.getUserId()
      LIMIT 1
    ]
    ?.LocationId;
    return JSON.serialize(
      [
        SELECT Id
        FROM L_Delivery__c
        WHERE
          L_DestinationLocation__c = :locationId
          AND L_ReceivedByTechnician__c = FALSE
        ORDER BY CreatedDate DESC
      ]
    );
  }

  @AuraEnabled(cacheable=true)
  public static String getProductTransferIds() {
    String locationId = [
      SELECT LocationId
      FROM ServiceResource
      WHERE RelatedRecordId = :UserInfo.getUserId()
      LIMIT 1
    ]
    ?.LocationId;
    return JSON.serialize(
      [
        SELECT Id
        FROM ProductTransfer
        WHERE
          DestinationLocationId = :locationId
          AND L_ReceivedByTechnician__c = FALSE
        ORDER BY ProductTransferNumber
      ]
    );
  }
}
