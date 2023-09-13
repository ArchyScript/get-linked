<template>
  <span>
    <!--  -->
    <svg
      v-if="type == 'dotted'"
      xmlns="http://www.w3.org/2000/svg"
      :height="height"
      :width="width"
      viewBox="0 0 512 512"
      class="fill-current"
    >
      <path
        d="M304 48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zm0 416a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM48 304a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm464-48a48 48 0 1 0 -96 0 48 48 0 1 0 96 0zM142.9 437A48 48 0 1 0 75 369.1 48 48 0 1 0 142.9 437zm0-294.2A48 48 0 1 0 75 75a48 48 0 1 0 67.9 67.9zM369.1 437A48 48 0 1 0 437 369.1 48 48 0 1 0 369.1 437z"
      />
    </svg>

    <!--  -->
    <svg
      v-if="type == 'solid'"
      xmlns="http://www.w3.org/2000/svg"
      :width="width"
      :height="height"
      viewBox="0 0 24 24"
      class="fill-current"
    >
      <path
        opacity="0.2"
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
        fill="#000000"
      />
      <path d="M2 12C2 6.47715 6.47715 2 12 2V5C8.13401 5 5 8.13401 5 12H2Z" fill="" />
    </svg>

    <!--  -->
    <svg
      v-if="type == 'loader'"
      :width="width"
      :height="height"
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_1357_92876"
        style="mask-type: alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="64"
        height="64"
      >
        <path
          d="M64 32C64 14.3269 49.6731 0 32 0C14.3269 0 0 14.3269 0 32C0 49.6731 14.3269 64 32 64C49.6731 64 64 49.6731 64 32ZM6.3936 32C6.3936 17.858 17.858 6.3936 32 6.3936C46.142 6.3936 57.6064 17.858 57.6064 32C57.6064 46.142 46.142 57.6064 32 57.6064C17.858 57.6064 6.3936 46.142 6.3936 32Z"
          fill="#C4C4C4"
        />
      </mask>
      <g mask="url(#mask0_1357_92876)">
        <rect
          width="89.6"
          height="89.6"
          transform="matrix(1 0 0 -1 -12.7969 76.8)"
          fill="url(#paint0_angular_1357_92876)"
        />
        <circle
          cx="3.2"
          cy="3.2"
          r="3.2"
          transform="matrix(1 0 0 -1 28.3438 6.40015)"
          fill="url(#paint1_linear_1357_92876)"
        />
      </g>
      <defs>
        <radialGradient
          id="paint0_angular_1357_92876"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(44.8 44.8) rotate(90) scale(44.8)"
        >
          <stop stop-color="#F1701F" />
          <stop offset="1" stop-color="#F1701F" stop-opacity="0" />
        </radialGradient>
        <linearGradient
          id="paint1_linear_1357_92876"
          x1="3.2"
          y1="0"
          x2="3.2"
          y2="6.4"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#F48D4C" />
          <stop offset="1" stop-color="#F1701F" />
        </linearGradient>
      </defs>
    </svg>
  </span>
</template>

<script setup lang="ts">
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
  });
</script>

<style lang="scss" scoped></style>
