<script setup>
import { instance } from '../../services/axios/instance'
import IdeasLogo from '../../src/images/IdeasRepec.svg'
import VideoLogo from '../../src/images/Video.svg'

const vCount = instance.get('/videos')
const modsInfo = [
  {
    id: 1,
    name: 'Идеи', 
    count: 11,
    image: IdeasLogo,
    link: '/moderation/ideas'
  },
  {
    id: 2,
    name: 'Видео',
    count: 1,
    image: VideoLogo,
    link: '/moderation/videos'
  }
]

</script>

<template>
  <div class="moderation-body">
    <router-link
      v-for="element in modsInfo"
      :key="element.id"
      class="moderation-mods"
      :to="element.link"
    >
      <component class="img-logo" :is="element.image" />
        <label for="">{{ element.count }}</label>
    </router-link>
  </div>
</template>

<style scoped>
.moderation-body {
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.moderation-mods {
  display: flex;
  border-radius: 15px;
  background-color: #ff000000;
  width: 40vh;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #ffffff06;

  &:hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 15px 0px #fff;
  }
}

.img-logo {
  width: 20rem;
  height: 20rem;
  color: aliceblue;
}
</style>