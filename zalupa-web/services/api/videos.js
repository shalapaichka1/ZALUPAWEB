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

export const addVideo = async (link) => {
  try {
    const response = await instance.post('/videos', {
      data: {
        url: link,
        title: 'title',
        agreement_status: 1,
        is_checked: false
      }
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
