import { defineStore } from 'pinia';
const serializer = {
  serialize: JSON.stringify,
  deserialize: JSON.parse,
};

export const useAuthStore = defineStore('auth', () => {
  const unVerifiedUserEmail = ref<String>('');
  const token = ref<String>('');
  const user = ref<any>({});
  const kycData = ref<Object>({});

  // getters
  const getKYCData = computed(() => kycData.value);

  // actions
  const setUnVerifiedUserEmail = (email: string) => {
    unVerifiedUserEmail.value = email;
  };

  const setAuthToken = (authToken: string) => {
    //
    // localStorage.removeItem('authToken');
    token.value = authToken;
    localStorage.setItem('authToken', authToken);
  };

  const setAuthUser = (userProfile: object) => {
    user.value = userProfile;
  };

  const setKYCData = (data: any) => {
    kycData.value = data;
    saveKYCDataToLocalStorage();
  };

  const saveKYCDataToLocalStorage = () => {
    localStorage.setItem('kycData', serializer.serialize(kycData.value));
  };

  const loadKYCDataFromLocalStorage = async () => {
    const kycInStorage = localStorage.getItem('kycData');
    if (!kycInStorage) return;

    const deserializedData = serializer.deserialize(kycInStorage);
    if (Object.keys(deserializedData).length > 0) {
      kycData.value = deserializedData;
    }
  };

  // onBeforeMount(async () => {
  //   await loadKYCDataFromLocalStorage();
  // });

  const logout = () => {
    const router = useRouter();
    user.value = {};
    token.value = '';
    localStorage.removeItem('authToken');
    router.push('/');
  };

  return {
    setAuthToken,
    setAuthUser,
    token,
    logout,
    user,
    kycData,
    getKYCData,
    unVerifiedUserEmail,
    setUnVerifiedUserEmail,
    loadKYCDataFromLocalStorage,
    saveKYCDataToLocalStorage,
    setKYCData,
  };
});
