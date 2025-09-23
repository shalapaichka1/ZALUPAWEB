<script setup>
import { ref, onMounted, computed } from 'vue'
import AddVideoComponent from '@/components/AddVideoComponent.vue'
import { instance } from '../../services/axios/instance'
import { useAuthStore } from '../stores/auth'
import Cookies from 'js-cookie'
import toast, { Toaster } from 'vue3-hot-toast'

const authStore = useAuthStore()
const channelCache = new Map()
const userFavorites = ref({}) // Храним статус лайков для каждого видео

const videoStatuses = {
  0: 'На модерации',
  1: 'Принято', 
  3: 'Отклонено',
  2: 'Мб смотрим'
}

const videoStatusColors = {
  0: '#FFD28F',
  1: '#ACFF9E',
  3: '#FF695B',
  2: '#FFD28F'
}

onMounted(async () => {
  try {
    const data = await instance.get('/videos?sort=title:asc&filters[agreement_status]=1')
    authStore.videoList = data.data.data
    
    if (authStore.videoList.length === 0 && data.data.length > 0) {
      authStore.videoList = data.data
    }
    
    // Загружаем статусы лайков для всех видео
    await loadAllFavoritesStatus()
  } catch (error) {
    console.error('Ошибка при загрузке через instance:', error)
  }
})

// Загружаем статусы лайков для всех видео
async function loadAllFavoritesStatus() {
  if (!authStore.videoList.length) return
  
  try {
    const promises = authStore.videoList.map(async (video) => {
      const response = await instance.get(`/videos/${video.documentId}?populate=users`)
      const users = response.data.data.users || []
      const isLiked = users.some(user => user.username === authStore.userInfo.username)
      userFavorites.value[video.documentId] = isLiked
    })
    
    await Promise.all(promises)
  } catch (error) {
    console.error('Ошибка при загрузке статусов лайков:', error)
  }
}

function isLiked(videoId) {
  return userFavorites.value[videoId] || false
}

async function toggleFavorite(video) {
  try {
    const response = await instance.get(`/videos/${video.documentId}?populate=users`)
    const currentUsers = response.data.data.users || []
    
    const isCurrentlyLiked = currentUsers.some(user => user.username === authStore.userInfo.username)
    
    if (isCurrentlyLiked) {
      // Убираем лайк
      await instance.put(`/videos/${video.documentId}`, {
        data: {
          users: {
            disconnect: [authStore.userInfo.id]
          }
        }
      })
      userFavorites.value[video.documentId] = false
      video.like_count = Math.max(0, (video.like_count || 1) - 1)
      toast.success()
    } else {
      // Добавляем лайк
      await instance.put(`/videos/${video.documentId}`, {
        data: {
          users: {
            connect: [authStore.userInfo.id]
          }
        }
      })
      userFavorites.value[video.documentId] = true
      video.like_count = (video.like_count || 0) + 1
    }
    
  } catch (error) {
    console.error('Ошибка при обновлении лайка:', error)
    toast.error('Ошибка при обновлении лайка')
  }
}

function getHighQualityThumbnail(url_id) {
  return `https://img.youtube.com/vi/${url_id}/hqdefault.jpg`
}

function getChannelUrl(videoUrl, authorName) {
  if (channelCache.has(videoUrl)) {
    return channelCache.get(videoUrl)
  }
  
  try {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(authorName)}`
    channelCache.set(videoUrl, searchUrl)
    return searchUrl
  } catch (error) {
    console.error('Ошибка при получении канала:', error)
    return `https://www.youtube.com/results?search_query=${encodeURIComponent(authorName)}`
  }
}

