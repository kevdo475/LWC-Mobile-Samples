import { LightningElement, api } from "lwc";

export default class LdnInputCounter extends LightningElement {
  @api disabled = false;
  @api label;

  _value = 0;
  @api
  get value() {
    return this._value;
  }
  set value(value) {
    this._value = Number(value);
  }

  _min = 0;
  @api
  get min() {
    return this._min;
  }
  set min(value) {
    this._min = Number(value);
  }

  _max;
  @api
  get max() {
    return this._max;
  }
  set max(value) {
    this._max = Number(value);
  }

  _step = 1;
  @api
  get step() {
    return this._step;
  }
  set step(value) {
    this._step = Number(value);
  }

  handleValueChange(event) {
    const eventTargetName = event.target.name;
    const inputElement = this.template.querySelector("lightning-input");
    if (eventTargetName == "subtract") {
      this._value = this._value - this._step;
      inputElement.value = this._value;
    } else if (eventTargetName == "add") {
      this._value = this._value + this._step;
      inputElement.value = this._value;
    } else {
      this._value = Number(inputElement.value);
    }
    inputElement.reportValidity();
    const inputValueChangeEvent = new CustomEvent("change", {
      detail: {
        value: this._value
      }
    });
    this.dispatchEvent(inputValueChangeEvent);
  }

  get isSubtractDisabled() {
    if (this.disabled) {
      return true;
    } else {
      return this._value - this._step < this._min;
    }
  }

  get isAddDisabled() {
    if (this.disabled) {
      return true;
    } else {
      return this._max ? this._value + this._step > this._max : false;
    }
  }
}
