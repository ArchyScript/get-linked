<template>
  <span>  
<svg 
      :height="height" 
      :width="width"   viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_3093_64727)">
<rect x="4.95312" y="1.3999" width="12.7905" height="14.496" rx="0.8" stroke="#0776D4" stroke-width="1.2"/>
<path d="M13.8125 18.6001H4.7259C3.37398 18.6001 2.28883 17.484 2.32685 16.1326L2.57308 7.37953" stroke="#0776D4" stroke-width="1.2" stroke-linecap="round"/>
</g>
<defs>
<clipPath id="clip0_3093_64727">
<rect width="19.2" height="19.2" fill="white" transform="translate(0.398438 0.399902)"/>
</clipPath>
</defs>
</svg>

  </span>
</template>
  
<script setup lang="ts">
const props = defineProps({
  width: {
    type: Number,
    default: 20,
  },
  height: {
    type: Number,
    default: 20,
  }, 
},) 
</script>

<style lang="scss" scoped></style>
