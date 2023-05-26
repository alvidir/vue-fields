<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  modelValue: string;
  placeholder?: string;
  error?: string;
  large?: boolean;
  maxlength?: number;
  type?: string;
  debounce?: number;
  readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  maxLength: 255,
  type: "text",
});

interface Events {
  (e: "input", payload: Event): void;
  (e: "update:modelValue", payload: string): void;
}

const emit = defineEmits<Events>();

const entrypoint = ref<HTMLInputElement>();
const showInputText = ref(props.type == "text");
const actualInputType = computed((): string => {
  if (showInputText.value) return "text";
  else return props.type;
});

const isConcealable = computed((): boolean => {
  return props.type === "password" && props.modelValue.length > 0;
});

let timeout: number | undefined = undefined;
const onInput = (payload: Event) => {
  const text = entrypoint.value?.value ?? "";
  emit("update:modelValue", text);

  if (props.debounce) {
    clearTimeout(timeout);
    timeout = setTimeout(() => emit("input", payload), props.debounce);
  } else {
    emit("input", payload);
  }
};

const focus = () => {
  entrypoint.value?.focus();
};

const blur = () => {
  entrypoint.value?.blur();
};

defineExpose({
  focus,
  blur,
});
</script>

<template>
  <div class="regular-field" :class="{ active: modelValue, large: large }">
    <div
      class="input-container"
      :class="{ error: error, large: large }"
      @click="focus"
    >
      <label v-if="placeholder" @click="focus"> {{ placeholder }} </label>
      <input
        ref="entrypoint"
        :value="modelValue"
        :maxlength="maxlength"
        :type="actualInputType"
        :readonly="readonly"
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
