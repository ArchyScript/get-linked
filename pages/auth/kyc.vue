<template>
  <div class="bg-white rounded box-shadow p-8">
    <div class="text-sm p-1">
      <div class="flex-col space-y-6">
        <p class="text-center text-grey-400 leading-6">
          Hi, Badmusfrank@sample.com! Take some minutes to setup your account,
          kindly complete KYC information below to enable you Fund offers on our
          marketplace.
        </p>

        <div class=" w-2/3 mx-auto">
          <el-steps :active="activeStep" finish-status="success" class="w-full">
            <el-step />
            <el-step />
          </el-steps>
        </div> 

        <h4 class="text-center text-grey-500 text-xl font-medium leading-6">
          {{ activeStep == 0 ? `Authorized representative / signatories details` : `Financial Institute details`}}
        </h4>
      </div>

      <!-- Step 1 -->
      <form class="mt-8" v-if="activeStep == 0">
        <div class="mb-4 flex items-center space-x-4">
          <div class="flex-1">
            <label for="firstname" class="block mb-2 leading-6 text-grey-500">
              First Name
            </label>

            <div class="relative bg-input-bg w-full rounded">
              <span class="icon icon-left text-grey-300">
                <IconUser />
              </span>

              <input id="firstname" type="text" class="input-field !pl-12 pr-4" placeholder="enter first name" />
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

              <input id="lastname" type="text" class="input-field !pl-12 pr-4" placeholder="enter last name" />
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

            <input id="address" v-model="authourizedRep.address" class="input-field !pl-12 pr-4" type="text"
              placeholder="enter your permanent address" />
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
              <el-select v-model="authourizedRep.nationality" class="p-1 !bg-transparent !focus:text-black  !w-full"
                placeholder="Select" size="large">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>

          <div class="flex-1">
           <label for="phone_number" class="block mb-2  leading-6 text-grey-500">
              Phone Number
            </label>


            <el-input
              v-model="authourizedRep.phone_number"
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
            <span class="icon icon-left">
              <IconEmail />
            </span>

            <input id="email" v-model="authourizedRep.email" class="input-field !px-12 " type="email"
              placeholder="example@gmail.com" />

            <span class="icon icon-right" @click="showPassword = !showPassword">
              <IconCheckbox type="square" />
            </span>
          </div>
        </div>

        <div class="mb-4">
          <label for="email" class="block mb-2 leading-6 text-grey-500">
            Does the authorized representative hold a power of attorney?
          </label>

          <div class="w-3/5 flex items-center space-x-0">
            <el-radio-group v-model="authourizedRep.is_attorney" class="!w-full  ">
              <el-radio :label="3" border class="flex-1 !h-[3rem] !px-4 ">Yes</el-radio>
              <el-radio :label="6" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
            </el-radio-group> 
          </div>
        </div>
 
        <div class="mb-4">
          <label for="email" class="block mb-2 leading-6 text-grey-500">
           Is the authorized representative/signatory considered a politically exposed person(PEP)?   
           </label>

          <div class="w-3/5 flex items-center space-x-4">
            <el-radio-group v-model="authourizedRep.is_PEP" class="!w-full  ">
              <el-radio :label="3" border class="flex-1 !h-[3rem] !px-4 ">Yes</el-radio>
              <el-radio :label="6" border class="flex-1  !h-[3rem] !px-4">No</el-radio>
            </el-radio-group> 
          </div>
        </div>

        <div class="mb-4">
          <label for="email" class="block mb-2 leading-6 text-grey-500">
            Upload International passport of authorized representative
          </label>

          <div class="w-3/5 flex items-center space-x-4">
            <div class="relative w-1/2 bg-input-bg  rounded"> 
              <el-input
                v-model="authourizedRep.passport_file"
                class="!w-full flex-1 !h-[3rem] bg-transparent"
                size="large"
                placeholder="Click to upload files here " 
                type="file"
                :prefix-icon="UploadIcon"
              /> 
            </div>
          
            <div v-if="authourizedRep.passport_file" class="flex-1 text-success-500">attached successfully</div>
          </div>
        </div>
  
         <div class="mb-4">
          <label for="email" class="block mb-2 leading-6 text-grey-500">
            Click on the button below to verify liveness
          </label> 

          <Button text="Verify liveness" :hasIcon="true" iconName="camera"  class="!w-auto !px-8 !bg-primary-500 !text-white" :disabled="!areFieldsValidated" :loading="loading" /> 
        </div>
      </form>

      <!-- Step 2 -->
      <form class="mt-8" v-else-if="activeStep = 1">
        <div class="mb-4 flex items-center space-x-4">
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
        </div> 
      </form>


      <!--  -->
      <div 
        class="flex justify-end items-center space-x-4 mt-8" 
        :class="activeStep == 1 && 'justify-between'"
      >
        <Button text="back"  v-if="activeStep == 1" class="!w-auto !px-8 !bg-transparent border-2 border-secondary-500 !text-secondary-500 !text-white"  @click="activeStep = 0" /> 

        <Button text="Continue"  class="!w-auto !px-8 flex-end !text-white" @click="activeStep = 1"/> 
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"> 
import UploadIcon from "~/components/icon/upload.vue";
import { useLayoutStore } from '~/store/layout'  
definePageMeta({ layout: "auth" }); 
 
const { updateAuthCardSize } = useLayoutStore()
const showPassword: Ref<boolean> = ref(false);
const activeStep: Ref<number> = ref(0);
const loading: Ref<boolean> = ref(false);
const authourizedRep = ref({
  firstname: "",
  lastname: "",
  email: "",
  address: "",
  nationality: "",
  phone_number: "",
  is_PEP: null,
  is_attorney: null,
  passport_file: null
});
const financialInstitution =  ref({
  name: "",
  reg_no: '',
  address: "",
  is_financial_intermediary: null,
  is_regulated: null,
  is_supervised: null,
  is_under_investigation: null,
  directors_passport: null
})

const nationality = ref('')
const options = ref([
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
])

const areFieldsValidated = computed(() => {
  if (!authourizedRep.value.email) return false
  return true
})

const nextStep = () => {
  // if (activeStep.value > 1) return
  if (activeStep.value++ > 0) activeStep.value = 0
}

// 
const login = async () => {
  loading.value = true

  setTimeout(() => {
    loading.value = false
    console.log(authourizedRep.value)
  }, 1500);
};

//  focus:bg-transparent focus:ring-secondary-400 focus:ring-1  

onBeforeMount(() => updateAuthCardSize('md'))
</script>

<style  >
.input-field {
  @apply w-full flex-1 bg-transparent rounded leading-5 block text-sm py-3.5 outline-0 border-0;
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