<template>
  <div>
    <h4 size="xl">ererererer</h4>

    <span>Your identity verification failed</span>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    message: {
      type: String,
      default: '',
    },
  });
</script>
