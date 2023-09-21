<template>
  <div class="flex flex-col justify-center items-center space-y-6 px-4 py-20">
    <IconLoader class="animate-spin" />

    <span size="lg" class="text-grey-500 font-normal text-center capitalize">
      {{ message }}
    </span>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    message: {
      type: String,
      default: 'processing...',
    },
  });

  const emit = defineEmits(['close']);
  const close = () => {
    emit('close');
  };
</script>
