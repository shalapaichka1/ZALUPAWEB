import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { instance } from '../../services/axios/instance'
import Cookies from 'js-cookie'
const APIKEY = 'AIzaSyAkAVqh68vBS5M9gDkOGfvZCgc730jpynE'
const isChatOpen = ref(false)
const isModeration = ref(false)
const isSignIn = ref(false)
const isOpenCloseAddVideoModule = ref(false)
const sortCategory = ref('Веселое')
const sortIsChecked = ref('Все')
const sortAccepted = ref('Все')
const sortInput = ref('')
const videoList = ref([])
const isListEmpty = ref(false)
const isOpenSignInComponent = ref(false)
const isDarkTheme = ref(true)
const isProfileOpen = ref(false)
const isAuthorized = ref(document.cookie.includes('username='))
const userInfo = ref([])

export const authorizationUser = async (username, password) => {
  await instance
    .post('/auth/local', {
      identifier: username,
      password: password
    })
    .then((response) => {
      // Handle success.
      isModeration.value = response.data.user.isModerator
      console.log('Well done!')
      console.log('User profile', response.data.user)
      console.log('User moderator ?', isModeration.value)
      Cookies.set('username', response.data.user.username)
      console.log(userInfo.value)
      console.log(isModeration.value)
    })
    .catch((error) => {
      // Handle error.
      console.log('An error occurred:', error.response)
    })
    isAuthorized.value = true
}

const login = async (email, password) => {
  try {
    setLoading(true)
    clearError()

    // Валидация
    if (!email || !password) {
      throw new Error('Email и пароль обязательны')
    }

    const response = await instance.post(
      '/auth/login',
      {
        email: email.trim().toLowerCase(),
        password: password
      },
      {
        timeout: 10000
      }
    )

    if (response.data.success && response.data.data) {
      const { user: userData, token: authToken } = response.data.data

      // Сохраняем данные
      setUser(userData)
      setToken(authToken)

      return {
        success: true,
        user: userData,
        message: 'Вход выполнен успешно'
      }
    } else {
      throw new Error(response.data.message || 'Ошибка авторизации')
    }
  } catch (error) {
    console.error('Ошибка входа:', error)

    let errorMessage = 'Ошибка входа'

    if (error.response) {
      // Ошибка от сервера
      const status = error.response.status

      switch (status) {
        case 400:
          errorMessage = 'Некорректные данные'
          break
        case 401:
          errorMessage = 'Неверный email или пароль'
          break
        case 403:
          errorMessage = 'Доступ запрещен'
          break
        case 404:
          errorMessage = 'Пользователь не найден'
          break
        case 422:
          errorMessage = 'Ошибка валидации'
          break
        case 500:
          errorMessage = 'Внутренняя ошибка сервера'
          break
        default:
          errorMessage = error.response.data?.message || `Ошибка ${status}`
      }
    } else if (error.request) {
      // Нет ответа от сервера
      errorMessage = 'Нет ответа от сервера. Проверьте соединение'
    } else if (error.message) {
      // Ошибка валидации или другая клиентская ошибка
      errorMessage = error.message
    }

    setError(errorMessage)

    return {
      success: false,
      message: errorMessage,
      error: error
    }
  } finally {
    setLoading(false)
  }
}
async function addNewUser(usernames, emails, passwords) {
  try {
    const response = await instance.post('/auth/local/register', {
      username: usernames,
      email: emails,
      password: "testpass",
      isModerator: true
    })
    alert(passwords)

    if (response.status === 201) {
      return {
        success: true,
        data: response.data,
        message: 'Пользователь успешно зарегистрирован'
      }
    }

    return {
      success: false,
      message: 'Ошибка при регистрации'
    }

  } catch (error) {
    console.error('Ошибка регистрации:', error)
    
    return {
      success: false,
      message: error.response?.data?.message || 'Ошибка сервера',
      error: error
    }
  }
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

function deleteAllCookies() {
  // Получаем все куки
  const cookies = document.cookie.split(';')

  // Перебираем все куки
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i]
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim()

    // Удаляем куки, устанавливая прошлую дату expiration
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;'

    // Также удаляем для других возможных путей и доменов
    document.cookie =
      name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=' + document.domain + ';'
    document.cookie =
      name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=.' + document.domain + ';'
  }

  console.log('Все куки были удалены')
  return true
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
  return {
    isChatOpen,
    addNewUser,
    getCookie,
    isModeration,
    sortCategory,
    sortAccepted,
    getVideos,
    sortInput,
    sortIsChecked,
    authorizationUser,
    isListEmpty,
    login,
    isOpenSignInComponent,
    isDarkTheme,
    isProfileOpen,
    deleteAllCookies,
    isAuthorized,
    userInfo
  }
})
