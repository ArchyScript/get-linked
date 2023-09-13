<template>
  <form @submit.prevent="addBankInfo">
    <div class="space-y-4 p-0.5">
      <div class="flex-1">
        <label for="account_name" class="block mb-1 text-sm leading-6 text-grey-500">
          Name of the account
        </label>

        <div class="relative bg-input-bg w-full rounded">
          <input
            id="account_name"
            type="text"
            class="input-field px-3"
            placeholder="enter name of the bank account"
            v-model.trim="payload.account_name"
          />
        </div>
      </div>

      <div class="mb-4 flex items-center space-x-4">
        <div class="flex-1">
          <label for="account_number" class="block mb-1 text-sm leading-6 text-grey-500">
            Account number
          </label>

          <div class="relative bg-input-bg w-full rounded">
            <input
              id="account_number"
              type="text"
              class="input-field px-3"
              placeholder="enter account number"
              v-model.trim="payload.account_number"
            />
          </div>
        </div>

        <div class="flex-1">
          <label for="bank_name" class="block mb-1 text-sm leading-6 text-grey-500">
            Bank name
          </label>

          <div class="relative bg-input-bg w-full rounded">
            <input
              id="bank_name"
              type="text"
              class="input-field px-3"
              placeholder="enter bank name"
              v-model.trim="payload.bank_name"
            />
          </div>
        </div>
      </div>

      <div class="mb-4 flex items-center space-x-4">
        <div class="flex-1">
          <label for="officer_phone_number" class="block mb-1 text-sm leading-6 text-grey-500">
            Officer phone number
          </label>

          <div class="relative bg-input-bg w-full rounded">
            <span class="icon icon-left text-grey-300">
              <IconPhone :height="14" :width="14" />
            </span>

            <input
              id="officer_phone_number"
              type="text"
              class="input-field !pl-10 pr-3"
              placeholder="enter officer phone number"
              v-model.trim="payload.officer_phone_number"
            />
          </div>
        </div>

        <div class="flex-1">
          <label for="officer_email" class="block mb-1 text-sm leading-6 text-grey-500">
            Officer email address
          </label>

          <div class="relative bg-input-bg w-full rounded">
            <span class="icon icon-left !text-grey-200">
              <IconEmail :height="14" :width="14" />
            </span>

            <input
              id="officer_email"
              type="text"
              class="input-field !pl-10 pr-3"
              placeholder="enter officer email address"
              v-model.trim="payload.officer_email"
            />
          </div>
        </div>
      </div>

      <div class="mb-4 flex items-center space-x-4">
        <div class="flex-1">
          <label for="code" class="block mb-1 text-sm leading-6 text-grey-500">
            Bank sort code / swift code
          </label>

          <div class="relative bg-input-bg w-full rounded">
            <input
              id="code"
              type="text"
              class="input-field px-3"
              placeholder="sort code or swift code"
              v-model.trim="payload.code"
            />
          </div>
        </div>

        <!-- <div class="flex-1">
                    <label for="firstname" class="block mb-1 text-sm leading-6 text-grey-500">
                        officer name
                    </label>

                    <div class="relative bg-input-bg w-full rounded"> 
                        <input 
                            id="account_name"
                            type="text" 
                            class="input-field px-3" 
                            placeholder="enter officer name"  
                            v-model.trim="payload.account_name"
                        />
                    </div>  
                </div>    -->
      </div>

      <div class="py-3">
        <Button
          type="submit"
          text="Save"
          customClass="!py-3 !px-10 !text-white !font-medium !leading-[160%] w-full"
          :loading="loading"
        />
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
  const loading = ref(false);
  const payload = ref({
    account_name: '',
    account_number: '',
    bank_name: '',
    officer_phone_number: '',
    code: '',
    officer_email: '',
  });

  //
  const emit = defineEmits(['done']);

  const addBankInfo = async () => {
    loading.value = true;
    console.log(payload.value);

    setTimeout(async () => {
      loading.value = false;
      emit('done');
    }, 3000);
  };
</script>

<style scoped>
  .input-field {
    @apply w-full flex-1 bg-transparent rounded leading-5 block text-sm py-3 outline-0 border-0 ring-0  focus:border-0 focus:ring-0 focus:outline-0;
  }
  .input-field.error {
    @apply border border-error-500 text-red-500;
  }
  .input-field.success {
    @apply border border-success-500 bg-success-50;
  }
  .icon {
    @apply absolute top-0 h-full rounded-tl rounded-bl bg-transparent flex justify-center items-center pr-[1rem];
  }
  .icon.icon-left {
    @apply rounded-tl rounded-bl left-0;
  }
  .icon.icon-right {
    @apply rounded-tr rounded-br right-0 cursor-pointer;
  }
</style>
