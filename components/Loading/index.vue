<template>
  <div class="fixed inset-0 flex items-center justify-center bg-white z-50 bg-opacity-50">
    <!-- Add your loading content here (e.g., a spinner or animation) -->
    <div class="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20 select-none"></div>
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
/* @keyframes spin {
  0% {
    transform: rotate(0deg);
    border-top-color: aqua;
  }
  100% {
    border-top-color: red;
    transform: rotate(360deg);
  }
}

.loader { 
  animation: spin 4s linear infinite;
} */

@keyframes spin {
  0%, 25% {
    border-top-color: #3498db;
  }
  25%, 50% {
    border-top-color: #e74c3c;
  }
  50%, 75% {
    border-top-color: #2ecc71;
  }
  75%, 100% {
    border-top-color: #f39c12;
  }
  100% {
    transform: rotate(360deg);
  }
}

.loader { 
  animation: spin 1s linear infinite;
  /* border-style: solid;
  border-width: 8px;
  border-radius: 50%;
  border-left-color: transparent;
  border-right-color: transparent;
  height: 20px;
  width: 20px; */
}
</style>