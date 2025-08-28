<script setup>
    import {API} from '../../services/api'
    import {ref} from 'vue'
    import AddVideoComponent from '@/components/AddVideoComponent.vue';

    const videoList = ref([])
    const channelCache = new Map()
    const videoStatuses = {
                0: 'На модерации ',
                1: 'Принято',
                2: 'Отклонено'
            }
    const videoStatusColors = {
                0: '#FFD28F',
                1: '#ACFF9E',
                2: '#FF695B'
            }

    function mounted(){
        refreshVideoList();
    }

    async function refreshVideoList() {
        try {
            videoList.value = await API.videos.getVideos()
        } catch (error) {
            console.error('Ошибка при обновлении списка видео:', error);
        }
    }
        
    function getHighQualityThumbnail(url_id) {
        return `https://img.youtube.com/vi/${url_id}/hqdefault.jpg`;
    }
        
    function getChannelUrl(videoUrl, authorName) {
        if (channelCache.has(videoUrl)) {
            return channelCache.get(videoUrl);
        }
            
        try {
            const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(authorName)}`;
            channelCache.set(videoUrl, searchUrl);
            return searchUrl;
                
        } catch (error) {
            console.error('Ошибка при получении канала:', error);
            return `https://www.youtube.com/results?search_query=${encodeURIComponent(authorName)}`;
        }
    }

    async function handleAuthorClick(videoUrl, authorName, event) {
        event.preventDefault();
        event.stopPropagation();
            
        try {
            const channelUrl = await getChannelUrl(videoUrl, authorName);
            window.open(channelUrl, '_blank');
        } catch (error) {
            console.error('Ошибка при открытии канала:', error);
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(authorName)}`, '_blank');
        }
    }
    mounted()
</script>

<template>
    <div class="all-video-module">
        <div class="all-video-element" v-for="(el, documentId) in videoList.value" :key="documentId">
            <div class="overlay-info">
                <div class="new-video-notice" v-if="((new Date().getDate() - new Date(el.send_date).getDate()) -1 ) < 1" ></div>
                <div :style="{ backgroundColor: videoStatusColors[el.agreement_status] }" class="video-agreement">{{ videoStatuses[el.agreement_status]}}</div>

            </div>

            <img class="preview" :src="getHighQualityThumbnail(el.url_id)" :alt="el.title">
            <div class="overlay">
                <!-- Добавляем кликабельное имя автора -->
                <h1 class="el-title el-author" 
                    @click="handleAuthorClick(el.url, el.author, $event)"
                    :title="`Перейти на канал ${el.author}`">
                    {{ el.author }}
                </h1>
                <h1 class="el-title">{{ el.title }}</h1>
                <a target="_blank" class="look-botton" :href="el.url">Смотреть</a>
            </div>
        </div>
    </div>
    <AddVideoComponent/>
</template>

<style>
@font-face {
  font-family: 'PPmori-Regular';
  src: url('C:\Users\Admin\Documents\GitHub\ZALUPAWEB\zalupa-web\src\fonts\PPMori-Regular.otf') format('woff2');
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
    font-family:'PPmori-Regular', sans-serif;
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
    border: 1px solid #00000000;
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
    height: 82vh;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    margin-top: 15px;
    justify-content: center;
    gap: 15px;
    place-items: center;
    overflow: auto;
    scroll-behavior: smooth;
}

.preview {
    width: 100%;
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
    background-color: #00000092;
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
    font-family: 'PPmori-Regular', sans-serif;
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