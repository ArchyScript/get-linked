<template>
  <div class="bg-white box-shadow p-8">
    <div class="text-sm p-1">
      <h3
        class="text-center leading-7 mb-2 text-[1.75rem] font-semibold text-grey-600"
      >
        Welcome back
      </h3>
      <p class="text-center text-grey-400 leading-6">
        Fill up the form to Login to your Account.
      </p>

      <form class="mt-8">
        <div class="mb-4">
          <label for="email" class="block mb-2 leading-6 text-grey-500">
            Email Address
          </label>

          <div class="relative bg-input-bg rounded">
            <span class="icon icon-left">
              <IconEmail />
            </span>

            <input
              id="email"
              v-model="payload.email"
              class="input-field !pl-12 pr-4"
              type="email"
              placeholder="example@gmail.com"
            />
          </div>
        </div>

        <div class="mb-4">
          <label for="password" class="block mb-2 leading-6 text-grey-500">
            Password
          </label>

          <div class="relative bg-input-bg rounded">
            <span class="icon icon-left">
              <IconLock />
            </span>

            <input
              id="password"
              v-model="payload.password"
              :type="showPassword ? 'text' : 'password'"
              class="input-field !px-12"
              placeholder="password"
              autocomplete="current-password"
            />

            <span class="icon icon-right" @click="showPassword = !showPassword">
              <IconEyes :title="showPassword ? 'open' : 'close'" />
            </span>
          </div>
        </div>

        <p class="flex justify-end mt-3.5">
          <nuxt-link
            to="/auth/forgot-password"
            class="text-secondary-500 font-medium leading-6"
          >
            Forgot password
          </nuxt-link>
        </p>

        <div class="block w-full mt-6">
          <Button
            text="Log in"
            :disabled="!areFieldsValidated"
            :loading="loading"
            @click="login"
          />
        </div>

        <div class="flex justify-center items-center space-x-4 mt-8">
          <span class="text-center text-grey-400 leading-6">
            Don’t have an account?
          </span>

          <nuxt-link
            to="/auth/register"
            class="text-secondary-500 font-medium leading-6 font-Poppins"
          >
            Create one
          </nuxt-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: "auth" });
const showPassword: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);
const payload = ref({ email: "", password: "" });


const areFieldsValidated = computed(() => {
  if (!payload.value.email || !payload.value.password) return false
  return true
})

// 
const login = async () => {
  loading.value = true

  setTimeout(() => {
    loading.value = false
    console.log(payload.value)
  }, 1500);
};

</script>

<style scoped>
.input-field {
  @apply bg-transparent focus:bg-transparent focus:ring-secondary-400 focus:ring-1 w-full flex-1 rounded leading-5 block text-sm py-3.5 outline-0 border-0;
}
.icon {
  @apply absolute top-0 h-full rounded-tl rounded-bl bg-transparent flex justify-center items-center px-[1.125rem];
}
.icon.icon-left {
  @apply rounded-tl rounded-bl left-0;
}
.icon.icon-right {
  @apply rounded-tr rounded-br right-0 cursor-pointer;
}
</style>