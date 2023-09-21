<template>
  <span
    :class="` 
      flex flex-row items-center
      ${size == 'xs' && 'text-xs'}
      ${size == 'sm' && 'font-normal text-grey-600 text-sm leading-5'}
      ${size == 'md' && 'text-md'}
      ${size == 'base' && 'text-base'}
      ${size == 'lg' && 'text-lg'}
      ${class}
    `"
    @click="handleClick"
  >
    <slot />
  </span>
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

  const emit = defineEmits(['click']);

  const handleClick = () => emit('click');
</script>
