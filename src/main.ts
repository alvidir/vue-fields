import RegularField from "./RegularField.vue";
import DiscretField from "./DiscretField.vue";
import ActionField from "./ActionField.vue";

export default {
 install(Vue: any, options: any) {
  Vue.component("regular-field", RegularField);
  Vue.component("discret-field", DiscretField);
  Vue.component("action-field", ActionField);
 }
};

// for debugging
import { createApp } from 'vue'
import Demo from "./demo.vue";

createApp(Demo).mount('#app')