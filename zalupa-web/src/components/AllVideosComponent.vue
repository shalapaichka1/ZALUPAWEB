<script setup>

import { API } from '../../services/api'
import { ref, onMounted } from 'vue' // Добавляем onMounted
import AddVideoComponent from '@/components/AddVideoComponent.vue'
import { instance } from '../../services/axios/instance'
import { useAuthStore } from '../stores/auth'
import Cookies from 'js-cookie'
const channelCache = new Map()
const videoStatuses = {
  0: 'На модерации',
  1: 'Принято', 
  2: 'Отклонено'
}
const videoStatusColors = {
  0: '#FFD28F',
  1: '#ACFF9E',
  2: '#FF695B'
}

// Используем хук жизненного цикла
onMounted(async () => {
  await useAuthStore().getVideos
  
  // Дополнительная проверка через instance
  try {
    const data = await instance.get('/videos')
    useAuthStore().videoList = data.data.data
    
    // Если videoList пустой, заполняем данными из instance
    if (useAuthStore().videoList.length === 0 && data.data.length > 0) {
      useAuthStore().videoList = data.data
    }
  } catch (error) {
    console.error('Ошибка при загрузке через instance:', error)
  }
}
)

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

async function handleAuthorClick(videoUrl, authorName, event) {
  event.preventDefault()
  event.stopPropagation()
  
  try {
    const channelUrl = await getChannelUrl(videoUrl, authorName)
    window.open(channelUrl, '_blank')
  } catch (error) {
    console.error('Ошибка при открытии канала:', error)
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(authorName)}`, '_blank')
  }
}

async function isFavoriteForMe(){
  const res = await instance.get('/users')
}
</script>

<template>
  <h1 class="no-videos-found" v-if="useAuthStore().isListEmpty">Видео не найдены</h1>
  <div class="all-video-module">
    <div class="all-video-element" v-for="(el, index) in useAuthStore().videoList" :key="index">
      <div class="overlay-info">
        <div class="new-video-notice" v-if="((new Date().getDate() - new Date(el.send_date).getDate()) == 0)"></div>
        <div :style="{ backgroundColor: videoStatusColors[el.agreement_status] }" class="video-agreement">
          {{ videoStatuses[el.agreement_status] }}
        </div>
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
          <button class="like-button">
            <img v-if="isFavoriteForMe" class="like1-image" src="../images/favorite1.png" alt="">
            <span>{{ el.like_count }}</span>
          </button>
        </div>

      </div>
    </div>
  </div>
  <AddVideoComponent/>
</template>

<style>
@font-face {
  font-family: 'PPmori-Regular';
  src: url('C:\Users\Admin\Documents\GitHub\ZALUPAWEB\zalupa-web\public\PPMori-Regular.otf') format('opentype');
}

.like1-image {
  position: relative;
  height: 60px;
  width: 60px;
  top: 5px;

}
.like-button {
  height: 80px;
  width: 80px;
  width: 100px;
  display: flex;
  flex-direction: column;

  span {
    position: relative;
    top: -15px;
  }
}
.overlay-buttons {
  gap: 15px;
  display: flex;
  align-items: center;
  width: 100%;
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

.look-botton {
    position: relative;
    background-color: #6441a1;
    height: max-content;
    padding: 25px;
    width: 90%;
    text-align: center;
    color: white;
    font-size: 24px;
    border-radius: 15px;
    border: 1px solid #0000002f;
    transition: all 0.3s ease;
}

.look-botton:hover {
    scale: 1.05;
    background-color: #09090985;
    border: 1px solid #6441a1;
}

.look-botton:active {
    transform: scale(.98)
}

.all-video-module {
    padding: 15px;
    padding-top: 105px;
    padding-bottom: 105px;
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
    transition: transform 0.3s ease;
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
    transition: all 0.3s ease-out;
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
    transition: transform 0.3s ease;
    min-width: max-content;
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
    font-size: 40px;
    overflow: hidden;
}

/* Стили для кликабельного имени автора */
.el-author {
    cursor: pointer;
    transition: all 0.3s ease;
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
    transition: opacity 0.3s ease;
}

.el-author:hover::after {
    opacity: 1;
}

/* Индикатор загрузки при клике */
.el-author.loading {
    opacity: 0.7;
    pointer-events: none;
}

.el-author.loading::after {
    content: '⏳';
    opacity: 1;
}
</style>