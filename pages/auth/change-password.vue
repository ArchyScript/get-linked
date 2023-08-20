<template>
  <div class="bg-white rounded box-shadow p-8">
    <div class="text-sm p-1">
      <h3
        class="text-center leading-7 mb-2 text-[1.75rem] font-semibold text-grey-600"
      >
        Change Password
      </h3>
      <p class="text-center text-grey-400 leading-6">
        Enter a new password for your account.
      </p>

      <form class="mt-8">
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

        <div class="mb-4">
          <label for="password" class="block mb-2 leading-6 text-grey-500">
            Confirm password
          </label>

          <div class="relative bg-input-bg rounded">
            <span class="icon icon-left">
              <IconLock />
            </span>

            <input
              id="confirm_password"
              v-model="payload.confirm_password"
              :type="showPassword ? 'text' : 'password'"
              class="input-field !px-12"
              placeholder="confirm password"
              autocomplete="current-password"
            />

            <span class="icon icon-right" @click="showPassword = !showPassword">
              <IconEyes :title="showPassword ? 'open' : 'close'" />
            </span>
          </div>
        </div>

        <div class="block w-full mt-6">
          <Button
            text="Change password"
            :disabled="!areFieldsValidated"
            :loading="loading"
            @click="changePassword"
          />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '~/store/layout'  
const { updateAuthCardSize } = useLayoutStore()

definePageMeta({ layout: "auth" });

const showPassword: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);
const payload = ref({ password: "", confirm_password: "" });

const areFieldsValidated = computed(() => {
  if (!payload.value.confirm_password || !payload.value.password) return false
  return true
})

// 
const changePassword = async () => {
  loading.value = true

  setTimeout(() => {
    loading.value = false
    console.log(payload.value)
  }, 1500);
};

  onBeforeMount(async () => {
    updateAuthCardSize('sm') 
  })
</script>

<style scoped>
.input-field {
  @apply bg-transparent focus:bg-transparent focus:ring-secondary-400 focus:ring-1 w-full flex-1 rounded leading-5 block text-sm py-3.5  outline-none border-0;
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