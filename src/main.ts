import RegularField from "./RegularField.vue"
import DiscretField from "./DiscretField.vue"
import { defineCustomElement } from "vue"

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

// Remember to format all SFC names as *.ce.vue to include its styles into the web component
// see: https://v3.vuejs.org/guide/web-components.html

const ElementRegularField = defineCustomElement(RegularField)
const ElementDiscretField = defineCustomElement(DiscretField)


export {
    ElementRegularField,
    ElementDiscretField,
};


export function register() {
    customElements.define(REGULAR_FIELD_TAG, ElementRegularField)
    customElements.define(DISCRET_FIELD_TAG, ElementDiscretField)
}