<script setup>
    import {ref} from 'vue'

    import { authorizationUser, useAuthStore } from '@/stores/auth';

    import { instance } from '../../services/axios/instance';

    const videoList = ref([])
    function mounted() {
        refreshVideoList();
    }

    async function refreshVideoList() {
        try {
            const data = await instance.get('/videos')
            useAuthStore().videoList = data.data.data
        } catch (error) {
            console.error('Ошибка при обновлении списка видео:', error);
        }
    }

    async function videoSearch(e) {
        const res = await instance.get(`/videos?filters[title][$containsi]=${e.target.value}`)
        useAuthStore().videoList = res.data.data
        console.log(e.target.value)
        if (useAuthStore().videoList.length === 0) {
            useAuthStore().isListEmpty = true
        }
        else {
            useAuthStore().isListEmpty = false
        }
    }

    function getHighQualityThumbnail(url_id) {
        return `https://img.youtube.com/vi/${url_id}/hqdefault.jpg`;
    }

    async function onChangeCategorySelect(event) {
    useAuthStore().sortCategory = event.target.value
    try {
      const res = await instance.get(`/videos/?filters[category]=${useAuthStore().sortCategory}`)
      useAuthStore().videoList = res.data.data
    } catch(error){
        console.error(error)
    }
  }

  async function onChangeAcceptedSelect(event) {
    useAuthStore().sortAccepted = event.target.value

    try {
      const res = await instance.get(`/videos/?filters[agreement_status]=${useAuthStore().sortAccepted}`)
      useAuthStore().videoList = res.data.data
    } catch{
        
    }
  }
  async function onChangeIsCheckedSelect(event) {
    useAuthStore().sortIsChecked = event.target.value

    try {
        const res = await instance.get(`/videos/?filters[is_checked]=${event.target.value}`)    
        useAuthStore().videoList = res.data.data

        if (useAuthStore().sortIsChecked = event.target.value === 'Все') {
            const res = await instance.get('/videos')
            useAuthStore().videoList = res.data.data
        }
    } catch(error){
        console.error(Error)
    }
  }
  async function clearFilters() {
    useAuthStore().sortCategory = 'Веселое'
    useAuthStore().sortAccepted = 'Все'
    useAuthStore().sortIsChecked = 'Все'
    useAuthStore().sortInput = ''
    try {
      const res = await instance.get(`/videos`)
      useAuthStore().videoList = res.data.data
    } catch{
        
    }
  }

  async function switchCheckedVideo(video_id) {
  try {
    const response = await instance.put(`/videos/${video_id}`, {
        data: {
            is_checked: true,
      },
    },
    {    
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzU2NzI2ODgyLCJleHAiOjE3NTkzMTg4ODJ9.KvxpRggSAStbYcEyVxHk8fhVHNcZOKGHHoLGo5NfGX0',}
    }
)
    console.log(url_id, conditon)
    return response.data
  } catch (error) {
    console.error('Ошибка обновления:', error)
    throw error
  }
}

async function changeCategorySelect(event, video_id) {
  try {
    const categoryy = event.target.value;
    alert(categoryy)
    const updateData = {
      data: {
        category: categoryy
      }
    };

    const response = await instance.put(`videos/${video_id}`, updateData);
    
    if (response.data) {
      console.log('Успешно обновлено:', response.data);
      return response.data;
    }
    
  } catch (error) {
    console.error('Ошибка:', error.response?.data || error.message);
    throw error;
  }
}
    mounted()
</script>

