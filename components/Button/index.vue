<template>
  <button
    :type="type"
    :class="`${hasBorder && 'hasBorder'}  ${loading && 'loading'} ${disabled && 'disabled'} `"
    :disabled="disabled"
    @click="clickBtn"
  >
    <IconSpinner type="solid" v-if="loading" class="animate-spin" />

    <span v-else class="flex justify-center items-center space-x-2">
      <span :class="`text-${textSize} `">
        {{ text }}
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
  const props = defineProps({
    text: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'button',
    },
    hasBorder: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    textSize: {
      type: String,
      default: '',
    },
  });

  //
  const router = useRouter();

  // emits
  const emit = defineEmits(['click']);
  const clickBtn = () => {
    if (props.disabled || props.loading) return;

    emit('click');
  };
</script>

<style lang="scss" scoped>
  button {
    background: linear-gradient(270deg, #903aff 0%, #d434fe 56.42%, #ff26b9 99.99%, #fe34b9 100%);
  }
</style>
