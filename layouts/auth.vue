<template>
  <div class="bg-red min-h-screen overflow-x-hidden w-screen">
    <PartialsNavbar />

    <div class="container block mx-auto py-32 w-full">
      <slot />
    </div>

    <PartialsAppFooter layout="auth" />
  </div>

  <!-- all general components here e.g toast -->
  <Toast />
</template>

<script setup lang="ts"></script>

<style>
  .box-shadow {
    box-shadow: 0px 24px 34px -2px rgba(221, 221, 221, 0.25);
  }
</style>
