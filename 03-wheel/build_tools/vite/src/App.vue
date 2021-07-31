<template>
  <h1>大家好 然叔666</h1>
  <h2>
    <span>count is {{count}} *2={{double}}</span>
    <button @click="count++">戳我</button>
  </h2>
</template>

<script>
import {ref,computed} from 'vue'
export default {
  setup(){
    const count = ref(6)
    function add(){
      count.value++
    }
    const double = computed(()=>count.value*2)
    return {count,add,double}
  }
}
</script>