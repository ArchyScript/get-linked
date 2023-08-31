import { defineStore } from 'pinia';
import { countries as allCountries } from '../utils/constants';

export const useConstantsStore = defineStore('constantsStore', () => {
  // state
  const countries: Ref<any> = ref(allCountries);

  // actions
  // const fetchCountries = () => {
  //   countries.value = toastObjectValues;
  // };

  //
  onBeforeMount(() => {
    console.log('Heelo from constantsStore');
  });

  return {
    countries,
  };
});
