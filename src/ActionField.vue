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
            v-if="placeholder"
            :class="{focused: focused || content}">
        <label>{{placeholder}}</label>
      </span>
      <input v-model="content"
            ref="input"
            :type="type"
            :class="{focused: content}"
            @focus="setInputFocus(true)"
            @blur="setInputFocus(false)">
    </span>

    <span id="button-container"
          v-if="actions"
          :class="{hidden: !content}">
      <button-set :actions="availableActions">
       <template v-for="action in availableActions"
                :key="action"
                v-slot:[action]>
            <slot :name="action"></slot>
        </template>
      </button-set>
    </span>
  </span>
  <span id="error-container">
    <label :class="{collapse: !error}">{{error}}</label>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import ButtonSet from "vue-ts-buttons/src/ButtonSet.vue"

const TEXT_INPUT_TYPE = "text"
const CLICK_EVENT_NAME = "click"

interface Focusable {
    focus: () => void
}

export default defineComponent({
  name: "ActionField",
  components: {
    ButtonSet,
  },
  emits: [CLICK_EVENT_NAME],
  
  props: {
    actions: Array,
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
      focused: false,
    }
  },

  computed: {
    availableActions() {
      return this.actions?.filter(action => !!this.$slots[action as string])
    },

    hasIcon(): boolean {
      return !!this.$slots.icon
    }
  },

  methods: { 
    setInputFocus(focus: boolean) {
      this.focused = focus
    },

    onActionClicked(action: string) {
      if (!this.content) {
        let input = this.$refs.input as Focusable
        return input.focus()
      }

      this.$emit(CLICK_EVENT_NAME, {
        action: action,
        value: this.content,
      })
    },
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "styles.scss";

$text-padding: $fib-5 * 1px;

label, button {
  font-family: Arial;
}

#button-container {
  border: 0px !important;
}

button {
  border-right: 0px !important;
}


#input-container {
  &.center {
    align-items: center;

    input {
      padding-bottom: 0px;
    }
  }

  &:focus-within, &.focused{
    align-items: center;
  }
}


#placeholder-container {
  label {
    padding-left: $text-padding;
  }

  &.focused {
    label {
      padding-top: $text-padding;
    }
  }
}

#error-container {
  label {
    padding-left: $text-padding;
  }
}

#button-container {
  padding-right: $text-padding;
  transition: opacity $fib-7 * 0.01s;;

  &.hidden {
    opacity: 0%;

    button {
      cursor:text;
    }
  }
}

#icon-container {
  padding-left: $text-padding;
}

input {
  padding-left: $text-padding;

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