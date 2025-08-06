<script setup>
    import api from '@/api';
    import { API } from '../../services/api'
    import ButtonChecked from '@/components/ButtonChecked.vue';
    import ButtonNotChecked from '@/components/ButtonNotChecked.vue';




</script>

<script>


        const videoList = await API.videos.getVideos()
        for (let i = 0; i < Object.keys(await API.videos.getVideos()).length; i++) {
            console.log(videoList[i].title);
        }

        export default {
        data() {
            return {
                
            }
        },
        methods: {
            videoSearch(e) {
                console.log(e.target.value);
            },
            async isCheckedFunction(element, is_checked) {
                const video = await API.videos.getVideos()
                await API.videos.changeIsChecked(element.target.id, is_checked)
                console.log(is_checked)                
            }
        },
    }
</script>
<template>
    <div class="moderation-video-main-area">
        <div class="moderation-video-main-area-header">
            <h1>Модерация видео</h1>
            <div class="moderation-video-main-area-header-search-area">
                <input @input="videoSearch" class="moderation-video-main-area-header-search" type="text" name="" id="" placeholder="Поиск">
                <select class="moderation-video-main-area-header-search-select" name="video_category" id="">
                    <option>Категории</option>
                    <option>Трукрайм</option>
                    <option>Веселое</option>
                    <option>Разоблочения</option>
                    <option>Политика</option>
                    <option>Другое</option>
                </select>
                <select class="moderation-video-main-area-header-search-select" name="" id="">
                    <option>Все (11)</option>
                    <option>На модерации (6)</option>
                    <option>Принято (2)</option>
                    <option>Отклонено (3)</option>
                    <option>Просмотрено (2)</option>
                    <option>Не просмотрено (9)</option>
            </select>
            </div>

        </div>
        <div class="moderation-video-main-area-content">
            <div v-for="(i, documentId) in videoList" :key="documentId" :class="'moderation-video-main-area-content-element ' + i.id" >
                <div class="moderation-video-main-area-content-element-info">
                    <div class="moderation-video-main-area-content-element-info-header">
                    <h1 class="moderation-video-main-area-content-element-title">{{ i.title }}</h1>

                    <ButtonNotChecked :id="i.documentId" :is_checked="i.is_checked" v-if="!i.is_checked" @click="isCheckedFunction($event, i.is_checked)"></ButtonNotChecked>
                    <ButtonChecked :id="i.documentId" :is_checked="i.is_checked" v-else @click="isCheckedFunction($event, i.is_checked )"></ButtonChecked>
                    <!-- <button class="is-checked-button" @click="isCheckedFunction">
                        <p  class="moderation-video-main-area-content-element-check-status">{{ i.is_checked ? 'Просмотренно' : 'Не просмотрено' }}</p>
                        <img v-if="i.is_checked" class="is-checked-icon" src="../images/accept.svg" alt="" style="background-color: #85c57a; border-radius: 50%;">
                    </button> -->
                    </div>
                        <select class="moderation-video-main-area-content-element-choose-video-category" name="video_category" id="">
                            <option>Категории</option>
                            <option>Трукрайм</option>
                            <option>Веселое</option>
                            <option>Разоблочения</option>
                            <option>Политика</option>
                            <option>Другое</option>
                        </select>
                    <a target="_blank" :href="i.url" class="moderation-video-main-area-content-element-link">{{ i.url }}</a>
                    <div>
                    <div class="moderation-video-main-area-content-element-buttons">
                        <button class="moderation-video-main-area-content-element-button-yes">Смотрим</button>
                        <button class="moderation-video-main-area-content-element-button-mb">Мб смотрим</button>
                        <button class="moderation-video-main-area-content-element-button-no">Хуйня</button>
                    </div>
                    <p :class="'moderation-video-main-area-content-element-status-' + i.agreement_status">{{ i.agreement_status }}</p>
                    </div>
                </div>
                <div class="moderation-video-main-area-content-element-preview">\
                    <img :src="i.preview" alt="">
                </div>
            </div>
        </div>
    </div>

</template>

<style>
*{
    transition: .2s;
}
.moderation-video-main-area-content-element-choose-video-category {
    border-radius: 5px;
    width: 140px;
    height: 36px;
    background-color: #1c1c1c;
    color: #fff;
    padding: 5px;
    user-select: none;
}

