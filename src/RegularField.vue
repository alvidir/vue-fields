<script setup lang="ts">
import {
  withDefaults,
  defineProps,
  defineEmits,
  ref,
  computed,
  defineExpose,
} from "vue";
import { InputType, Field } from "./types";

interface Props {
  placeholder?: string;
  error?: string;
  large?: boolean;
  maxlength?: number;
  type?: InputType;
  debounce?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxLength: 255,
  type: InputType.Text,
});

interface Events {
  (e: "input", payload: Event): void;
}

const emit = defineEmits<Events>();

const inputText = ref("");
const entrypoint = ref<HTMLInputElement>();
const showInputText = ref(props.type == InputType.Text);
const actualInputType = computed((): InputType => {
  return props.type == InputType.Password && !showInputText.value
    ? InputType.Password
    : InputType.Text;
});

const isConcealable = computed((): boolean => {
  return props.type === InputType.Password && inputText.value.length > 0;
});

let timeout: number | undefined = undefined;
const onInput = (payload: Event) => {
  if (props.debounce) {
    clearTimeout(timeout);
    timeout = setTimeout(() => emit("input", payload), props.debounce);
  } else {
    emit("input", payload);
  }
};

const text = (): string => {
  return inputText.value;
};

const clear = () => {
  inputText.value = "";
};

const focus = () => {
  entrypoint.value?.focus();
};

const blur = () => {
  entrypoint.value?.blur();
};

defineExpose<Field>({
  text,
  clear,
  focus,
  blur,
});
</script>

<template>
  <div class="regular-field" :class="{ active: inputText, large: large }">
    <div
      class="input-container"
      :class="{ error: error, large: large }"
      @click="focus"
    >
      <label v-if="placeholder" @click="focus"> {{ placeholder }} </label>
      <input
        ref="entrypoint"
        v-model="inputText"
        :maxlength="maxlength"
        :type="actualInputType"
        @input="onInput"
      />
      <button
        v-if="isConcealable"
        tabindex="-1"
        @click="() => (showInputText = !showInputText)"
      >
        {{ showInputText ? "&#10033;" : "Aa" }}
      </button>
    </div>
    <div class="error-container" v-if="error">
      <slot name="error" :error="error">
        <span>{{ error }}</span>
      </slot>
    </div>
  </div>
</template>

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

  & > .input-container {
    position: relative;
    display: flex;
    cursor: text;

    & > label,
    & > input {
      height: $default-height;
      line-height: $default-height;
      padding-left: $margin-bounds;
    }

    & > label {
      position: absolute;
      cursor: text;
    }

    & > input {
      margin-top: auto;
      flex: 1;
    }

    & > button {
      min-width: $active-height;
      height: $default-height;
      color: var(--color-green);
      background: transparent;
      text-align: center;
      font-size: 1rem;
      border: none;
      padding: 0px;

      transition: height $slower-fade, color $medium-fade;

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
