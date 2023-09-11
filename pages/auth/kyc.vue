<template>
  <div> 
    <div>  
      <!-- Full screen loader -->
      <Modal  
        v-if="isUploading"
        :loading="isUploading" 
        size="sm"
        id="file-upload"
        @close="closeModal" 
      >   
        <ModalsProcessing :loading="isUploading"  message="Uploading file to server..." />
      </Modal>
      
      <!-- Modals here -->
      <Modal 
        v-if="activeModal == 'kyc-verification'"
        size="sm"
        id="kyc-registeration"
        @close="closeModal" 
      >   
        <ModalsProcessing 
          v-if="isVerifyingKYC" 
          message="Verifying KYC..."
        />
   
        <template v-else>    
          <ModalsResponses 
            v-if="failedVerificationMessage"
            type="error" 
            titleText="KYC Verification Failed" 
            :message="failedVerificationMessage"
            btnContinueText="Try again" 
            @next="startKycVerification"
            @close="closeModal"
          />   

          <ModalsResponses
            v-else 
            :message="successVerificationMessage"
            :hasTitle="false" 
            @next="gotoDashboard" 
          />
        </template>
      </Modal>

      <Modal
        v-if="activeModal == 'liveness-verification'"
        id="liveness-verification"
        size="md"
        @close="closeModal"
      >
        <KycLivenessCheck @done="getSelfie" @close="closeModal" />  
      </Modal>
    </div> 

    <div class="bg-white rounded box-shadow p-8 w-[49.375rem] mx-auto">
      <div class="text-sm p-1">
        <div class="flex-col space-y-8">
          <p class="text-center text-grey-400 leading-6">
            Hi, {{kycPayload.email}}! Take some minutes to setup your account,
            kindly complete KYC information below to enable you Fund offers on our
            marketplace. 
          </p>
 
          <div class=" w-2/3 mx-auto"> 
            <el-steps :active="activeStep" finish-status="pending" class="w-full">
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
                Nationality {{customerNationalityISO2}}
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
                  :loading="isFilteringCountry"
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
              <label class="block mb-2 leading-6 text-grey-500">
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
            <label class="block mb-2 leading-6 text-grey-500">
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
            <label class="block mb-2 leading-6 text-grey-500">
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
            <h4 class="block mb-2 leading-6 text-grey-500">
              Upload International passport of authorized representative
            </h4>

            <div class="w-3/5 flex items-center space-x-4">
              <label 
                for="international_passport" 
                class="flex rounded border-[1.5px] py-[13px] select-none px-4 space-x-4 cursor-pointer items-center"
                :class="kycPayload.international_passport ? 'border-secondary-500 text-secondary-500 border-2' : 'border-grey-200 text-grey-200 border-[1.5px]'"
              > 
                <IconUpload :height="22" :width="22" /> 

                <span> 
                  {{ kycPayload.international_passport ? 'Change attachment' : 'Click to upload files here' }}
                </span>
              </label>

              <input 
                id="international_passport"
                type="file"  
                class="hidden" 
                @change="(event) => handleUpload(event, 'international_passport')"
              />
                
              <div v-if="kycPayload.international_passport" class="flex-1 text-success-500 capitalize">attached successfully</div>
            </div>
          </div>
    
          <div class="mb-4">
            <label class="block mb-2 leading-6 text-grey-500">
              Click on the button below to verify liveness
            </label>   

            <div class="flex items-center space-x-4"> 
              <Button text="Verify liveness" @click="openModal('liveness-verification')"  :hasIcon="true" iconName="camera"  class="!w-auto !px-8 !bg-primary-500 !text-white"/>  
              
              <div v-if="kycPayload.selfie" class="flex-1 text-success-500 capitalize">Verified</div>
            </div>
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
                  :loading="isFilteringCountry"
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
            <label class="block mb-2 leading-6 text-grey-500">
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
            <label class="block mb-2 leading-6 text-grey-500">
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
            <label class="block mb-2 leading-6 text-grey-500">
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
            <label class="block mb-2 leading-6 text-grey-500">
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
            <label class="block mb-2 leading-6 text-grey-500"> 
              Upload Director`s passport  
            </label>

            <div class="w-3/5 flex items-center space-x-4"> 
              <label 
                for="director_passport" 
                class="flex rounded py-[13px] px-4 space-x-4 select-none cursor-pointer !items-center"
                :class="kycPayload.director_passport ? 'border-secondary-500 text-secondary-500 border-2' : 'border-grey-200 text-grey-200 border-[1.5px]'"
              > 
                <IconUpload :height="22" :width="22" /> 

                <span> 
                  {{ kycPayload.director_passport ? 'Change attachment' : 'Click to upload files here' }}
                </span>
              </label>

              <input 
                id="director_passport"
                type="file"  
                class="hidden" 
                @change="(event) => handleUpload(event, 'director_passport')"
              />   
            
              <div v-if="kycPayload.director_passport" class="flex-1 text-success-500 capitalize">attached successfully</div>
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
          />
        </div>
      </div> 
    </div>
  </div>
</template>

<script setup lang="ts">  
definePageMeta({ layout: "auth" });  

import { required, email, minLength, maxLength, helpers } from '@vuelidate/validators';
import { useVuelidate } from '@vuelidate/core'; 
import { useConstantsStore } from '~/store/constants'  
import { useAuthStore } from '~/store/authentication'   
import { beforeFileUpload } from '~/utils/upload'   

const { $toast } = useNuxtApp()
const router = useRouter()
const { verifyKYC } =  useKYCApi() 
const { uploadFile, getConstantData } =  useCommonApi()  
const { authenticatedUser, setKYCData } = useAuthStore() 
   
const activeModal: Ref<string> = ref('');   
const failedVerificationMessage: Ref<any>  = ref(null);  
const successVerificationMessage: Ref<any>  = ref(null);  
const isVerifyingKYC: Ref<boolean> = ref(false);
const showLivenessCheck: Ref<boolean>  = ref(false);
const activeStep: Ref<number> = ref(0);  
const isFilteringCountry: Ref<boolean> = ref(false);  
const isUploading: Ref<boolean> = ref(false); 
const countries = ref([]) 
const fileToBeUploaded = ref('')    
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
  international_passport: "",
  selfie: "", 
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
  director_passport: "", 
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
const closeModal = () => activeModal.value = ""   
const toggleLivenessCheck = () => showLivenessCheck.value = !showLivenessCheck.value
const getCountryCode = (selectedCountry: any, user: string) => { 
  customerCountryCode.value = selectedCountry.phone_code

  if (user == 'customer') customerNationalityISO2.value = selectedCountry.iso2.toLowerCase()
  if (user == 'company') companyCountryISO2.value = selectedCountry.iso2.toLowerCase()
}  
const setUploadedFileUrl = (image_url: string ) => {
  if (fileToBeUploaded.value == 'international_passport')
    return kycPayload.value.international_passport = image_url

  if (fileToBeUploaded.value == 'director_passport')
    return kycPayload.value.director_passport = image_url 
} 
const handleUpload = async (event: Event | any, activeFile: any) => {  
  fileToBeUploaded.value = activeFile 
  const file = event.target.files[0]; 
  
  if (!file) return $toast('show', { type: "warning", message: "No file selected"  })
  
  const errorMessage = beforeFileUpload(file, "image");    
  if (errorMessage) return $toast('show', { type: "error", message: errorMessage  })
 
  await upload(file);  
}  
const upload = async (file: any) => { 
  isUploading.value = true
  let formData = new FormData();
  formData.append('doc', file);
 
  const response = await  uploadFile(formData)
  const { data, error } = response   

  isUploading.value = false
  if (error) return $toast('show', { type: "error", message: error.message  })
  
  setUploadedFileUrl(data.file_url)
}  
const openModal = (active_modal: string) => {  
  activeModal.value = active_modal
  if (active_modal == 'kyc-verification') { 
    isVerifyingKYC.value = true
  }
}  
const nextStep = async () => { 
  // console.log("validity", vRep$.value) 
  // vRep$.value.$touch()
  // if (vRep$.value.$error ) return console.log("vRep$.value.$errors:::", vRep$.value.$errors)
  if (activeStep.value < 1) return  activeStep.value = 1   

  startKycVerification()
}   
const startKycVerification = async () => {
  openModal('kyc-verification') 

  const response = await  verifyKYC(kycPayload.value)
  const { data, error } = response 

  if (error) return handleError(error.message)  
  return handleSuccessfulVerification(data?.message || `Your KYC information is being reviewed by some of our experts, we will notify you about its progress shortly.`)  
} 
const getSelfie = (image_url: any) => {  
  if (!image_url) return $toast('show', { type: "error", message: `Something happened... Try again.`}) 

  kycPayload.value.selfie = image_url
  closeModal()
} 
const handleError = (message: string) => { 
  isVerifyingKYC.value = false
  failedVerificationMessage.value = message  
} 
const handleSuccessfulVerification = (message: string) => { 
  isVerifyingKYC.value = false
  failedVerificationMessage.value = null
  successVerificationMessage.value = message  
} 
const gotoDashboard = () => { 
  localStorage.removeItem("kycData")
  router.push("/dashboards")
} 
const handleCountrySearch = (query: string) => {
  if (query) {
    isFilteringCountry.value = true
    setTimeout(() => {
      isFilteringCountry.value = false
      countries.value = allCountries.value.filter((country: any) => {
        return country.name.toLowerCase().includes(query.toLowerCase())
      })
    }, 50)
  }  else {
    countries.value = allCountries.value
  }
}
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

    // if (!customerCountryCode.value) customerCountryCode.value = "+234"
  } else {   
    setKYCData(kycPayload.value)   
    if (authUser.value?.email) kycPayload.value.email = authUser.value?.email
  }  
} 
 
// lifecycle
onBeforeMount(async () => {  
  countries.value = allCountries.value
  retoreSession() 
})  
onMounted(() => {
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
</style>