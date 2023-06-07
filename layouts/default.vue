<template>
  <div class="bg-[#E3E3D9]">
    <div class="container mx-auto min-h-screen py-10 px-4">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
 </script>

<style>
* {
  font-family: Poppins, Arial, Helvetica, sans-serif;
}
.text-shadow {
  text-shadow: 2.5px 2.5px 0px #4503a4;
}
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/*  */
.box-shadow {
  box-shadow: 0px 10px 34px rgba(0, 0, 0, 0.15);
}
</style>
