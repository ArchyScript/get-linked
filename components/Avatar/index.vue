<template>
  <span>
    <!-- if avatar have an image url -->
    <img 
      v-show="hasFullImageUrl"
      :src="fullImageUrl" 
      :alt="alt"
      :class="`${customClass}`"
    />
    
    <!-- if avatar does not have an image url -->
    <img 
      v-show="!hasFullImageUrl"
      :src="
        isSubFolder 
        ? `/images/${subfolderPath}/${name}.${fileType}` 
        : `/images/${name}.${fileType}`" 
      :alt="alt"
      :class="`${customClass}`"
    />
  </span>
</template>

<script setup lang="ts"> 
const props = defineProps({
  name: {
    type: String,
    required: true,
  }, 
  hasFullImageUrl: {
    type: Boolean,
    default: false
  },
  fullImageUrl: {
    type: String,
    default: ''
  },
  fileType: {
    type: String,
    default: "png"
  }, 
  alt: {
    type: String,
    default: ""
  }, 
  isSubFolder: {
    type: Boolean,
    default: false
  },
  subfolderPath: {
    type: String
  },
  customClass: {
    type: String,
  }
})
</script>
