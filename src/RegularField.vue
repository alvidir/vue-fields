<template>
  <div class="regular-field" :class="{ active: value.length, large: large }">
    <div
      class="input-container"
      :class="{ error: hasError, large: large }"
      @click="focus()"
    >
      <label v-if="placeholder" @click="focus"> {{ placeholder }} </label>
      <input
        ref="entry"
        v-model="value"
        :maxlength="maxlength"
        :type="inputType"
        @input="onChange"
      />
      <button v-if="showButton" tabindex="-1" @click="switchVisibility">
        {{ visible ? "&#10033;" : "Aa" }}
      </button>
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
import {
  INPUT_EVENT_NAME,
  PASSWORD_INPUT_TYPE,
  TEXT_INPUT_TYPE,
} from "./constants";

export default defineComponent({
  name: "RegularField",
  components: {},

  emits: [INPUT_EVENT_NAME],

  props: {
    placeholder: String,
    error: String,
    large: Boolean,
    maxlength: {
      type: Number,
      default: 255,
    },
    type: {
      type: String,
      default: TEXT_INPUT_TYPE,
    },
    debounce: Number,
  },

  data() {
    return {
      value: "",
      visible: false,
      timeout: undefined as number | undefined,
    };
  },

  computed: {
    hasError(): boolean {
      return this.error != undefined && this.error.length > 0;
    },

    showButton(): boolean {
      return this.type == PASSWORD_INPUT_TYPE && this.value.length > 0;
    },

    inputType(): string {
      if (this.type === PASSWORD_INPUT_TYPE && !this.visible) {
        return PASSWORD_INPUT_TYPE;
      } else {
        return TEXT_INPUT_TYPE;
      }
    },
  },

  methods: {
    focus() {
      let entryRef = this.$refs.entry as HTMLInputElement;
      entryRef.focus();
    },

    switchVisibility() {
      this.visible = !this.visible;
    },

    onChange() {
      const value = this.value;
      if (!this.debounce) {
        this.$emit(INPUT_EVENT_NAME, value);
        return;
      }

      clearTimeout(this.timeout);
      this.timeout = setTimeout(
        () => this.$emit(INPUT_EVENT_NAME, value),
        this.debounce
      );
    },
  },
});
</script>

<style lang="scss">
@import "./styles.scss";

.regular-field {
  width: 100%;
  z-index: 0;

  &:focus-within,
  &.active {
    .input-container {
      @extend .active;
      border-color: var(--color-green);
    }

    label {
      font-size: $small-font-size;
    }
  }

  &:not(.active).large:not(:focus-within) {
    label {
      line-height: $active-height !important;
    }

    input {
      height: $active-height !important;
    }
  }

  .input-container {
    position: relative;
    display: flex;
    cursor: text;

    label,
    input {
      height: $default-height;
      line-height: $default-height;
      padding-left: $margin-bounds;
    }

    label {
      position: absolute;
      cursor: text;
    }

    input {
      margin-top: auto;
      flex: 1;
    }

    button {
      min-width: $active-height;
      height: $default-height;
      color: var(--color-green);
      background: transparent;
      text-align: center;
      font-size: 1rem;
      border: none;
      padding: 0px;

      transition: height $transition-lapse, color $transition-lapse;

      &:hover {
        font-weight: 800;
      }
    }

    &.error {
      button,
      input {
        color: var(--color-red);
      }
    }
  }
}
</style>
