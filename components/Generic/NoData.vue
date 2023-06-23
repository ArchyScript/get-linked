<template>
  <div class="flex-col space-y-1 p-20">   
      <IconNoData/>

      <TypoHeaderText size="sm" customClass="cursor-pointer !text-center text-grey-100"> {{title}} </TypoHeaderText>
      
      <TypoHeaderText v-if="hasDetailsText" size="sm" customClass="cursor-pointer !text-center text-grey-100"> {{detailText}} </TypoHeaderText> 
  </div>
</template>
  
<script   setup lang="ts">
const props = defineProps({ 
  title: {
    type: String,
    default: "No data",
  }, 
  hasDetailsText: {
    type: Boolean,
    default: false
  },
  detailText: {
    type: String,
    default: "",
  },
},) 
</script>

<style lang="scss" scoped>
</style>
