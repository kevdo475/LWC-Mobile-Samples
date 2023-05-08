import { LightningElement, api } from "lwc";

export default class LdnNavigationBar extends LightningElement {
  @api showNavigateBack = "false";
  @api showRefresh = "false";
  @api title = "Example";
  @api iconName = "custom:custom98";

  handleNavigateBack(event) {
    const navigateBackEvent = new CustomEvent("navigateback");
    console.log(`navigationPane.navigateback::` + navigateBackEvent);
    this.dispatchEvent(navigateBackEvent);
  }

  handleRefresh(event) {
    const navigateBackEvent = new CustomEvent("refresh");
    console.log(`navigationPane.navigateback::` + navigateBackEvent);
    this.dispatchEvent(navigateBackEvent);
  }
}
