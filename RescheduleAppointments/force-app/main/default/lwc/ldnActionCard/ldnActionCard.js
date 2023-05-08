import { LightningElement, api } from "lwc";

export default class LdnActionCard extends LightningElement {
  @api actions = [
    {
      name: "Confirm",
      label: "Confirm",
      variant: "brand-outline",
      disabled: false,
      size: "full"
    }
  ];
  @api toggles = [
    {
      name: "ReceiveAll",
      label: "Receive all in exact quantities",
      checked: false
    }
  ];

  get fullSizeActions() {
    return this.actions.filter((action) => action.size === "full");
  }

  handleActionClick(event) {
    const actionClickEvent = new CustomEvent("actionclick", {
      detail: {
        name: event.target.name
      }
    });
    console.log(`actionClickEvent::${JSON.stringify(actionClickEvent)}`);
    this.dispatchEvent(actionClickEvent);
  }

  handleToggleChange(event) {
    const toggleEvent = new CustomEvent("toggle", {
      detail: {
        name: event.target.name,
        checked: event.target.checked
      }
    });
    console.log(`toggleEvent::${JSON.stringify(toggleEvent.detail)}`);
    this.dispatchEvent(toggleEvent);
  }
}
