<template>
  <span>
    <svg
      v-if="type == 'left'"
      :height="height"
      :width="width"
      viewBox="0 0 40 41"
      class="fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.0007 40.9985L0.000732422 20.9985L20.0007 0.998535L23.5632 4.49853L9.56323 18.4985H40.0007V23.4985H9.56323L23.5632 37.4985L20.0007 40.9985Z"
      />
    </svg>

    <svg
      v-if="type == 'right'"
      :height="height"
      :width="width"
      viewBox="0 0 17 12"
      xmlns="http://www.w3.org/2000/svg"
      class="fill-current"
    >
      <path
        d="M10.5 12L9.1 10.55L12.65 7H0.5V5H12.65L9.1 1.45L10.5 0L16.5 6L10.5 12Z"
      />
    </svg>

    <svg
      v-if="type == '45-right'"
      :height="height"
      :width="width"
      viewBox="0 0 13 14"
      class="fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.4 13.5L0 12.1L9.6 2.5H1V0.5H13V12.5H11V3.9L1.4 13.5Z"
        fill="white"
      />
    </svg>

    <svg
      v-if="type == 'upvote'"
      :height="height"
      :width="width"
      viewBox="0 0 28 24"
      class="fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.5291 15.1156L14.3398 0.216772C14.0841 -0.0717457 13.6708 -0.0723798 13.4144 0.215609L0.140566 15.1161C-0.115823 15.4046 -0.0117247 15.6369 0.373388 15.6369H8.73764V23.3039C8.73764 23.689 9.04973 24 9.43431 24H18.2343C18.6189 24 18.931 23.6884 18.931 23.3039V15.6369H27.2946C27.6797 15.6369 27.785 15.4041 27.5291 15.1156Z"
      />
    </svg>

    <svg
      v-if="type == 'downvote'"
      :height="height"
      :width="width"
      viewBox="0 0 29 24"
      class="fill-current"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.808794 8.88443L13.998 23.7832C14.2538 24.0717 14.6671 24.0724 14.9235 23.7844L28.1973 8.8839C28.4537 8.59538 28.3496 8.36309 27.9645 8.36309L19.6002 8.36309L19.6002 0.69614C19.6002 0.311028 19.2882 0 18.9036 0L10.1036 0C9.71901 0 9.40692 0.311556 9.40692 0.69614V8.36309L1.04331 8.36309C0.658194 8.36309 0.552933 8.59591 0.808794 8.88443Z"
      />
    </svg>
  </span>
</template>
  
<script   setup lang="ts">
const props = defineProps({
  type: {
    type: String,
    default: 'left',
  },
  width: {
    type: Number,
    default: 18,
  },
  height: {
    type: Number,
    default: 18,
  },
},) 
</script>

<style lang="scss" scoped>
</style>
