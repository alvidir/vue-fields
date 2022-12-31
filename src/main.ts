import { App } from "vue";
import RegularField from "./RegularField.vue";
import DiscretField from "./DiscretField.vue";
import SearchField from "./SearchField.vue";

const REGULAR_FIELD_TAG = "regular-field";
const DISCRET_FIELD_TAG = "discret-field";
const SEARCH_FIELD_TAG = "search-field";

interface FieldController {
  clear: () => void;
  value: () => string;
  focus: () => void;
  blur: () => void;
}

function include(app: App): App {
  return app
    .component(REGULAR_FIELD_TAG, RegularField)
    .component(DISCRET_FIELD_TAG, DiscretField)
    .component(SEARCH_FIELD_TAG, SearchField);
}

export default include;
export { RegularField, DiscretField, SearchField, FieldController };
