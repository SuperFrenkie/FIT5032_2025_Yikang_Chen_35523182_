import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)
  const isLoggedIn = ref(false)

  const isAdmin = computed(() => user.value?.role === 'admin')

  function setUser(newUser) {
    user.value = newUser
    isLoggedIn.value = !!newUser
  }

  return { user, isLoggedIn, isAdmin, setUser }
}) 