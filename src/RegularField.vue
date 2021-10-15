<template>
  <span id="container" class="round-corners fib-16">
    <input v-model="content"
            :maxlength="maxlength"
            :type="type === PWD_INPUT_TYPE && show? TEXT_INPUT_TYPE : type"
            :placeholder="placeholder">
    <button v-if="type === PWD_INPUT_TYPE"
            class="flex"
                :class="{expanded: value,
                        show: show}"
                v-on:click="onClick">
            {{ show? '&ndash;' : '&#x25E6;'}}
    </button>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export const PWD_INPUT_TYPE = 'password'
export const TEXT_INPUT_TYPE = 'text'

export default defineComponent({
  name: "RegularField",
  components: {},
  
  props: {
    placeholder: {
      type: String,
      default: "placeholder"
    },

    error: String,
    maxlength: Number,

    type: {
      type: String,
      default: "text",
    }
  },

  data () {
      return {
        content: "",
        visible: false,
      }
  },

  watch: {
    content(value: string) {
      this.$emit('onChange', value)
    }
  },

  computed: {

  },

  methods: { 
    
  },

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "fibonacci-styles";

#container {
  display: flex;
  height: $fib-8 * 1px;

  overflow: hidden;

  border: find-fib-color(success) solid;
  border-color: find-fib-color(success);
  transition: border-color $fib-8 * 0.01s,
              color $fib-8 * 0.01s,
              height $fib-7 * 0.01s;

  &:hover {
    border: $fib-2 * 1px solid;
    border-color: find-fib-color(success);
  }

  &:focus-within, &.expanded{
    height: $fib-9 * 1px;
    border: $fib-2 * 1px solid;
    border-color: find-fib-color(success);
  }
}

input {
  background: transparent;
  width: 100%;
}

</style>