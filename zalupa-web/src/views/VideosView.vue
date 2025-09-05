<script setup>
  import MyVideosComponent from '@/components/MyVideosComponent.vue';
  import AllVideosComponent from '@/components/AllVideosComponent.vue';
  import AddVideoComponent from '@/components/AddVideoComponent.vue';
  import { instance } from '../../services/axios/instance';
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/auth'
import Cookies from 'js-cookie';
  const videoModuleSwitchCondition = ref('all')

  function openVideoButtonConditionFunction() { 
    useAuthStore().isOpenCloseAddVideoModule = true
  }

  async function switchVideoModulesFunctionAll() {
        const res = await instance.get(`/videos`)
    useAuthStore().videoList = res.data.data
  }
  async function switchVideoModulesFunction(){
    const res = await instance.get(`/videos/?filters[sender]=${Cookies.get('username')}`)
    useAuthStore().videoList = res.data.data
  }
  async function onChangeCategorySelect(event) {
    useAuthStore().sortCategory = event.target.value
    try {
      const res = await instance.get(`/videos/?filters[category]=${useAuthStore().sortCategory}`)
      useAuthStore().videoList = res.data.data
    } catch(error){
        console.error(error)
    }

    if (useAuthStore().videoList.length === 0) {
        useAuthStore().isListEmpty = true
      }
      else {
        useAuthStore().isListEmpty = false
      }
  }

  async function onChangeAcceptedSelect(event) {
    useAuthStore().sortAccepted = event.target.value

    try {
      if (useAuthStore().sortAccepted === 'Все') {
        const res = await instance.get(`/videos`)
        useAuthStore().videoList = res.data.data
      } else {
        const res = await instance.get(`/videos/?filters[agreement_status]=${useAuthStore().sortAccepted}`)
        useAuthStore().videoList = res.data.data
      }
      if (useAuthStore().videoList.length === 0) {
        useAuthStore().isListEmpty = true
      }
      else {
        useAuthStore().isListEmpty = false
      }
    } catch(error){
        console.error(error)
    }
  }
  async function clearFilters() {
    useAuthStore().sortCategory = 'Веселое'
    useAuthStore().sortAccepted = 'Все'
    try {
      const res = await instance.get(`/videos`)
      useAuthStore().videoList = res.data.data
      if (useAuthStore().videoList.length === 0) {
        useAuthStore().isListEmpty = true
      }
      else {
        useAuthStore().isListEmpty = false
      }
    } catch{
        
    }
  }
</script>

<template>
  <div class="video-view-header">
    <div class="switch-video-modules">
      <button @click="switchVideoModulesFunction">Ваши видео</button>
      <button @click="switchVideoModulesFunctionAll">Все видео</button>
    </div>
    <div class="navigation">

    <select v-model="useAuthStore().sortAccepted" @change="onChangeAcceptedSelect" class="moderation-video-main-area-header-filter-select" name="video_status_category">
      <option selected>Все</option>
      <option value="0">На модерации</option>
      <option value="1">Принято</option>
      <option value="2">Отклонено</option>
    </select>

    <select v-model="useAuthStore().sortCategory" @change="onChangeCategorySelect" class="moderation-video-main-area-header-search-select" name="video_category">
      <option value="Веселое">Веселое</option>
      <option value="Трукрайм">Трукрайм</option>
      <option value="Разоблачения">Разоблачения</option>
      <option value="Политика">Политика</option>
      <option value="Страшное">Страшное</option>
      <option value="Другое">Другое</option>
    </select>

    <button class="clearButton" @click="clearFilters">
      <img src="../images/clearButton.png" alt="">
    </button>

    </div>

  </div>

  <main>
    <MyVideosComponent v-if="videoModuleSwitchCondition === 'my'"/>
    <AllVideosComponent v-else/>

  </main>
  <div class="footer">
    <button @click="openVideoButtonConditionFunction" class="sendVideoButton">Отправить видео</button>
  </div>
    <AddVideoComponent/>
</template>

<style lang="scss">

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

.navigation {
  display: flex;
  gap: 15px;
}

.footer {
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  position: absolute;
  display:flex;
  flex-direction: row-reverse;
  padding: 15px;
  background-color:  #151515d2;
  backdrop-filter: blur(70px);
}

.video-view-header {
  position: absolute;
  z-index: 2;
  background-color: #151515d2;
  box-shadow: 0px 15px 15px 0px #00000073;
  backdrop-filter: blur(70px);
  padding: 15px;
  width: 100%;

  display: flex;
  justify-content: space-between;
}

.switch-video-modules {
  position: relative;
  display: flex;
  gap: 15px;

  button {
    width: 150px;
    color: white;
  }
}
</style>