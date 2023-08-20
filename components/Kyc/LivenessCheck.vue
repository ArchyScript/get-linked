<template>
  <div> 
    <ModalsProcessing v-if="loading" />

    <div v-else> 
      <KycCamera
        v-if="showCamera"
        ref="cameraRef"
        @taken="verifyPicture"
        @error="getVerificationFailure"
        @loading="getLoading"
      />  

      <template v-else> 
        <ModalsResponses 
          v-if="verificationFailedMessage"
          type="error"
          titleText="Verification Error"
          title="Your identity verification failed"
          :message="verificationFailedMessage"
          :hasTitle="true"
          btnContinueText="Try again" 
          @next="showCamera = true"
          @close="closeModal"
        />   

        <ModalsResponses
          v-else
          type="success"
          message="Your identity has been verified"
          :hasTitle="false" 
          @close="showLivenessCheck = false"
          @next="closeModal"
        />
      </template>
    </div>  
  </div>  
</template>

<script  setup lang="ts">  
const { livenessCheck } =  useCommonApi() 

const props = defineProps({
  showLiveness: {
    type: Boolean,
    default: false,
  }, 
}) 

// 
const loading: Ref<boolean>  = ref(false);
const imageUrl: Ref<string>  = ref('');
const showCamera: Ref<boolean>  = ref(true);
const verificationFailedMessage: Ref<any>  = ref(null); 
const cameraRef: Ref<any | null> = ref (null);

// 
const emit = defineEmits(["close", "done"]);

// 
const getLoading = (value: boolean) => {
  loading.value = value
}
const getVerificationFailure = (message: string | null) => {
  verificationFailedMessage.value = message;
  showCamera.value = false;
}
const closeModal = async () =>  {  
  if (cameraRef.value) await cameraRef.value.stop();
  emit("close");
}
const proceed = () => { 
  emit("done", imageUrl.value);
  closeModal(); 
}
const  verifyPicture = async (file_url: any) => {
  loading.value = true;
 
  const response = await  livenessCheck({file_url})
  const { data, error } = response 

  console.log("response:::", response) 
  
  //  handle error
  if (error) {
    let errorMessage = '';
    if (!error) {
      errorMessage = 'Your internet connection is bad';
    } else {
      errorMessage = error?.data?.message;

      if (errorMessage && errorMessage.includes('detect face in image')) {
        errorMessage = `Face is not clear. Ensure that you are in a bright environment so there is enough light on your face and also make sure that you are close enough to the camera`;      
      }
    }

    loading.value = false;
    return getVerificationFailure(errorMessage);
  }

  if (!data) return getVerificationFailure("Sorry, something happened");

  // data is not null
  imageUrl.value = file_url;
  getVerificationFailure(null); 
} 
</script>

<style scoped>
p {
  font-weight: var(--font-medium);
}

small {
  font-size: 90%;
}
</style>
