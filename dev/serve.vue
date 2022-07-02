<template>
  <div id="app">
    <div class="demo-item">
      <regular-field @input="onRegularFieldChange"
                    :error="regularFieldError"
                    :placeholder="'Write something here'"
                    :large="false"
                    :readonly="readonly"
                    :type="'password'">
      </regular-field>
    </div>
    <div class="demo-item">
      <discret-field @complete="onDiscretFieldComplete"
                    :error="discretFieldError"
                    :placeholder="'Welcome to Cartago'"
                    :large="true"
                    :readonly="readonly">
      </discret-field>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ServeDev',
  data() {
    return {
      readonly: false,
      large: true,
      regularFieldError: "",
      discretFieldError: "",
    }
  },

  methods: {
    onRegularFieldChange(value: string) {
      this.regularFieldError = value.length > 0 && value !== 'something'? "Read carefully..." : ""
    },

    onDiscretFieldComplete(value: string) {
      this.discretFieldError = value !== 'scipio'? "Incorrect input" : ""
    },
  }
});
</script>

<style lang="scss">
@import "fibonacci-styles";

* {
  @extend .theme-light;

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