<template>
  <div class="discret-field">
    <label v-if="placeholder"
          @click="focus"> {{placeholder}} </label>
    <div class="inputs-container">
      <slot>
      <input maxlength="1" 
            ref="entry"
            v-for="(item, index) in value"
            v-model="value[index]"
            :key="index"
            :class="{active: value[index],
                    large: large,
                    final: index == length-1,
                    error: hasError}"
            :type="type"
            @input="onItemChange(index)"/>
      </slot>
    </div>
    <div class="error-container"
         :class="{hidden: !error}">
      <slot name="error" :error="error">
        <span>{{error}}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import {
  INPUT_EVENT_NAME,
  TEXT_INPUT_TYPE,
} from "./constants"

const COMPLETE_EVENT_NAME = "complete"
const DEFAULT_INPUT_LEN = 6

export default defineComponent({
  name: "DiscretField",
  
  emits: [
    INPUT_EVENT_NAME,
    COMPLETE_EVENT_NAME
  ],

  components: {},
  
  props: {
    placeholder: String,
    error: String,
    large: Boolean,
    length: {
      type: Number,
      default: DEFAULT_INPUT_LEN,
    },
    type: {
      type: String,
      default: TEXT_INPUT_TYPE,
    }
  },

  data () {
    return {
      value: new Array<string>(this.length),
      focused: 0,
    }
  },

  computed: {
    size(): number {
      return this.value.filter(item => item.length).length;
    },

    hasError(): boolean {
      return this.error != undefined && this.error.length > 0
    },
  },

  methods: { 
    onItemChange(index: number) {
      if (this.size == this.length) {
        let value = this.value.join('')
        this.$emit(COMPLETE_EVENT_NAME, value)
      }

      let next = this.value[index].length? ++index : --index
      let entryRef: any = this.$refs['entry']
      entryRef[next]?.focus()
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "global.scss";

.discret-field {
  label {
    height: $default-height;
    line-height: $default-height;
    transition: font-size $transition-lapse;
  }

  &.active label, &:focus-within label {
    font-size: $small-font-size;
  }

  .inputs-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    input {
      @extend .border-line;

      max-width: $default-height;
      min-height: $default-height;
      line-height: $default-height;
      text-align: center;

      transition: min-height $transition-lapse,
                  border-color $transition-lapse;

      &:not(.final) {
        margin-right: $margin-bounds;
      }

      &.active {
        border-color: $default-color;
      }

      &.active, &:focus-within {
        min-height: $active-height;
      }

      &.error {
        color: $error-color;
      }
    }
  }
}

</style>