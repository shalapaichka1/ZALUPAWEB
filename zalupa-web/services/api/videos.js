import axios from 'axios'
import { ref } from 'vue'
import { instance } from '../axios/instance.js'
import {API} from '../../services/api'
 
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
export const refreshVideoList = async (videoList) => {
  try {
      videoList = await API.videos.getVideos()
      console.log(videoList)
  } catch (error) {
      console.error('Ошибка при обновлении списка видео:', error);
  }
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

  const send_date_res = new Date().toISOString().split('T')[0]; // 2024-01-19

  const getTitle = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${link.split('=')[1]}&key=AIzaSyAd_rFuqgRiTnoUv0SzJfgVGdOauNwHYAw`
  )
  const response = await instance.post('/videos', {
    data: {
      url: link,
      url_id: link.split('=')[1],
      title: getTitle.data.items[0].snippet.title,
      sender: 'shalapok',
      comment: comment_text,
      agreement_status: '0',
      is_checked: false,
      send_date: send_date_res,
      author: getTitle.data.items[0].snippet.channelTitle,
    }
  })
  console.log(response.data)
  return response.data
}

export const addNewUser = async ({username, email, password}) => {
  const response = await instance.post('/auth/local/register', {
      username, email, password
  },
)
}

export const authorizationUser = async ({username, password}) => {
    const response = await instance.post('/auth/local', {
      identifier: username, password
  },
)
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

// вытаскиваем ник пользователя из cookie

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