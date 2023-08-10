<template>
  <div class="text-green-600 border h-screen m-20"> {{'process'}}

    <LoadingFullscreen :loading="true" />

    </div>
</template>

<script setup lang="ts">  
// const { register } =  useAuthApi() 
onBeforeMount(() => {
  useRouter().push("/dashboards") 

  // console.log(typeof register);   
  // const payload = ref({
  //   "email":"tsagsdjhsdjha238725402734gfjdkdffue@gmail.com",
  //   "password":"password2@21",
  //   "payback_days":"60",
  //   "interest_rate": 30
  // })

  // const response = register(payload.value)
  // console.log(response)
})


// onMounted(async () => {
// const data: any = await axios('/api/hello').then((response) => {
//   console.log(response.data)
//   return response.data
// })
// console.log("data", data)

// })

</script>