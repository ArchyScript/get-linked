<template>
  <div class="grid grid-cols-3 gap-x-8"> 
    <section class="col-span-2 space-y-6 items-center mb-16">
      <CardContainer class="!p-5 rounded-md !pr-8 space-y-4 w-full">
        <div class=" flex items-center  !bg-primary-50  rounded-md ">
         <TypoHeaderText 
            v-for="(tab, index) in tabs" :key="`${tab.id}_${index}`"
            size="sm" 
            :customClass="`
              flex-1 text-center !text-grey-700 capitalize select-none !font-medium px-6 py-3 rounded-md cursor-pointer
              ${ activeTabId == tab.id ? '!bg-primary-500 !text-white' : '!text-primary-500 !bg-primary-50' }
            `"
            @click="toggleActiveTab(tab.id)"
          >
            {{tab.title}}
          </TypoHeaderText> 
        </div>

        <!-- Representative details -->
        <div class="space-y-4" v-if="activeTabId == 'rep_details'">
          <TypoHeaderText size="sm" customClass="!text-grey-300 py-3 border-b-[1.5px] border-ui-bg"> Personal Information </TypoHeaderText> 

          <!--  -->
          <form class="mt-8 grid grid-cols-2 gap-4" @submit.prevent="updateKYCDetails">
            <div class="flex-col space-y-2"> 
              <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1"> 
                First name
              </TypoNormalText>  

              <div class="relative bg-input-bg rounded">
                <span class="icon icon-left">
                  <IconUser />
                </span>
  
                <input
                  id="email"
                  class="input-field !pl-12 pr-4"
                  type="text"
                  placeholder="Last name"
                />
              </div>
            </div> 

            <div class="flex-col space-y-2"> 
              <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1"> 
                Last name
              </TypoNormalText>  

              <div class="relative bg-input-bg rounded">
                <span class="icon icon-left">
                  <IconUser />
                </span>
   
                <input
                  id="lastname"
                  class="input-field !pl-12 pr-4"
                  type="text"
                  placeholder="Last name"
                />
              </div>
            </div> 

            <div class="col-span-2 flex-col space-y-2"> 
              <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1"> 
                Address
              </TypoNormalText>  

              <div class="relative bg-input-bg rounded">
                <span class="icon icon-left">
                  <IconLocation />
                </span>
  
                <input
                  id="email"
                  class="input-field !pl-12 pr-4"
                  type="text"
                  placeholder="example@gmail.com"
                />
              </div>
            </div> 

            <div class="flex-col space-y-2"> 
              <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1"> 
                Nationality
              </TypoNormalText>  

              <div class="relative bg-input-bg w-full pl-8 rounded">
                <span class="icon icon-left text-grey-300">
                  <IconLocation />
                </span>

                <el-select 
                  class="p-1 !bg-transparent !focus:text-black  !w-full"
                  placeholder="Select" size="large"
                >
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </div> 

            <div class="flex-col space-y-2"> 
              <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1"> 
                Phone Number
              </TypoNormalText>  

              <el-input
                v-model="payload.phone_number"
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
  
            <div class="flex-col space-y-2"> 
              <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1"> 
                Email
              </TypoNormalText>  

              <div class="relative bg-input-bg rounded">
                <span class="icon icon-left">
                  <IconEmail />
                </span>

                <input 
                  id="email"
                  class="input-field !px-12 " 
                  type="email"
                  placeholder="example@gmail.com" 
                />

                <span class="icon icon-right text-success-500">
                  <IconCheckbox type="square" />
                </span>
              </div>
            </div> 

            <div class="flex-col space-y-2"> 
              <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1"> 
                Title
              </TypoNormalText>  
  
              <div class="relative bg-input-bg w-full rounded"> 
                <el-select 
                  class="p-1 !bg-transparent !focus:text-black !w-full"
                  placeholder="Select" size="large"
                >
                  <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </div>  

            <!--  --> 
            <div class="flex col-span-2 justify-end pt-6"> 
              <Button text="Save" type="submit" class="!w-auto !px-11 !bg-primary-500 !text-white"  /> 
            </div>
          </form>  
        </div>

        <!-- Contracting party / company details -->
        <div class="space-y-4" v-else>
          <TypoHeaderText size="sm" customClass="!text-grey-300 py-3 border-b-[1.5px] border-ui-bg"> Company`s Information </TypoHeaderText> 

          <!--  -->
          <form class="mt-8 grid grid-cols-2 gap-4">
            <div class="flex-col space-y-2"> 
              <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1"> 
                Company name on the commercial register
              </TypoNormalText>  

              <div class="relative bg-input-bg rounded">  
                <input 
                  class="input-field !px-4"
                  type="text"
                  placeholder="Company name"
                />
              </div>
            </div> 

            <div class="flex-col space-y-2"> 
              <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1"> 
               Company registration number
              </TypoNormalText>  

              
              <div class="relative bg-input-bg rounded">  
                <input 
                  class="input-field !px-4"
                  type="text"
                  placeholder="registration number"
                />
              </div>
            </div> 

            <div class="col-span-2 flex-col space-y-2"> 
              <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1"> 
                Domicile address of the company on the commercial register 
              </TypoNormalText>  

              <div class="relative bg-input-bg rounded">
                <span class="icon icon-left">
                  <IconLocation />
                </span>
  
                <input 
                  class="input-field !pl-12 pr-4"
                  type="text"
                  placeholder="enter your company Domicile address"
                />
              </div>
            </div> 

            <div class="col-span-2 flex-col space-y-2"> 
              <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1"> 
                Is the company considered a financial intermediary?
              </TypoNormalText>  

              <div class="w-1/4 flex items-center space-x-0">
                <el-radio-group v-model="testRadioBtn" class="!w-full  !text-primary-500">
                  <el-radio :label="3" border class="flex-1 !h-[3rem] !px-4 border !border-primary-500">Yes</el-radio> 
                </el-radio-group> 
              </div>
            </div> 
 
            <div class="col-span-2 flex-col space-y-2"> 
              <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1"> 
                IIs the company subject to appropriate regulation with respect to combating money laundering?
              </TypoNormalText>  

              <div class="w-1/4 flex items-center space-x-0">
                <el-radio-group v-model="testRadioBtn" class="!w-full  !text-primary-500">
                  <el-radio :label="3" border class="flex-1 !h-[3rem] !px-4 border !border-primary-500">Yes</el-radio> 
                </el-radio-group> 
              </div>
            </div> 
 
            <div class="col-span-2 flex-col space-y-2"> 
              <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1"> 
                Is the company subject to appropriate prudential supervision?
              </TypoNormalText>  

              <div class="w-1/4 flex items-center space-x-0">
                <el-radio-group v-model="testRadioBtn" class="!w-full  !text-primary-500">
                  <el-radio :label="3" border class="flex-1 !h-[3rem] !px-4 border !border-primary-500">Yes</el-radio> 
                </el-radio-group> 
              </div>
            </div> 
 
            <div class="col-span-2 flex-col space-y-2"> 
              <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1"> 
                Has the company been under investigation regarding money laundering/terrorist financing    irrespective of whether a report was filed to local authorities or not?
              </TypoNormalText>  

              <div class="w-1/4 flex items-center space-x-0">
                <el-radio-group v-model="testRadioBtn" class="!w-full  !text-primary-500">
                  <el-radio :label="3" border class="flex-1 !h-[3rem] !px-4 border !border-primary-500">Yes</el-radio> 
                </el-radio-group> 
              </div>
            </div> 
 
            <!--  --> 
            <div class="flex col-span-2 justify-end pt-6"> 
              <Button text="Save"  class="!w-auto !px-11 !bg-primary-500 !text-white"  /> 
            </div>
          </form>  
        </div>
      </CardContainer>

      <CardContainer class="!p-5 rounded-md  space-y-2 w-full">
        <TypoHeaderText size="sm" customClass="!text-grey-300 py-3 border-b-[1.5px] border-ui-bg"> Delete my account </TypoHeaderText> 
 
        <div class=" space-y-1">
          <TypoHeaderText size="base" customClass="!text-grey-500 !leading-[160%] !font-normal"> 
            Deleting your account will:
          </TypoHeaderText> 

          <div class=" space-y-0.5 pl-2">
            <div class="flex items-center space-x-2" v-for="warning in deleteWarnings" :key="warning.text">  
              <span class="h-1 w-1 bg-grey-400 rounded-full"></span>

              <TypoNormalText size="sm" customClass="!text-grey-400 !leading-[160%]  flex-1"> 
                {{warning.text}}
              </TypoNormalText>
            </div>  
          </div>
        </div>
        
        <div class="flex pt-3"> 
          <Button @click="deleteFinancierAccount" text="Delete my account"  class="!w-auto py-3 !px-6 !bg-error-50 !text-error-500"  :hasIcon="true" iconName="trash"   /> 
        </div>
      </CardContainer>
    </section>
 
    <section class="space-y-6"> 
      <CardContainer class="!p-5 rounded-md  space-y-2 w-full">
          <TypoHeaderText size="sm" customClass="!text-grey-300 py-3 border-b-[1.5px] border-ui-bg"> KYC status </TypoHeaderText> 


        <div class=" flex bg-success-50 items-center px-6 py-3 rounded-md text-success-500 space-x-2"> 
          <IconCheckbox type="square" />
          
          <TypoNormalText size="sm" customClass="!text-success-500 !font-medium !leading-[160%]  flex-1"> 
            Verified account
          </TypoNormalText>  
        </div>
      </CardContainer> 
      
      <CardContainer class="!p-5 rounded-md  space-y-3 w-full">
        <TypoHeaderText size="sm" customClass="!text-grey-300 py-3 border-b-[1.5px] border-ui-bg"> Company`s Logo </TypoHeaderText> 

        <!--  -->
        <div class=" flex items-center rounded-md space-x-6"> 
          <div  class="h-[6rem] w-[6rem] relative ring-[1.6px] ring-primary-400  rounded-full"> 
            <img src="~/assets/images/profile-picture.svg" class="h-full w-full bg-primary-50 rounded-full" />

            <span class="absolute bottom-0 right-0 bg-primary-50  text-primary-500 rounded-full rounded-full p-1 ">
              <IconCamera :height="24" :width="24"/>
            </span>
          </div>

          <div class="flex-1 space-y-4">
            <TypoHeaderText size="sm" customClass="!text-grey-500  !leading-[160%]  flex-1"> 
              Edit company`s logo
            </TypoHeaderText>  

            <div class="flex items-center space-x-1"> 
              <Button text="Delete"  customClass="!text-error-500 !py-2 !px-4  !bg-white !font-medium !leading-[160%]  flex-1"/> 
              <Button text="Update" :hasBorder="true" customClass="!py-2 !px-4  !bg-white !font-medium !leading-[160%]  flex-1"/> 
            </div>
          </div>
        </div>
      </CardContainer> 
    </section>
  </div>
