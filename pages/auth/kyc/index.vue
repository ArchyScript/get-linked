<template>
  <div class="bg-white rounded box-shadow p-8">
    <div class="text-sm p-1">
      <div class="flex-col space-y-6">
        <p class="text-center text-grey-400 leading-6">
          Hi, Badmusfrank@sample.com! Take some minutes to setup your account,
          kindly complete KYC information below to enable you Fund offers on our
          marketplace.
        </p>

        <div class=" w-2/3 mx-auto  ">
          <el-steps :active="activeStep" finish-status="success" class="w-full ">
            <el-step />
            <el-step />
          </el-steps>
        </div>

        <IconEmail @click="nextStep" />

        <h4 class="text-center text-grey-500 text-xl font-medium leading-6">
          Authorized representative / signatories details
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

            <input id="address" v-model="payload.address" class="input-field !pl-12 pr-4" type="text"
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
              <el-select v-model="payload.nationality" class="p-1 !bg-transparent !focus:text-black  !w-full"
                placeholder="Select" size="large">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
          </div>

          <div class="flex-1">
            <label for="phone_number" class="block mb-2  leading-6 text-grey-500">
              Phone Number
            </label>

            <div class="relative bg-input-bg w-full pl-8 rounded">
              <span class="icon icon-left text-grey-300">
                <IconLocation />
              </span>
              <el-select v-model="payload.phone_number" class="p-1 !bg-transparent !focus:text-black  !w-full"
                placeholder="Select" size="large">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div>
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

            <input id="email" v-model="payload.email" class="input-field !px-12 " type="email"
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

          <div class="w-3/5 flex items-center space-x-4">
            <el-radio-group v-model="payload.is_attorney" class="!w-full space-x-4 ">
              <el-radio :label="3" size="large" border class="flex-1 !h-[50px] ">Option A</el-radio>
              <el-radio :label="6" size="large" border class="flex-1">Option B</el-radio>
            </el-radio-group>

            <!-- <div class="flex-1 bg-input-bg rounded">
              <input id="payback_period" type=" text" class="input-field px-4 flex-1" placeholder="Payback Period" />
            </div>

            <div class="flex-1 bg-input-bg rounded">
              <input id="payback_period" type=" text" class="input-field px-4 flex-1" placeholder="Payback Period" />
            </div> -->
          </div>
        </div>

        <div class="mb-4">
          <label for="email" class="block mb-2 leading-6 text-grey-500">
            Is the authorized representative/signatory considered a politically
            exposed person(PEP)?
          </label>

          <div class="w-3/5 flex items-center space-x-4">
            <div class="flex-1 bg-input-bg rounded">
              <input id="payback_period" type=" text" class="input-field px-4 flex-1" placeholder="Payback Period" />
            </div>

            <div class="flex-1 bg-input-bg rounded">
              <input id="payback_period" type=" text" class="input-field px-4 flex-1" placeholder="Payback Period" />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label for="email" class="block mb-2 leading-6 text-grey-500">
            Is the authorized representative/signatory considered a politically
            exposed person(PEP)?
          </label>

          <div class="w-4/5 flex items-center space-x-4">
            <div class="flex-1 bg-input-bg rounded">
              <input id="payback_period" type=" text" class="input-field px-4 flex-1" placeholder="Payback Period" />
            </div>

            <div class="flex-1 text-success-500">attached successfully</div>
          </div>
        </div>

        <!--  -->
        <div class="block w-full mt-6">
          <Button text="Log in" :disabled="!areFieldsValidated" :loading="loading" @click="login" />
        </div>
      </form>

      <!-- Step 2 -->
      <form class="mt-8" v-else-if="activeStep = 1">
        <div class="mb-4 flex items-center space-x-4">
          <div class="flex-1">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Email Address
            </label>

            <div class="relative bg-input-bg w-full rounded">
              <input id="payback_period" type=" text" class="input-field px-4" placeholder="Payback Period" />
            </div>
          </div>

          <div class="flex-1">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Email Address
            </label>

            <div class="relative bg-input-bg w-full rounded">
              <input id="interest_rate" class="input-field px-4" type=" text" placeholder="Interest rate" />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label for="email" class="block mb-2 leading-6 text-grey-500">
            Address
          </label>

          <div class="relative bg-input-bg rounded">
            <span class="icon icon-left">
              <IconEmail />
            </span>

            <input id="address" v-model="payload.address" class="input-field !pl-12 pr-4" type="address"
              placeholder="enter your permanent address" />
          </div>
        </div>

        <div class="mb-4 flex items-center space-x-4">
          <div class="flex-1">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Nationality
            </label>

            <div class="relative bg-input-bg w-full rounded">
              <input id="payback_period" type=" text" class="input-field px-4" placeholder="Payback Period" />
            </div>
          </div>

          <div class="flex-1">
            <label for="email" class="block mb-2 leading-6 text-grey-500">
              Phone Number
            </label>

            <div class="relative bg-input-bg w-full rounded">
              <input id="interest_rate" class="input-field px-4" type=" text" placeholder="Interest rate" />
            </div>
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

            <input id="email" v-model="payload.email" class="input-field !pl-12 pr-4" type="email"
              placeholder="example@gmail.com" />
          </div>
        </div>

        <div class="mb-4">
          <label for="email" class="block mb-2 leading-6 text-grey-500">
            Does the authorized representative hold a power of attorney?
          </label>

          <div class="w-3/5 flex items-center space-x-4">
            <div class="flex-1 bg-input-bg rounded">
              <input id="payback_period" type=" text" class="input-field px-4 flex-1" placeholder="Payback Period" />
            </div>

            <div class="flex-1 bg-input-bg rounded">
              <input id="payback_period" type=" text" class="input-field px-4 flex-1" placeholder="Payback Period" />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label for="email" class="block mb-2 leading-6 text-grey-500">
            Is the authorized representative/signatory considered a politically
            exposed person(PEP)?
          </label>

          <div class="w-3/5 flex items-center space-x-4">
            <div class="flex-1 bg-input-bg rounded">
              <input id="payback_period" type=" text" class="input-field px-4 flex-1" placeholder="Payback Period" />
            </div>

            <div class="flex-1 bg-input-bg rounded">
              <input id="payback_period" type=" text" class="input-field px-4 flex-1" placeholder="Payback Period" />
            </div>
          </div>
        </div>

        <div class="mb-4">
          <label for="email" class="block mb-2 leading-6 text-grey-500">
            Is the authorized representative/signatory considered a politically
            exposed person(PEP)?
          </label>

          <div class="w-4/5 flex items-center space-x-4">
            <div class="flex-1 bg-input-bg rounded">
              <input id="payback_period" type=" text" class="input-field px-4 flex-1" placeholder="Payback Period" />
            </div>

            <div class="flex-1 text-success-500">attached successfully</div>
          </div>
        </div>

        <!--  -->
        <div class="block w-full mt-6">
          <Button text="Log in" :disabled="!areFieldsValidated" :loading="loading" @click="login" />
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
// import EmailIcon from "~/components/icon/Email.vue"
import { useLayoutStore } from '~/store/layout'
import { IconCheckbox } from '../../../.nuxt/components';

definePageMeta({ layout: "auth" });


// components: { EmailIcon }


const { updateAuthCardSize } = useLayoutStore()
const showPassword: Ref<boolean> = ref(false);
const activeStep: Ref<number> = ref(0);
const loading: Ref<boolean> = ref(false);
const payload = ref({
  firstname: "",
  lastname: "",
  email: "",
  address: "",
  nationality: "",
  phone_number: "",
  is_PEP: null,
  is_attorney: null
});

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
  if (!payload.value.email) return false
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
    console.log(payload.value)
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
</style>