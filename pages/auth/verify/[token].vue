<template>
  <div> 
    <LoaderFullscreen v-if="loading" />
    
    <div class="bg-white rounded box-shadow p-8" v-else>
      <div class="text-sm p-1">
        <h3
          class="text-center leading-7 mb-2 text-[1.75rem] font-semibold text-grey-600"
        >
             Verification Successful
        </h3>
        <p class="text-center pt-6 px-2 text-grey-400 leading-6">
          Thank you for verifying your email address. You now will be redirected
          to the KYC page for you to complete your registration
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLayoutStore } from '~/store/layout'  
import { useAuthStore } from '~/store/authentication'  
const { updateAuthCardSize } = useLayoutStore()

definePageMeta({ layout: "auth" }); 

const loading: Ref<boolean> = ref(false);

const { verifyUser } =  useAuthApi() 
const {  unVerifiedUserEmail, setAuthUser, setAuthToken  } = useAuthStore() 
const router = useRouter()
const route = useRoute()

const verify = async () => {
  loading.value = true
  const {token} = route.params 
 
  const response = await  verifyUser(token)
  const { data, error } = response 
  loading.value = false
  if (error) return console.log("error:::", error); 

  console.log("data:::", data)
  const { profile, authToken } = data
  
  setAuthToken(authToken) 
  setAuthUser(profile)  
  
  setTimeout(() => { router.push("/auth/kyc") }, 3000);
}

onMounted(()=> verify())


  onBeforeMount(async () => {
    updateAuthCardSize('sm') 
  })
</script> 