<script lang="js">
import { API } from '../../services/api'


// import axios from 'axios'
// import YouTube from 'youtube-api'

export default {
    data(){
        return {
            isVisible: true
        }
    },
    methods: {
        // parseYoutubeVideoTitle(url) {
        //     const youtube = new YouTube();

        //     youtube.getVideoInfo(url, (err, video) => {
        //     if (err) {
        //         console.error(err);
        //     } else {
        //         console.log(video.title);
        //     }
        //     });
        // },
        removeComponent() {
            this.isVisible = !this.isVisible
        },
        notification() {
            const link = document.getElementsByClassName('add-video-module-input')[0].value
            const comment_text = document.getElementsByClassName('add-video-comment-input')[0].value
            if (link === '') {
                alert('Вы не ввели ссылку на видео!')
            }
            else if (link.includes('vkvideo') === true) {
                alert("Сосеб")
            }
            else if (link.length !== 43 || link.startsWith('https://www.youtube.com/watch?v=') === false) {
                alert("Это не Ютуб, броу")
                console.log('asd')
            }

            else {
                API.videos.addVideo(link, comment_text)
                alert('Видео успешно добавлено!')
                this.removeComponent()
            }
        },
        changeColorInfo() {
            const link = document.getElementsByClassName('add-video-module-input')[0].value
            if (link.length !== 43 || link.startsWith('https://www.youtube.com/watch?v=') === false) {
                document.getElementsByClassName('add-video-module-input')[0].style.border = '1px solid #FF695B'
            }
            else {
                document.getElementsByClassName('add-video-module-input')[0].style.border = '1px solid #ACFF9E'
            }
        }
    }
}
</script>

<template>
    <div class="add-video-module-background" v-if="isVisible">
        <div class="add-video-module">
            <h1>Добавить видео</h1>
            <input @input="changeColorInfo" class="add-video-module-input" type="text" placeholder="Ссылка на видео">
            <input class="add-video-comment-input" type="text" placeholder="Комментарий  (не более 50 символов, не обязательно)">
            <button class="add-video-module-button" @click="notification"> Добавить</button>
            <img src="../images/close-button.png" alt="" class="add-video-module-close-button" @click="removeComponent">
        </div>
    </div>
</template>

 <style scoped>
    @import '../assets/base.scss';

    .add-video-module-background {
        z-index: 10;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .add-video-module {
        background-color: #1C1C1C;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        border: 2px solid #6F6F6F;
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 20px;
        width: 800px;
        height: 250px;
    }

    .add-video-module h1 {
        font-family: 'Raleway-SemiBold', sans-serif;
        color: white;
        font-size: 28px;
        letter-spacing: 2px;
        text-align: center;
    }

    .add-video-module input {
        width: 100%;
        height: 40px;
        background: #1C1C1C;
        border: 2px solid #6F6F6F;
        border-radius: 5px;
        padding: 5px 15px;
        font-size: 14px;
        font-family: 'RaleWay', sans-serif;
        color: white;
        outline: none;
    }

    .add-video-module button {
        width: 100%;
        height: 40px;
        background: #1c1c1c;
        border-radius: 5px;
        font-family: 'Raleway-SemiBold', sans-serif;
        color: white;
        border: 1px solid #6441a5;
    }

    .add-video-module button:hover {
        transition: .2s;
        background-color: #6441a5;
        color: #fff;
    }

    .add-video-module-close-button {
        width: 20px;
        height: 20px;
        position: absolute;
        cursor: pointer;
        margin-left: 720px;
    }

    .add-video-module-close-button:hover {
        transition: .2s;
        transform: scale(1.2);
    }   

    .add-video-module-close-button:active {
        transition: .1s;
        transform: scale(0.9);
    }
 </style>