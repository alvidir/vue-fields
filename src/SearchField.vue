<template>
  <div class="search-field"
      :class="{active: value.length, large: large}">
    <div class="input-container"
        :class="{large: large}"
        @click="focus()">
      <label v-if="placeholder"
              @click="focus"> {{placeholder}} </label>
      <input ref="entry"
              v-model="value"
              :maxlength="maxlength"
              @input="onChange"/>
      <button tabindex="-1"
              @click="onSearch">
        <svg x="0px" y="0px" viewBox="0 0 487.95 487.95" fill="var(--color-text)">
          <path d="M481.8,453l-140-140.1c27.6-33.1,44.2-75.4,44.2-121.6C386,85.9,299.5,0.2,193.1,0.2S0,86,0,191.4s86.5,191.1,192.9,191.1
          c45.2,0,86.8-15.5,119.8-41.4l140.5,140.5c8.2,8.2,20.4,8.2,28.6,0C490,473.4,490,461.2,481.8,453z M41,191.4
          c0-82.8,68.2-150.1,151.9-150.1s151.9,67.3,151.9,150.1s-68.2,150.1-151.9,150.1S41,274.1,41,191.4z" />
        </svg>
      </button>
    </div>
    <div class="items-container">
      <div class="scrollable-list" :class="{sized: maxheight}">
        <label v-if="!items || !items.length">&#11835;</label>
        <button v-else v-for="item in items" :key="item.id"
                class="item"
                @click="onSelect(item.id)">
          <label>{{item.title}}</label>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import {
  INPUT_EVENT_NAME,
  CLICK_EVENT_NAME,
  SELECT_EVENT_NAME,
} from "./constants"

export interface Item {
  id: number,
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
    items: Array as PropType<Array<Item>>,
    maxheight: {
      type: String,
      default: '30vh',
    },
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
      let entryRef = this.$refs.entry as HTMLInputElement
      entryRef.focus()
    },

    onSearch() {
      if (this.value.length) {
        this.$emit(CLICK_EVENT_NAME, this.value)
      }
    },

    onChange() {
      this.$emit(INPUT_EVENT_NAME, this.value)
    },

    onSelect(selected: number) {
      this.$emit(SELECT_EVENT_NAME, selected)
    }
  },

})
</script>

<style scoped lang="scss">
@import "./global.scss";

.border-line {
  @extend .round-corners, .fib-5;
  &:focus-within {
    outline: $fib-2 * 1px solid;
  }

  &:focus-within, &.active {
    outline-color: var(--color-accent);
  }
}

.items-container {
  @extend .round-corners, .fib-6;
  position: absolute;
  visibility: hidden;
  width: 100%;
  bottom: 100%;
  background-color: var(--color-background-primary);
  padding-top: $active-height + $fib-6 * 1px;
  padding-bottom: $fib-5 * 1px;
  transform: translateY(100%);

  .scrollable-list {
    display: flex;
    flex-direction: column;
    overflow-y: auto;

    &.sized {
      max-height: v-bind(maxheight);
    }

    /* width */
    &::-webkit-scrollbar {
      width: $fib-4 * 1px;
    }

    /* Track */
    &::-webkit-scrollbar-track {
      background: none; 
    }
    
    /* Handle */
    &::-webkit-scrollbar-thumb {
      @extend .round-corners, .fib-5;
      background: var(--color-scrollbar); 
    }

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
      background: var(--color-scrollbar-hover); 
    }
  }

  label {
    width: fit-content;
    margin-right: auto;
    margin-left: auto;
  }

  button.item {
    @extend .round-corners, .fib-4;
    margin-left: $fib-4 * 1px;
    margin-right: $fib-4 * 1px;
    padding: $fib-4 * 1px;
    padding-top: $fib-6 * 1px;
    padding-bottom: $fib-6 * 1px;
    text-align: start;
    background: none;
    border: none;

    label {
      font-size: 1rem;
      margin-left: $fib-5 * 1px;
      color: var(--color-text);
    }

    &:hover:not(:active) {
      background: var(--color-background-disabled);
    }
  }
}

.search-field {
  width: 100%;
  position: relative;
  display: inline-block;

  &:focus-within .items-container,
  &:hover.active .items-container {
    visibility: visible;
  }

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
    cursor: text;
    position: relative;
    display: flex;
    margin: 5px;
    z-index: 2;

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
