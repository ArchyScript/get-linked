<template>
  <div
    id=""
    :class="`${class} blend-in`"
    :style="` background-size: cover;
      background-repeat: no-repeat;
      background-position: center; ${
        imageUrl ? `background-image:url(${imageUrl});` : ''
      }  ${customStyle}`"
  >
    <slot />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted, watch } from 'vue';

  export default defineComponent({
    name: 'ImageLoader',
    props: {
      photoUrl: {
        type: String,
        required: true,
      },
      class: {
        type: String,
        default: '',
      },
      customStyle: {
        type: String,
        default: '',
      },
      loadedDirectly: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const image = ref('');
      const imageUrl = ref('');

      const setImage = () => {
        if (props.loadedDirectly) {
          imageUrl.value = props.photoUrl;
          return;
        }
        imageUrl.value = props.photoUrl || '';

        const highResImage = new Image();

        highResImage.onload = function () {
          image.value = imageUrl.value;
        };

        highResImage.src = imageUrl.value;
      };

      watch(props, () => {
        setImage();
      });

      onMounted(() => {
        setImage();
      });

      return {
        image,
        imageUrl,
      };
    },
  });
</script>

<style scoped>
  .blend-in {
    animation: fadein 0.15s;
    -moz-animation: fadein 0.15s; /* Firefox */
    -webkit-animation: fadein 0.15s; /* Safari and Chrome */
    -o-animation: fadein 0.15s; /* Opera */
  }
</style>
