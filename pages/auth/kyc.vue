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
            Hi, {{kycPayload.email}}! Take some minutes to setup your account,
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
        <form class="mt-8" v-show="activeStep == 0">
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
                  v-model.trim="kycPayload.first_name"
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
                  v-model.trim="kycPayload.last_name" 
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
                  <Avatar 
                    :name="`${customerNationalityISO2}_16`"
                    :isSubFolder="true"
                    subfolderPath="flags" 
                  />
                </span>

                <el-select 
                  v-model="kycPayload.nationality" 
                  class="p-1 !bg-transparent !focus:text-black  !w-full"
                  placeholder="Select Country"
                  size="large" 
                  remote
                  filterable
                  remote-show-suffix
                  default-first-option
                  :loading="loading"
                  :remote-method="handleCountrySearch"
                  loading-text="Loading Countries"
                  no-match-text="No country match... check spelling"
                  no-data-text="No match"
                >
                  <!-- reserve-keyword  -->
                  <el-option 
                    v-for="country in countries" 
                    :key="country.name" 
                    :label="country.name" 
                    :value="country.name" 
                    :name="country.value" 
                    @click="getCountryCode(country, 'customer')"
                  />
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
                  <div class=" flex space-x-1 items-center">
                    <Avatar 
                      :name="`${customerNationalityISO2}_16`"
                      :isSubFolder="true"
                      subfolderPath="flags"
                    />

                    <TypoNormalText> {{customerCountryCode}} </TypoNormalText>
                  </div>
                  <!-- <el-select v-model="kycPayload.nationality?.phone_code" :placeholder="kycPayload.nationality?.phone_code " class="w-[5rem]">   -->
                  <!-- <el-select 
                    filterable
                    remote
                    reserve-keyword 
                    :placeholder="customerCountryCode" 
                    class="w-[5rem]" 
                    disabled
                  >   
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
                  </el-select> -->
                </template> 
              </el-input>
            </div> 
          </div>

          <div class="mb-4 flex items-center space-x-4">
            <div class="flex-1">
              <label for="min_amount" class="block mb-2 leading-6 text-grey-500">
                Minimum Amount
              </label>

              <div class="relative bg-input-bg w-full rounded">
                <input 
                  id="min_amount"
                  type="text" 
                  class="input-field !pl-4 pr-4" 
                  placeholder="enter minimum amount" 
                  v-model="kycPayload.min_amount"
                />   
              </div>  
            </div>

            <div class="flex-1">
              <label for="max_amount" class="block mb-2 leading-6 text-grey-500">
                Maximum Amount
              </label>

              <div class="relative bg-input-bg w-full rounded">
                <input 
                  id="max_amount"
                  type="text" 
                  class="input-field !pl-4 pr-4" 
                  placeholder="enter maximum amount" 
                  v-model="kycPayload.max_amount"
                />   
              </div>  
            </div> 
          </div>
          
          <div class="mb-4 flex items-center space-x-4">
            <div class="flex-1">
              <label for="payback_days" class="block mb-2 leading-6 text-grey-500">
                Payback Days
              </label>

              <div class="relative bg-input-bg w-full rounded">
                <input 
                  id="payback_days"
                  type="text" 
                  class="input-field !pl-4 pr-4" 
                  placeholder="enter payback days" 
                  v-model="kycPayload.payback_days"
                />   
              </div>  
            </div> 

            <div class="flex-1">
              <label for="interest_rate" class="block mb-2 leading-6 text-grey-500">
                Interest Rate
              </label>

              <div class="relative bg-input-bg w-full rounded">
                <input 
                  id="interest_rate"
                  type="text" 
                  class="input-field !pl-4 pr-4" 
                  placeholder="enter payback days" 
                  v-model="kycPayload.interest_rate"
                />   
              </div>
            </div> 
          </div>

          <div class="mb-4 flex items-center space-x-4">
            <div class="w-1/2">
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
                  readonly
                  placeholder="example@gmail.com"  
                  :value="kycPayload.email" 
                  :class="{
                    'error': vRep$.email.$error || vRep$.email.$dirty,
                    'success': !vRep$.email.$dirty,
                  }" 
                />
                <span class="icon icon-right" v-if="!vRep$.email.$dirty" :class="!vRep$.email.$dirty && 'text-success-500'" >
                  <IconCheckbox type="square" />
                </span> 
                <!-- <pre>
                {{kycPayload}}
                </pre> -->
                  <!-- :class="{
                    'error': vRep$.email.$error || vRep$.email.$invalid,
                    'success': !vRep$.email.$invalid,
                  }"  -->

                <!-- <span class="icon icon-right" v-if="!vRep$.email.$invalid" :class="!vRep$.email.$invalid && 'text-success-500'" >
                  <IconCheckbox type="square" />
                </span> -->
              </div>

              <!-- {{kycPayload.email}} 
                {{vRep$.email.$dirty}} 
                {{vRep$.email.$error}}  -->
            </div>
 
            <div class="flex-1">
              <label for="passport_number" class="block mb-2 leading-6 text-grey-500">
                Passport Number
              </label>

              <div class="relative bg-input-bg w-full rounded">
                <input 
                  id="passport_number"
                  type="text" 
                  class="input-field !pl-4 pr-4" 
                  placeholder="enter passport number" 
                  v-model="kycPayload.passport_number"
                />   
              </div>  
            </div> 
          </div>
  
          <div class="mb-4">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Does the authorized representative hold a power of attorney?
            </label>

            <div class="w-3/5 flex items-center space-x-0">
              <el-radio-group v-model="kycPayload.power_of_attorney" class="!w-full  ">
                <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4 ">Yes</el-radio>
                <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
              </el-radio-group> 
            </div> 
          </div>
  
          <div class="mb-4">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Is the authorized representative/signatory considered a politically exposed person(PEP)?   
            </label>

            <div class="w-3/5 flex items-center space-x-4">
              <el-radio-group v-model="kycPayload.pep" class="!w-full  ">
                <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4 ">Yes</el-radio>
                <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
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
                />   

                  <!-- @change="handleUpload" -->
                <!-- <div v-if="kycPayload.international_passport" class="flex-1 text-success-500">attached successfully</div> -->
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
        <form class="mt-8"  v-show="activeStep == 1">
          <div class="mb-4 flex items-center space-x-4">
            <div class="flex-1">
              <label for="company_name" class="block mb-2 leading-6 text-grey-500">
                Company name on the commercial register
              </label>

              <div class="relative bg-input-bg w-full rounded"> 
                <input id="company_name" type="text" class="input-field px-4" placeholder="Company name" v-model="kycPayload.company_name" />
              </div>
            </div>

            <div class="flex-1">
              <label for="reg_number" class="block mb-2 leading-6 text-grey-500">
                Company registration number
              </label>

              <div class="relative bg-input-bg w-full rounded"> 
                <input id="reg_number" type="text" class="input-field px-4" placeholder="Registration number"  v-model="kycPayload.company_reg_number" />
              </div>
            </div>
          </div>

          <div class="mb-4 flex items-center space-x-4">
            <div class="w-1/2">
              <label for="company_country" class="block mb-2  leading-6 text-grey-500">
                Company Country
              </label>

              <div class="relative bg-input-bg w-full pl-8 rounded">
                <span class="icon icon-left text-grey-300"> 
                  <Avatar 
                    :name="`${companyCountryISO2}_16`"
                    :isSubFolder="true"
                    subfolderPath="flags"
                  />
                </span>

                <el-select 
                  v-model="kycPayload.company_country" 
                  class="p-1 !bg-transparent !focus:text-black  !w-full"
                  placeholder="Select"
                  size="large"
                  remote
                  filterable
                  remote-show-suffix
                  :loading="loading"
                  :remote-method="handleCountrySearch"
                  loading-text="Loading Countries"
                  no-match-text="No country match... check spelling"
                  no-data-text="No match"
                >
                  <el-option 
                    v-for="country in countries" 
                    :key="country.name" 
                    :label="country.name" 
                    :value="country.name" 
                    :name="country.value"  
                    @click="getCountryCode(country, 'company')"
                  />
                </el-select> 
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

              <input 
                id="domicile_address" 
                v-model="kycPayload.company_address" 
                class="input-field !pl-12 pr-4" 
                type="text"
                placeholder="enter your company Domicile address" 
              />
            </div>
          </div>

          <div class="mb-4">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Is the company considered a financial intermediary?
            </label>

            <div class="w-3/5 flex items-center space-x-0">
              <el-radio-group v-model="kycPayload.company_financial_intermediary" class="!w-full  ">
                <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4 ">Yes</el-radio>
                <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
              </el-radio-group> 
            </div>
          </div>

          <div class="mb-4">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              IIs the company subject to appropriate regulation with respect to combating money laundering?
            </label>

            <div class="w-3/5 flex items-center space-x-0">
              <el-radio-group v-model="kycPayload.aml_appropriate_regulation" class="!w-full  ">
                <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4 ">Yes</el-radio>
                <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
              </el-radio-group> 
            </div>
          </div>

          <div class="mb-4">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Is the company subject to appropriate prudential supervision?
            </label>

            <div class="w-3/5 flex items-center space-x-0">
              <el-radio-group v-model="kycPayload.appropriate_prudential_supervision" class="!w-full  ">
                <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4 ">Yes</el-radio>
                <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
              </el-radio-group> 
            </div>
          </div>

          <div class="mb-4">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Has the company been under investigation regarding money laundering/terrorist financing    irrespective of whether a report was filed to local authorities or not?
            </label>

            <div class="w-3/5 flex items-center space-x-0">
              <el-radio-group v-model="kycPayload.investigated_for_money_laundering" class="!w-full  ">
                <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4 ">Yes</el-radio>
                <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
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
                  v-model="director_passport"
                  class="!w-full flex-1 !h-[3rem] bg-transparent"
                  size="large"
                  placeholder="Click to upload files here " 
                  type="file"
                  :prefix-icon="IconUpload"
                /> 
              </div>
            
              <div v-if="kycPayload.director_passport" class="flex-1 text-success-500">attached successfully</div>
            </div>
          </div>  
       </form> 

        <!--  -->
        <div 
          class="flex justify-end items-center space-x-4 mt-8" 
          :class="activeStep == 1 && 'justify-between'"
        >
          <Button 
            text="back" 
            v-if="activeStep == 1" 
            class="!w-auto !px-8 !bg-transparent border-2 border-secondary-500 !text-secondary-500"  
            @click="activeStep--" 
          /> 

          <Button 
            :text="activeStep == 0 ? 'Continue' : 'Verify KYC'" 
            class="!w-auto !px-8 flex-end !text-white" 
            @click="nextStep"
            :loading="isVerifying"
          /> 
        </div>
      </div> 
    </div>
  </div>
