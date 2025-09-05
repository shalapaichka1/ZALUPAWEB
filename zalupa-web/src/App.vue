<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from '/src/components/HeaderComponent.vue'
import SignInComponent from '@/components/SignInComponent.vue'
import { useAuthStore } from '@/stores/auth'
</script>

<template>
  <HeaderComponent/>
  <SignInComponent v-if="useAuthStore().isOpenSignInComponent"/>
  <RouterView />
</template>
