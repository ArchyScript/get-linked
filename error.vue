<template>
  <section class="w-full h-[100vh] flex justify-center items-center flex-col">
    <!-- Text here -->
    <div class="mt-2 text-center block w-[35%]">
      <h1 class="text-[1.5rem] font-bold">Oops... page not found.</h1>

      <p class="m-auto pt-2 w-full text-[#646a86] mb-8 font-medium opacity-70">
        The page you’re looking for might have been removed, temporarily unavailable or never
        existed. We’re sad you had to see this and hope you never see it again.
      </p>

      <nuxt-link to="/" class="rounded-lg px-8 py-3 border">Home</nuxt-link>
    </div>
  </section>
</template>

<script setup lang="ts">
  const props = defineProps({
    error: Object,
  });
  const handleError = () => clearError({ redirect: '/' });

  console.log(props.error);
</script>
