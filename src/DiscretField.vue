<template>
  <div class="discret-field" :class="{ active: size }">
    <label v-if="placeholder"> {{ placeholder }} </label>
    <div class="inputs-container">
      <input
        maxlength="1"
        ref="entry"
        class="transparent"
        v-for="(item, index) in text"
        v-model="text[index]"
        :key="index"
        :class="{
          active: text[index],
          large: large,
          final: index == length - 1,
          error: hasError,
        }"
        :type="type"
        @input="onItemChange(index)"
      />
    </div>
    <div class="error-container" v-if="error">
      <slot name="error" :error="error">
        <span>{{ error }}</span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { INPUT_EVENT_NAME, TEXT_INPUT_TYPE } from "./constants";
import { FieldController } from "./main";

const COMPLETE_EVENT_NAME = "complete";
const DEFAULT_INPUT_LEN = 6;

export default defineComponent({
  name: "DiscretField",

  emits: [INPUT_EVENT_NAME, COMPLETE_EVENT_NAME],

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
    },
  },

  data() {
    return {
      text: new Array<string>(this.length),
      focused: 0,
    };
  },

  computed: {
    size(): number {
      return this.text.filter((item) => item.length).length;
    },

    hasError(): boolean {
      return this.error != undefined && this.error.length > 0;
    },
  },

  methods: {
    onItemChange(index: number) {
      let value = this.value();
      this.$emit(INPUT_EVENT_NAME, value);

      if (this.size == this.length) {
        this.$emit(COMPLETE_EVENT_NAME, this as FieldController);
      }

      let next = this.text[index].length ? ++index : --index;
      let entryRef = this.$refs["entry"] as HTMLInputElement[];
      entryRef[next]?.focus();
    },

    clear() {
      this.text.forEach((_, index) => (this.text[index] = ""));
    },

    value(): string {
      return this.text.join("");
    },

    focus() {
      const entryRef = this.$refs["entry"] as HTMLInputElement[];
      entryRef[0]?.focus();
    },

    blur() {
      const entryRef = this.$refs["entry"] as HTMLInputElement[];
      entryRef[0]?.blur();
    },
  },
});
</script>

<style lang="scss">
@import "styles.scss";

.discret-field {
  width: 100%;
  z-index: 0;

  label {
    height: $default-height;
    line-height: $default-height;
    transition: font-size $transition-lapse, opacity $transition-lapse;
  }

  &.active label,
  &:focus-within label {
    font-size: $small-font-size;
    color: var(--color-text-secondary);
  }

  .inputs-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    input {
      @extend .border-line;

      width: 100%;
      min-height: $default-height;
      line-height: $default-height;
      text-align: center;

      transition: min-height $transition-lapse, border-color $transition-lapse;

      &:not(.final) {
        margin-right: $margin-bounds;
      }

      &.active,
      &:focus,
      &:focus-within {
        border-color: var(--color-green);
        min-height: $active-height;
      }

      &.error {
        color: var(--color-red);
      }
    }
  }
}
</style>
