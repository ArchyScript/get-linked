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

          <div class="flex items-center space-x-3.5">
            <label
              for="proof_of_funding"
              class="flex rounded border-[1.5px] py-[11px] select-none px-4 text-sm space-x-4 cursor-pointer items-center"
              :class="
                payload.proof_of_funding
                  ? 'border-secondary-500 text-secondary-500 border-2'
                  : 'border-grey-200 text-grey-200 border-[1.5px]'
              "
            >
              <IconUpload :height="22" :width="22" />

              <span>
                {{ payload.proof_of_funding ? 'Change attachment' : 'Click to upload files here' }}
              </span>
            </label>

            <input id="proof_of_funding" type="file" class="hidden" @change="handleUpload" />

            <div v-if="payload.proof_of_funding" class="flex-1 text-success-500 text-sm capitalize">
              attached successfully
            </div>
          </div>
        </div>
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
  const { $toast } = useNuxtApp();
  const { uploadFile } = useCommonApi();

  const isUploading: Ref<boolean> = ref(false);
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

  const handleUpload = async (event: Event | any) => {
    const file = event.target.files[0];

    if (!file) return $toast('show', { type: 'warning', message: 'No file selected' });

    const errorMessage = beforeFileUpload(file, 'image');
    if (errorMessage) return $toast('show', { type: 'error', message: errorMessage });

    await upload(file);
  };

  const upload = async (file: any) => {
    isUploading.value = true;
    let formData = new FormData();
    formData.append('doc', file);

    const response = await uploadFile(formData);
    const { data, error } = response;

    isUploading.value = false;
    if (error) return $toast('show', { type: 'error', message: error.message });

    console.log('data', data);
    // setUploadedFileUrl(data.file_url);
  };
</script>

<style scoped></style>
