<template>
  <span id="placeholder-container"
        :class="{focused: focused || hasContent, error: error}"
        v-if="title">
    <label>{{title}}</label>
  </span>
  <span id="array-container">
    <span id="input-container"
          class="round-corners fib-5"
          v-for="(item, index) in content"
          :key="index"
          :class="{focused: content[index], error: error}">
      <input maxlength="1"
            :ref="getInputRef(index)"
            v-model="content[index]"
            :type="type"
            :class="{focused: content[index]}"
            @input="onItemChange(index)"
            @focus="setInputFocus(1)"
            @blur="setInputFocus(-1)">
    </span>
  </span>
  <span id="error-container">
    <label :class="{collapse: !error}">{{error}}</label>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue"

const INPUT_REF_PREFIX = 'item-'

export default defineComponent({
  name: "DiscretField",
  components: {},
  
  props: {
    title: String,
    length: {
      type: Number,
      default: 6,
    },

    error: String,
    type: {
      type: String,
      default: "text",
    }
  },

  data () {
    return {
      content: new Array<string>(this.length),
      focused: 0,
    }
  },

  computed: {
    hasContent(): boolean {
      let hasContent = false;
      this.content.forEach((item) => {
        hasContent = item.length > 0;
      })

      return hasContent;
    }
  },

  methods: { 
    getInputRef(index: number) {
      return INPUT_REF_PREFIX + index;
    },

    setInputFocus(alpha: number) {
      this.focused += alpha
    },

    onItemChange(index: number) {
      if (index == this.length-1 && this.content[index].length) {
        let value = this.content.join()
        this.$emit("inputComplete", value)
        return
      }

      if (!index && !this.content[index].length) {
        return
      }

      let next = this.content[index].length? ++index : --index
      let item: any = this.$refs['item-' + next]
      item.focus()
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
  position: relative;
  margin-bottom: $text-padding;

  label {
    opacity: 100% !important;
    padding-left: $text-padding;
  }

  &.error {
    color: find-fib-color(error);
  }

  &.focused {
    label {
      font-size: smaller;
      padding-top: $text-padding;
    }
  }
}

#array-container {
    display: flex;
    align-items: center;
}

#input-container {
  align-items: center !important;
  width: fit-content;
  
  margin-left: $fib-4 * 1px;
  margin-right: $fib-4 * 1px;

  input {
    padding: 0;

    width: $fib-8 * 1px;
    text-align: center;
  }
}

#error-container {
  label {
    padding-left: $text-padding;
  }
}

input {
  padding-left: $text-padding;

  &:focus, &.focused {
    padding-bottom: $text-padding;
  }
}

</style>