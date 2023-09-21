<template>
  <div
    class="fixed bottom-0 w-full py-6 text-sm text-center"
    :class="layout == 'default' ? 'text-grey-500 bg-[#FCFEFF]' : 'bg-grey-800 text-secondary-50'"
  > 
    © 2021 VesselTrust. All Rights Reserved. 
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    layout: {
      type: String,
      default: 'default',
    },
  });
</script>
