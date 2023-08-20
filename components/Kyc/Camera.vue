<template>
  <div class="text-center"> 
    <TypoNormalText size="base" customClass="text-grey-500 font-normal text-center py-2">
      Take a clear photograph of yourself
    </TypoNormalText>  

    <div class="camera" v-if="!photo">
      <video id="video" ref="videoElement" autoplay>Video stream not available.</video>
    </div>

    <div class="output py-2" v-else>
      <img :src="photo" alt="your photo" />
    </div>
 
    <TypoNormalText size="sm" customClass="text-grey-500 font-normal text-left py-2">
      Note: Stay close enough to the camera to ensure your face covers a
      larger portion of the camera
    </TypoNormalText>   

    <div> 
      <div class="flex items-center justify-center" v-if="!photo">  
        <Button @click="takePicture" text="Snap" customClass="!py-4 !px-10 !text-white !font-medium !leading-[160%] !w-fit" class="btn-shadow"/> 
      </div>

      <div class="flex items-center justify-center space-x-4 w-[70%] mx-auto" v-else> 
        <Button 
          @click="clearPhoto" 
          text="Retake" 
          customClass="!py-4 !px-10 !text-white !font-medium !leading-[160%]" class="btn-shadow"
        /> 
          
        <Button 
          @click="validateSubmit"  
          :text="uploading ? 'Uploading...' : 'Verify'"
          :loading="uploading"
          customClass="!py-4 !px-10 !text-white !font-medium !leading-[160%]" class="btn-shadow"
        />  
      </div> 
    </div>

    <canvas id="canvas" ref="canvasElement" width="360" height="240"></canvas>
  </div>
</template>

<script setup lang="ts">  
import { useAuthStore } from '~/store/authentication'   

const { user } = useAuthStore()
const { uploadFile } =  useCommonApi() 

const uploading: Ref<boolean>  = ref(false);
const photo: Ref<string>  = ref(''); 
const videoElement: Ref<HTMLVideoElement | null> = ref(null);
const videoStream: Ref<MediaStream | null> = ref(null);
const canvasElement: Ref<HTMLCanvasElement | null> = ref (null); 

// computed
const userSelfie = computed(()=> { 
  const { selfie } = user
  return selfie; 
})
 
//  watch
watch(photo, (newValue) => {
  if (newValue) {  
    stop()
   }
})


// emit
const emit = defineEmits(["taken", "error", "loading"]);

// functions
const startup = () => { 
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: false }) 
    .then((stream: any) => {
      videoStream.value = stream;
      if (videoElement.value) {
        videoElement.value.srcObject = stream;
        videoElement.value.play(); 
        videoStream.value = stream;
      }
    })
    .catch((err) => {
      onError("Give access to the site to use your camera");
    }); 
} 
const stop = (): void => { 
  console.log("stopped camera")
  try {
    if (videoElement.value) {
      videoElement.value.pause();
      videoElement.value.srcObject = null;
    }

    if (videoStream.value) {
      const tracks = videoStream.value.getTracks();
      tracks[0].stop();
    }
  } catch (e) {
    onError('Error: camera could not be stopped at this time') 
  }
} 
const clearPhoto = () => {  
  if (canvasElement.value) {
    const context = canvasElement.value.getContext('2d');  

    if (context) {
      context.imageSmoothingEnabled = false; 
      context.fillStyle = '#AAA';
      context.fillRect(0, 0, canvasElement.value.width, canvasElement.value.height);

      const data = canvasElement.value.toDataURL('image/png');
      console.log("data log:::", data)
      photo.value = '';
      startup();
    }
  }
} 
const takePicture = (): void => {
  console.log(546347890)  
  if (canvasElement.value && videoElement.value) { 
    const context = canvasElement.value.getContext('2d'); 

    if (context) {
      context.imageSmoothingEnabled = false; 
      const { width, height } = canvasElement.value; 

      if (width && height) {
        context.fillRect(0, 0, width, height);
        context.drawImage(videoElement.value, 0, 0, width, height);

        const data = canvasElement.value.toDataURL('image/png'); 
        photo.value = data; 
      } else { 
        clearPhoto();
      }
    }
  } 
} 
const dataURLtoFile = (dataurl: string): File | null => {
  const arr = dataurl.split(',');
  
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) {
      console.error('Invalid data URL:', dataurl);
      return null;
    }
  }

  const mimeMatch = arr[0].match(/:(.*?);/);
  if (!mimeMatch) {
    console.error('Invalid data URL:', dataurl);
    return null;
  }
  const mime = mimeMatch[1];

  const bstr = atob(arr[1]);
  const n = bstr.length;
  const u8arr = new Uint8Array(n);

  for (let i = 0; i < n; i++) {
    u8arr[i] = bstr.charCodeAt(i);
  }

  try {
    return new File([u8arr], 'selfie.png', { type: mime });
  } catch (error) {
    console.error('Error creating File:', error);
    return null;
  }
}; 
const validateSubmit = async (): Promise<void> => {
  uploading.value = false;
  onLoading(false);

  try { 
    if (!photo.value.length) return onError('Please take a clear picture of your face to proceed');

    // upload selfie to cloudinary and get an image url from the function 
    if (photo.value !== userSelfie.value) {
      const photoUrl = dataURLtoFile(photo.value);
      console.log("photoUrl:::::::", photoUrl)
      if (photoUrl) await  uploadSelfie(photoUrl);  
    }

    console.log("userSelfie.value:::::", userSelfie.value)

    onTaken(userSelfie.value);
  } catch (e) {
    uploading.value = false;
    onLoading(false);
  }
}; 
const uploadSelfie = async (file: any) => { 
  uploading.value = true;
  // onLoading(true);
  const formData = new FormData();
  formData.append('doc', file); 
 
  const response = await  uploadFile(formData)
  const { data, error } = response 
 
  console.log("response:::244", response) 

  if (error) { 
    uploading.value = false;
    onLoading(false);
    return onError('Your identity could not be verified at this time');
  } 

  console.log("response:::", response);
  onTaken(data?.file_url);
};  

const onTaken = async (picture: any) => {
  emit('taken', picture);
}
const onError = async (message: any) => { 
  emit('error', message);
}
const onLoading = async (value: any) => { 
  emit('loading', value);
}

// 
onErrorCaptured((error: Error) => { 
  console.log("error on ca captured:::::::::", error) 
  uploading.value = false;
  onLoading(false)
  return true;
})
 
// lifecycle
onMounted(() => {
  if (userSelfie.value) return photo.value = userSelfie.value; 
  console.log("user:::", user)
  startup(); 
})

onBeforeUnmount(() => {
  console.log('Component will be unmounted soon. Performing cleanup...');  
  stop();
})
</script>

<style scoped>
.output img,
#canvas,
#video {
  padding: 10px;
  width: 320px;
  height: 240px;
}

#canvas {
  display: none;
}

.camera,
.output {
  width: 360px;
  display: inline-block;
}
</style>
