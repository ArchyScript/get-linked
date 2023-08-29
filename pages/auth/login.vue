<template>
  <div class="bg-white rounded box-shadow p-8">  
    <div class="text-sm p-1">
      <h3
        class="text-center leading-7 mb-2 text-[1.75rem] font-semibold text-grey-600"
      >
        Welcome back
      </h3>
      <p class="text-center text-grey-400 leading-6">
        Fill up the form to Login to your Account.
      </p>

      <form class="mt-8" @submit.prevent="loginFinacier">
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
              @blur="v$.email.$touch()"
              :class="v$.email.$invalid && 'error'"
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
              @blur="v$.password.$touch()"
              :class="v$.password.$invalid && 'error'"
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
            type="submit"
            text="Log in" 
            :loading="loading" 
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
const {$toast} = useNuxtApp()
import { useLayoutStore } from '~/store/layout'  
const { updateAuthCardSize } = useLayoutStore() 
import { useAuthStore } from '~/store/authentication'  
import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, maxLength, minValue, maxValue, helpers } from '@vuelidate/validators';

definePageMeta({ layout: "auth" }); 

const { login } =  useAuthApi() 
const { setAuthUser, setAuthToken, logout, previousRoute } = useAuthStore()
const router = useRouter()

const showPassword: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(false);
const payload = ref({ email: "", password: "" });  

// 
const rules = computed(() => { 
  return {
    email: { required, email }, 
    password: { required }, 
  };
});
const computedPreviousRoute = computed(()=> previousRoute)

// 
const v$ = useVuelidate(rules, payload.value);
 
const loginFinacier = async () => { 
  v$.value.$touch() 
  loading.value = true  

  const response = await  login(payload.value)
  const { data, error } = response 

  loading.value = false
  if (error) return  $toast('show', { type: "error", message: error.message  })
  
  const { profile, authToken, kyc } = data
  
  setAuthToken(authToken) 
  setAuthUser(profile) 

  if (Object.keys(kyc).length < 1)  return router.push('/auth/kyc')
     
  // if the user have not completed their kyc
  // if (!profile.isKYC) return router.push('/auth/kyc')
 
  // check if session expired before login or it is a fresh login
  if (computedPreviousRoute.value) return router.push(computedPreviousRoute.value)
  
  else router.push('/dashboards') 
}; 

onBeforeMount(async () => {
  updateAuthCardSize('sm') 
})
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