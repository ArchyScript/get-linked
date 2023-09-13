<template>
  <div class="flex items-center space-x-2 px-0.5 w-fit cursor-pointer" @click="goBAck">
    <IconArrow :width="8" :height="12" type="caret-left" />

    <TypoNormalText>
      {{ text }}
    </TypoNormalText>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    text: {
      type: String,
      default: 'Go back',
    },
  });

  const router = useRouter();

  const goBack = () => {
    router.go(-1);
  };
</script>
