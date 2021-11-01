<template>
  <span id="input-container"
        class="round-corners fib-5"
        :class="{focused: content,
                 error: error,
                 center: !placeholder}">
    <span id="icon-container"
          v-if="hasIcon">
      <slot name="icon"></slot>
    </span>

    <span class="flexrow"
          :class="{focused: (focused || content) && placeholder}">
      <span id="placeholder-container"
            :class="{focused: focused || content}"
            v-if="placeholder">
        <label :class="{ident: !hasIcon}">{{placeholder}}</label>
      </span>
      <input v-model="content"
            :type="inputType"
            :class="{focused: content,
                     ident: !hasIcon}"
            @focus="setInputFocus(true)"
            @blur="setInputFocus(false)">
    </span>

    <button id="field-action"
            v-if="showButton || hasAction"
            :class="{fixed: !hasAction}"
            @click.capture="onActionClicked">
      <slot v-if="hasAction" name="action"></slot>
      <text v-else>{{ visible? '&#10033;' : 'Aa'}}</text>
    </button>
  </span>
  <span id="error-container">
    <label :class="{collapse: !error}">{{error}}</label>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue"

const CLICK_EVENT_NAME = "click"
const PWD_INPUT_TYPE = 'password'
const TEXT_INPUT_TYPE = 'text'

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
@import "styles.scss";

#icon-container {
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  min-width: $fib-9 * 1px;
}

#placeholder-container {
  label.ident {
    padding-left: $text-padding;
  }

  &.focused {
    label {
      padding-top: $text-padding;
    }
  }
}

#input-container {
  &.center {
    align-items: center;

    input {
      padding-bottom: 0px;
    }
  }
}

button#field-action { 
  height: 100%;
  width: fit-content;

  &.fixed {
    width: $fib-9 * 1px;
  }
}

input {
  &.ident {
    padding-left: $text-padding;
  }

  &:focus, &.focused {
    padding-bottom: $text-padding;
  }
}

.flexrow {
  display: flex;
  align-items: center;

  width: 100%;
  height: 100%;

  &.focused{
    align-items: flex-end;
  }
}

</style>
