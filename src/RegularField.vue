<template>
  <div class="regular-field"
      :class="{active: value.length, large: large}">
    <div class="input-container"
        :class="{error: hasError, large: large}">
      <slot>
        <label v-if="placeholder"
               @click="focus"> {{placeholder}} </label>
        <input ref="entry"
               v-model="value"
               :type="inputType"
               @input="onChange"/>
        <button :class="{active: showButton}"
                @click="switchVisibility">
          {{ visible? '&#10033;' : 'Aa'}}
        </button>
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
  PASSWORD_INPUT_TYPE,
  TEXT_INPUT_TYPE,
} from "./constants"

export default defineComponent({
  name: "RegularField",
  components: {},

  emits: [
    INPUT_EVENT_NAME,
  ],
  
  props: {
    placeholder: String,
    error: String,
    large: Boolean,
    type: {
      type: String,
      default: TEXT_INPUT_TYPE,
    }
  },

  data () {
    return {
      value: "",
      visible: false,
    }
  },

  computed: {
    hasError(): boolean {
      return this.error != undefined && this.error.length > 0
    },

    showButton(): boolean {
      return this.type == PASSWORD_INPUT_TYPE && this.value.length > 0
    },

    inputType(): string {
      if (this.type === PASSWORD_INPUT_TYPE && !this.visible) {
        return PASSWORD_INPUT_TYPE
      } else {
        return TEXT_INPUT_TYPE
      }
    },
  },

  methods: { 
    focus() {
      let entryRef: any = this.$refs.entry
      entryRef.focus()
    },

    switchVisibility() {
      this.visible = !this.visible
    },

    onChange() {
      this.$emit(INPUT_EVENT_NAME, this.value)
    }
  },

})
</script>

<style lang="scss">
@import "./global.scss";

.regular-field {
  height: fit-value;
  width: 100%;

  &:focus-within, &.active {
    .input-container {
      @extend .active;
    }

    label {
      font-size: $small-font-size;
    }
  }

  &.active .border-line {
    border-color: $default-color;
  }

  &:not(.active).large:not(:focus-within) {
    label {
      line-height: $active-height !important;
    }
  }

  .input-container {
    position: relative;
    display: flex;

    label, input {
      height: $default-height;
      line-height: $default-height;
      padding-left: $margin-bounds;
    }

    label {
      position: absolute;
      cursor:text;
    }

    input {
      width: 100%;
      margin-top: auto;
      flex: 1;
    }

    button {
      min-width: $active-height;
      height: $default-height;
      color: $default-color;
      background: transparent;
      text-align: center;
      font-size: 1rem;
      border: none;
      padding: 0px;
      opacity: 0%;

      transition: height $transition-lapse,
                  opacity $transition-lapse;

      &:hover {
          cursor: pointer;
          font-weight: 800;
      }

      &.active {
        opacity: 100%;
      }
    }

    &.error {
      button, input {
        color: $error-color;
      }
    }
  }

  .error-container {
    padding-left: $margin-bounds;
  }
}

</style>
