# Description

_This component is intended to be used on **mobile devices**._

`ldn-tile-list` displays a list of tiles (`ldn-tile`).

# Attributes

| Name       | Type     | Required | Default | Description                                                      |
| ---------- | -------- | -------- | ------- | ---------------------------------------------------------------- |
| itemName   | String   | false    |         | Shown in the legend where number of items are displayed          |
| showLegend | Boolean  | false    | false   | Determines if the legend showing number of items should be shown |
| items      | Object[] | true     |         | Array of items to be shown                                       |

## items

| Name          | Type     | Required | Default | Description                      |
| ------------- | -------- | -------- | ------- | -------------------------------- |
| id            | String   | true     |         | Unique Id of the item            |
| title         | String   | true     |         | Title on the tile                |
| subTitle      | String   | false    |         | Subtitle on the tile             |
| fields        | Object[] | false    |         | List of fields on the tile       |
| featuredValue | Object   | false    |         | Featured value on the tile       |
| action        | Object   | false    |         | Action button shown on the tile  |
| badges        | Object[] | false    |         | List of badges shown on the tile |

## fields

| Name               | Type   | Required | Default | Description                    |
| ------------------ | ------ | -------- | ------- | ------------------------------ |
| key                | String | true     |         | Unique identifier of the field |
| value.fieldName    | String | false    |         | Field name shown on the tile   |
| value.fieldApiName | String | true     |         | Field API name                 |
| value.value        | String | true     |         | Value shown on the tile        |

## featuredValue

| Name               | Type    | Required | Default | Description                                                                                                        |
| ------------------ | ------- | -------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| key                | String  | true     |         | Unique identifier of the featured value                                                                            |
| editable           | Boolean | false    | false   | Controls if the featured value is an editable field                                                                |
| type               | String  | false    | false   | Determines what kind of input field that should be used if the field is editable <br /> Supported values: `number` |
| value.fieldName    | String  | false    |         | Field name shown above the featured value                                                                          |
| value.fieldApiName | String  | true     |         | Field API name                                                                                                     |
| value.value        | String  | true     |         | Value shown on the tile                                                                                            |
| value.max          | Number  | false    |         | Max number if field is editable and is a number                                                                    |
| value.min          | Number  | false    | 0       | Min number if field is editable and is a number                                                                    |
| value.step         | Number  | false    | 1       | Step increment if field is editable and is anumber                                                                 |

## action

| Name     | Type    | Required | Default | Description                          |
| -------- | ------- | -------- | ------- | ------------------------------------ |
| disabled | Boolean | false    | false   | Shows the button in a disabled state |
| label    | String  | true     |         | Label of the button                  |
| name     | String  | true     |         | Name of the button                   |

## badge

| Name        | Type   | Required | Default | Description                    |
| ----------- | ------ | -------- | ------- | ------------------------------ |
| key         | String | true     |         | Unique identifier of the badge |
| value.label | String | true     |         | Label of the badge             |
| value.class | String | false    |         | Used to style the badge        |

# Methods

| Name | Arguments | Description |
| ---- | --------- | ----------- |
| n/a  |           |             |

# Events

## actionclick

This event is fired when the user clicks on the action button in a tile.
The `actionclick` event returns the following properties.

| Parameter     | Type   | Description                                 |
| ------------- | ------ | ------------------------------------------- |
| detail.id     | String | Id of the item where the action was clicked |
| detail.action | String | Name of the action that was clicked         |

The `actionclick` event have the following properties
| Property | Value |
| ---------- | ----- |
| bubbles | false |
| cancelable | false |
| composed | false |

## fieldvaluechange

This event is fired when the featured value has been changed.
The `fieldvaluechange` event returns the following properties.

| Parameter    | Type   | Description                                 |
| ------------ | ------ | ------------------------------------------- |
| detail.id    | String | Id of the item where the action was clicked |
| detail.field | Object | The `featuredValue` that was changed        |
| detail.value | String | The new updated value                       |

The `fieldvaluechange` event have the following properties
| Property | Value |
| ---------- | ----- |
| bubbles | false |
| cancelable | false |
| composed | false |
