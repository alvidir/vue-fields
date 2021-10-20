<template>
  <span id="input-container"
        class="round-corners fib-5"
        :class="{focused: content,
                 error: error,
                 center: !placeholder}">
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

    <span id="button-container"
          v-if="actions"
          :class="{hidden: !content}">
      <button v-for="action in getActions"
              :key="action"
              @click.stop="onActionClicked(action)">
        <slot :name="action"></slot>
      </button>
    </span>
    
  </span>
  <span id="error-container">
    <label :class="{collapse: !error}">{{error}}</label>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue"

interface Focusable {
    focus: () => void
}

export default defineComponent({
  name: "ActionField",
  components: {},
  emits: ["click"],
  
  props: {
    actions: Array,
    placeholder: String,
    error: String,
    type: {
      type: String,
      default: "text",
    }
  },

  data () {
    return {
      content: "",
      focused: false,
    }
  },

  computed: {
    getActions() {
      return this.actions?.filter(action => !!this.$slots[action as string])
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

      this.$emit("click", {
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


#input-container {
  &.center {
    align-items: center;

    input {
      padding-bottom: 0px;
    }
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

input {
  padding-left: $text-padding;

  &:focus, &.focused {
    padding-bottom: $text-padding;
  }
}

</style>