</template>

<script setup lang="ts">  
definePageMeta({ layout: "auth" });  

import { useConstantsStore } from '~/store/constants'  
import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core'; 
import { useAuthStore } from '~/store/authentication'  
import { useLayoutStore } from '~/store/layout'  

const { $toast } = useNuxtApp()
const router = useRouter()
const { verifyKYC } =  useKYCApi() 
const { uploadFile, getConstantData } =  useCommonApi() 
const { updateAuthCardSize } = useLayoutStore() 
const { authenticatedUser, kycData, setKYCData } = useAuthStore()


const international_passport = ref(null)
const selfie = ref(null)
const director_passport = ref(null)
  
//  
const showLivenessCheck: Ref<boolean>  = ref(false);
const compKey: Ref<number> = ref(345466); // can be any random number
const profile: Ref<object | any> = ref({});
const errors: Ref<object> = ref({});
const showPassword: Ref<boolean> = ref(false);
const activeStep: Ref<number> = ref(0);
const loading: Ref<boolean> = ref(false);  
const isUploading: Ref<boolean> = ref(false);
const isVerifying: Ref<boolean> = ref(false);
const fileType: Ref<string> = ref('all');
const documentType: Ref<any> = ref(null);
const countries = ref([]) 
const customerCountryCode = ref('')  
const customerNationalityISO2 = ref('')  
const companyCountryISO2 = ref('')  
const kycPayload: Ref<any> = ref({
  first_name: "",
  last_name: "",
  address: "",
  nationality: "",
  email: "",
  phone_number: "", 
  min_amount: "",
  max_amount: "",
  power_of_attorney: '', 
  pep: '',
  international_passport: "https://res.cloudinary.com/vesseltrust/image/upload/v1684709155/kecmic",
  selfie: "https://res.cloudinary.com/vesseltrust/image/upload/v1684709155/kecmic", 
  payback_days: "",
  interest_rate: 0,
  company_name: "",
  company_reg_number: "",
  company_country: "",
  company_address: "",
  company_financial_intermediary: "",
  aml_appropriate_regulation: "",
  appropriate_prudential_supervision: "",
  investigated_for_money_laundering: "",
  director_passport: "https://res.cloudinary.com/vesseltrust/image/upload/v1684709155/kecmic",
  passport_number: "",
  recaptchaToken:  "true"
}) 
 

