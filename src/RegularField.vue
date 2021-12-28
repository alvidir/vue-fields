<template>
  <div class="regular-field"
      :class="{active: content.length}">
    <div class="input-container">
      <label v-if="placeholder"> {{placeholder}} </label>
      <input red="entry" v-model="content"/>
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
    setInputFocus(focus: boolean) {
      this.focused = focus
    },

    onActionClicked() {
      // if (this.hasAction) {
      //   this.$emit(CLICK_EVENT_NAME, this.content)
      //   return
      // }

      this.visible = !this.visible
    }
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
      font-size: $fib-6 * 1px;
    }
  }

  .input-container {
    position: relative;
    padding-left: $margin-bounds;
    padding-right: $margin-bounds;

    label, input {
      position: absolute;
      width: 100%;
      height: $default-height;
      line-height: $default-height;
    }
  }

  input {
    bottom: 0px;
    font-size: 1em;
    z-index: 1;
  }
}

</style>
