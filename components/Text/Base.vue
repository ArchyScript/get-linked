<template>
  <h3
    :class="`
      font-medium
      ${size == 'sm' && 'text-sm'}
      ${size == 'md' && 'text-md'}
      ${size == 'base' && ' text-grey-600 text-base leading-5'}
      ${size == 'lg' && 'text-lg text-grey-500'}
      ${size == 'xl' && 'text-xl'}
      ${size == '2xl' && 'text-2xl'}
      ${size == '3xl' && 'fontext-3xl'}
      ${class}
    `"
  >
    <slot />
  </h3>
</template>

<script setup lang="ts">
  const props = defineProps({
    size: {
      type: String,
      default: 'sm',
    },
    class: {
      type: String,
      default: '',
    },
  });
</script>