// computed
const authUser = computed(() => authenticatedUser?.profile)
const allCountries = computed(() => useConstantsStore().countries)
 

//  watch  
// Watch for changes in the kycPayload object
watch(kycPayload, (newValue) => {  
  setKYCData(newValue) 
}, { deep: true }); // Use the deep option to watch nested properties


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


// functions
// 
const getCountryCode = (selectedCountry: any, user: string) => { 
  customerCountryCode.value = selectedCountry.phone_code

  if (user == 'customer') customerNationalityISO2.value = selectedCountry.iso2.toLowerCase()
  if (user == 'company') companyCountryISO2.value = selectedCountry.iso2.toLowerCase()
}
// 
const handleUpload = async (event: Event | any) => { 
  const file = event.target.files[0]; 

  // if (!file) return 

  // const errorMessage = beforeUpload(file); 
  // if (errorMessage) return 

  await upload(file);  
}
// 
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
// 
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
// 
const nextStep = async () => { 
  // console.log("validity", vRep$.value) 
  // vRep$.value.$touch()   
  // if (vRep$.value.$error ) return console.log("vRep$.value.$errors:::", vRep$.value.$errors)
  if (activeStep.value < 1) return  activeStep.value = 1 
  isVerifying.value = true
 
  const response = await  verifyKYC(kycPayload.value)
  const { data, error } = response

  isVerifying.value = false 
  if (error) return  $toast('show', { type: "error", message: error.message  })
 
  $toast('show', { type: "success", message: data.message || `Login Successful`}) 
  router.push("/dashboards")
} 
// 
const retoreSession = async  () => {    
  const kycInStorage = localStorage.getItem('kycData');  
  
  if (!kycInStorage) return kycPayload.value.email = authUser.value?.email

  const deserializedData = JSON.parse(kycInStorage);

  if (Object.keys(deserializedData).length > 0) {
    kycPayload.value = deserializedData; 
    if (authUser.value?.email) kycPayload.value.email = authUser.value.email 
    // get country code
    allCountries.value.forEach((country: any) => {
      // for customer
      if (country.name == kycPayload.value.nationality) {
        customerCountryCode.value = country.phone_code
        customerNationalityISO2.value = country.iso2.toLowerCase()
      } 
      // for company
      if (country.name == kycPayload.value.company_country) { 
        companyCountryISO2.value = country.iso2.toLowerCase()
      }
    })
    if (!customerCountryCode.value) customerCountryCode.value = "+234"
  } else {   
    setKYCData(kycPayload.value)   
    if (authUser.value?.email) kycPayload.value.email = authUser.value?.email
  }  
}
// 
const toggleLivenessCheck = () => { 
  if (showLivenessCheck.value) profile.value.selfie = null; 
 
  compKey.value++;
  showLivenessCheck.value = !showLivenessCheck.value;
}
//  
const getSelfie = (selfie: any) => {  
  profile.value.selfie = selfie; 
} 
// 
const handleCountrySearch = (query: string) => {
  if (query) {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      countries.value = allCountries.value.filter((country: any) => {
        return country.name.toLowerCase().includes(query.toLowerCase())
      })
    }, 50)
  }  else {
    countries.value = allCountries.value
  }
}
// lifecycle
onBeforeMount(async () => { 
  updateAuthCardSize('md')  
  countries.value = allCountries.value
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