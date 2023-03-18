<script setup lang="ts">
import { withDefaults, defineProps, defineEmits, ref, defineExpose } from "vue";
import { InputType, Field } from "./types";

interface Props {
  placeholder?: string;
  error?: string;
  large?: boolean;
  length?: number;
  type?: InputType;
  debounce?: number;
}

const props = withDefaults(defineProps<Props>(), {
  length: 6,
  type: InputType.Text,
});

interface Events {
  (e: "input", payload: Event): void;
  (e: "complete", payload: Event): void;
}

const emit = defineEmits<Events>();

const inputCells = ref(new Array<string>(length));
const entrypoint = ref<Array<HTMLInputElement>>();

let timeout: number | undefined = undefined;
const onInput = (payload: Event, index: number) => {
  const emitInputEvent = (payload: Event) => {
    emit("input", payload);

    if (text().length == props.length) {
      emit("complete", payload);
    }
  };

  if (props.debounce) {
    clearTimeout(timeout);
    timeout = setTimeout(() => emitInputEvent(payload), props.debounce);
  } else {
    emitInputEvent(payload);
  }

  const value = inputCells.value?.at(index) ?? "";
  const previous = !value && index < 2 ? 0 : index - 2;
  entrypoint.value?.at(value ? index : previous)?.focus();
};

const text = (): string => {
  return inputCells.value.filter((value) => value.length).join("");
};

const clear = () => {
  inputCells.value.forEach((_, index, array) => (array[index] = ""));
};

const focus = () => {
  entrypoint.value?.at(0)?.focus();
};

const blur = () => {
  entrypoint.value?.forEach((input) => input.blur());
};

defineExpose<Field>({
  text,
  clear,
  focus,
  blur,
});
</script>

<template>
  <div class="discret-field" :class="{ active: text().length }">
    <label v-if="placeholder"> {{ placeholder }} </label>
    <div class="inputs-container">
      <input
        v-for="index in length"
        v-model="inputCells[index]"
        maxlength="1"
        ref="entrypoint"
        class="transparent"
        :type="type"
        :key="index"
        :class="{
          active: inputCells[index],
          large: large,
          error: error,
        }"
        @input="onInput($event, index)"
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
