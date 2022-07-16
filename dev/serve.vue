<template>
  <div id="app">
    <div class="demo-item">
      <regular-field :error="regularFieldError"
                     :placeholder="'Write something here'"
                     :large="true"
                     :readonly="readonly"
                     :type="'password'"
                     @input="onRegularFieldChange">
      </regular-field>
    </div>
    <div class="demo-item">
      <discret-field :error="discretFieldError"
                     :placeholder="'Welcome to Cartago'"
                     :large="true"
                     :readonly="readonly"
                     @complete="onDiscretFieldComplete">
      </discret-field>
    </div>
        <div class="demo-item">
      <search-field :placeholder="'Search'"
                    :large="false"
                    :items="searchItems"
                    @click="onClick"
                    @input="onChange"
                    @select="onSelect">
        <div>Hello world</div>
      </search-field>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Item } from '@/SearchField.vue';

export default defineComponent({
  name: 'ServeDev',
  data() {
    return {
      readonly: false,
      large: true,
      regularFieldError: "",
      discretFieldError: "",
      searchItems: Array<Item>(),
    }
  },

  methods: {
    onRegularFieldChange(value: string) {
      this.regularFieldError = value.length > 0 && value !== 'something'? "Read carefully..." : ""
    },

    onDiscretFieldComplete(value: string) {
      this.discretFieldError = value !== 'scipio'? "Incorrect input" : ""
    },

    onClick(value: string) {
      console.log("search click: ", value)
    },

    onChange(value: string) {
      console.log("search change: ", value)
      this.searchItems.splice(0, this.searchItems.length)
      for (var i = 0; i < value.length; i++) {
        this.searchItems.push({
          title: value.substring(0, value.length-i),
          id: i,
        })
      }
    },

    onSelect(selected: number) {
      console.log("selected: ", this.searchItems[selected].title)
    }
  }
});
</script>

<style lang="scss">
@import "fibonacci-styles";

* {
  @extend .theme-dark;

  margin: 0;
  padding: 0;
  font-family: 'Raleway', Helvetica, Arial, sans-serif;
}

#app {
  display: flex;
  flex-direction: row;
  width: 100%;
}

body {
  position: relative;
  min-height: 100vh;
  width: 100%;
  background: var(--color-background-secondary);
}

.demo-item {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>