<template>
    <div class="moderation-video-main-area">
        <div class="moderation-video-main-area-header">
            <h1 class="moderation-video-title">Модерация видео</h1>
            <div class="moderation-video-main-area-header-search-area">
                <input v-model='useAuthStore().sortInput' @input="videoSearch" class="moderation-video-main-area-header-search" type="text" name="" id="" placeholder="Поиск">
                <select v-model="useAuthStore().sortCategory" @change="onChangeCategorySelect" class="moderation-video-main-area-header-search-select" name="video_category">
                    <option value="Веселое">Веселое</option>
                    <option value="Трукрайм">Трукрайм</option>
                    <option value="Разоблачения">Разоблачения</option>
                    <option value="Политика">Политика</option>
                    <option value="Страшное">Страшное</option>
                    <option value="Другое">Другое</option>
                </select>
                <select v-model="useAuthStore().sortAccepted" @change="onChangeAcceptedSelect" class="moderation-video-main-area-header-filter-select" name="video_status_category">
                    <option selected>Все</option>
                    <option value="0">На модерации</option>
                    <option value="1">Принято</option>
                    <option value="2">Отклонено</option>
                </select>

                <select v-model="useAuthStore().sortIsChecked" @change="onChangeIsCheckedSelect" class="moderation-video-main-area-header-search-select" name="" id="">
                    <option selected>Все</option>
                    <option value="false">Не просмотрено</option>
                    <option value="true">Просмотрено</option>
                </select>

                <button class="clearButton" @click="clearFilters">
                    <img src="../images/clearButton.png" alt="">
                </button>
            </div>

        </div>
        
        <div class="moderation-video-main-area-content">
            <h1 class="no-videos-found" v-if="useAuthStore().isListEmpty">По запросу "{{  useAuthStore().sortInput }}" ничего не найдено</h1>

            <div :v-model="videoList" v-for="(i, documentId) in useAuthStore().videoList" :key="documentId" :class="'moderation-video-list-element ' + i.id" >
                
                <div class="video-element-info">
                    <h1 class="video-element-title">{{ i.title }}</h1>

                    <div class="moderation-video-main-area-content-element-info-header">

                    </div>


                    <a target="_blank" :href="i.url" class="video-element-link">{{ i.url }}</a>
                    <div>
                        <div class="video_element_info_section_2">
                    <select @change="(event) => changeCategorySelect(event, i.id)" class="video_element_select" name="video_category" id="">
                            <option value='Категории'>Категории</option>
                            <option value="Трукрайм">Трукрайм</option>
                            <option value="Веселое">Веселое</option>
                            <option value="Разоблочения">Разоблочения</option>
                            <option value="Политика">Политика</option>
                            <option value="Другое">Другое</option>
                        </select>
                        <div class="video-element-actions">
                            <button v-if="i.is_checked" class="video-element-actions-buttons is-checked-button"  @click="switchCheckedVideo(i.id)">
                                <img class="video-element-actions-img" src="../images/isChecked.png" alt="">
                            </button>
                            <button v-else class="video-element-actions-buttons not-is-checked-button" @click="switchCheckedVideo(i.id)">
                                <img class="video-element-actions-img" src="../images/isChecked.png" alt="">
                            </button>

                            <button v-if="i.isFirstTab" class="video-element-actions-buttons is-first-tab-button">
                                <img class="video-element-actions-img" src="../images/isFirstTab.png" alt="">
                            </button>

                            <button v-else class="video-element-actions-buttons not-is-first-tab-button">
                                <img class="video-element-actions-img" src="../images/isFirstTab.png" alt="">
                            </button>
                        </div>



                    </div>
                    <div class="video-element-buttons">
                        <button style="background-color: #ACFF9E; color: #151515;" class="button-yes">Смотрим</button>
                        <button style="background-color: #FFD28F; color: #151515;" class="button-mb">Мб смотрим</button>
                        <button style="background-color: #FF695B; color: #151515;" class="button-no">Хуйня</button>
                    </div>


                    </div>
                </div>
                <div class="video-element-preview">
                    <img class="preview" loading="lazy" decoding="async"
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

.video-element-actions-img {
    width: 25px;
}
.is-checked-button {
    filter: grayscale(100%);
}

.is-first-tab-button {
    filter: grayscale(100%);
}
.video-element-actions-buttons {
    width: 100%;
}
.video-element-actions {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    width: 100%;
}
.no-videos-found {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
.clearButton{
  background-color: #ff6464;
  width: 60px;

  img {
    width: 20px;
    height: 20px;
    color: aliceblue;
  }

  &:hover img {
    transform: scale(1.5);
  }
}

.moderation-video-title {
    color: white;
}
.video-element-title {
    height: 100%;
}
.video-element-link {
    word-wrap: break-word;
    max-width: 600px;
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
    width: auto;
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
    background-color: #151515;
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
    width: 550px;
    color: #fff;
    outline: none;
    cursor:auto;
}

.moderation-video-main-area-header {
    padding: 15px;  
    padding-right: 0;
    z-index: 1;
    width: 99.4%;
    position: absolute;
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    background-color: #1515152f;
    backdrop-filter: blur(70px);
}
</style>