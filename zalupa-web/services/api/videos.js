import axios from 'axios'
import { ref } from 'vue'
import { instance } from '../axios/instance.js'

const is_checked_status = ref(false)
const video_id = ref(20)
// import { strapi } from 'strapi'

export const getVideos = async () => {
  try {
    const response = await instance.get('/videos')
    return { ...response.data.data }
  } catch (error) {
    console.error(error)
  }
}

export const addVideo = async (link, comment_text) => {
  const getTitle = await axios.get(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${link.split('=')[1]}&key=AIzaSyAd_rFuqgRiTnoUv0SzJfgVGdOauNwHYAw`
  )
  const response = await instance.post('/videos', {
    data: {
      url: link,
      title: getTitle.data.items[0].snippet.title,
      comment: comment_text,
      agreement_status: 'moderation',
      is_checked: false,
      // вытаскиваем url_id из ссылки
      url_id: link.split('=')[1]
    }
  })
  console.log(response.data)
  return response.data
}

// export const addNewUser = async (login, mail, password) => {
//   const response = await instance.post('/users', {
//     data: {
//       username: login,
//       email: mail,
//       password: password,
//       confirmed: false,
//       blocked: false,
//       role: 'Public'
//       // вытаскиваем url_id из ссылки
//     }
//   })
//   console.log(response.data)
//   return response.data
// }

export const changeIsChecked = async (id, status) => {
  const response = await axios.put(`http://localhost:1337/api/videos/${id}`, {
    data: {
      is_checked: !status
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })
  console.log(response.data)
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
