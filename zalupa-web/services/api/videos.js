import axios from 'axios'
import { instance } from '../axios/instance.js'

export const getVideos = async () => {
  try {
    const response = await instance.get('/videos')
    console.log(response.data)
    return response.data
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
      agreement_status: 1,
      is_checked: false,
      // вытаскиваем url_id из ссылки
      url_id: link.split('=')[1]
    }
  })
  console.log(response.data)
  return response.data
}
