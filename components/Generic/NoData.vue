<template>
  <div class="flex-col flex items-center space-y-1 p-20">   
      <IconNoData :type="type" :height="iconHeight" :width="iconWidth" /> 

      <TypoHeaderText size="sm" :customClass="`cursor-pointer !text-center text-grey-100 ${customClass}`"> {{title}} </TypoHeaderText>
      
      <TypoHeaderText v-if="hasDetailsText" size="sm" :customClass="`cursor-pointer !text-center text-grey-100 ${customClass}`"> {{detailText}} </TypoHeaderText> 
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
  type: {
    type: String,
    default: "generic"
  },
  iconHeight: {
    type: Number,
  },
  iconWidth: {
    type: Number,
  },
  customClass: {
    type: String
  }
},) 
</script>

<style lang="scss" scoped>
</style>
