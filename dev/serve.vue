<template>
  <div id="app">
    <div class="demo-set light">
      <div class="demo-subset bg-secondary">
        <div class="demo-item">
          <regular-field
            :error="regularFieldError"
            :placeholder="'Write something here'"
            :large="true"
            :readonly="readonly"
            :type="'password'"
            @input="onRegularFieldChange"
          >
          </regular-field>
        </div>
        <div class="demo-item">
          <discret-field
            :error="discretFieldError"
            :placeholder="'Welcome to Cartago'"
            :large="true"
            :readonly="readonly"
            @complete="onDiscretFieldComplete"
          >
          </discret-field>
        </div>
        <div class="demo-item">
          <search-field
            :placeholder="'Search'"
            :large="false"
            :items="searchItems"
            @click="onClick"
            @input="onChange"
            @select="onSelect"
            v-slot="props"
          >
            <label class="search-item">{{ props.item.title }}</label>
          </search-field>
        </div>
      </div>
      <div class="demo-subset bg-primary">
        <div class="demo-item">
          <regular-field
            :error="regularFieldError"
            :placeholder="'Write something here'"
            :large="true"
            :readonly="readonly"
            :type="'password'"
            @input="onRegularFieldChange"
          >
          </regular-field>
        </div>
        <div class="demo-item">
          <discret-field
            :error="discretFieldError"
            :placeholder="'Welcome to Cartago'"
            :large="true"
            :readonly="readonly"
            @complete="onDiscretFieldComplete"
          >
          </discret-field>
        </div>
        <div class="demo-item">
          <search-field
            :placeholder="'Search'"
            :large="false"
            :items="searchItems"
            @click="onClick"
            @input="onChange"
            @select="onSelect"
            v-slot="props"
          >
            <label class="search-item">{{ props.item.title }}</label>
          </search-field>
        </div>
      </div>
    </div>
    <div class="demo-set dark">
      <div class="demo-subset bg-secondary">
        <div class="demo-item">
          <regular-field
            :error="regularFieldError"
            :placeholder="'Write something here'"
            :large="true"
            :readonly="readonly"
            :type="'password'"
            @input="onRegularFieldChange"
          >
          </regular-field>
        </div>
        <div class="demo-item">
          <discret-field
            :error="discretFieldError"
            :placeholder="'Welcome to Cartago'"
            :large="true"
            :readonly="readonly"
            @complete="onDiscretFieldComplete"
          >
          </discret-field>
        </div>
        <div class="demo-item">
          <search-field
            :placeholder="'Search'"
            :large="false"
            :items="searchItems"
            @click="onClick"
            @input="onChange"
            @select="onSelect"
            v-slot="props"
          >
            <label class="search-item">{{ props.item.title }}</label>
          </search-field>
        </div>
      </div>
      <div class="demo-subset bg-primary">
        <div class="demo-item">
          <regular-field
            :error="regularFieldError"
            :placeholder="'Write something here'"
            :large="true"
            :readonly="readonly"
            :type="'password'"
            @input="onRegularFieldChange"
          >
          </regular-field>
        </div>
        <div class="demo-item">
          <discret-field
            :error="discretFieldError"
            :placeholder="'Welcome to Cartago'"
            :large="true"
            :readonly="readonly"
            @complete="onDiscretFieldComplete"
          >
          </discret-field>
        </div>
        <div class="demo-item">
          <search-field
            :placeholder="'Search'"
            :large="false"
            :items="searchItems"
            @click="onClick"
            @input="onChange"
            @select="onSelect"
            v-slot="props"
          >
            <label class="search-item">{{ props.item.title }}</label>
          </search-field>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { Item } from "@/SearchField.vue";

export default defineComponent({
  name: "ServeDev",
  data() {
    return {
      readonly: false,
      large: true,
      regularFieldError: "",
      discretFieldError: "",
      searchItems: Array<Item>(),
    };
  },

  methods: {
    onRegularFieldChange(value: string) {
      this.regularFieldError =
        value.length > 0 && value !== "something" ? "Read carefully..." : "";
    },

    onDiscretFieldComplete(value: string) {
      this.discretFieldError = value !== "scipio" ? "Incorrect input" : "";
    },

    onClick(value: string) {
      console.log("search click: ", value);
    },

    onChange(value: string) {
      console.log("search change: ", value);
      this.searchItems.splice(0, this.searchItems.length);
      for (var i = 0; i < value.length; i++) {
        this.searchItems.push({
          title: value.substring(0, value.length - i),
          id: i.toString(),
        });
      }
    },

    onSelect(selected: string) {
      console.log("selected: ", this.searchItems[+selected].title);
    },
  },
});
</script>

<style lang="scss">
@import "fibonacci-styles";

* {
  margin: 0;
  padding: 0;
  font-family: "Raleway", Helvetica, Arial, sans-serif;
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
}

.demo-set {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;

  &.light {
    @extend .theme-light;
  }

  &.dark {
    @extend .theme-dark;
  }

  .demo-subset {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 50%;

    &.bg-primary {
      background-color: var(--color-bg-primary) !important;
    }

    &.bg-secondary {
      background-color: var(--color-bg-secondary) !important;
    }
  }
}

.demo-item {
  flex: 1;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 200px;
  padding-right: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
