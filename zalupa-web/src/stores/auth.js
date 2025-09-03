import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { instance } from '../../services/axios/instance'
const APIKEY = 'AIzaSyAkAVqh68vBS5M9gDkOGfvZCgc730jpynE'
const isChatOpen = ref(false)
const isModeration = ref(true)
const isSignIn = ref(false)
const isOpenCloseAddVideoModule = ref(false)
const sortCategory = ref('Веселое')
const sortIsChecked = ref('Все')
const sortAccepted = ref('Все')
const sortInput = ref('')
const videoList = ref([])
const isListEmpty = ref(false)

export const authorizationUser = async ({username, password}) => {
  const response = await instance.post('/auth/local', {
    identifier: username, password
  },
)
return response.data
}

export const getVideos = async () => {
  try {
    const res = await instance.get('/videos')
    videoList.value = res.data
    return videoList
  } catch (error) {
    console.error(error)
  }
}

export const useAuthStore = defineStore('auth', () => {
  const signInOrUp = () => {
    isSignIn.value = !isSignIn.value
    return isSignIn.value
  }

  function getCookie(name) {
    let cookieValue = null
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';')
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim()
        if (cookie.substring(0, name.length + 1) === name + '=') {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1))
          break
        }
      }
    }
    return cookieValue
  }

  const signUp = async (payload) => {
    try {
      let response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${APIKEY}`,
        {
          ...payload,
          returnSecureToken: true
        }
      )
      console.log(response.data)
    } catch (error) {
      catchError(error)
    }
  }
  return { signUp, isChatOpen, signInOrUp, getCookie, isModeration, sortCategory, sortAccepted, getVideos, sortInput, sortIsChecked, authorizationUser, isListEmpty}
})
