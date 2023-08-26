<template>
  <div class="bg-[#FAFAFA] min-h-screen overflow-x-hidden w-screen">
    <div
      class="container block mx-auto py-32"
      :class="
        authCardSize == 'sm'
          ? 'w-[36.5rem] '
          : authCardSize == 'md'
          ? 'w-[49.375rem]'
          : 'w-[36.5rem]'
      "
    >
      <div class="">
        <img
          src="~/assets/images/logo-full.svg"
          class="m-auto h-[3.875rem]"
          alt="logo"
        /> 
      </div>

      <div class="mt-8 font-Poppins">
        <slot />
      </div>
    </div>

    <PartialsAppFooter layout="auth"/>
  </div>
</template>

<script setup lang="ts"> 
import { useLayoutStore } from '~/store/layout'
import { Brandname } from '../.nuxt/components';
const authCardSize = computed(() => useLayoutStore().authCardSize) 
</script>

<style>
.box-shadow {
  box-shadow: 0px 24px 34px -2px rgba(221, 221, 221, 0.25);
}
</style>