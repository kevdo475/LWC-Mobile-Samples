# Description

_This component is intended to be used on **mobile devices**._

The `ldn-input-counter` displays an input field for numbers with a decrement button to the left of the input field and an increment button to the right of the input field.

Users can interact with the input field by directly tapping on the input field. This will open the native number pad on their device. The user can use the decrement/increment buttons to change the value.

# Attributes

| Name     | Type    | Required | Default | Description                                                     |
| -------- | ------- | -------- | ------- | --------------------------------------------------------------- |
| disabled | Boolean | false    | false   | if true, the input is disabled and users can't interact with it |
| label    | String  | false    |         | If present, the label is displayed above the input              |
| min      | Number  | false    | 0       | If present, specifies the min amount                            |
| max      | Number  | false    |         | If present, specifies the max amount                            |
| step     | Number  | false    | 1       | If present, specifices amount to increment/decrement            |
| value    | Number  | false    | 0       | Specifies the value of the input                                |

# Methods

| Name | Arguments | Description |
| ---- | --------- | ----------- |
| n/a  |           |             |

# Events

## change

The event is fired when the value changes. This fires `onblur` for manual input and `onclick` for the increment/decrement buttons.
The `change` event returns the following properties.

| Parameter | Type   | Description         |
| --------- | ------ | ------------------- |
| value     | number | The new input value |

The `change` event have the following properties
| Property | Value |
| ---------- | ----- |
| bubbles | false |
| cancelable | false |
| composed | false |
