<script lang="ts">
export default {
  name: "RegularField",
  props: {
    error: String,
    max: Number,

    type: {
      type: String,
      default: "text",
    }
  },

  components: {},

  data () {
      return {
          content: "",
          visible: false,
      }
  },

  watch: {
    
  },

  computed: {

  },

  methods: { 
    
  }
}
</script>

<template>
<h1> Hello world </h1>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>