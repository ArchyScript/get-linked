<template> 
  <div
    class="fixed top-0 left-0 !w-screen !h-screen overflow-auto flex flex-col bg-grey-500 bg-opacity-30 !z-50 overflow-hidden py-16 items-center"
    @click="closeModal"
  >
    <CardContainer
      size="lg"
      class="relative top-0 modal h-auto w-full !z-50 bg-white box-shadow"
      :style="`width: ${modalSizes} !important;`"
    >
      <div class="flex mb -4" :class="centered && 'justify-center'">
        <!-- <TypoHeaderText v-show="hasHeader" size="2xl">
          {{ title }}
        </TypoHeaderText> -->
     
        <span 
          class="absolute bg-primary-50 p-4 rounded-tr-md cursor-pointer top-0 right-0" 
          @click="close"
        >
          <IconClose/> 
        </span>
      </div>

      <div class="overflow-auto font-light text-sm">
        <slot/>
      </div>
    </CardContainer> 
  </div>  
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: String,
    default: "",
    required: true,
  },
  title: {
    type: String,
    default: "",
    required: true,
  },
  size: {
    type: String,
    default: "md",
  },
  centered: {
    type: Boolean,
    default: false,
  },
  buttonModified: {
    type: Boolean,
    default: false,
  },
  hasHeader: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["close"]);
const modalSizes = computed(() => {
  if (props.size == "xs") return "18.75rem";
  if (props.size == "sm") return "29.25rem";
  if (props.size == "md") return "31.25rem";
  if (props.size == "lg") return "44rem";
  if (props.size == "xl") return "71.25rem";
  else props.size;
});

window.addEventListener("keyup", (e) => {
  if (e.key == "Escape") return close();
});

const closeModal = () => {
  window.addEventListener(
    "click",
    (event: any) => {
      if (!event.target.closest(".modal")) {
        close();
      }
    },
    false
  );
};
const close = () => {
  emit("close", props.id);
};
</script>

<style lang="scss" scoped>
.box-shadow {
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.04); 
}
</style>
