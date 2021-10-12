<template>
<div class="regular-field rcorner"
    :class="{error: error, expanded: value}">
    <div id="placeholder"
        v-if="placeholder">
        <text :class="{error: error}">{{placeholder}}</text>
    </div>

    <input  ref="field"
            v-model="value"
            :maxlength="max"
            :type="type === 'password' && show? 'text' : type">

    <button v-if="type === 'password'"
            class="flex"
            :class="{expanded: value,
                    show: show}"
            v-on:click="onClick">
        {{ show? '&ndash;' : '&#x25E6;'}}
    </button>
</div>
<!--p  class="box" 
    :class="{visible: error}">{{error}}
</p-->
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "fibonacci-styles";
</style>

<script lang="ts">
import Vue from "vue"
import Component from 'vue-class-component'
import { Watch } from 'vue-property-decorator'

@Component({  
  components: { },  
  props: {
      id: String,
      error: String,
      type: String,
      max: Number,
  },  
})  
export default class RegularField extends Vue {  
    content: string = ""
    visible: boolean = false

    @Watch("content")
    public onContentChanged(content: string): void {
        console.log(content)
    }

    created () { }
    mounted () { }
}
</script>
