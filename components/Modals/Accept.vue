<template>
  <div class="flex flex-col justify-center items-center space-y-8 py-6 px-4">
    <span size="lg" class="text-grey-500 font-normal text-center">
      {{ confirmationMessage }}
    </span>

    <div class="flex items-center justify-center space-x-1 flex-1 w-[80%]">
      <Button
        @click="close"
        text="cancel"
        class="!text-secondary-500 !py-4 !px-10 !bg-white !font-medium !leading-[160%]"
      />

      <Button
        @click="accept"
        text="Accecpt"
        class="!py-4 !px-10 !text-white !font-medium !leading-[160%] !max-w-fit"
        class="btn-shadow"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    confirmationMessage: {
      type: String,
      default: 'Are you sure ou want to accept this?',
    },
  });

  const emit = defineEmits(['close', 'accept']);
  const close = () => emit('close');
  const accept = () => emit('accept');
</script>

<style lang="scss" scoped>
  .btn-shadow {
    box-shadow: 0px 8px 24px 0px rgba(57, 145, 221, 0.25);
  }
</style>
