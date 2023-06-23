<template>
  <span> 
    <svg 
      v-if="type == 'caret-down'"
      :height="height"
      :width="width"
     viewBox="0 0 9 6" 
      class="fill-current" xmlns="http://www.w3.org/2000/svg">
<path d="M7.70573 1.39575L4.4974 4.60409L1.28906 1.39575" stroke="#9897A8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

  </span>
</template>
  
<script   setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: '',
  },
  width: {
    type: Number,
    default: 18,
  },
  height: {
    type: Number,
    default: 18,
  },
},) 
</script>

<style lang="scss" scoped>
</style>
