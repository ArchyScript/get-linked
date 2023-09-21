<template>
  <nav class="sticky items-center top-0 py-3 md:py-4 xl:pt-8 shadow-sm md:shadow-none bg-red-500">
    <div class="flex justify-between items-center">
      <div class="flex">
        <span class="!text-grey-500">get</span>
        <span class="!text-grey-500">Linked</span>
      </div>

      <div class="flex items-center space-x-8">test</div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  const router = useRouter();
  const route = useRoute();
  const scrollShadowBoolean = ref(true);

  const handleScroll = () => {
    console.log(8765678);
    // if (!window || window == undefined) return;
    // if (window.pageYOffset > 0) {
    //   // user is scrolled
    //   if (scrollShadowBoolean.value) scrollShadowBoolean.value = false;
    // } else {
    //   // user is at top of page
    //   if (!scrollShadowBoolean.value) scrollShadowBoolean.value = true;
    // }
  };

  // window.addEventListener('scroll', () => handleScroll());

  // onMounted(() => {
  //   handleScroll();
  // });
</script>

<style scoped>
  nav.scrolled {
    @apply sticky z-20 h-12 sm:h-14 md:h-16 pt-0 pb-0 bg-red-500 shadow-md;
  }
</style>
