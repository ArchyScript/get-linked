<template>
  <div class="fixed inset-0 flex items-center justify-center bg-white z-50">
    <!-- Add your loading content here (e.g., a spinner or animation) -->
    <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  loading: {
    type: Boolean,
    default: true,
  }, 
}) 
 </script>

<style>
/* Customize the loader animation here */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader {
  border-top-color: #3498db;
  animation: spin 4s linear infinite;
}
</style>