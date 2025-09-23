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
        <router-link class="header-navigation-items" to="/moderation/ideas">Идеи</router-link>
        <router-link class="header-navigation-items" to="/moderation/videos">Видео</router-link>

    </div>
</template>

<style scoped>

.header-navigation-items {
    text-align: center;
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