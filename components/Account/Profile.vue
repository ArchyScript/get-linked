<template>
  <div>
    <div>
      <Modal id="delete-account" size="md" v-if="showDeleteModal" @close="showDeleteModal = false">
        <ModalsAccountDelete
          :warnings="deleteWarnings"
          @close="showDeleteModal = false"
          @deleteAcount="deleteFinancierAccount"
        />
      </Modal>
    </div>

    <div class="grid grid-cols-3 gap-x-8">
      <section class="col-span-2 space-y-6 items-center mb-16">
        <CardContainer class="!p-5 rounded-md !pr-8 space-y-4 w-full">
          <div class="flex items-center !bg-primary-50 rounded-md">
            <TypoHeaderText
              v-for="(tab, index) in tabs"
              :key="`${tab.id}_${index}`"
              size="sm"
              :customClass="`
                flex-1 text-center !text-grey-700 capitalize select-none !font-medium px-6 py-3 rounded-md cursor-pointer
                ${
                  activeTabId == tab.id
                    ? '!bg-primary-500 !text-white'
                    : '!text-primary-500 !bg-primary-50'
                }
              `"
              @click="toggleActiveTab(tab.id)"
            >
              {{ tab.title }}
            </TypoHeaderText>
          </div>

          <!-- Representative details -->
          <div class="space-y-4" v-if="activeTabId == 'rep_details'">
            <TypoHeaderText
              size="sm"
              customClass="!text-grey-300 py-3 border-b-[1.5px] border-ui-bg"
            >
              Personal Information
            </TypoHeaderText>

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
                    v-model.trim="representativeDetailsPayload.first_name"
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
                    v-model.trim="representativeDetailsPayload.last_name"
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
                    placeholder="enter address"
                    v-model="representativeDetailsPayload.address"
                  />
                </div>
              </div>

              <div class="flex-col space-y-2">
                <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1">
                  Nationality
                </TypoNormalText>

                <div class="relative bg-input-bg w-full pl-8 rounded">
                  <span class="icon icon-left text-grey-300">
                    <Avatar
                      :name="`${customerNationalityISO2}_16`"
                      :isSubFolder="true"
                      subfolderPath="flags"
                    />
                  </span>

                  <el-select
                    v-model="representativeDetailsPayload.nationality"
                    class="p-1 !bg-transparent !focus:text-black !w-full"
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

              <div class="flex-col space-y-2">
                <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1">
                  Phone Number
                </TypoNormalText>

                <el-input
                  v-model="representativeDetailsPayload.phone_number"
                  placeholder="90 734 573 07"
                  type="tel"
                  class="input-with-select bg-input-bg h-[3rem]"
                >
                  <template #prepend>
                    <div class="flex space-x-1 items-center">
                      <Avatar
                        :name="`${customerNationalityISO2}_16`"
                        :isSubFolder="true"
                        subfolderPath="flags"
                      />

                      <TypoNormalText>{{ customerCountryCode }}</TypoNormalText>
                    </div>
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
                    class="input-field !px-12"
                    readonly
                    type="email"
                    placeholder="example@gmail.com"
                    :value="authUser?.kyc?.email"
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
                    v-model="representativeDetailsPayload.title"
                    class="p-1 !bg-transparent !focus:text-black !w-full"
                    placeholder="Select"
                    size="large"
                  >
                    <el-option
                      v-for="titleOption in titleOptions"
                      :key="titleOption.title"
                      :label="titleOption.title"
                      :value="titleOption.title"
                    />
                  </el-select>
                </div>
              </div>

              <!--  -->
              <div class="flex col-span-2 justify-end pt-6">
                <Button
                  text="Save"
                  type="submit"
                  :loading="isUpdatingKYC"
                  class="!w-auto !px-11 !bg-primary-500 !text-white"
                />
              </div>
            </form>
          </div>

          <!-- Contracting party / company details -->
          <div class="space-y-4" v-else>
            <TypoHeaderText
              size="sm"
              customClass="!text-grey-300 py-3 border-b-[1.5px] border-ui-bg"
            >
              Company`s Information
            </TypoHeaderText>

            <!--  -->
            <form class="mt-8 grid grid-cols-2 gap-4" @submit.prevent="updateKYCDetails">
              <div class="flex-col space-y-2">
                <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1">
                  Company name on the commercial register
                </TypoNormalText>

                <div class="relative bg-input-bg rounded">
                  <input
                    v-model="companyDetailsPayload.company_name"
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
                    v-model="companyDetailsPayload.company_reg_number"
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
                    v-model="companyDetailsPayload.company_address"
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

                <div class="w-3/5 flex items-center space-x-0">
                  <el-radio-group
                    v-model="companyDetailsPayload.company_financial_intermediary"
                    class="!w-full"
                  >
                    <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4">Yes</el-radio>
                    <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
                  </el-radio-group>
                </div>
              </div>

              <div class="col-span-2 flex-col space-y-2">
                <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1">
                  IIs the company subject to appropriate regulation with respect to combating money
                  laundering?
                </TypoNormalText>

                <div class="w-3/5 flex items-center space-x-0">
                  <el-radio-group
                    v-model="companyDetailsPayload.aml_appropriate_regulation"
                    class="!w-full"
                  >
                    <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4">Yes</el-radio>
                    <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
                  </el-radio-group>
                </div>
              </div>

              <div class="col-span-2 flex-col space-y-2">
                <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1">
                  Is the company subject to appropriate prudential supervision?
                </TypoNormalText>

                <div class="w-3/5 flex items-center space-x-0">
                  <el-radio-group
                    v-model="companyDetailsPayload.appropriate_prudential_supervision"
                    class="!w-full"
                  >
                    <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4">Yes</el-radio>
                    <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
                  </el-radio-group>
                </div>
              </div>

              <div class="col-span-2 flex-col space-y-2">
                <TypoNormalText size="sm" customClass="!text-grey-500 !leading-[160%]  flex-1">
                  Has the company been under investigation regarding money laundering/terrorist
                  financing irrespective of whether a report was filed to local authorities or not?
                </TypoNormalText>

                <div class="w-3/5 flex items-center space-x-0">
                  <el-radio-group
                    v-model="companyDetailsPayload.investigated_for_money_laundering"
                    class="!w-full"
                  >
                    <el-radio label="yes" border class="flex-1 !h-[3rem] !px-4">Yes</el-radio>
                    <el-radio label="no" border class="flex-1 !h-[3rem] !px-4">No</el-radio>
                  </el-radio-group>
                </div>
              </div>

              <!--  -->
              <div class="flex col-span-2 justify-end pt-6">
                <Button
                  text="Save"
                  type="submit"
                  :loading="isUpdatingKYC"
                  class="!w-auto !px-11 !bg-primary-500 !text-white"
                />
              </div>
            </form>
          </div>
        </CardContainer>

        <!-- delete section -->
        <CardContainer class="!p-5 rounded-md space-y-2 w-full">
          <TypoHeaderText size="sm" customClass="!text-grey-300 py-3 border-b-[1.5px] border-ui-bg">
            Delete my account
          </TypoHeaderText>

          <div class="space-y-1">
            <TypoHeaderText size="base" customClass="!text-grey-500 !leading-[160%] !font-normal">
              Deleting your account will:
            </TypoHeaderText>

            <div class="space-y-0.5 pl-2">
              <div
                class="flex items-center space-x-2"
                v-for="warning in deleteWarnings"
                :key="warning.text"
              >
                <span class="h-1 w-1 bg-grey-400 rounded-full"></span>

                <TypoNormalText size="sm" customClass="!text-grey-400 !leading-[160%]  flex-1">
                  {{ warning.text }}
                </TypoNormalText>
              </div>
            </div>
          </div>

          <div class="flex pt-3">
            <Button
              @click="showDeleteModal = true"
              text="Delete my account"
              class="!w-auto py-3 !px-6 !bg-error-50 !text-error-500"
              :hasIcon="true"
              iconName="trash"
            />
          </div>
        </CardContainer>
      </section>

      <section class="space-y-6">
        <CardContainer class="!p-5 rounded-md space-y-2 w-full">
          <TypoHeaderText size="sm" customClass="!text-grey-300 py-3 border-b-[1.5px] border-ui-bg">
            KYC status
          </TypoHeaderText>

          <div
            class="flex items-center px-6 py-3 rounded-md space-x-2"
            :class="
              authUser?.profile?.isKYC
                ? 'text-success-500 bg-success-50'
                : 'text-error-500 bg-error-50'
            "
          >
            <IconCheckbox type="square" />

            <TypoNormalText
              size="sm"
              :customClass="`
                !font-medium !leading-[160%]  flex-1
                ${authUser?.profile?.isKYC ? '!text-success-500' : '!text-error-500'}
              `"
            >
              {{ authUser?.profile?.isKYC ? 'Verified account' : 'Account not Verified' }}
            </TypoNormalText>
          </div>
        </CardContainer>

        <CardContainer class="!p-5 rounded-md space-y-3 w-full">
          <TypoHeaderText size="sm" customClass="!text-grey-300 py-3 border-b-[1.5px] border-ui-bg">
            Company`s Logo
          </TypoHeaderText>

          <!--  -->
          <div class="flex items-center rounded-md space-x-6">
            <div class="h-[6rem] w-[6rem] relative ring-[1.6px] ring-primary-400 rounded-full">
              <img
                src="~/assets/images/profile-picture.svg"
                class="h-full w-full bg-primary-50 rounded-full"
              />

              <span
                class="absolute bottom-0 right-0 bg-primary-50 text-primary-500 rounded-full rounded-full p-1"
              >
                <IconCamera :height="24" :width="24" />
              </span>
            </div>

            <div class="flex-1 space-y-4">
              <TypoHeaderText size="sm" customClass="!text-grey-500  !leading-[160%]  flex-1">
                Edit company`s logo
              </TypoHeaderText>

              <div class="flex items-center space-x-1">
                <Button
                  text="Delete"
                  customClass="!text-error-500 !py-2 !px-4  !bg-white !font-medium !leading-[160%]  flex-1"
                />
                <Button
                  text="Update"
                  :hasBorder="true"
                  customClass="!py-2 !px-4  !bg-white !font-medium !leading-[160%]  flex-1"
                />
              </div>
            </div>
          </div>
        </CardContainer>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useAuthStore } from '~/store/authentication';
  import { useConstantsStore } from '~/store/constants';

  const { $toast } = useNuxtApp();
  const router = useRouter();
  const { getConstantData } = useCommonApi();
  const { authenticatedUser, getAuthenticatedUser, logout } = useAuthStore();
  const { deleteFinancier } = useAuthApi();
  const { updateKYC, getUserProfile } = useKYCApi();

  //
  const countries = ref([]);
  const customerCountryCode = ref('');
  const customerNationalityISO2 = ref('');
  const companyCountryISO2 = ref('');
  const showDeleteModal = ref<Boolean>(false);
  const isUpdatingKYC = ref<Boolean>(false);
  const isFilteringCountry = ref<Boolean>(false);
  const activeTabId = ref('rep_details');
  const tabs = ref([
    { title: 'Representative details', id: 'rep_details' },
    { title: 'Contracting party / company details', id: 'company_details' },
  ]);
  const titleOptions = ref([{ title: 'Mr.' }, { title: 'Mrs.' }, { title: 'Miss' }]);
  const deleteWarnings = ref([
    { text: 'Delete your account info and transaction history' },
    { text: 'Delete you from all VesselTrust activities' },
    { text: 'Cancel all ongoing trades and contract.' },
  ]);
  const representativeDetailsPayload = ref({
    first_name: '',
    last_name: '',
    address: '',
    nationality: '',
    phone_number: '',
    title: '',
  });
  const companyDetailsPayload = ref({
    company_name: '',
    company_reg_number: '',
    company_address: '',
    company_financial_intermediary: '',
    aml_appropriate_regulation: '',
    appropriate_prudential_supervision: '',
    investigated_for_money_laundering: '',
  });

  // computed
  const authUser: any = computed(() => authenticatedUser);
  const allCountries: any = computed(() => useConstantsStore().countries);
  // a computed value to know the tab currently updated for
  const activePayload: any = computed(() => {
    if (activeTabId.value == 'rep_details')
      return (activePayload.value = representativeDetailsPayload.value);
    else return (activePayload.value = companyDetailsPayload.value);
  });

  // const getAuthUser: any = computed(() => getAuthenticatedUser)

  //
  // watch(authUser, (newValue) => {
  //   console.log("newValue:::", newValue)
  // }, { deep: true }); // Use the deep option to watch nested properties

  // functions
  //
  const getCountryCode = (selectedCountry: any, user: string) => {
    customerCountryCode.value = selectedCountry.phone_code;

    if (user == 'customer') customerNationalityISO2.value = selectedCountry.iso2.toLowerCase();
    if (user == 'company') companyCountryISO2.value = selectedCountry.iso2.toLowerCase();
  };
  //
  const toggleActiveTab = (tabId: string) => {
    activeTabId.value = tabId;
  };
  //
  const updateKYCDetails = async () => {
    isUpdatingKYC.value = true;
    const response = await updateKYC(activePayload.value);
    const { data, error } = response;

    isUpdatingKYC.value = false;
    if (error) return $toast('show', { type: 'error', message: error.message });

    //
    $toast('show', { type: 'success', message: data.message });

    await getAuthenticatedUser();
  };
  //
  const deleteFinancierAccount = async () => {
    console.log('deleete');
    const response = await deleteFinancier();
    const { data, error } = response;

    if (error) return $toast('show', { type: 'error', message: error.message });

    // log user out
    setTimeout(() => logout(), 5000);
  };
  //
  const handleCountrySearch = (query: string) => {
    if (query) {
      isFilteringCountry.value = true;
      setTimeout(() => {
        isFilteringCountry.value = false;
        countries.value = allCountries.value.filter((country: any) => {
          return country.name.toLowerCase().includes(query.toLowerCase());
        });
      }, 50);
    } else {
      countries.value = allCountries.value;
    }
  };
  //
  const fetchDataFromStore = async () => {
    console.log('authUser.value:::', authUser.value);
    // console.log("getAuthUser.value:::", getAuthUser.value)

    // check if auth user object is empty
    if (Object.keys(authUser.value).length < 1) await getAuthenticatedUser();

    console.log('authUser.value wewewew:::', authUser.value);
    // console.log("getAuthUser.value eetyujghfr:::", getAuthUser.value)
    const {
      first_name,
      last_name,
      address,
      nationality,
      title,
      phone_number,
      company_name,
      company_reg_number,
      company_address,
      company_financial_intermediary,
      aml_appropriate_regulation,
      appropriate_prudential_supervision,
      investigated_for_money_laundering,
    } = authUser.value?.kyc;

    representativeDetailsPayload.value.first_name = first_name;
    representativeDetailsPayload.value.last_name = last_name;
    representativeDetailsPayload.value.address = address;
    representativeDetailsPayload.value.nationality = nationality;
    representativeDetailsPayload.value.phone_number = phone_number;
    representativeDetailsPayload.value.title = title;

    //
    companyDetailsPayload.value.company_name = company_name;
    companyDetailsPayload.value.company_reg_number = company_reg_number;
    companyDetailsPayload.value.company_address = company_address;
    companyDetailsPayload.value.company_financial_intermediary = company_financial_intermediary;
    companyDetailsPayload.value.aml_appropriate_regulation = aml_appropriate_regulation;
    companyDetailsPayload.value.appropriate_prudential_supervision =
      appropriate_prudential_supervision;
    companyDetailsPayload.value.investigated_for_money_laundering =
      investigated_for_money_laundering;

    allCountries.value.forEach((country: any) => {
      // for customer
      if (country.name == representativeDetailsPayload.value.nationality) {
        customerCountryCode.value = country.phone_code;
        customerNationalityISO2.value = country.iso2.toLowerCase();
      }
    });
  };
  //
  onBeforeMount(() => {
    // fetchDataFromStore();
  });
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
</style>
