<template>
  <div
    class="fixed top-0 left-0 !w-screen !h-screen     z-[1000] bg-primary-blue bg-opacity-30"
  > 
    <div class="relative w-full h-full !m-auto flex justify-center items-center ">
      <IconSpinner  class="animate-spin"/>
    </div> 
  </div>
</template>

<script setup lang='ts'> 
const props = defineProps({
  loading: {
    type: Boolean,
    default: true,
  }, 
}) 
</script>


<style lang="scss" scoped>
.box-shadow {
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.04);
}
</style>