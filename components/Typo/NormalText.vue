<template>
  <span
    v-if="tag == 'span'"
    :class="` 
      flex flex-row items-center
      ${size == 'xs' && 'text-xs'}
      ${size == 'sm' && 'font-normal text-grey-600 text-sm leading-5'}
      ${size == 'md' && 'text-md'}
      ${size == 'base' && 'text-base'}
      ${size == 'lg' && 'text-lg'}
      ${customClass}
    `"
  >
    <slot />
  </span>

  <label
    v-if="tag == 'label'"
    :for="for"
    :class="` 
      flex flex-row items-center
      ${size == 'xs' && 'text-xs'}
      ${size == 'sm' && 'font-normal text-grey-600 text-sm leading-5'}
      ${size == 'md' && 'text-md'}
      ${size == 'base' && 'text-base'}
      ${size == 'lg' && 'text-lg'}
      ${customClass}
    `"
  >
    <slot />
  </label>
</template>

<script setup lang="ts">
  const props = defineProps({
    size: {
      type: String,
      default: 'sm',
    },
    tag: {
      type: String,
      default: 'span',
    },
    for: {
      type: String,
      default: '',
    },
    customClass: {
      type: String,
      default: '',
    },
  });
</script>
