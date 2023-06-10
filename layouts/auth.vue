<template>
  <div class="bg-[#FAFAFA] min-h-screen overflow-x-hidden w-screen">
    <div class="container w-[36.5rem] block mx-auto py-32">
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

    <PartialsAppFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style>
.box-shadow {
  box-shadow: 0px 24px 34px -2px rgba(221, 221, 221, 0.25);
}
</style>