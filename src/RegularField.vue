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
  padding-right: $text-padding;
}

input {
  padding-left: $text-padding;

  &:focus, &.focused {
    padding-bottom: $text-padding;
  }
}

</style>