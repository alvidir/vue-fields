<template>
    <div class="regular-field rcorner"
        :class="{error: error, expanded: value}">
        <div id="placeholder"
            v-if="placeholder">
            <text :class="{error: error}">{{placeholder}}</text>
        </div>

        <input  ref="field"
                v-model="value"
                :maxlength="max"
                :type="type === 'password' && show? 'text' : type">

        <button v-if="type === 'password'"
                class="flex"
                :class="{expanded: value,
                        show: show}"
                v-on:click="onClick">
            {{ show? '&ndash;' : '&#x25E6;'}}
        </button>
    </div>
    <!--p  class="box" 
        :class="{visible: error}">{{error}}
    </p-->
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
    @import "fibonacci-styles";
</style>

<script lang="ts">
import Vue from "vue"
import Component from 'vue-class-component'

@Component({  
  components: { },  
  props: { },  
})  
export default class RegularField extends Vue {  
  
  created () { }
  mounted () { }
}
// import { defineComponent } from "vue";
// import { Controller } from "./index";

// export default defineComponent({
//   name: "RegularField",
//   props: {
//     id: String,
//     onChange: Function,
//     error: String,
//     max: Number,

//     placeholder: {
//       type: String,
//       required: true,
//     },

//     type: {
//       type: String,
//       default: "text",
//     }
//   },

//   components: {},

//   data () {
//       return {
//           value: "",
//           show: false,
//       }
//   },

//   watch: {
//     value: function(value) {
//       if (this.onChange) {
//         const over: string = this.onChange(value, this as Controller);
//         if (over != undefined) {
//           this.value = over;
//         }
//       }
//     }
//   },

//   methods: { 
//     onClick(): void {
//       if (!this.value) {
//         const field: any = this.$refs.field;
//         field.focus();
//       } else {
//         this.show = !this.show;
//       }
//     },

//     getId(): string | undefined {
//       return this.id;
//     },

//     getValue(): string {
//       return this.value
//     },

//     clear() {
//       this.value = "";
//     }
//   }
// })
</script>
