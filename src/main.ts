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
// import RegularField from "./RegularField.vue";

// createApp(RegularField).mount('#app')