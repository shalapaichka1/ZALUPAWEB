<script>

import MyVideosComponent from '@/components/MyVideosComponent.vue';
import AllVideosComponent from '@/components/AllVideosComponent.vue';
import AddVideoComponent from '@/components/AddVideoComponent.vue';

export default {
  components: {MyVideosComponent, AllVideosComponent, AddVideoComponent},
  data(){
    return {
      videoModuleSwitchCondition: 'all',
      sendVideoButtonCondition: false,
    }
  },
  methods:{
    async switchVideoModulesFunction(videoStatus) {
      this.videoModuleSwitchCondition = videoStatus
      console.log('Switched to:', videoStatus);
    },
    async switchVideoButtonConditionFunction() { 
      this.sendVideoButtonCondition = true
    }
  }
}
</script>

<template>
  <div class="video-view-header">
    <div class="switch-video-modules">
      <button @click="switchVideoModulesFunction('my', e)">Ваши видео</button>
      <button @click="switchVideoModulesFunction('all', e)">Все видео</button>
    </div>
    <select class="moderation-video-main-area-header-search-select" name="video_category" id="">
      <option>Категории</option>
      <option>Трукрайм</option>
      <option>Веселое</option>
      <option>Разоблочения</option>
      <option>Политика</option>
      <option>Другое</option>
    </select>
  </div>
  <main>
    <MyVideosComponent v-if="videoModuleSwitchCondition === 'my'"/>
    <AllVideosComponent v-else-if="videoModuleSwitchCondition === 'all'"/>
  </main>
  <button @click="switchVideoButtonConditionFunction()" class="sendVideoButton">Отправить видео</button>
  <AddVideoComponent v-if="sendVideoButtonCondition"/>

</template>

<style lang="scss">
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
    background-color: #1c1c1c;
    color: white;
    border: 1px solid #494949;
  }
}
</style>