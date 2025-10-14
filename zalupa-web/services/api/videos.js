import axios from 'axios'
import { ref } from 'vue'
import { instance } from '../axios/instance.js'
import {API} from '../../services/api'
import Cookies from 'js-cookie'
import { toast } from 'vue3-hot-toast'
import { useAuthStore } from '@/stores/auth.js'

const is_checked_status = ref(false)
const video_id = ref(20)
const videoList = ref([])
const addVideoComponentIsVisible = ref(false)
const videoStatuses = [{
    0: 'На модерации',
    1: 'Принято',
    2: 'Отклонено'
  }
]

export const addVideoComponentIsVisibleFunction = (bool) => {
  addVideoComponentIsVisible.value = bool
  return addVideoComponentIsVisible.value
}

export const getUsers = async () => {
  try {
    const response = await instance.get('/users')
    console.log(...response.data.data)
    videoList.value = {...response.data.data}
    return videoList
  } catch (error) {
    console.error(error)
  }
}

export const addVideo = async (link, comment_text) => {
  try {
    const authStore = useAuthStore();
    
    // Проверяем, есть ли JWT токен
    if (!authStore.token) {
      // Если токена нет, пробуем получить его через логин
      const username = Cookies.get('username');
      const password = Cookies.get('password'); // Не рекомендуется хранить пароль в cookies!
      
      if (!username || !password) {
        toast.error('Требуется авторизация');
        throw new Error('Not authenticated');
      }
      
      // Получаем JWT токен от Strapi
      const loginResponse = await axios.post('http://localhost:1337/api/auth/local', {
        identifier: username,
        password: password
      });
      
      const { jwt, user } = loginResponse.data;
      authStore.setToken(jwt);
      authStore.user = user;
    }

    const send_date_res = new Date().toISOString().split('T')[0];

    const getTitle = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${link.split('=')[1]}&key=AIzaSyAd_rFuqgRiTnoUv0SzJfgVGdOauNwHYAw`
    );

    // Отправляем запрос с JWT токеном
    const response = await instance.post('/videos', {
      data: {
        url: link,
        url_id: link.split('=')[1],
        title: getTitle.data.items[0].snippet.title,
        sender: Cookies.get('username'),
        comment: comment_text,
        agreement_status: '0',
        is_checked: false,
        send_date: send_date_res,
        author: getTitle.data.items[0].snippet.channelTitle,
        like_count: 0
      }
    }, {
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    });

    console.log(response.data);
    toast.success(`Видео отправлено на модерацию`);
    
    // Обновляем страницу
    if (authStore.reloadPage) {
      authStore.reloadPage();
    }
    
    return response.data;
  } catch (error) {
    console.error('Error adding video:', error);
    
    // Обработка ошибок авторизации
    if (error.response?.status === 401) {
      toast.error('Ошибка авторизации. Пожалуйста, войдите снова.');
      authStore.logout();
    } else {
      toast.error('Ошибка при отправке видео: ' + (error.response?.data?.error?.message || error.message));
    }
    
    throw error;
  }
}

// Альтернативная версия - если у вас есть отдельная функция для получения JWT
export const addVideoWithAuth = async (link, comment_text) => {
  try {
    const authStore = useAuthStore();
    
    // Получаем JWT токен (предполагается, что пользователь уже залогинен)
    const token = await getJWTToken();
    
    if (!token) {
      toast.error('Не удалось получить токен авторизации');
      throw new Error('No JWT token available');
    }

    const send_date_res = new Date().toISOString().split('T')[0];

    const getTitle = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${link.split('=')[1]}&key=AIzaSyAd_rFuqgRiTnoUv0SzJfgVGdOauNwHYAw`
    );

    const response = await axios.post('http://localhost:1337/api/videos', {
      data: {
        url: link,
        url_id: link.split('=')[1],
        title: getTitle.data.items[0].snippet.title,
        sender: Cookies.get('username'),
        comment: comment_text,
        agreement_status: '0',
        is_checked: false,
        send_date: send_date_res,
        author: getTitle.data.items[0].snippet.channelTitle,
        like_count: 0
      }
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    console.log(response.data);
    toast.success(`Видео отправлено на модерацию`);
    
    if (authStore.reloadPage) {
      authStore.reloadPage();
    }
    
    return response.data;
  } catch (error) {
    console.error('Error adding video:', error);
    toast.error('Ошибка при отправке видео');
    throw error;
  }
}

export const getJWTToken = async () => {
  try {
    const username = Cookies.get('username');

    const response = await axios.post('http://localhost:1337/api/auth/local', {
      identifier: useAuthStore().userInfo.username,
      password
    });

    const { jwt } = response.data;
    
    const authStore = useAuthStore();
    authStore.userInfo.jwt = jwt;
    
    return jwt;
  } catch (error) {
    console.error('Error getting JWT token:', error);
    return null;
  }
}

export const addNewUser = async ({username, email, password}) => {
  const response = await instance.post('/auth/local/register', {
    username: username,
    email: email,
    password: password,
    comfconfirmed: false,
    blocked: false
  })
}

export const changeIsChecked = async (id, status) => {
  const response = await axios.put(`http://localhost:1337/api/videos/${id}`, {
    data: {
      is_checked: !status
    },
    headers: {
      'Content-Type': 'application/json',
    }
  })
  console.log(response.data)
  await API.videos.refreshVideosModule();
  return response.data
}

export const getCookie = (name) => {
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

export const checkVideoExists = async (link) => {
  const response = await axios.get(`http://localhost:1337/api/videos/`)
  if (response.data.includes(link)){
    return true
  }
}