.moderation-video-main-area-content-element-preview{
    border-radius: 15px;
    border: 1px solid #fff;
    width: 448px;
    height: 252px;

}
.moderation-video-main-area-content-element-is-checked {
    color: #fff;
    font-family: 'Raleway-SemiBold', sans-serif;

}
.moderation-video-main-area-content-element-info-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.moderation-video-main-area-content-element-status {
    color: #ffffff;
    
}
.moderation-video-main-area-header-search-area {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-around;
}

.moderation-video-main-area-header-search {
    width: 300px;
    height: 40px;
    background-color: #1C1C1C;
    border-radius: 10px;
    border: 1px solid #fff;
    color: #fff;
    font-family: 'Raleway-SemiBold', sans-serif;
    padding-left: 15px;
    outline: none;

        &:hover{
        border: 1px solid #8f8f8f;
    }
}

.moderation-video-main-area-content-element-status-moderation {
    color: #fff;
    position: relative;
    font-family: 'Courier New', Courier, monospace;
    padding: 5px 0px 0px 0px;
    font-family: 'Raleway-SemiBold', sans-serif;
}

.moderation-video-main-area-content-element-status-accepted {
    color: #85c57a;
    position: relative;
    font-family: 'Courier New', Courier, monospace;
    padding: 5px 0px 0px 0px;
    font-family: 'Raleway-SemiBold', sans-serif;
}

.moderation-video-main-area-content-element-status-rejected {
    color: #FF695B;
    position: relative;
    font-family: 'Courier New', Courier, monospace;
    padding: 5px 0px 0px 0px;
    font-family: 'Raleway-SemiBold', sans-serif;
}
.moderation-video-main-area-content-element-button-yes {
    background-color: #ACFF9E;

    &:hover{
        background-color: #85c57a;
        border: none;
    }

    &:active{
        transform: scale(0.9);
    }
}
.moderation-video-main-area-content-element-button-no {
    background-color: #FF695B;
    &:hover{
        background-color: #da574b;
        border: none;
    }

    &:active{
        transform: scale(0.9);
    }
}
.moderation-video-main-area-content-element-button-mb {
    background-color: #FFD28F;
    &:hover{
        background-color: #c5b65b;
        border: none;
    }

    &:active{
        transform: scale(0.9);
    }
}
.moderation-video-main-area-content-element-title {
    font-size: 20px;
    padding-right: 15px;
}
.moderation-video-main-area-content-element-buttons {
    justify-content: space-between;
    display:flex;
}

.moderation-video-main-area-content-element-buttons button {
    width: 140px;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    color: #1C1C1C;
}
.moderation-video-main-area-content-element-info {
    display:flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    width: 500px;
    padding-right: 10px;
}

.moderation-video-main-area-content-element-link {
    color: #6441a5;
}

.moderation-video-main-area-content-element-link:hover {
    text-decoration: underline;
    transform: scale(1.02);
}
.moderation-video-main-area-content-element {
    justify-content: space-between;
    height: 300px;
    width: 900px;
    display:flex;
    align-items: center;
    padding: 15px;
    background-color: #1C1C1C;
    border-radius: 15px;
    border: 1px solid #fff;
    cursor: pointer;;
    &:hover{
        transform: scale(1.01);
        border: 1px solid #6441a5;
        box-shadow: 0px 0px 10px #6441a5;
    }
}
.moderation-video-main-area-content {
    height: calc(100vh - 220px);
    padding: 15px;
    margin-top: 15px;
    scrollbar-width: smooth;
    overflow-y: scroll;
    overflow-x: hidden;
    display:grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 15px;
}

.moderation-video-main-area-header-search-select {
    width: 300px;
    height: 40px;
    background-color: #1C1C1C;
    border: 1px solid #fff;
    color: #ffffff;
    font-family: 'Raleway-SemiBold', sans-serif;
    font-size: 18px;
    border-radius: 10px;
    padding-left: 15px;
    cursor: pointer;
    &:hover{
        border: 1px solid #8f8f8f;
    }
}

.moderation-video-main-area {
    padding: 15px;    
}

.moderation-video-main-area-header {
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;}

@media screen and (max-width: 1500px) {
        .moderation-video-main-area-content {
            grid-template-columns: 1fr;
    }

        .moderation-video-main-area-content-element {
            height: 98%;            
            width: 893px;
    }
        
}
</style>