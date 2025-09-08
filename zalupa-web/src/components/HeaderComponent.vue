<script setup>
import { useAuthStore } from '../stores/auth'
import { onMounted, ref } from 'vue'

import DarkThemeButtonComponent from './DarkThemeButtonComponent.vue'
import LightThemeButtonComponent from './LightThemeButtonComponent.vue'
import ProfileComponent from './ProfileComponent.vue'

import Cookies from 'js-cookie'
import { instance } from '../../services/axios/instance'

onMounted(async () => {
    const res = await instance.get(`users?filters[username]=${Cookies.get('username')}`)
    useAuthStore().isModeration = res.data[0].isModerator
    })
function openSignInComponent(){
    useAuthStore().isOpenSignInComponent = !useAuthStore().isOpenSignInComponent
}

function openProfile(){
    useAuthStore().isProfileOpen = !useAuthStore().isProfileOpen
}
</script>
<template>
    <div class="header">
        <div class="header-logo">
            <a href="/" class="header-logo-title">ZALUPAWEB</a>
            <img class="stitch" src="../images/stitch.svg" alt="">
        </div>

        <div class="header-navigation">
            <a href="/ideas">Идеи</a>
            <a href="/videos">Видео</a>
            <a href="/q&a">Q&A</a>
        </div>

        <div class="header-buttons">
            <DarkThemeButtonComponent v-if="useAuthStore().isDarkTheme"/>
            <LightThemeButtonComponent v-else/>
            <div v-if="useAuthStore().isModeration" class="header-moderation-div">
                <img class="banana" src="../images/banana.svg" alt="">
                <a href="/moderation" class="moderation-button">Режим модератора</a>
            </div>

            <div class="header-user-buttons">
                <button v-if="!useAuthStore().isAuthorized" class="open-sign-in-component-button" @click="openSignInComponent"><img class="header-plus hub" src="../images/Enter.png" alt=""></button>
                <button v-else class="open-profile-button" @click="openProfile"><img class="header-plus hub" src="../images/user.svg" alt=""></button>
            </div>
        </div>   
    </div>
    <ProfileComponent v-if="useAuthStore().isProfileOpen"/>
</template>

<style scoped>

.header {
    padding: 15px;
}
.open-profile-button {
    height: 60px;
    width: 60px;
}
.open-sign-in-component-button {
    border: none;
    background: none;
    width: 60px;
}
a:active {
    color: #6441a5;
}

.header-navigation {
    display: flex;
    a {
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 20px;
        color: white;
        padding: 0 24px;
        text-decoration: none;
        transition: 0.3s;
        text-wrap: nowrap;
    }

    a:hover {
        background-color: rgb(51, 51, 51);
    }

    a:active {
        transition: 0.1s;
        transform: scale(0.9);
        
    }
}

.header-logo-title {
    font-size: 50px;
}
.moderation-button {
    transition: 0.3s;
    text-decoration: none;
    color: white;
    font-size: 20px;
    font-weight: 500;
    margin-left: 10px;
    background-color: #6441a5;
    border-radius: 5px;
    padding: 5px 15px;
    border: 2px solid #6441a5;

    &:hover {
        transition: 0.3s;
        background-color: #6441a500;
        transform: scale(1.05);
    }

    &:active {
        transition: 0.3s;
        transform: scale(0.98);
    }
}
</style>