function handleAuthorClick(videoUrl, authorName, event) {
  event.preventDefault()
  event.stopPropagation()
  
  try {
    const channelUrl = getChannelUrl(videoUrl, authorName)
    window.open(channelUrl, '_blank')
  } catch (error) {
    console.error('Ошибка при открытии канала:', error)
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(authorName)}`, '_blank')
  }
}
</script>

<template>
  <h1 class="no-videos-found" v-if="useAuthStore().isListEmpty">Видео не найдены</h1>
  <div class="all-video-module">
    <div class="all-video-element" v-for="(el, documentId) in useAuthStore().videoList" :key="documentId">
      <div class="overlay-info">
        <div class="new-video-notice" v-if="((new Date().getDate() - new Date(el.send_date).getDate()) == 0)"></div>
      </div>
      <img class="preview" :src="getHighQualityThumbnail(el.url_id)" :alt="el.title">
      <div class="overlay">
        <h1 class="el-title el-author" 
            @click="handleAuthorClick(el.url, el.author, $event)"
            :title="`Перейти на канал ${el.author}`">
          {{ el.author }}
        </h1>
        <h1 class="el-title">{{ el.title }}</h1>
        <div class="overlay-buttons">
          <a target="_blank" class="look-botton" :href="el.url">Смотреть</a>
          <button @click="toggleFavorite(el)" class="like-button">
            <img v-if="isLiked(el.documentId)" class="like1-image" src="../images/favorite2.png" alt="">
            <img v-else class="like1-image" src="../images/favorite1.png" alt="">
            <span>{{ el.like_count }}</span>
          </button>
        </div>

      </div>
    </div>
  </div>
  <AddVideoComponent/>
</template>

<style scoped>

.like1-image {
  position: relative;
  height: 40px;
  width: 40px;

}
.like-button {
  width: max-content;
  display: flex;
  justify-content: center;
  gap: 0;
}
.overlay-buttons {
  gap: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
}
.look-botton {
    width: 100%;
    text-align: center;
    padding: 15px;
    gap: 15px;
    background-color: #6441a1;
    border-radius: 15px;
    &:hover {
        transform: scale(1.01);
        filter: brightness(70%);
    }
}
.no-videos-found {
  font-size: 24px;
  font-weight: 800;
  color: white;
  text-align: center;
  margin-top: 100px;
  margin-bottom: 100px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.new-video-notice, .video-agreement{
    position: absolute;
    right: 0;
    color: aliceblue;
    font-size: 20px;
    z-index: 1;
    background-color: #ff9d35;
    padding: 15px;
    margin: 15px;
    border-radius: 15px;
    font-weight: 800;
    transition: opacity 0.3s ease;
}


.video-agreement {
    left: 0;
    width: max-content;
    color: black;
}

.all-video-element:hover .new-video-notice, .all-video-element:hover .video-agreement {
    opacity: 0;
}

.all-video-module {
    padding: 15px;
    padding-top: 95px;
    padding-bottom: 14vh;
    height: 95vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    justify-content: center;
    gap: 15px;
    place-items: center;
    overflow: auto;
    scroll-behavior: smooth;
}

.preview {
    scale: 1.2;
    width: 100%;
    object-fit: contain;
}

.overlay {
    justify-items: center;
    align-items: center;
    padding: 15px;
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    backdrop-filter: blur(20px);
    background-color: #0000002f;
    overflow: hidden;
    height: 100%;
    opacity: 0;
    border: 3px solid #ffffff0c;
    justify-content: space-between;
    align-content: space-around;
    flex-direction: column;
    border-radius: 15px;
}

.all-video-element {
    border: 1px solid rgba(255, 255, 255, 0.5);
    height: 32vh;
    position: relative;
    overflow: hidden;
    border-radius: 15px;
    z-index: 1;
    width: 100%;
}

.all-video-element:hover .preview {
    transform: scale(1.3);
}

.all-video-element:hover {
    transform: scale(1.05);
}

.all-video-element:hover .overlay {
    width: 100%;
    opacity: 1;
}

.overlay > h1 {
    text-wrap: wrap;
    font-weight: 600;
    color: white;
    font-size: 3vh;
    overflow: hidden;
}
/* Стили для кликабельного имени автора */

.el-author {
    cursor: pointer;
    position: relative;
}

.el-author:hover {
    z-index: 100000;
    color: #6441a1 !important;
    text-shadow: 0 0 10px rgba(100, 65, 161, 0.5);
}

.el-author::after {
    content: '🔗';
    margin-left: 8px;
    font-size: 24px;
    opacity: 0;
}

.el-author:hover::after {
    opacity: 1;
}

.el-author.loading {
    opacity: 0.7;
    pointer-events: none;
}

.el-author.loading::after {
    content: '⏳';
    opacity: 1;
}
</style>