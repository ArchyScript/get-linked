<template>
  <div class="h-screen flex justify-evenly w-screen">
    <div
      class="flex w-full md:w-1/2 justify-center items-center h-full bg-white"
    >
      <slot />
    </div>

    <!-- all general components here e.g toast -->
    <Toast/> 
  </div>
</template>

<script setup lang="ts">   
</script>
