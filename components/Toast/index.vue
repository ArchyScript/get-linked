<template>
  <div class="toast" :class="`toast--${severity}`">
    <div class="toast__message">
      {{ message }}
    </div>
    <button class="toast__close" @click="close">
      <i class="fas fa-times"></i>
    </button>
  </div>
</template>

<script setup lang="ts"> 
// enum ToastSeverity {
//   Info = 'info',
//   Success = 'success',
//   Warning = 'warning',
//   Error = 'error',
// }
const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  severity: {
    type: String,
    default: 'info',
  },
  duration: {
    type: Number,
    default: 3000,
  },
});

const emits = defineEmits(['close']);

function close() {
  emits('close');
}
</script>

<style lang="css">
.toast {
  @apply fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 p-4 border-t-4 
}
.toast--success {    @apply bg-green-100; }
.toast--warning {    @apply bg-yellow-100; }
.toast--info {    @apply bg-blue-100; }
.toast--error {    @apply bg-error-100; }

.toast__message {   @apply mt-2 text-lg; }

.toast__close {
  @apply absolute top-2 right-2 text-gray-600 text-xl cursor-pointer;
}
</style>