<template>
  <span>
    <img :src="`/images/icons/${name}.svg`" :class="`${customClass}`"/> 
  </span>
</template>

<script setup lang="ts"> 
const props = defineProps({ 
  name: {
    type: String,
    required: true,
  }, 
  customClass: {
    type: String,
    required: true,
  }
}) 
</script>
