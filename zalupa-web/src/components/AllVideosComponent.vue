<script>
import {API} from '../../services/api'
import { onMounted } from 'vue';


export default {
    data() {
        return {
            videoList: ([])
        }
    },
    async mounted(){
        await this.refreshVideoList();
    },
    methods: {
        async refreshVideoList() {
            
                try {
                    this.videoList = await API.videos.getVideos()
                } catch (error) {
                    console.error('Ошибка при обновлении списка видео:', error);
                }
            },
            getHighQualityThumbnail(url_id) {
                console.log(`https://img.youtube.com/vi/${url_id}/hqdefault.jpg`)
                return  `https://img.youtube.com/vi/${url_id}/hqdefault.jpg`;
            },
    }
}
</script>

<template>
    <div class="all-video-module">
        <div class="all-video-element" v-for="(el, documentId) in videoList" :key="documentId">
            <img class="preview" :src=getHighQualityThumbnail(el.url_id) :alt="el.title">
                <div class="overlay">
                    <h1 class="el-title">{{ el.title }}</h1>
                    <a class="look-botton" :href="el.url">Смотреть</a>
                </div>
        </div>
    </div>
</template>

<style>
@font-face {
  font-family: 'PPmori-Regular';
  src: url('C:\Users\Admin\Documents\GitHub\ZALUPAWEB\zalupa-web\src\fonts\PPMori-Regular.otf') format('woff2');
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

    &:hover {
        scale: 1.05;
        background-color: #09090985;
        border: 1px solid #6441a1;
    }
}
.all-video-module {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    justify-items: center;
    overflow-y: auto;
}

.preview {
    width: 41.5vh;
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
    transition: .2s ease-out;
    opacity: 0;
    border: 2px solid #ffffff0c;
    justify-content: space-between;
    align-content: space-around;
    flex-direction: column;
}
.all-video-element {
    height: 400px;
    position: relative;
    overflow: hidden;
    border-radius: 15px;

    &:hover .preview{
        transition: .2s ease-in;
        transform: scale(1.3);
    }

    &:hover {
        z-index: 1;
        
    }
}

.all-video-element:hover .overlay {
  width: 100%;
  opacity: 1;
}

.overlay > h1 {
    text-wrap: wrap;
    font-family:'PPmori-Regular', sans-serif;
    font-weight: 600;
    color: white;
    font-size: 40px;
    overflow: hidden;
}
</style>