<template>
  <span>
    <svg
      v-if="type == 'dotted'"
      xmlns="http://www.w3.org/2000/svg"
      stroke="fill"
      :height="height"
      :width="width"
      viewBox="0 0 512 512"
    >
      <path
        d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
      />
    </svg>

    <svg
      v-if="type == 'solid'"
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        opacity="0.2"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        fill="#000000"
      />
      <path
        d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z"
        fill=""
      />
    </svg>
  </span>
</template>
  
<script   setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'dotted',
  },
  width: {
    type: Number,
    default: 24,
  },
  height: {
    type: Number,
    default: 24,
  },
},) 
</script>

<style lang="scss" scoped>
</style>
