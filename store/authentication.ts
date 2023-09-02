import { defineStore } from 'pinia';
// const { useKYCApi } = '../composables';

const serializer = {
  serialize: JSON.stringify,
  deserialize: JSON.parse,
};

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter();

  // logged in user
  const token = ref<String>('');
  const userProfile = ref<any>({});
  const userKYC = ref<any>({});
  const authenticatedUser = ref<any>({});
  const previousRoute = ref<string | null>(null);

  // unauthenticated data like kyc data in local storage
  const unVerifiedUserEmail = ref<String>('');
  const kycData = ref<Object>({});

  // getters
  const getKYCData = computed(() => kycData.value);
  // const getAuthenticatedUser = computed(() => authenticatedUser.value);

  // actions
  const setUnVerifiedUserEmail = (email: string) => {
    unVerifiedUserEmail.value = email;
  };

  const setAuthToken = (authToken: string) => {
    token.value = authToken;
    localStorage.setItem('authToken', authToken);
  };

  const setAuthUser = (userDetails: any) => {
    // if (userProfile) userProfile.value = userProfile;
    // if (userProfile) userProfile.value = userProfile;
    console.log(userDetails);
    authenticatedUser.value = userDetails;
  };

  const updateUserProfile = async () => {
    // const { getUserProfile } = useKYCApi();
    // const response = await getUserProfile();
    // const { data, error } = response;
    // if (error) return $toast('show', { type: 'error', message: error.message });
    // $toast('show', { type: 'success', message: data.message || 'Profile update Successful' });
    // userProfile.value = data;
    console.log(98);
  };

  const getAuthenticatedUser = async () => {
    const { getUserProfile } = useKYCApi();

    const response = await getUserProfile();
    const { data, error } = response;

    // $toast('show', { type: 'error', message: error.message });
    if (error) return;
    const { kyc } = data;

    // success message for login
    setAuthUser(data);

    if (Object.keys(kyc).length < 1) return router.push('/auth/kyc');
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
    userProfile.value = {};
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
    userProfile,
    userKYC,
    getAuthenticatedUser,
    kycData,
    previousRoute,
    authenticatedUser,
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
