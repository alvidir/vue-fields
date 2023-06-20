<script setup lang="ts">
import { ref } from "vue";

interface Props {
  modelValue: string;
  placeholder?: string;
  error?: string;
  large?: boolean;
  length?: number;
  type?: string;
  debounce?: number;
  readonly?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  length: 6,
  type: "text",
});

interface Events {
  (e: "input", payload: Event): void;
  (e: "complete", payload: Event): void;
  (e: "update:modelValue", payload: string): void;
}

const emit = defineEmits<Events>();
const entrypoint = ref<Array<HTMLInputElement>>();

let timeout: number | undefined = undefined;
const onInput = (payload: Event, index: number) => {
  const actualText =
    entrypoint.value
      ?.map((entry) => entry.value)
      .filter((value) => value.length)
      .join("") ?? "";

  emit("update:modelValue", actualText);

  const emitInputEvent = (payload: Event) => {
    emit("input", payload);

    if (actualText.length == props.length) {
      emit("complete", payload);
    }
  };

  if (props.debounce) {
    clearTimeout(timeout);
    timeout = setTimeout(() => emitInputEvent(payload), props.debounce);
  } else {
    emitInputEvent(payload);
  }

  const value = actualText.at(index) ?? "";
  const previous = !value && index < 2 ? 0 : index - 1;
  entrypoint.value?.at(value ? index + 1 : previous)?.focus();
};

const focus = () => {
  entrypoint.value?.at(0)?.focus();
};

const blur = () => {
  entrypoint.value?.forEach((input) => input.blur());
};

defineExpose({
  focus,
  blur,
});
</script>

<template>
  <div class="discret-field" :class="{ active: modelValue.length }">
    <label v-if="placeholder"> {{ placeholder }} </label>
    <div class="inputs-container">
      <input
        v-for="index in length"
        maxlength="1"
        ref="entrypoint"
        class="transparent"
        :value="modelValue?.at(index - 1)"
        :type="type"
        :key="index"
        :class="{
          active: modelValue?.at(index - 1),
          large: large,
          error: error,
        }"
        :readonly="readonly"
        @input="onInput($event, index - 1)"
      />
    </div>
    <div class="error-container" v-if="error">
      <slot name="error" :error="error">
        <span>{{ error }}</span>
      </slot>
    </div>
  </div>
</template>

<style lang="scss">
@import "styles.scss";

.discret-field {
  width: 100%;
  z-index: 0;

  &.active label,
  &:focus-within label {
    font-size: $small-font-size;
    color: var(--color-text-secondary);
  }

  & > label {
    height: $default-height;
    line-height: $default-height;
    transition: font-size $medium-fade, opacity $medium-fade;
  }

  & > .inputs-container {
    display: flex;
    flex-direction: row;
    align-items: center;

    & > input {
      @extend .border-line;

      width: 100%;
      min-height: $default-height;
      line-height: $default-height;
      text-align: center;

      transition: min-height $slower-fade, border-color $medium-fade;

      &:not(:last-child) {
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
