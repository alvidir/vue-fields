/* eslint-disable */
import RegularField from "./RegularField.vue";
import DiscretField from "./DiscretField.vue";
import SearchField from "./SearchField.vue";

const REGULAR_FIELD_TAG = "regular-field";
const DISCRET_FIELD_TAG = "discret-field";
const SEARCH_FIELD_TAG = "search-field";

export { RegularField, DiscretField };

export function include(app: any): any {
  app
    .component(REGULAR_FIELD_TAG, RegularField)
    .component(DISCRET_FIELD_TAG, DiscretField)
    .component(SEARCH_FIELD_TAG, SearchField);
}
