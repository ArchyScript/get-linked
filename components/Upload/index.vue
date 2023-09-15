<template>
  <div class="flex items-center space-x-4">
    <label
      for="upload_file"
      class="flex rounded border-[1.5px] py-[13px] select-none px-4 space-x-4 cursor-pointer items-center"
      :class="
        modelValue
          ? 'border-secondary-500 text-secondary-500 border-2'
          : 'border-grey-200 text-grey-200 border-[1.5px]'
      "
    >
      <IconUpload :height="22" :width="22" />

      <span :class="`text-${size}`">
        {{ modelValue ? 'Change attachment' : 'Click to upload files here' }}
      </span>
    </label>

    <input id="upload_file" type="file" class="hidden" @change="handleUpload" />

    <div v-if="modelValue" :class="`flex-1 text-success-500 capitalize text-${size}`">
      attached successfully
    </div>
  </div>
</template>

<script setup lang="ts">
  const { uploadFile } = useCommonApi();
  import { beforeFileUpload } from '~/utils/upload';

  const props = defineProps({
    uploadId: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'base',
    },
  });

  const isUploading: Ref<boolean> = ref(false);

  const emit = defineEmits('uploaded');

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

    // const response = await uploadFile(formData);
    // const { data, error } = response;

    // isUploading.value = false;
    // if (error) return $toast('show', { type: 'error', message: error.message });

    // fileUploaded(data.file_url);

    setTimeout(
      () =>
        fileUploaded(
          'https://res.cloudinary.com/vesseltrust/image/upload/v1692274839/pjdnkiqtqph9zlmy3jtw.png',
        ),
      3000,
    );
  };
  const fileUploaded = (image_url: string) => {
    const { uploadId } = props;

    emit('uploaded', {
      uploadId,
      image_url,
    });
  };
</script>
