<template>
  <div>
    <TypoHeaderText size="xl">ererererer</TypoHeaderText>

    <TypoNormalText>Your identity verification failed</TypoNormalText>
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
