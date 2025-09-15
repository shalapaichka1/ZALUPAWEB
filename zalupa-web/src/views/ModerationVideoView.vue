<script setup>
    import {ref} from 'vue'
    import { useAuthStore } from '@/stores/auth';
    import { instance } from '../../services/axios/instance';
import toast from 'vue3-hot-toast';

    const statusesList = {
        0: 'moderation',
        1: ['accepted', 'Смотрим', '#ACFF9E'],
        2: ['mb', 'Мб смотрим', '#FFD28F'],
        3: ['rejected', 'Хуйня', '#FF695B'],
    }

    const categories = ref([
        "Веселое",
        "Трукрайм",
        "Страшное",
        "Политика",
        "Другое"
    ])
    const videoList = ref([])
    function mounted() {
        refreshVideoList();
    }

    async function refreshVideoList() {
        try {
            const data = await instance.get('/videos?sort=title:asc')
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
        if (useAuthStore().sortCategory == "firstTab") {
            const res = await instance.get(`/videos/?filters[isFirstTab]=true&sort=title:asc`)
            useAuthStore().videoList = res.data.data
        }
        else {
            const res = await instance.get(`/videos/?filters[category]=${useAuthStore().sortCategory}`)
            useAuthStore().videoList = res.data.data
        }

    } catch(error){
        console.error(error)
    }
  }

  async function onChangeAcceptedSelect(event) {
    useAuthStore().sortAccepted = event.target.value
    try {
        if (useAuthStore().sortAccepted == 'Все') {
            const res = await instance.get(`/videos?sort=title:asc`)
            useAuthStore().videoList = res.data.data
        }
        else {
            const res = await instance.get(`/videos/?filters[agreement_status]=${useAuthStore().sortAccepted}`)
            useAuthStore().videoList = res.data.data

        }

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
      const res = await instance.get(`/videos?sort=title:asc`)
      useAuthStore().videoList = res.data.data
    } catch{
        
    }
  }

async function toCheckedFunction(el, isCheck){
    console.log(el.documentId)
  const res = await instance.put(`videos/${el.documentId}`,{
    data:{
      is_checked: !isCheck
    }
  })
  .then(res => {
    useAuthStore().reloadPage()
    if(isCheck){
    toast.success('Видео не просмотрено')
    }
    else {
        toast.success('Видео просмотрено')
    }
    console.log('updates:', res.data);
  })
  .catch(error => {
    console.log(error.res)
  })

}

async function toFirstTabFunction(el, isFT){
  const res = await instance.put(`videos/${el.documentId}`,{
    data:{
      isFirstTab: !isFT
    }
  })
  .then(res => {
    console.log('updates:', res.data);
    useAuthStore().reloadPage()
    if (isFT) {
        toast.success("Видео удалено из первой очереди")
    }
    else {
        toast.success("Видео добавленно в первую очередь")
    }
  })
  .catch(error => {
    console.log(error.res)
  })

}

