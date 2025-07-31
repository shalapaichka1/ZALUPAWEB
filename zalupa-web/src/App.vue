<script>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from '/src/components/HeaderComponent.vue'

export default {
  components: {HeaderComponent}
}
</script>

<template>
  <HeaderComponent/>
  <RouterView />
</template>

<style scoped>
</style>
