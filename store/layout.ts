import { defineStore } from 'pinia';

export const useLayoutStore = defineStore('layoutStore', () => {
  const authCardSize = ref('sm');

  function updateAuthCardSize(cardSize: string) {
    authCardSize.value = cardSize;
  }

  return {
    updateAuthCardSize,
    authCardSize,
  };
});
