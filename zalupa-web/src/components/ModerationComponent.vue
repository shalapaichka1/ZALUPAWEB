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
    font-size: 100px;
    color: rgb(0, 0, 0);
}
.moderation-mods > a {
    background-color: rgb(255, 255, 255);
    width: 40rem;
    height: 40rem;
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