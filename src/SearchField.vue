<template>
  <div class="search-field"
      :class="{active: value.length, large: large}">
    <div class="input-container"
        :class="{large: large}"
        @click="focus()">
      <slot>
        <label v-if="placeholder"
               @click="focus"> {{placeholder}} </label>
        <input ref="entry"
               v-model="value"
               :maxlength="maxlength"
               @input="onChange"/>
        <button tabindex="-1"
                @click="onSearchClick">
          <svg x="0px" y="0px" viewBox="0 0 487.95 487.95">
            <path d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
            c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
            c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z" />
          </svg>
        </button>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import {
  INPUT_EVENT_NAME,
  CLICK_EVENT_NAME,
  SELECT_EVENT_NAME,
} from "./constants"

export interface Item {
  id: string,
  title: string,
}

export default defineComponent({
  name: "SearchField",
  components: {},

  emits: [
    INPUT_EVENT_NAME,
    CLICK_EVENT_NAME,
    SELECT_EVENT_NAME,
  ],
  
  props: {
    placeholder: String,
    large: Boolean,
    items: Array,
    maxlength: {
      type: Number,
      default: 255,
    },
  },

  data () {
    return {
      value: "",
    }
  },

  methods: { 
    focus() {
      let entryRef: any = this.$refs.entry
      entryRef.focus()
    },

    onSearchClick() {
      if (this.value.length) {
        this.$emit(CLICK_EVENT_NAME, this.value)
      }
    },

    onChange() {
      this.$emit(INPUT_EVENT_NAME, this.value)
    }
  },

})
</script>

<style lang="scss">
@import "./global.scss";

.search-field {
  width: 100%;

  &:focus-within, &.active {
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
      margin-top: auto;
      flex: 1;
    }

    button {
      display: flex;
      min-width: $active-height;
      height: $default-height;
      color: var(--color-green);
      background: transparent;
      text-align: center;
      font-size: 1rem;
      border: none;
      padding: 0;

      transition: height $transition-lapse,
                  color $transition-lapse;

      &:hover {
          cursor: pointer;
          font-weight: 800;
      }
    }

    svg {
      margin: auto;
      height: $fib-7 * 1px;
    }
  }
}

</style>
