<template>
  <h3
    :class="`
    ${size == 'sm' && 'text-sm'}
    ${size == 'md' && 'text-md'}
    ${size == 'base' && 'font-medium text-grey-600 text-base leading-5'}
    ${size == 'lg' && 'text-lg'}
    ${size == 'xl' && 'text-xl '}
    ${size == '2xl' && 'text-2xl '}
    ${size == '3xl' && 'fontext-3xl '}
    ${customClass}`"
  >
    <slot />
  </h3>
</template>

<script lang="ts">
export default {
  props: {
    size: {
      type: String,
      default: "base",
    }, 
    customClass: {
      type: String,
      default: "",
    },
  },
  name: "HeaderText",
};
</script>
