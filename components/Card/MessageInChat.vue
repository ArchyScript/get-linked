<template> 
  <div> 
    <div v-if="isSent" class="relative z-5 w-2/3 bg-white rounded-md">
      <div class="h-full w-4 rounded-tr-3xl rounded-br-md bg-ui-bg absolute left-0 top-0"></div>
      <TypoNormalText size="sm" customClass="flex-1 pl-7 pr-4 py-3 !text-grey-500 flex rounded-xl leading-[160%]"> 
        {{message}}
      </TypoNormalText> 
    </div>
    
    <div v-else class="flex justify-end"> 
      <div class="relative z-5 w-2/3 px-4 py-3 bg-primary-50 rounded-md">
        <TypoNormalText size="sm" customClass="flex-1 pr-6 pl-4  !text-grey-500 flex rounded-xl leading-[160%]"> 
          {{message}} 
        </TypoNormalText> 
        <div class="h-full w-4 rounded-tl-3xl rounded-br-md bg-ui-bg absolute right-0 top-0"></div>
      </div>
    </div> 


     <!-- divider -->
      <!-- 
        <div class="flex items-center space-x-4 px-5">
          <span class="h-[0.5px] bg-grey-50 flex-1"></span> 
          <TypoNormalText size="sm" customClass="!text-primary-500 flex rounded-xl leading-[160%]"> 
            05/40/2034
          </TypoNormalText>  
          <span class="h-[0.5px] bg-grey-50 flex-1"></span>
        </div>
      -->
  </div>
</template>

<script setup lang="ts">
const props = defineProps({ 
  isSent: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    default: "",
  },
  time: {
    type: String,
    default: "",
  }
});
</script>