</template>

<script setup lang="ts">
// const { $toast } = useNuxtApp()
import { useAuthStore } from '~/store/authentication'  
const { logout } = useAuthStore()  
const { deleteFinancier } =  useAuthApi() 
const {$toast} = useNuxtApp()

const activeTabId = ref("rep_details")

const tabs = ref([
  {title: "Representative details", id: "rep_details"},
  {title: "Contracting party / company details",  id: "company_details"}, 
])

const options = ref([
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  }, 
])

const deleteWarnings = ref([
  { text: 'Delete your account info and transaction history' } ,
  { text: 'Delete you from all VesselTrust activities' } ,
  { text: 'Cancel all ongoing trades and contract.' } ,
])

const payload = ref({
  firstname: "", 
  lastname: "", 
  phone_number: "", 
});

const testRadioBtn = ref(true)

// 
const toggleActiveTab = (tabId: string) => {
  activeTabId.value = tabId 
}

const updateKYCDetails = () => {
  console.log("updating in progress") 
  $toast('show', {
    type: "success",
    message: `Test  nifegjh `,
  })
}

const deleteFinancierAccount = async () => {  
  const response = await  deleteFinancier()
  const { data, error } = response  
 
  if (error) return  $toast('show', { type: "error", message: error.message  })

  console.log("data:::", data)
}


</script>


<style>
.input-field {
  @apply bg-transparent focus:bg-transparent focus:ring-primary-400 focus:ring-1 w-full flex-1 rounded leading-5 block text-sm py-3.5 outline-0 border-0;
}
.icon {
  @apply absolute top-0 h-full rounded-tl rounded-bl bg-transparent flex justify-center items-center px-[1.125rem];
}
.icon.icon-left {
  @apply rounded-tl rounded-bl left-0 text-grey-500;
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
.el-radio__input.is-checked+.el-radio__label {
    @apply text-primary-500 font-light;
}
/* .el-radio__input .el-radio__inner {
    @apply border border-primary-500 bg-primary-500; 
} */
.el-radio__input.is-checked .el-radio__inner {
    @apply border border-primary-500 bg-primary-500; 
}
::file-selector-button {
  display: none;
}  
</style>