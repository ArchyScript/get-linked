<template>
  <div>
    <!-- Modals -->
    <div>
      <!-- <Modal  
        v-if="isAddBankAccountModal" 
        size="sm"
        :hasTitle="true"
        title="Add Bank Information"
        id="add-bank-account"
        @close="closeModal" 
      >   
        <ModalsAccountAddBank 
          @done="closeModal"
        />
      </Modal>  -->

      <!-- Modal Test ground -->
      <!-- fund request -->
      <!-- <Modal v-if="isAddBankAccountModal" size="sm" @close="closeModal">
        <ModalsDealsFundRequest @done="closeModal" />
      </Modal> -->

      <Modal v-if="isAddBankAccountModal" size="mdlg" @close="closeModal">
        <ModalsDealsFundOffer @done="closeModal" />
      </Modal>
    </div>

    <div>
      <CardContainer size="sm" customClass="space-y-4 !bg-white">
        <section class="flex items-center justify-between py-1 px-2">
          <TypoHeaderText
            size="sm"
            customClass="!text-grey-700 capitalize select-none !text-grey-500 cursor-pointer"
          >
            Bank Accounts
          </TypoHeaderText>

          <span>
            <Button
              text="Add bank account"
              @click="openModal"
              class="!font-normal !py-1.5 !px-4 !bg-primary-300 !text-xs"
            />
          </span>
        </section>

        <table class="table-auto w-full">
          <thead class="bg-ui-bg">
            <tr>
              <td
                class="border-x-[1px] border-x-opacity-10 border-b-[3px] border-input-bg bg-white"
              >
                <TypoNormalText
                  size="sm"
                  customClass="!text-grey-700 capitalize !font-medium px-6 py-3"
                >
                  #
                </TypoNormalText>
              </td>
              <td class="border-x-[1px] border-b-[3px] border-input-bg bg-white">
                <TypoNormalText
                  size="sm"
                  customClass="!text-grey-700 capitalize !font-medium px-6 py-3"
                >
                  Name on Account
                </TypoNormalText>
              </td>
              <td class="border-x-[1px] border-b-[3px] border-input-bg bg-white">
                <TypoNormalText
                  size="sm"
                  customClass="!text-grey-700 capitalize !font-medium px-6 py-3"
                >
                  Bank
                </TypoNormalText>
              </td>
              <td class="border-x-[1px] border-b-[3px] border-input-bg bg-white">
                <TypoNormalText
                  size="sm"
                  customClass="!text-grey-700  capitalize !font-medium px-6 py-3"
                >
                  Account Number
                </TypoNormalText>
              </td>
              <td class="border-x-[1px] border-b-[3px] border-input-bg bg-white">
                <TypoNormalText
                  size="sm"
                  customClass="!text-grey-700 capitalize !font-medium px-6 py-3"
                >
                  Date
                </TypoNormalText>
              </td>
              <td class="border-x-[1px] border-b-[3px] border-input-bg bg-white">
                <TypoNormalText
                  size="sm"
                  customClass="!text-grey-700 capitalize !font-medium px-6 py-3"
                >
                  Action
                </TypoNormalText>
              </td>
            </tr>
          </thead>

          <tbody class="bg-white">
            <tr
              v-for="(bankInformation, index) in bankIformations"
              :key="bankInformation.id"
              class="hover:bg-ui-bg hover:bg-opacity-30 cursor-pointer"
            >
              <td class="border-[1px] border-opacity-60 border-input-bg">
                <TypoNormalText
                  size="sm"
                  customClass="!text-grey-500 capitalize !font-normal px-6 py-4"
                >
                  {{ `${+index + 1}.` }}
                </TypoNormalText>
              </td>
              <td class="border-[1px] border-opacity-60 border-input-bg">
                <TypoNormalText
                  size="sm"
                  customClass="!text-grey-500 capitalize !font-normal px-6 py-4"
                >
                  {{ bankInformation.account_name }}
                </TypoNormalText>
              </td>
              <td class="border-[1px] border-opacity-60 border-input-bg">
                <TypoNormalText
                  size="sm"
                  customClass="!text-grey-500 capitalize !font-normal px-6 py-4"
                >
                  {{ bankInformation.bank }}
                </TypoNormalText>
              </td>
              <td class="border-[1px] border-opacity-60 border-input-bg">
                <TypoNormalText
                  size="sm"
                  customClass="!text-grey-500 capitalize !font-normal px-6 py-4"
                >
                  {{ bankInformation.account_number }}
                </TypoNormalText>
              </td>
              <td class="border-[1px] border-opacity-60 border-input-bg">
                <TypoNormalText
                  size="sm"
                  customClass="!text-grey-500 capitalize !font-normal px-6 py-4"
                >
                  {{ bankInformation.date }}
                </TypoNormalText>
              </td>
              <td class="border-[1px] border-opacity-60 border-input-bg">
                <TypoNormalText
                  size="sm"
                  :customClass="`
                    !font-normal px-6 py-4 capitalize
                    ${bankInformation.status == 'completed' && '!text-success-500'} 
                    ${bankInformation.status == 'updated' && '!text-secondary-500'} 
                    ${bankInformation.status == 'failed' && '!text-error-500 italic'}
                  `"
                >
                  action
                  <!-- {{bankInformation.status}} -->
                </TypoNormalText>
              </td>
            </tr>
          </tbody>
        </table>
      </CardContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
  const searchText: Ref<string> = ref('');
  const isAddBankAccountModal: Ref<boolean> = ref(true);
  const bankIformations = ref([
    {
      id: '12131',
      date: '2023-03-01 06:59:02',
      account_name: 'Dasaolu Daniel',
      bank: 'United Bank for Africa',
      account_number: '2092434851',
    },
    {
      id: '2',
      date: '2023-03-01 06:59:02',
      status: 'completed',
      account_name: 'Dasaolu Daniel',
      bank: 'United Bank for Africa',
      account_number: '2092434851',
    },
    {
      id: '12131',
      date: '2023-03-01 06:59:02',
      account_name: 'Dasaolu Daniel',
      bank: 'Zenith Bank plc.',
      account_number: '2216613463',
    },
    {
      id: '2',
      date: '2023-03-01 06:59:02',
      status: 'completed',
      account_name: 'Dasaolu Daniel',
      bank: 'Opay',
      account_number: '9073457307',
    },
  ]);

  //
  const closeModal = () => {
    isAddBankAccountModal.value = false;
  };
  const openModal = () => {
    isAddBankAccountModal.value = true;
  };
</script>

<style scoped>
  .input-field {
    @apply w-full flex-1 bg-transparent rounded leading-5 block text-sm py-3.5 outline-0 border-0 ring-0  focus:border-0 focus:ring-0 focus:outline-0;
  }
  .input-field.error {
    @apply border border-error-500 text-red-500;
  }
  .input-field.success {
    @apply border border-success-500 bg-success-50;
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
