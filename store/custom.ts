import { defineStore } from 'pinia';
import { ToastObjectType } from '~/types/custom';

export const useCustomStore = defineStore('customStore', () => {
  // state
  const toastObject: Ref<ToastObjectType> = ref({});
  const showToast: Ref<boolean> = ref(false);

  // actions
  const getToastObjectValues = (action: string, toastObjectValues: ToastObjectType) => {
    showToast.value = action == 'show' ? true : false;
    toastObject.value = toastObjectValues;

    setTimeout(() => {
      showToast.value = false;
    }, toastObjectValues.duration);
  };

  const hideToast = () => {
    showToast.value = false;
  };

  return {
    showToast,
    toastObject,
    getToastObjectValues,
    hideToast,
  };
});
