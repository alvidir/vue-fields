import RegularField from "./RegularField.vue";

export default {
 install(Vue: any, options: any) {
  Vue.component("regular-field", RegularField);
 }
};

// for debugging
// import { createApp } from 'vue'
// import RegularField from "./RegularField.vue";

// createApp(RegularField).mount('#app')