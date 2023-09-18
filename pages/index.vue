<template>
  <!-- <div class="h-screen m-20">    -->
  <LoadingFullscreen :loading="true" />
  <!-- </div> -->
</template>

<script setup lang="ts">
  const router = useRouter();

  onBeforeMount(() => {
    router.push('/auth/login');
  });
</script>
