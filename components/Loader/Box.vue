<template>
 <div>
    test
  </div>
  <!-- <base-block v-bind="$attrs" size="lg">
    <template #img>
      <Spinner size="50px" color="primary" class="border-primary" />
    </template>

    <template v-if="title" #title>
      {{ title }}
    </template>

    <template #text>
      <p class="mb-0">
        <slot v-if="$slots.default" />

        <template v-else>Processing...</template>
      </p>
    </template>
  </base-block> -->
</template>

<script>
import BaseBlock from './base-block.vue';

export default {
  name: 'LoaderBlock',
  components: {
    BaseBlock,
  },
  props: {
    size: {
      type: String,
      default: 'md',
    },
    title: {
      type: String,
    },
  },
  computed: {
    loaderSizeClass() {
      if (this.size === 'lg') {
        return 'my-5';
      }

      if (this.size === 'md') {
        return 'my-3';
      }

      return undefined;
    },
  },
};
</script>

<style scoped>
p {
  font-weight: var(--font-medium);
  font-size: var(--font-xlg);
}
</style>
