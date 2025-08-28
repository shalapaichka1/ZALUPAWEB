<script setup>
  import MyVideosComponent from '@/components/MyVideosComponent.vue';
  import AllVideosComponent from '@/components/AllVideosComponent.vue';
  import AddVideoComponent from '@/components/AddVideoComponent.vue';
  import { ref } from 'vue';
  import { API } from '../../services/api'

  const videoModuleSwitchCondition = ref('all')
  const selectedFilter = ref('')
  const isOpenAddVideoModule = ref(API.videos.addVideoComponentIsVisibleFunction(false))

  function openVideoButtonConditionFunction() { 
    API.videos.addVideoComponentIsVisibleFunction(true)
  }

  async function handleFilterChange() {
    try {
      console.log('Selected filter:', selectedFilter.value)
      
      if (!selectedFilter.value || selectedFilter.value === 'Категории') {
        const response = await API.videos.getVideos()
        videoList.value = response.data
        return
      }
      
      const response = await API.videos.getVideos()
      videoList.value = response.data.filter(video => 
        video.category === selectedFilter.value
      )
      
    } catch (error) {
      console.error('Ошибка фильтрации:', error)
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

      <select class="moderation-video-main-area-header-filter-select" name="video_status_category">
      <option selected>Все</option>
      <option>На модерации</option>
      <option>Принято</option>
      <option>Отклонено</option>
    </select>

      <select v-model="selectedFilter" @change="handleFilterChange" class="moderation-video-main-area-header-search-select" name="video_category">
      <option>Категории</option>
      <option>Трукрайм</option>
      <option>Веселое</option>
      <option>Разоблочения</option>
      <option>Политика</option>
      <option>Другое</option>
    </select>
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

.navigation {
  display: flex;
  gap: 15px;
}
.footer {
  z-index: 1;
  width: 100%;
  height: 60px;
  position: fixed;
  display:flex;
  flex-direction: row-reverse;
  padding: 15px;
  background-color: 00000000;
}
.video-view-header {
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