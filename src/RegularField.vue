<template>
  <div class="regular-field"
      :class="{active: content.length}">
    <div class="input-container"
        :class="{error: hasError}">
      <slot>
        <label v-if="placeholder"
               @click="focus"> {{placeholder}} </label>
        <input ref="entry" v-model="content"/>
      </slot>
    </div>
    <div class="error-container">
      <slot name="error" :error="error">
        <span v-if="hasError">{{error}}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

const CLICK_EVENT_NAME = "click"
export const PWD_INPUT_TYPE = 'password'
export const TEXT_INPUT_TYPE = 'text'

export default defineComponent({
  name: "RegularField",
  components: {},

  emits: [CLICK_EVENT_NAME],
  
  props: {
    placeholder: String,
    error: String,
    type: {
      type: String,
      default: TEXT_INPUT_TYPE,
    }
  },

  data () {
    return {
      content: "",
      visible: false,
      focused: false,
    }
  },

  computed: {
    hasError(): boolean {
      return this.error != undefined && this.error.length > 0
    },

    showButton(): boolean {
      return this.type === PWD_INPUT_TYPE && this.content.length > 0
    },

    inputType(): string {
      if (this.type === PWD_INPUT_TYPE && !this.visible) {
        return PWD_INPUT_TYPE
      } else {
        return TEXT_INPUT_TYPE
      }
    },
  },

  methods: { 
    focus() {
      let entryRef: any = this.$refs.entry
      entryRef.focus()
    },
  },

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "global.scss";

.regular-field {
  $margin-bounds: $fib-6 * 1px;

  height: fit-content;
  width: 100%;

  &:focus-within, &.active {
    .input-container {
      @extend .active;
    }

    label {
      font-size: $small-font-size;
    }
  }

  .input-container {
    position: relative;
    overflow: hidden;

    label, input {
      position: absolute;
      height: $default-height;
      line-height: $default-height;
      padding-left: $margin-bounds;
    }

    label {
      cursor:text;
    }
  }

  .error-container {
    padding-left: $margin-bounds;
    color: $error-color;

    span {
      font-size: $small-font-size;
      font-weight: 600;
    }
  }

  input {
    width: 100%;
    bottom: 0px;
    font-size: 1em;
    z-index: 1;
  }
}

</style>
