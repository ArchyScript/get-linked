<template>
  <div> 
    <div>  
      <!-- Full screen loader -->
      <LoaderFullscreen :loading="isUploading" />
 
      <!-- Modals here -->
      <Modal
        id="liveness-verification"
        v-if="showLivenessCheck"
        size="md"
      >  
        <!-- @close="toggleLivenessCheck" -->  
        <KycLivenessCheck  
          :key="compKey + 'livenessCheck'"
          :showLiveness="showLivenessCheck"
          @done="getSelfie"
          @close="toggleLivenessCheck"
        /> 
      </Modal>
    </div> 

    <div class="bg-white rounded box-shadow p-8"> 
      <div class="text-sm p-1">
        <div class="flex-col space-y-8">
          <p class="text-center text-grey-400 leading-6">
            Hi, Badmusfrank@sample.com! Take some minutes to setup your account,
            kindly complete KYC information below to enable you Fund offers on our
            marketplace.
          </p>

          <div class=" w-2/3 mx-auto"> 
            <el-steps  :active="activeStep" finish-status="pending" class="w-full">
              <el-step /> 
              <el-step />    
            </el-steps>
          </div> 

          <h4 class="text-center text-grey-500 text-xl font-medium leading-6">
            {{ activeStep == 0 ? `Authorized representative / signatories details` : `Financial Institute details`}}
          </h4>
        </div> 

        <!-- Step 1 -->
        <form class="mt-8" @submit.prevent="nextStep" v-if="activeStep == 0">
          <div class="mb-4 flex items-center space-x-4">
            <div class="flex-1">
              <label for="firstname" class="block mb-2 leading-6 text-grey-500">
                First Name
              </label>

              <div class="relative bg-input-bg w-full rounded">
                <span class="icon icon-left text-grey-300">
                  <IconUser />
                </span>

                <input 
                  id="firstname"
                  type="text" 
                  class="input-field !pl-12 pr-4" 
                  placeholder="enter first name" 
                />  
                  <!-- v-model.trim="kycPayload.first_name"
                  @change="vRep$.first_name.$touch()"
                  :class="{ 'error': vRep$.first_name.$dirty && vRep$.first_name.$error }" -->
              </div>  
            </div>

            <div class="flex-1">
              <label for="lastname" class="block mb-2 leading-6 text-grey-500">
                Last Name
              </label>

              <div class="relative bg-input-bg w-full rounded">
                <span class="icon icon-left text-grey-300">
                  <IconUser />
                </span>

                <input 
                  id="lastname"
                  type="text" 
                  class="input-field !pl-12 pr-4" 
                  placeholder="enter first name" 
                  v-model="kycPayload.last_name" 
                /> 
              </div> 
            </div>
          </div>

          <div class="mb-4">
            <label for="address" class="block mb-2 leading-6 text-grey-500">
              Address
            </label>

            <div class="relative bg-input-bg rounded">
              <span class="icon icon-left text-grey-300">
                <IconLocation />
              </span>

              <input 
                type="text"
                id="address" 
                class="input-field !pl-12 pr-4" 
                placeholder="enter your permanent address" 
                v-model="kycPayload.address"  
              />
            </div>
          </div>

          <div class="mb-4 flex items-center space-x-4">
            <div class="flex-1">
              <label for="nationality" class="block mb-2  leading-6 text-grey-500">
                Nationality
              </label>

              <div class="relative bg-input-bg w-full pl-8 rounded">
                <span class="icon icon-left text-grey-300">
                  <IconLocation />
                </span>

                <el-select v-model="kycPayload.nationality" class="p-1 !bg-transparent !focus:text-black  !w-full"
                  placeholder="Select" size="large">
                  <el-option v-for="country in countries" :key="country.name" :label="country.name" :name="country.value" />
                </el-select>
              </div>
            </div>

            <div class="flex-1">
              <label for="phone_number" class="block mb-2  leading-6 text-grey-500">
                Phone Number
              </label> 

              <el-input
                v-model="kycPayload.phone_number"
                placeholder="90 734 573 07"
                type="tel"
                class="input-with-select  bg-input-bg  h-[3rem]"
              >
                <template #prepend>
                  <el-select v-model="select" :placeholder="+234" class="w-[5rem]">  
                    <el-option
                      v-for="item in 7"
                      :key="item"
                      :label="item"
                      :value="item"
                      class="flex items-center space-x-3"
                    >
                      <span style="float: left"> <IconUpload/> </span>
                      <span> {{ 'item' }} </span>
                    </el-option>
                  </el-select>
                </template> 
              </el-input>
            </div> 
          </div>

          <div class="mb-4 w-1/2">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Email Address
            </label>

            <div class="relative bg-input-bg rounded">
              <span class="icon icon-left text-grey-200" >
                <IconEmail />
              </span>

              <input 
                id="email"
                class="input-field !px-12"
                type="email"
                placeholder="example@gmail.com"  
                v-model="kycPayload.email" 
              />
                <!-- :class="{
                  'error': vRep$.email.$error || vRep$.email.$invalid,
                  'success': !vRep$.email.$invalid,
                }"  -->

              <!-- <span class="icon icon-right" v-if="!vRep$.email.$invalid" :class="!vRep$.email.$invalid && 'text-success-500'" >
                <IconCheckbox type="square" />
              </span> -->
            </div>

            {{kycPayload.email}} 
              {{vRep$.email.$dirty}} 
              {{vRep$.email.$error}} 
          </div>
  
          <div class="mb-4">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Does the authorized representative hold a power of attorney?
            </label>

            <div class="w-3/5 flex items-center space-x-0">
              <el-radio-group v-model="kycPayload.power_of_attorney" class="!w-full  ">
                <el-radio label="YES" border class="flex-1 !h-[3rem] !px-4 ">Yes</el-radio>
                <el-radio label="NO" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
              </el-radio-group> 
            </div>
          </div>
  
          <div class="mb-4">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Is the authorized representative/signatory considered a politically exposed person(PEP)?   
            </label>

            <div class="w-3/5 flex items-center space-x-4">
              <el-radio-group v-model="kycPayload.pep" class="!w-full  ">
                <el-radio :label="'YES'" border class="flex-1 !h-[3rem] !px-4 ">Yes</el-radio>
                <el-radio :label="'NO'" border class="flex-1  !h-[3rem] !px-4">No</el-radio>
              </el-radio-group> 
            </div>
          </div>

          <div class="mb-4">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Upload International passport of authorized representative
            </label>

            <div class="w-3/5 flex items-center space-x-4">
              <div class="relative !w-1/2 bg-input-bg w-full rounded">
                <span class="icon icon-left text-grey-300">
                  <IconUpload />
                </span>

                <input 
                  id="file"
                  type="file" 
                  class="input-field !pl-12 pr-4" 
                  placeholder="Click to upload files here" 
                  @change="handleUpload"
                />   

                <div v-if="kycPayload.international_passport" class="flex-1 text-success-500">attached successfully</div>
              </div>
            </div>
          </div>
    
          <div class="mb-4">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Click on the button below to verify liveness
            </label> 

            <Button text="Verify liveness" @click="showLivenessCheck = true" :hasIcon="true" iconName="camera"  class="!w-auto !px-8 !bg-primary-500 !text-white"/> 
            <!-- <Button text="Verify liveness" :hasIcon="true" iconName="camera"  class="!w-auto !px-8 !bg-primary-500 !text-white" :disabled="!areFieldsValidated" :loading="loading" />  -->
          </div>
        </form>

        <!-- Step 2 -->
        <form class="mt-8" v-else-if="activeStep = 1">
          <!-- <div class="mb-4 flex items-center space-x-4">
            <div class="flex-1">
              <label for="company_name" class="block mb-2 leading-6 text-grey-500">
                Company name on the commercial register
              </label>

              <div class="relative bg-input-bg w-full rounded"> 
                <input id="company_name" type="text" class="input-field px-4" placeholder="Company name" v-model="financialInstitution.name" />
              </div>
            </div>

            <div class="flex-1">
              <label for="reg_number" class="block mb-2 leading-6 text-grey-500">
            Company registration number
              </label>

              <div class="relative bg-input-bg w-full rounded"> 
                <input id="reg_number" type="text" class="input-field px-4" placeholder="Registration number"  v-model="financialInstitution.reg_no" />
              </div>
            </div>
          </div>
  
          <div class="mb-4">
            <label for="address" class="block mb-2 leading-6 text-grey-500">
              Domicile address of the company on the commercial register 
            </label>

            <div class="relative bg-input-bg rounded">
              <span class="icon icon-left text-grey-300">
                <IconLocation />
              </span>

              <input id="address" v-model="financialInstitution.address" class="input-field !pl-12 pr-4" type="text"
                placeholder="enter your company Domicile address" />
            </div>
          </div>

          <div class="mb-4">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Is the company considered a financial intermediary?
            </label>

            <div class="w-3/5 flex items-center space-x-0">
              <el-radio-group v-model="financialInstitution.is_financial_intermediary" class="!w-full  ">
                <el-radio :label="3" border class="flex-1 !h-[3rem] !px-4 ">Yes</el-radio>
                <el-radio :label="6" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
              </el-radio-group> 
            </div>
          </div>

          <div class="mb-4">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              IIs the company subject to appropriate regulation with respect to combating money laundering?
            </label>

            <div class="w-3/5 flex items-center space-x-0">
              <el-radio-group v-model="financialInstitution.is_regulated" class="!w-full  ">
                <el-radio :label="3" border class="flex-1 !h-[3rem] !px-4 ">Yes</el-radio>
                <el-radio :label="6" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
              </el-radio-group> 
            </div>
          </div>

          <div class="mb-4">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Is the company subject to appropriate prudential supervision?
            </label>

            <div class="w-3/5 flex items-center space-x-0">
              <el-radio-group v-model="financialInstitution.is_supervised" class="!w-full  ">
                <el-radio :label="3" border class="flex-1 !h-[3rem] !px-4 ">Yes</el-radio>
                <el-radio :label="6" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
              </el-radio-group> 
            </div>
          </div>

          <div class="mb-4">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Has the company been under investigation regarding money laundering/terrorist financing    irrespective of whether a report was filed to local authorities or not?
            </label>

            <div class="w-3/5 flex items-center space-x-0">
              <el-radio-group v-model="financialInstitution.is_under_investigation" class="!w-full  ">
                <el-radio :label="3" border class="flex-1 !h-[3rem] !px-4 ">Yes</el-radio>
                <el-radio :label="6" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
              </el-radio-group> 
            </div>
          </div>
          
          <div class="mb-4">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Upload Director`s passport 
            </label>

            <div class="w-3/5 flex items-center space-x-4">
              <div class="relative w-1/2 bg-input-bg  rounded"> 
                <el-input
                  v-model="financialInstitution.directors_passport"
                  class="!w-full flex-1 !h-[3rem] bg-transparent"
                  size="large"
                  placeholder="Click to upload files here " 
                  type="file"
                  :prefix-icon="UploadIcon"
                /> 
              </div>
            
              <div v-if="financialInstitution.directors_passport" class="flex-1 text-success-500">attached successfully</div>
            </div>
          </div>  -->
        </form>


        <!--  -->
        <div 
          class="flex justify-end items-center space-x-4 mt-8" 
          :class="activeStep == 1 && 'justify-between'"
        >
          <Button text="back"  v-if="activeStep == 1" class="!w-auto !px-8 !bg-transparent border-2 border-secondary-500 !text-secondary-500"  @click="activeStep--" /> 

          <Button text="Continue"  class="!w-auto !px-8 flex-end !text-white" @click="nextStep"/> 
        </div>
      </div> 
    </div>
  </div>
</template>

<script setup lang="ts">  
import { useAuthStore } from '~/store/authentication'  
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core'; 
import { useLayoutStore } from '~/store/layout'  
const { updateAuthCardSize } = useLayoutStore()

const { verifyKYC, updateKYC } =  useKYCApi() 
const { uploadFile } =  useCommonApi() 
const { kycData, loadKYCDataFromLocalStorage, setKYCData } = useAuthStore()

definePageMeta({ layout: "auth" });  
 
//  
const showLivenessCheck: Ref<boolean>  = ref(false);
const compKey: Ref<number> = ref(345466); // can be any random number
const profile: Ref<object | any> = ref({});
const errors: Ref<object> = ref({});
const showPassword: Ref<boolean> = ref(false);
const activeStep: Ref<number> = ref(0);
const loading: Ref<boolean> = ref(false);  
const isUploading: Ref<boolean> = ref(false)
const fileType: Ref<string> = ref('all') 
const documentType: Ref<any> = ref(null)
 
// 
const kycPayload: Ref<any> = ref({
  first_name: "",
  last_name: "",
  address: "",
  nationality: "",
  email: "",
  power_of_attorney: null, 
  pep: null,
  international_passport: "",
  selfie: "https://res.cloudinary.com/vesseltrust/image/upload/v1684709155/kecmic",
  // selfie: "https://res.cloudinary.com/vesseltrust/image/upload/v1684709155/kecmic",
  // max_amount: "",
  // min_amount: "",
  payback_days: "",
  interest_rate: 0,
  phone_number: "",
  company_name: "",
  company_reg_number: "",
  company_country: "",
  company_address: "",
  company_financial_intermediary: "",
  aml_appropriate_regulation: "",
  appropriate_prudential_supervision: "",
  investigated_for_money_laundering: "",
  director_passport: "",
  passport_number: "",
  recaptchaToken:  ""
})
 
const nationality = ref('')

const countries = ref([
  {name: 'Nigeria'},
  {name: 'England'},
  {name: 'Argentina'},
  {name: 'Brazil'}, 
])

/* 
{
    "first_name":"weeeee",
    "last_name":"meeeee",
    "address":"living somewhere",
    "nationality":"living somewhere",
    "email":"ssswas@gmail.com",
    "phone_number":"+2348164629033",
    "power_of_attorney":"yes",
    "payback_days":"65",
    "interest_rate":24,
    "min_amount":"20000000",
    "max_amount":"200000000",
    "pep":"yes",
    "international_passport":"https://www.com/ass/",
    "company_name":"yes",
    "company_reg_number":"yes",
    "company_country":"yes",
    "company_address":"yes",
    "company_financial_intermediary":"yes",
    "aml_appropriate_regulation":"yes",
    "appropriate_prudential_supervision":"yes",
    "investigated_for_money_laundering":"yes",
    "selfie":"https://www.com/ass/",
    "director_passport":"https://www.com/ass/",
    "passport_number":"YES",
    "recaptchaToken": "true"

}
*/
 
// rules  
const authourizedRepRules = {
    first_name: { required },
    last_name: { required }, 
    address: { required },
    nationality: { required },
    email: { required },
    power_of_attorney: { required },
    pep: { required },
    international_passport: { required },
    selfie: { required }, 
  } 
const finiancialInstistutionRules = computed(() => {
   return {
    first_name: { required },
    last_name: { required }, 
    address: { required },
    nationality: { required },
    email: { required, email },
    power_of_attorney: { required },
    pep: { required },
    international_passport: { required },
    selfie: { required }, 
  };
}) 

//  validation
const vRep$ = useVuelidate(authourizedRepRules, kycPayload.value);
const finInst$ = useVuelidate(finiancialInstistutionRules, kycPayload.value);

//  watch  
// Watch for changes in the kycPayload object
watch(kycPayload, (newValue) => {  
  setKYCData(newValue)
}, { deep: true }); // Use the deep option to watch nested properties


// functions
const handleUpload = async (event: Event | any) => { 
  const file = event.target.files[0]; 

  // if (!file) return 

  // const errorMessage = beforeUpload(file); 
  // if (errorMessage) return 

  await upload(file);  
}

const beforeUpload = ({ type, size }: any) => { 
  const imageTypes = ['image/jpeg', 'image/jpg'];
  const documentTypes = ['application/pdf'];

  let types =
    fileType.value == 'all'
      ? [...imageTypes, ...documentTypes]
      : fileType.value === 'image'
      ? imageTypes
      : documentTypes;

  let PNGincluded = false;

  // if (this.$route.path.includes('messages')) {
  //   types.push('image/png');
  //   PNGincluded = true;
  // }

  const validType = types.includes(type);
  if (!validType) return (`Upload only PDF, ${PNGincluded && 'PNG'} 'JPG or JPEG files!'`);
  const fileSize = size / 1024 / 1000; 
  if (fileSize > 2) return 'This file exceeds the maximum size of 2MB'

  documentType.value = type;

  return null;
}
const upload = async (file: any) => { 
  let formData = new FormData();
  formData.append('doc', file);
 
  const response = await  uploadFile(formData)
  const { data, error } = response  

  console.log("error:::", error) 
  console.log("data:::", data) 
  console.log("response:::", response) 

   
//   {
//     "status": true,
//     "data": {
//         "file_url": "https://res.cloudinary.com/vesseltrust/image/upload/v1692274839/pjdnkiqtqph9zlmy3jtw.png"
//     },
//     "code": "VT200"
// }
} 

const nextStep = async () => { 
  // console.log("validity", vRep$.value) 
  // vRep$.value.$touch()   
  // if (vRep$.value.$error ) return console.log("vRep$.value.$errors:::", vRep$.value.$errors)
 
  // activeStep.value = 1
  
  const payload = {
    "first_name":"Santos",
    "last_name":"Cristiano",
    "address":"living somewhere in the hood .... ",
    // "gender":"male",
    // "nationality":"living somewhere",
    // "email":"scripts@mailinator.com",
    // "phone_number":"+2348136029708",
    // "power_of_attorney":"yes",
    // "payback_days":"65",
    // "interest_rate":24,
    // "min_amount":"20000000",
    // "max_amount":"200000000",
    // "pep":"yes",
    // "international_passport":"https://res.cloudinary.com/demo/image/upload/sample.jpg",
    // "company_name":"yes",
    // "company_reg_number":"444242",
    // "company_country":"yes",
    // "company_address":"yes",
    // "company_financial_intermediary":"yes",
    // "aml_appropriate_regulation":"yes",
    // "appropriate_prudential_supervision":"yes",
    // "investigated_for_money_laundering":"yes",
    // "selfie":"https://res.cloudinary.com/demo/image/upload/sample.jpg",
    // "director_passport":"https://res.cloudinary.com/demo/image/upload/sample.jpg",
    // "passport_number":"4544646464",
    // "recaptchaToken": "true"
  }

  console.log('started api call')
  const response = await  updateKYC(payload)
  const { data, error } = response
  console.log("data:::", data)
  if (error) return console.log("error:::", error);
 
  console.log("data:::", data) 
} 

const retoreSession = async  () => {    
    const kycInStorage = localStorage.getItem('kycData'); 

    if (!kycInStorage) return;
    const deserializedData = JSON.parse(kycInStorage);

    if (Object.keys(deserializedData).length > 0) { 
      kycPayload.value = deserializedData; 
    } else { 
      return setKYCData(kycPayload.value)   
    }
}


const toggleLivenessCheck = () => { 
  if (showLivenessCheck.value) profile.value.selfie = null; 

  // re-render component to reset it
  compKey.value++;
  showLivenessCheck.value = !showLivenessCheck.value;
}
 
const getSelfie = (selfie: any) => {  
  profile.value.selfie = selfie; 
}


// lifecycle
onBeforeMount(async () => { 
  updateAuthCardSize('md') 
  retoreSession() 
})  
</script>

<style scoped>
.input-field {
  @apply w-full flex-1 bg-transparent rounded leading-5 block text-sm py-3.5 outline-0 border-0 ring-0  focus:border-0 focus:ring-0 focus:outline-0;
}
.input-field.error {
  @apply  border border-error-500 text-red-500;
}
.input-field.success {
  @apply  border border-success-500 bg-success-50;
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


.el-input--large.el-input--suffix {
  background: transparent;
}

.el-input--large.el-input--suffix.is-focus>.el-input__wrapper.is-focus,
.el-input--large.el-input--suffix>.el-input__wrapper {
  padding: 1px 15px;
  background: transparent;
  border: 0;
  outline: none;
  box-shadow: none !important;
}  
.el-input-group--prepend .el-input-group__prepend .el-select .el-input .el-input__wrapper { 
    height: 3rem;
}
::file-selector-button {
  display: none;
}  
</style>