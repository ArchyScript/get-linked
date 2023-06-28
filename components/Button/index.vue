import { IconUpload } from '../../.nuxt/components';
<template>
  <button :type="type" :class="{ hasBorder: hasBorder, isGray: isGray  }" :disabled="disabled" @click="clickBtn">
    <IconSpinner type="dotted" v-if="loading" class="animate-spin" />

    <span v-else class=" flex justify-center items-center space-x-2">
      <span v-if="hasIcon">
        <IconCamera v-if="iconName == 'camera'"/>
      </span>

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
    default: "",
  },
  type: {
    type: String,
    default: "button",
  },
  routeLink: {
    type: String,
  },
  hasBorder: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  isGray: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  hasIcon: {
    type: Boolean,
    default: false
  },
  iconName: {
   type: String,
   default: ""
  },
  iconTitle: {
   type: String,
   default: ""
  },
  iconColor: {
    type: String,
   default: "" 
  },
  textSize: {
    type: String,
    default: ""
  }
});

// 
const router = useRouter()

// emits
const emit = defineEmits(["click"]);
const clickBtn = () => {
  if (props.disabled) return
  if (props.routeLink) return router.push(props.routeLink)

  emit("click");
};
</script>

<style lang="scss" scoped>
button {
  @apply flex items-center justify-center text-center max-h-[3.125rem] w-full bg-secondary-500 cursor-pointer text-white px-3 py-4 rounded leading-6 text-sm font-medium font-Poppins;

  &.hasBorder {
    @apply ring-1 bg-transparent text-secondary-500 ring-secondary-500;
  }

  &:disabled {
    @apply bg-grey-50 text-grey-200 cursor-not-allowed;
  }

  /*
  &.isGray {
    @apply border border-solid border-[#7c8db5] text-[#7c8db5];
  }

  &.isGray.hasBorder {
    @apply border border-solid border-[#7c8db5] text-[#7c8db5];
  }

  span {
    @apply block text-sm ;
  } 
  */
}
</style>