async function changeAgreementStatusFunction(el, status){

    const res = await instance.put(`videos/${el.documentId}`,{
        data:{
        agreement_status: status.toString()
    }
  })
  .then(res => {
    console.log('updates:', res.data);
  })
  .catch(error => {
    console.error(error)
  })
  
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

async function toCheckedFunctionBRFF(a, b) {
    if (useAuthStore().userInfo.username == "bratishkinoff") {
        await toCheckedFunction(a, b)
    }
}
async function changeCategorySelect(event, el) {
  try {
    const categoryy = event.target.value;
    const updateData = {
      data: {
        category: categoryy
      }
    };

    const response = await instance.put(`videos/${el.documentId}`, updateData);
    
    if (response.data) {
        console.log('Успешно обновлено:', response.data);
        useAuthStore().reloadPage
        toast.success(`Категория изменена: ${categoryy}`)

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
                    <option value="firstTab">В первую очередь ⭐</option>
                    <option value="Веселое">Веселое</option>
                    <option value="Трукрайм">Трукрайм</option>
                    <option value="Разоблачения">Разоблачения</option>
                    <option value="Политика">Политика</option>
                    <option value="Страшное">Страшное</option>
                    <option value="Другое">Другое</option>
                </select>
                <select v-model="useAuthStore().sortAccepted" @change="onChangeAcceptedSelect" class="moderation-video-main-area-header-filter-select" name="video_status_category">
                    <option value="Все" selected>Все</option>
                    <option value="0">На модерации</option>
                    <option value="1">Смотрим</option>
                    <option value="2">Мб смотрим</option>
                    <option value="3">Хуйня</option>
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
            <h1 class="no-videos-found" v-if="!useAuthStore().videoList.length">Видео не найдено</h1>
            <div :v-model="videoList" v-for="(i, documentId) in useAuthStore().videoList" :key="documentId" :class="'moderation-video-list-element ' + i.id" >
                <div class="video-element-info">
                    <div>
                    <h1  @click="handleAuthorClick(i.url, i.author, $event)" class="video-element-title el-author">
                        {{ i.author }}
                    </h1>
                    <h1 class="video-element-title title-text">{{ i.title }}</h1>

                    </div>

                    <div class="moderation-video-main-area-content-element-info-header">
                    </div>
                    <div>
                        <div class="video_element_info_section_2">
                    <select @change="(event) => changeCategorySelect(event, i)" class="video_element_select" name="video_category" id="">
                            <option :value="i.category">{{i.category}}</option>
                            <option value="Трукрайм">Трукрайм</option>
                            <option value="Веселое">Веселое</option>
                            <option value="Разоблачения">Разоблачения</option>
                            <option value="Политика">Политика</option>
                            <option value="Страшное">Страшное</option>
                            <option value="Другое">Другое</option>
                        </select>
                        <div class="video-element-actions">
                            <button  v-if="i.is_checked" class="video-element-actions-buttons is-checked-button"  @click="toCheckedFunction(i, i.is_checked)">
                                <img class="video-element-actions-img" src="../images/isChecked.png" alt="">
                            </button>
                            <button v-else class="video-element-actions-buttons not-is-checked-button" @click="toCheckedFunction(i, i.is_checked)">
                                <img class="video-element-actions-img" src="../images/isChecked.png" alt="">
                            </button>

                            <button v-if="i.isFirstTab" class="video-element-actions-buttons is-first-tab-button" @click="toFirstTabFunction(i, i.isFirstTab)">
                                <img class="video-element-actions-img" src="../images/isFirstTab.png" alt="">
                            </button>

                            <button v-else class="video-element-actions-buttons not-is-first-tab-button" @click="toFirstTabFunction(i, i.isFirstTab)">
                                <img class="video-element-actions-img" src="../images/isFirstTab.png" alt="">
                            </button>
                        </div>
                    </div>
                    <div class="video-element-buttons">
                        <button v-for="button in 3" @click="changeAgreementStatusFunction(i, button), useAuthStore().reloadPage(), toast.success(`Видео добавлено в '${statusesList[button][1]}'`)" :class="button == i.agreement_status? 'selected-status-button': '' + statusesList[button][0] + '-button'" :style="{backgroundColor: statusesList[button][2], color: '#151515', border: none, fontSize: '16px', fontWeight: '600'}">
                            {{ statusesList[button][1] }}
                        </button>
                    </div>
                        <a @click="toCheckedFunctionBRFF(i, i.is_checked)" class="look-video-button" :href="i.url" target="_blank">
                        Смотреть
                        </a>
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

.title-text {
    height: 100px;
    overflow-y: auto;
}
.el-author {
    margin-bottom: 1rem;
}
.el-author:hover {
    width: max-content;
    cursor: pointer;
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

/* Индикатор загрузки при клике */
.el-author.loading {
    opacity: 0.7;
    pointer-events: none;
}

.el-author.loading::after {
    content: '⏳';
    opacity: 1;
}

.look-video-button {
    margin-top: 15px;
    width: 100%;
    text-align: center;
    padding: 15px;
    gap: 15px;
    color: #151515;
    background-color: rgb(255, 255, 255);
    &:hover {
        transform: scale(1.01);
    }
}
.selected-status-button {
    filter: brightness(50%);
}

.status-buttons {
    &:hover {
        filter: brightness(70%);
    }
}
.video-element-actions-img {
    width: 25px;
}
.not-is-checked-button {
    filter: grayscale(100%);
}

.not-is-first-tab-button {
    filter: grayscale(100%);
}
.video-element-actions-buttons {
    width: 100%;

    &:hover {
        filter: brightness(50%);
    }
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
  width: 3rem;
  height: 3rem;

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
    font-size: 2rem;
    color: white;
}
.video-element-title {
    height: max-1;
    font-size: 150%;
    flex-wrap: wrap;
    overflow-y: auto;
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
    justify-content: space-between;
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
    width: 100%;
    height: 54vw;
    display: grid;
    grid-template-columns: 49% 49%;
    justify-content: center;
    gap: 15px;
    place-items: center;
    overflow: auto;
    scroll-behavior: smooth;
    padding-top: 5rem;
}

.moderation-video-list-element {
    height: 18vw;
    width: 100%;
    background-color: #49494970;
    display: flex;
    border-radius: 15px;
    border: 1px solid #505050;
    padding: 15px;

    &:hover {
        transform: scale(1.01);
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
    width: max-content;
}

.moderation-video-main-area-header-search {
    width: 26em;
    color: #fff;
    outline: none;
    cursor:auto;
}

.moderation-video-main-area-header {
    padding: .5rem;  
    padding-right: 0;
    padding-left: 15px;
    z-index: 1;
    width: 100%;
    position: absolute;
    display:flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    background-color: #1515152f;
    backdrop-filter: blur(70px);
    box-shadow: 0px 15px 15px 0px rgba(0, 0, 0, 0.4509803922);
}
</style>