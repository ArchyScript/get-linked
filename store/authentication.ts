import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const unVerifiedUserEmail = ref<String>('')
  const token = ref<String>('')
  const user = ref<Object>({})

  const setUnVerifiedUserEmail = (email: string) => {
    unVerifiedUserEmail.value = email
  }

  const setAuthToken = (authToken: string) => {
    token.value = authToken
    localStorage.setItem('authToken', authToken)
  }

  const setAuthUser = (userProfile: object) => {
    user.value = userProfile
  }

  const logout = () => {
    const router = useRouter()
    user.value = {}
    token.value = ''
    localStorage.removeItem('userToken')
    router.push('/')
  }

  return {
    setAuthToken,
    setAuthUser,
    token,
    logout,
    user,
    unVerifiedUserEmail,
    setUnVerifiedUserEmail,
  }
})
