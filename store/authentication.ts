import { defineStore } from 'pinia';
// const { $toast } = useNuxtApp();

const serializer = {
  serialize: JSON.stringify,
  deserialize: JSON.parse,
};

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  const unVerifiedUserEmail = ref<String>('');
  const token = ref<String>('');
  const user = ref<any>({});
  const kycData = ref<Object>({});
  const previousRoute = ref<string | null>(null);

  // getters
  const getKYCData = computed(() => kycData.value);

  // actions
  const setUnVerifiedUserEmail = (email: string) => {
    unVerifiedUserEmail.value = email;
  };

  const setAuthToken = (authToken: string) => {
    token.value = authToken;
    localStorage.setItem('authToken', authToken);
  };

  const setAuthUser = (userProfile: object) => {
    user.value = userProfile;
  };

  const updateUserProfile = async () => {
    // const { getUserProfile } = useKYCApi();
    // const response = await getUserProfile();
    // const { data, error } = response;
    // if (error) return $toast('show', { type: 'error', message: error.message });
    // $toast('show', { type: 'success', message: data.message || 'Profile update Successful' });
    // user.value = data;
    console.log(98);
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

  const clearAuthStore = () => {
    token.value = '';
    user.value = {};
    kycData.value = '';
    unVerifiedUserEmail.value = '';
  };

  function savePreviousRoute() {
    previousRoute.value = router.currentRoute.value.fullPath;
  }

  const logout = () => {
    localStorage.removeItem('authToken');
    clearAuthStore();
    savePreviousRoute();
    router.push('/auth/login');
  };

  return {
    setAuthToken,
    setAuthUser,
    logout,
    token,
    user,
    kycData,
    previousRoute,
    getKYCData,
    unVerifiedUserEmail,
    setUnVerifiedUserEmail,
    loadKYCDataFromLocalStorage,
    saveKYCDataToLocalStorage,
    setKYCData,
    savePreviousRoute,
    updateUserProfile,
  };
});
