import RegularField from "./RegularField.vue"
import DiscretField from "./DiscretField.vue"

const REGULAR_FIELD_TAG = "regular-field"
const DISCRET_FIELD_TAG = "discret-field"

export {
    RegularField,
    DiscretField
}

export function include(app: any): any {
    app.component(REGULAR_FIELD_TAG, RegularField)
       .component(DISCRET_FIELD_TAG, DiscretField)
}