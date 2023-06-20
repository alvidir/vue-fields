<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";

const large = ref(false);

const regularModel = ref("");
const regularFieldProps = reactive({
  error: "",
  readonly: false,
});

const onRegularFieldInput = () => {
  const text = regularModel.value;
  regularFieldProps.error =
    text.length > 0 && text !== "something" ? "Read carefully..." : "";
};

const discretModel = ref("");
const discretFieldProps = reactive({
  error: "",
  readonly: false,
});

const onDiscretFieldComplete = () => {
  discretFieldProps.error =
    discretModel.value !== "scipio" ? "Incorrect input" : "";
};

const searchModel = ref("");
const searchFieldItems = ref(new Array<string>());

const onSearchFieldInput = () => {
  searchFieldItems.value = [];
  const text = searchModel.value;

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
      v-model="regularModel"
      :error="regularFieldProps.error"
      :placeholder="'Write something here'"
      :large="large"
      :readonly="regularFieldProps.readonly"
      :type="'password'"
      :debounce="300"
      @input="onRegularFieldInput"
    >
    </regular-field>
  </div>
  <div class="demo-item">
    <discret-field
      v-model="discretModel"
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
      v-model="searchModel"
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
