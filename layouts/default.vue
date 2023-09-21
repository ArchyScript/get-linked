<template>
  <div class="min-h-screen bg-primary-1 bg-opacity-10">
    <div class="container mx-auto !no-scrollbar min-h-screenbg-primary-7">
      <PartialsNavbar />

      <div>
        <slot />
      </div>

      <PartialsFooter layout="default" />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style>
  /* Hide scrollbar for Chrome, Safari and Opera */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .no-scrollbar {
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }
</style>
