<template>
  <form @submit.prevent="fundRequest">
    <div class="space-y-6">
      <TypoHeaderText size="lg" customClass="!text-black !font-semibold">
        Fund Request
      </TypoHeaderText>

      <div class="space-y-4">
        <div class="flex-1 space-y-2">
          <label for="funding_method" class="block text-sm leading-6 text-grey-500">
            Select your preferred funding method?
          </label>

          <div class="w-4/5 flex items-center">
            <el-radio-group v-model="payload.funding_method" class="!w-full">
              <el-radio label="fiat" border class="flex-1 !h-11 !px-3">Fiat</el-radio>
              <el-radio label="crypto" border class="flex-1 !h-11 !px-3">Crypto</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div class="space-y-2">
          <TypoNormalText>Send funds to the seller account below</TypoNormalText>

          <div class="space-y-0.5">
            <TypoNormalText customClass="!text-grey-200">Account number</TypoNormalText>
            <TypoNormalText size="lg" customClass="!leading-[160%] !text-grey-500">
              0123456789
            </TypoNormalText>
          </div>

          <div class="space-y-0.5">
            <TypoNormalText customClass="!text-grey-200">Account name</TypoNormalText>
            <TypoNormalText size="lg" customClass="!leading-[160%] !text-grey-500">
              BLCD
            </TypoNormalText>
          </div>

          <div class="space-y-0.5">
            <TypoNormalText customClass="!text-grey-200">Bank</TypoNormalText>
            <TypoNormalText size="lg" customClass="!leading-[160%] !text-grey-500">
              ABC Bank
            </TypoNormalText>
          </div>
        </div>

        <!-- upload -->
        <div class="flex-1 space-y-2">
          <div class="flex items-center space-x-2">
            <TypoNormalText>Upload Proof of funding</TypoNormalText>
            <IconInfo class="text-grey-40" />
          </div>

          <Upload
            uploadId="proof_of_funding"
            size="sm"
            :modelValue="payload.proof_of_funding"
            @uploaded="(event) => (payload.proof_of_funding = event.image_url)"
          />
        </div>
      </div>

      <div>
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
  const { $toast } = useNuxtApp();
  const { uploadFile } = useCommonApi();

  const loading = ref(false);
  const payload = ref({
    funding_method: '',
    proof_of_funding: '',
  });

  //
  const emit = defineEmits(['done']);

  const fundRequest = async () => {
    loading.value = true;
    console.log(payload.value);

    setTimeout(async () => {
      loading.value = false;
      emit('done');
    }, 3000);
  };
</script>

<style scoped></style>
