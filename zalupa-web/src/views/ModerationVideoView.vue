<script setup>
    import {ref} from 'vue'
    import { API } from '../../services/api'
    import ButtonChecked from '@/components/ButtonChecked.vue';

    const videoList = ref([])

    function mounted() {
        refreshVideoList();
    }

    async function refreshVideoList() {
        try {
            videoList.value = await API.videos.getVideos()
        } catch (error) {
            console.error('Ошибка при обновлении списка видео:', error);
        }
    }

    function videoSearch(e) {
        console.log(e.target.value);
    }

    function getHighQualityThumbnail(url_id) {
        console.log(`https://img.youtube.com/vi/${url_id}/hqdefault.jpg`)
        return  `https://img.youtube.com/vi/${url_id}/hqdefault.jpg`;
    }

    function changeColums(columns, w1, h1){
        const area = document.querySelector('.moderation-video-main-area-content')
        const elements = document.querySelectorAll('.moderation-video-main-area-content-element')
        area.style.gridTemplateColumns=columns;
        elements.forEach(element => {
        element.style.width = w1;
        element.style.height = h1;
        });
    }

    function changeStatusButton(isChecked){
        isChecked = API.videos.getVideos
        console.log(isChecked)
    }

    mounted()
</script>

<template>
    <div class="moderation-video-main-area">
        <div class="moderation-video-main-area-header">
            <h1 class="moderation-video-title">Модерация видео</h1>
            <div class="moderation-video-main-area-header-search-area">
                <div class="grid-buttons">
                    <img @click="changeColums('1fr', '1400px', '400px')" src="../images/gridRow.png" alt="">
                    <img @click="changeColums('1fr 1fr', '84vh', '30vh')" src="../images/gridColumn2x2.png" alt="">
                    <img @click="changeColums('1fr 1fr 1fr','34vh', '20vh')"  src="../images/gridColumn3x2.png" alt="">

                </div>
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
                </select>

                <select class="moderation-video-main-area-header-search-select" name="" id="">
                    <option>Просмотрено (2)</option>
                    <option>Не просмотрено (9)</option>
                </select>
            </div>

        </div>
        <div class="moderation-video-main-area-content">
            <div :v-model="API.videos.refreshVideosModule" v-for="(i, documentId) in videoList.value" :key="documentId" :class="'moderation-video-list-element ' + i.id" >
                
                <div class="video-element-info">
                    <h1 class="video-element-title">{{ i.title }}</h1>

                    <div class="moderation-video-main-area-content-element-info-header">

                    </div>


                    <a target="_blank" :href="i.url" class="video-element-link">{{ i.url }}</a>
                    <div>
                        <div class="video_element_info_section_2">
                    <select class="video_element_select" name="video_category" id="">
                            <option value="Категории">Категории</option>
                            <option value="Трукрайм">Трукрайм</option>
                            <option value="Веселое">Веселое</option>
                            <option value="Разоблочения">Разоблочения</option>
                            <option value="Политика">Политика</option>
                            <option value="Другое">Другое</option>
                        </select>
                    <ButtonChecked class="check_button" :id="i.documentId" :is_checked="i.is_checked" @click="changeStatusButton(e)"></ButtonChecked>

                    </div>
                    <div class="video-element-buttons">
                        <button style="background-color: #ACFF9E; color: #1c1c1c;" class="button-yes">Смотрим</button>
                        <button style="background-color: #FFD28F; color: #1c1c1c;" class="button-mb">Мб смотрим</button>
                        <button style="background-color: #FF695B; color: #1c1c1c;" class="button-no">Хуйня</button>
                    </div>
                    </div>
                </div>
                <div class="video-element-preview">

                    <img class="preview"
                    
                        :src=getHighQualityThumbnail(i.url_id)
                        :alt="i.title"
                    />

                </div>
            </div>
        </div>
    </div>

</template>

<style>
*{
    transition: .2s;
}

.moderation-video-title {
    color: white;
    font-family: 'PPmori-Regular', sans-serif;
}
.video-element-title {
    height: 100%;
}
.video-element-link {
    font-size: 22px;
    margin-bottom: 15px;
    &:hover{
        text-decoration: underline;
    }
}

.video_element_select {
    grid-column: span 2;
}

.video_element_info_section_2 {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
    margin-bottom: 15px;
}

.video-element-buttons {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 15px;
}

.video-element-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    width: 900px;
    margin-right: 15px;
}

.video-element-preview {
    display: flex;
    justify-items: center;
}

.preview {
    height: 100%;
    border-radius: 15px;
}

.moderation-video-main-area-content {
    height: 96vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: center;
    gap: 15px;
    place-items: center;
    overflow: auto;
    scroll-behavior: smooth;
    padding-top: 6vh;
}

.moderation-video-list-element {
    margin: 15px;
    height: 30vh;
    width: 84vh;
    background-color: #1C1C1C;
    display: flex;
    border-radius: 15px;
    border: 1px solid #fff;
    padding: 15px;

    &:hover {
        border:1px solid #8f8f8f ;
    }
}
.grid-buttons {
    display: flex;
    align-items: center;
    justify-items: center;
    gap: 10px;
    cursor: pointer;
    border: 1px solid #494949;
    height: 60px;
    padding: 15px;
    border-radius: 15px;
    background-color: #15151570;

    img {
        width: 30px;
        &:hover {
        transform: scale(1.1);
        filter: brightness(70%);
    }

    &:active {
        transform: scale(.95);
        }
    }
}

.moderation-video-main-area-header-search-area {
    margin-right: 30px;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-around;
    width: 84vh;
}

.moderation-video-main-area-header-search {
    width: 400px;
    color: #fff;
    outline: none;
    cursor:auto;
}

.moderation-video-main-area-header {
    left: 0;
    padding: 15px;    
    z-index: 1;
    width: 99.4%;
    position: absolute;
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    background-color: #00000000;
    backdrop-filter: blur(70px);
}
</style>