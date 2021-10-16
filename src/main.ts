import RegularField from "./RegularField.vue";
import DiscretField from "./DiscretField.vue";

export default {
 install(Vue: any, options: any) {
  Vue.component("regular-field", RegularField);
  Vue.component("discret-field", DiscretField);
 }
};

// for debugging
// import { createApp } from 'vue'
// import DiscretField from "./DiscretField.vue";

// createApp(DiscretField).mount('#app')