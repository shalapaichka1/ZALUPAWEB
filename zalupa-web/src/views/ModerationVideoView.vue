<script setup>
    import api from '@/api';
    import {ref} from 'vue'
    import { API } from '../../services/api'
    import ButtonChecked from '@/components/ButtonChecked.vue';
    import ButtonNotChecked from '@/components/ButtonNotChecked.vue';
</script>

<script>
        export default {
        data() {
            return {
                videoList: ref([]),
                gridColumns: '1fr 1fr',
                columns2Width: '1000px',
                columns2Height: '400px',
                isChecked: false,
                buttonYes: '#ACFF9E',
                buttonMb: '#FFD28F',
                buttonNo: '#FF695B',
            }
        },
        async mounted() {
            await this.refreshVideoList();
        },
        methods: {
            async refreshVideoList() {
                try {
                    this.videoList = await API.videos.getVideos()
                    console.log(this.videoList)
                } catch (error) {
                    console.error('Ошибка при обновлении списка видео:', error);
                }
            },
            async videoSearch(e) {
                console.log(e.target.value);
            },
            async isCheckedFunction(element, is_checked) {
            // Получаем id видео из элемента события
                try {
                    // Меняем статус is_checked на противоположный
                    await API.videos.changeIsChecked(element, is_checked);
                    // Обновляем список видео, чтобы обновился контент и кнопка
                    await this.refreshVideoList();
                } catch (error) {
                    console.error('Ошибка при изменении статуса видео:', error);
                }
            },
            async startGifPreview(videoId) {
    // Находим элемент превью по id
                const previewElement = document.getElementById(`video-preview-${videoId}`);
                if (previewElement) {
                    // Сохраняем исходное изображение, чтобы вернуть его позже
                    previewElement.dataset.staticSrc = previewElement.src;
                    // Меняем src на gif-анимацию
                    previewElement.src = getGifUrlForVideo(videoId);
                }
            },
            async stopGifPreview(videoId) {
                // Находим элемент превью по id
                const previewElement = document.getElementById(`video-preview-${videoId}`);
                if (previewElement && previewElement.dataset.staticSrc) {
                    // Возвращаем исходное изображение
                    previewElement.src = previewElement.dataset.staticSrc;
                    // Очищаем сохранённый src
                    delete previewElement.dataset.staticSrc;
                }
            },
             getHighQualityThumbnail(url_id) {
                console.log(`https://img.youtube.com/vi/${url_id}/hqdefault.jpg`)
                return  `https://img.youtube.com/vi/${url_id}/hqdefault.jpg`;
            },
            changeColums(columns, w1, h1){
                const area = document.querySelector('.moderation-video-main-area-content')
                const elements = document.querySelectorAll('.moderation-video-main-area-content-element')
                    area.style.gridTemplateColumns=columns;
                    elements.forEach(element => {
                    element.style.width = w1;
                    element.style.height = h1;
                    });
            },
            changeStatusButton(isChecked){
                isChecked = API.videos.getVideos
                console.log(isChecked)
            }
        },
    }

</script>
<template>
    <div class="moderation-video-main-area">
        <div class="moderation-video-main-area-header">
            <h1>Модерация видео</h1>
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
                    <option>Просмотрено (2)</option>
                    <option>Не просмотрено (9)</option>
            </select>
            </div>

        </div>
        <div class="moderation-video-main-area-content">
            <div :v-model="API.videos.refreshVideosModule" v-for="(i, documentId) in videoList" :key="documentId" :class="'moderation-video-list-element ' + i.id" >
                <div class="video-element-info">
                    <h1 class="video-element-title">{{ i.title }}</h1>

                    <div class="moderation-video-main-area-content-element-info-header">

                    </div>


                    <a target="_blank" :href="i.url" class="video-element-link">{{ i.url }}</a>
                    <div>
                        <div class="video_element_info_section_2">
                    <select class="video_element_select" name="video_category" id="">
                            <option>Категории</option>
                            <option>Трукрайм</option>
                            <option>Веселое</option>
                            <option>Разоблочения</option>
                            <option>Политика</option>
                            <option>Другое</option>
                        </select>
                    <ButtonChecked class="check_button" :id="i.documentId" :is_checked="i.is_checked" @click="changeStatusButton(e)"></ButtonChecked>

                    </div>
                    <div class="video-element-buttons">
                        <button style="background-color: #ACFF9E;" class="button-yes">Смотрим</button>
                        <button style="background-color: #FFD28F;" class="button-mb">Мб смотрим</button>
                        <button style="background-color: #FF695B;" class="button-no">Хуйня</button>
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
    height: 88vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 15px;
    justify-content: center;
    gap: 15px;
    place-items: center;
    overflow: auto;
    scroll-behavior: smooth;
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
    border: 1px solid white;
    height: 60px;
    padding: 15px;
    border-radius: 15px;

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
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-around;
}

.moderation-video-main-area-header-search {
    width: 400px;
    background-color: #1C1C1C;
    border: 1px solid #fff;
    color: #fff;
    outline: none;
    cursor:auto;
}

.moderation-video-main-area-header-search-select {
    background-color: #1C1C1C;
    border: 1px solid #fff;
    color: #ffffff;
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
    align-items: center;
}

@keyframes opacityChange{

}
/* @media screen and (max-width: 1500px) {
        .moderation-video-main-area-content {
            grid-template-columns: 1fr;
    }
        .moderation-video-main-area-content-element {
            width: 99%;
    }  
        .moderation-video-main-area-content-element-info {
            width: 66%;
        }
        .moderation-video-main-area-content-element-buttons button, .moderation-video-main-area-content-element-choose-video-category {
            width: 30%;
        }
        .grid-buttons {
            opacity: 0;

        }
} */
</style>