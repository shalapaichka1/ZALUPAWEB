<script setup>
    const modsInfo = [
                {
                    id: 1,
                    name: 'Идеи',
                    count: 11,
                    image: "..src/images/tips.svg",
                    link: '/moderation/ideas'
                },
                {
                    id: 2,
                    name: 'Видео',
                    count: 34,
                    image: 'images/video.svg',
                    link: '/moderation/videos'
                }
            ]
</script>
<template>
    <div class="moderation-mods">
        <a class="moderation-mods-elements" v-for="mod in modsInfo" :href="mod.link">
            <img class="moderation-mods-image" :src="mod.image" alt="">
            <h1 class="moderation-mods-name">{{mod.name}}</h1>
            <h1 class="moderation-mods-count">{{mod.count}}</h1>
        </a>
    </div>
</template>

<style scoped>

h1 {
    text-align: center;
    justify-content: center;
    align-items: center;
    font-family: 'Raleway-SemiBold', sans-serif;
    font-size: 100px;
    color: rgb(0, 0, 0);
}
.moderation-mods > a {
    background-repeat: no-repeat;
    background-size: cover;
    transition: 0.3s;
    background-color: rgb(255, 255, 255);
    padding-top: 500px;
    width: 80%;
    height: 800px;
    border-radius: 15px;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 0px 30px 0 rgb(255, 255, 255);
    }
}
.moderation-mods {
    margin: 50px;
    display: flex;
    column-gap: 50px;
    row-gap: 30px;
    align-items: center;
    align-content: center;
    justify-content: center;
    border-radius: 15px;
}
</style>