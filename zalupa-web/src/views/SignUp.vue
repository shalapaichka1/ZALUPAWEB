<script setup>
import HeaderComponent from '../components/HeaderComponent.vue'
import ChatComponent from '../components/ChatComponent.vue'
import SignUpComponent from '../components/SignUpComponent.vue'
import SignInComponent from '../components/SignInComponent.vue'
import {useAuthStore} from '../stores/auth'

const useStore = useAuthStore()

</script>

<template>
    <SignUpComponent v-if="useStore.isChatOpen"/>
    <SignInComponent v-else/>
</template>