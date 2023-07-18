<template>  
  <div 
    class="flex flex-col justify-center items-center space-y-6 px-4 py-20" 
  > 
    <IconLoader class="animate-spin"/>   
     
    <TypoNormalText size="lg" customClass="text-grey-500 font-normal text-center capitalize">
      {{loadingText}}
    </TypoNormalText>   
  </div>
</template>

<script setup lang="ts">
const props = defineProps({  
  loadingText: {
    type: String,
    default: "processing..."
  },   
});

const emit = defineEmits(["close"]); 
const close = () => {
  emit("close");
};
</script> 