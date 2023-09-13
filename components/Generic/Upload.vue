<template>
  <div :style="uploading && { cursor: 'not-allowed' }">
    <slot :init="initUpload" :uploading="uploading" :uploaded="isUploaded" />

    <input type="file" hidden ref="file" @change="handleUpload" :disabled="uploading" />
  </div>
</template>

<script>
  const imageTypes = ['image/jpeg', 'image/jpg'];
  const documentTypes = [
    'application/pdf',
    // 'application/msword',
    // 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  export default {
    name: 'Upload',
    model: {
      prop: 'file',
      event: 'upload',
    },
    data() {
      return {
        uploading: false,
        documentType: null,
      };
    },
    props: {
      file: {
        type: Object,
        default: () => ({ url: '', type: '' }),
      },
      fileType: {
        type: String,
        default: 'all',
      },
    },
    computed: {
      isUploaded() {
        const { file } = this;
        return !!file.url;
      },
    },
    methods: {
      initUpload() {
        if (this.$refs['file']) {
          this.$refs['file'].click();
        }
      },
      emitError(errorMessage) {
        this.$emit('error', errorMessage);
      },
      async handleUpload(event) {
        const file = event.target.files[0];
        let errorMessage = '';

        if (file) {
          const message = this.beforeUpload(file);
          errorMessage = message;

          if (!message) {
            const { status, data } = await this.upload(file);

            if (status) {
              this.$emit('upload', { url: data, type: this.documentType });
              this.emitError('');
              return;
            }

            errorMessage = 'Upload failed!';
          }
        }

        this.emitError(errorMessage);
      },
      beforeUpload({ type, size }) {
        let types =
          this.fileType == 'all'
            ? [...imageTypes, ...documentTypes]
            : this.fileType === 'image'
            ? imageTypes
            : documentTypes;
        let PNGincluded = false;

        if (this.$route.path.includes('messages')) {
          types.push('image/png');
          PNGincluded = true;
        }

        const validType = types.includes(type);
        if (!validType) {
          return 'Upload only PDF,' + (PNGincluded ? ' PNG, ' : ' ') + 'JPG or JPEG files!';
        }

        const fileSize = size / 1024 / 1000;
        if (fileSize > 2) {
          return 'This file exceeds the maximum size of 2MB';
        }

        this.documentType = type;

        return null;
      },
      async upload(data) {
        this.uploading = true;

        let formData = new FormData();
        formData.append('doc', data);

        try {
          const res = await this.$axios.post('/cloudinary/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          return { status: true, data: res.data.data.file_url };
        } catch (e) {
          if (!e.response) {
            return { status: false, data: null };
          }

          const message = this.catchErrors(e);
          return {
            status: false,
            data: message || 'An error occurred, please try again',
          };
        } finally {
          this.uploading = false;
        }
      },
    },
  };
</script>
