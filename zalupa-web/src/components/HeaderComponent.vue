<script setup lang="js">
import { useAuthStore } from '../stores/auth'

const useStore = useAuthStore()
</script>
<template>
    <div class="header">
        <div class="header-logo">
            <a href="/" class="header-logo-title">ZALUPAWEB</a>
            <img class="stitch" src="../images/stitch.svg" alt="">
        </div>

        <div class="header-navigation">
            <a href="/arts">Арты</a>
            <a href="/ideas">Идеи</a>
            <a href="/videos">Видео</a>
            <a href="/events">Ивенты</a>
            <a href="/merch">Мерч</a>
            <a href="/mini-games">Мини игры</a>
            <a href="/calendar">Календарь событий</a>
            <a href="/raffles">Розыгрыши</a>
            <a href="/q-a">Q&A</a>
        </div>

        <div class="header-buttons">
            <div v-if="useStore.isModeration" class="header-moderation-div">
                <img class="banana" src="../images/banana.svg" alt="">
                <a href="/moderation" class="moderation-button">Режим модератора</a>
            </div>

            <div class="header-user-buttons">
                <img class="header-notification hub" src="../images/notifications.svg" alt="s">
                <img class="header-mail hub" src="../images/mail.svg" alt="">
                <a href="/signup"><img class="header-plus hub" src="../images/user.svg" alt=""></a>
            </div>

        </div>   
    </div>
</template>

<style scoped>
.header-navigation {
    display: flex;
    a {
        height: 60px;
        text-align: center;
        line-height: 60px;
        font-size: 14px;
        color: white;
        padding: 0 24px;
        text-decoration: none;
        transition: 0.3s;
        text-wrap: nowrap;
    }

    a:hover {
        background-color: rgb(51, 51, 51);
    }
}

.moderation-button {
    transition: 0.3s;
    text-decoration: none;
    color: white;
    font-size: 14зx;
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