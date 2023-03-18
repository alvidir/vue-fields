<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { Field } from "../src/types";

const large = ref(false);
const regular = ref<Field>();
const regularFieldProps = reactive({
  error: "",
  readonly: false,
});

const onRegularFieldInput = () => {
  const text = regular.value?.text() ?? "";

  regularFieldProps.error =
    text.length > 0 && text !== "something" ? "Read carefully..." : "";
};

const discret = ref<Field>();
const discretFieldProps = reactive({
  error: "",
  readonly: false,
});

const onDiscretFieldComplete = () => {
  discretFieldProps.error =
    discret.value?.text() !== "scipio" ? "Incorrect input" : "";
};

const search = ref<Field>();
const searchFieldItems = ref(new Array<string>());

const onSearchFieldInput = () => {
  searchFieldItems.value = [];
  const text = search.value?.text() ?? "";
  for (let n = text.length; n > 0; n--) {
    searchFieldItems.value.push(text.substring(0, n));
  }
};

const onSearchFieldItemClick = (_: Event, item: string) => {
  console.log("click on search field item: ", item);
};

onMounted(() => {
  setTimeout(() => (large.value = true), 1000);
});
</script>

<template>
  <div class="demo-item">
    <regular-field
      ref="regular"
      :error="regularFieldProps.error"
      :placeholder="'Write something here'"
      :large="large"
      :readonly="regularFieldProps.readonly"
      :type="'password'"
      @input="onRegularFieldInput"
    >
    </regular-field>
  </div>
  <div class="demo-item">
    <discret-field
      ref="discret"
      :error="discretFieldProps.error"
      :placeholder="'Welcome to Cartago'"
      :large="large"
      :readonly="discretFieldProps.readonly"
      @complete="onDiscretFieldComplete"
    >
    </discret-field>
  </div>
  <div class="demo-item">
    <search-field
      ref="search"
      :placeholder="'Search'"
      :large="large"
      :items="searchFieldItems"
      @input="onSearchFieldInput"
      @click="onSearchFieldItemClick"
      v-slot="props"
    >
      <label class="search-item">{{ props.item }}</label>
    </search-field>
  </div>
</template>

<style lang="scss">
@import "fibonacci-styles";

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
