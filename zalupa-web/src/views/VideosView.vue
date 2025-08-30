<script setup>
  import MyVideosComponent from '@/components/MyVideosComponent.vue';
  import AllVideosComponent from '@/components/AllVideosComponent.vue';
  import AddVideoComponent from '@/components/AddVideoComponent.vue';
  import { instance } from '../../services/axios/instance';
  import { ref } from 'vue';
  import { API } from '../../services/api'
  import { useAuthStore } from '@/stores/auth'
  const videoModuleSwitchCondition = ref('all')
  const sortIsAccepted = ref('')
  const isOpenAddVideoModule = ref(API.videos.addVideoComponentIsVisibleFunction(false))

  function openVideoButtonConditionFunction() { 
    API.videos.addVideoComponentIsVisibleFunction(true)
  }

  async function onChangeCategorySelect(event) {
    useAuthStore().sortCategory = event.target.value
    try {
      const res = await instance.get(`/videos/?filters[category]=${useAuthStore().sortCategory}`)
      useAuthStore().videoList = res.data.data
    } catch{
        
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
  async function clearFilters() {
    useAuthStore().sortCategory = 'Категории'
    useAuthStore().sortAccepted = 'Все'
    try {
      const res = await instance.get(`/videos`)
      useAuthStore().videoList = res.data.data
    } catch{
        
    }
  }
</script>

<template>
  <div class="video-view-header">
    <div class="switch-video-modules">
      <button @click="switchVideoModulesFunction('my', e)">Ваши видео</button>
      <button @click="switchVideoModulesFunction('all', e)">Все видео</button>
    </div>
    <div class="navigation">

      <select v-model="useAuthStore().sortAccepted" @change="onChangeAcceptedSelect" class="moderation-video-main-area-header-filter-select" name="video_status_category">
      <option selected>Все</option>
      <option value="0">На модерации</option>
      <option value="1">Принято</option>
      <option value="2">Отклонено</option>
    </select>

    <select v-model="useAuthStore().sortCategory" @change="onChangeCategorySelect" class="moderation-video-main-area-header-search-select" name="video_category">
      <option value="Категории">Категории</option>
      <option value="Трукрайм">Трукрайм</option>
      <option value="Веселое">Веселое</option>
      <option value="Разоблачения">Разоблачения</option>
      <option value="Политика">Политика</option>
      <option value="Страшное">Страшное</option>
      <option value="Другое">Другое</option>
    </select>

    <button class="clearButton" @click="clearFilters">Сбросить</button>

    </div>

  </div>

  <main>
    <MyVideosComponent v-if="videoModuleSwitchCondition === 'my'"/>
    <AllVideosComponent v-else/>

  </main>
  <div class="footer">
    <button @click="openVideoButtonConditionFunction" class="sendVideoButton">Отправить видео</button>
  </div>
    <AddVideoComponent v-if="isOpenAddVideoModule"/>
</template>

<style lang="scss">

.clearButton:hover {
  background-color: #ff6464;
}

.navigation {
  display: flex;
  gap: 15px;
}
.footer {
  bottom: 0;
  left: 0;
  z-index: 1;
  width: 99.4%;
  position: absolute;
  display:flex;
  flex-direction: row-reverse;
  padding: 15px;
  background-color: #00000000;
  backdrop-filter: blur(70px);
}
.video-view-header {
  position: absolute;
  z-index: 2;
  background-color: #00000000;
  backdrop-filter: blur(70px);
  padding: 15px;
  width: 99.4%;

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