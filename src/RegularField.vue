<template>
  <span id="input-container"
        class="round-corners fib-5"
        :class="{focused: content, error: error}">
    <span id="placeholder-container"
          :class="{focused: focused || content}"
          v-if="placeholder">
      <label>{{placeholder}}</label>
    </span>
    <input v-model="content"
          :type="inputType"
          :class="{focused: content}"
          @focus="setInputFocus(true)"
          @blur="setInputFocus(false)">
    <span id="button-container"
          v-if="showButton">
      <button @click.capture="switchVisibilty()">
        {{ visible? '&#9711;' : 'Aa'}}
      </button>
    </span>
  </span>
  <span id="error-container">
    <label :class="{collapse: !error}">{{error}}</label>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue"

const PWD_INPUT_TYPE = 'password'
const TEXT_INPUT_TYPE = 'text'

export default defineComponent({
  name: "RegularField",
  components: {},
  
  props: {
    placeholder: {
      type: String,
      default: "placeholder"
    },

    error: String,
    type: {
      type: String,
      default: "password",
    }
  },

  data () {
    return {
      content: "",
      visible: false,
      focused: false,
    }
  },

  watch: {
    content() {
      this.$emit('onChange', this.content)
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
    }
  },

  methods: { 
    setInputFocus(focus: boolean) {
      this.focused = focus
    },

    switchVisibilty() {
      this.visible = !this.visible
    }
  },

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "styles.scss";

$text-padding: $fib-5 * 1px;

label, button {
  font-family: Arial;
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
  display: flex;
  height: 100%;

  position: absolute;
  align-items: center;
  padding-right: $text-padding;

  right: 0;
}

input {
  height: fit-content;
  font-size:  medium;

  background: transparent;
  border: none;
  outline: none;
  width: 100%;

  padding-left: $text-padding;

  &:focus, &.focused {
    padding-bottom: $text-padding;
    transition: padding $fib-7 * 0.01s;
  }
}

button {
  background: transparent;
  border: none;
  outline: none;
  
  font-size: larger;
  color: find-fib-color(success);

  &:hover {
    cursor: pointer;
    font-weight: 900;
  }

  &.error {
    color: find-fib-color(error);
  }
}

</style>