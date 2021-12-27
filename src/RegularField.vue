<template>
  <div class="regular-field">
    <div class="input-container">
      <span v-if="placeholder"> {{placeholder}} </span>
      <input v-model="content"/>
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
    hasIcon(): boolean {
      return !!this.$slots.icon
    },

    hasAction(): boolean {
      return !!this.$slots.action
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
    setInputFocus(focus: boolean) {
      this.focused = focus
    },

    onActionClicked() {
      if (this.hasAction) {
        this.$emit(CLICK_EVENT_NAME, this.content)
        return
      }

      this.visible = !this.visible
    }
  },

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "global.scss";

.regular-field {
  height: fit-content;
  width: 100%;

  .input-container {
    padding-left: $fib-6 * 1px;
  }

  span {
    position: absolute;
    width: 100%;
    height: $default-height;
    line-height: $default-height;
  }
}

</style>
