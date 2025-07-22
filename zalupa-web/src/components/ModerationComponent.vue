<script setup>
import { useAuthStore } from '../stores/auth'
import image1 from '../images/modsImages/arts.svg'

const useStore = useAuthStore()

const modsInfo = [
    {
        id: 1,
        name: 'Арты',
        count: 4,
        image: '../images/modsImages/arts.svg',
        description: 'Арты',
        link: image1
    },
    {
        id: 2,
        name: 'Идеи',
        count: 11,
        image: '../images/modsImages/arts.svg',
        link: '/moderation/ideas'
    },
    {
        id: 3,
        name: 'Видео',
        count: 34,
        image: '../images/modsImages/arts.svg',
        link: '/moderation/videos'
    },
    {
        id: 4,
        name: 'Евенты',
        image: '../images/modsImages/arts.svg',
        link: '/moderation/events'
    },
    {
        id: 5,
        name: 'Календарь событий',
        image: '../images/modsImages/arts.svg',
        link: '/moderation/calendar'
    },
    {
        id: 6,
        name: 'Фонды',
        image: '../modsImages/arts.svg',
        link: '/moderation/funds'
    }
]
</script>

<template>
    <div class="moderation-mods">
        <a v-for="mod in modsInfo" :href="mod.link">
            <img :src="mod.link" alt="a">
            <h1>{{mod.name}} {{mod.count}}</h1>

        </a>
    </div>
</template>

<style scoped>
h1 {
    font-size: 20px;
    color: rgb(0, 0, 0);
    position: relative;
    justify-content: center;
    top: 340px;
    float: right;
}
.moderation-mods > a {
    transition: 0.3s;
    border-radius: 10px;
    background-color: rgb(255, 255, 255);
    padding: 15px;
    border: 1px solid rgb(255, 255, 255);
    width: 400px;
    height: 400px;

    &:hover {
        transition: 0.3s;
        transform: scale(1.01);
        box-shadow: 0px 0px 20px rgb(255, 255, 255);
    }
}
.moderation-mods {
    margin-top: 30px;
    margin-bottom: 30px;
    display: flex;
    column-gap: 30px;
    row-gap: 30px;
    align-items: center;
    align-content: center;
    flex-wrap: wrap;
    justify-content: center;
}

.moderation-mod {
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    width: 400px;
    height: 400px;
    background-color: rgb(255, 255, 255);
    border-radius: 5px;
    user-select: none;
    
    &:hover {
        transition: 0.3s;
        transform: scale(1.01);
        box-shadow: 0px 0px 20px rgb(255, 255, 255);
    }

    &:active {
        transition: 0.3s;
        transform: scale(0.99);
    }
}

.mod-h1 {
    font-size: 36px;
    margin-top: 10px;
    margin-bottom: 10px;
    font-family: 'Raleway-Regular', sans-serif;
}
</style>