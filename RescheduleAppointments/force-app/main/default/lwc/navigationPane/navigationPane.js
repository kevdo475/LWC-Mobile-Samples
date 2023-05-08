import { LightningElement } from "lwc";

export default class NavigationPane extends LightningElement {
  handleNavigateBack(event) {
    const navigateBackEvent = new CustomEvent("navigateback");
    console.log(`navigationPane.navigateback::` + navigateBackEvent);
    this.dispatchEvent(navigateBackEvent);
  }
}
