import { App } from "vue";
import RegularField from "./RegularField.vue";
import DiscretField from "./DiscretField.vue";
import SearchField from "./SearchField.vue";

function include(app: App): App {
  return app
    .component("regular-field", RegularField)
    .component("discret-field", DiscretField)
    .component("search-field", SearchField);
}

export default include;
export { RegularField, DiscretField, SearchField };
