<script>
import addVideoComponent from '../components/AddVideoComponent.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
    export default {
  components: {HeaderComponent, addVideoComponent },
  data() {
    return {
      isOpenComponent: false,
    }
  },
  methods: {
    openCloseComponent() {
        console.log(this.isOpenComponent);
        this.isOpenComponent = !this.isOpenComponent
    }
  }
}

const myVideo = [
    {
        id: '№103',
        text: 'йцу',
        link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        date: '03.06.2024',
        time: '13:37',
        status: 'approved'
    },
    {
        id: '№104',
        text: 'йцу',
        link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        date: '03.06.2024',
        time: '13:37',
        status: 'approved'
    },
    {
        id: '№105',
        text: 'йцу',
        link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        date: '03.06.2024',
        time: '13:37',
        status: 'approved'
    },
    {
        id: '№106',
        text: 'йцу',
        link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        date: '03.06.2024',
        time: '13:37',
        status: 'approved'
    },
    {
        id: '№107',
        text: 'йцу',
        link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        date: '03.06.2024',
        time: '13:37',
        status: 'approved'
    },
    {
        id: '№108',
        text: 'йцу',
        link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley',
        date: '03.06.2024',
        time: '13:37',
        status: 'approved'
    }
]
</script>

<template>
    <div class="video-main-area">
        <div class="video-main-area-header">
            <h1>Ваши видео </h1>
            <div class="video-main-area-header-filters">
                <select name="" id="">
                    <option>Все (11)</option>
                    <option>На модерации (6)</option>
                    <option>Принято (2)</option>
                    <option>Отклонено (3)</option>
                </select>
            </div>
        </div>
        <div class="video-main-area-content">
            <div class="video-main-area-content-video">
                <p class="video-main-area-content-video-id">№103</p>
                <p class="video-main-area-content-video-text">йцу</p>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="video-main-area-content-video-link">https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley</a>
                <p class="video-main-area-content-video-date">03.06.2024</p>
                <p class="video-main-area-content-video-time">13:37</p>
                <div class="video-status-approved"></div>

            </div>

            <div class="video-main-area-content-video">
                <p class="video-main-area-content-video-id">№104</p>
                <p class="video-main-area-content-video-text">vxcbw qqqqqqqqqqqqqq q qqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqq qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq</p>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="video-main-area-content-video-link">https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley</a>
                <p class="video-main-area-content-video-date">03.06.2024</p>
                <p class="video-main-area-content-video-time">13:37</p>
                <div class="video-status-loaded"></div>

            </div>

            <div class="video-main-area-content-video">
                <p class="video-main-area-content-video-id">№105</p>
                <p class="video-main-area-content-video-text">очень крутой видос</p>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="video-main-area-content-video-link">https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley</a>
                <p class="video-main-area-content-video-date">03.06.2024</p>
                <p class="video-main-area-content-video-time">13:37</p>
                <div class="video-status-loaded"></div>

            </div>

            <div class="video-main-area-content-video">
                <p class="video-main-area-content-video-id">№106</p>
                <p class="video-main-area-content-video-text">ОН СОВСЕМ ЕБАНУЛСЯ ?? ЧЕКНИ БЫСТРЕЕ</p>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="video-main-area-content-video-link">https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley</a>
                <p class="video-main-area-content-video-date">03.06.2024</p>
                <p class="video-main-area-content-video-time">13:37</p>
                <div class="video-status-loaded"></div>

            </div>

            <div class="video-main-area-content-video">
                <p class="video-main-area-content-video-id">№107</p>
                <p class="video-main-area-content-video-text">посмотри мой видос пж, я донатил уже 5 раз...</p>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="video-main-area-content-video-link">https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley</a>
                <p class="video-main-area-content-video-date">03.06.2024</p>
                <p class="video-main-area-content-video-time">13:37</p>
                <div class="video-status-rejected"></div>

            </div>

            <div class="video-main-area-content-video">
                <p class="video-main-area-content-video-id">№108</p>
                <p class="video-main-area-content-video-text">хоть раз стопнешь я тебе еще раз все банки блокну</p>
                <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="video-main-area-content-video-link">https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley</a>
                <p class="video-main-area-content-video-date">03.06.2024</p>
                <p class="video-main-area-content-video-time">13:37</p>
                <div class="video-status-approved"></div>

            </div>
        </div>

                    <!-- <div v-for="i in myVideo" class="video-main-area-content-element">
                <div class="video-main-area-content-element-info">
                    <div class="video-main-area-content-element-info-header">
                    <h1 class="video-main-area-content-element-title">{{ i.title }}</h1>
                    <div class="is-checked-icon" v-if="i.isChecked">
                        <p class="video-main-area-content-element-is-checked">Просмотренно</p>
                        <img src="../images/accept.svg" alt="" style="background-color: #85c57a; border-radius: 50%;">
                    </div>
                    </div>
                    <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley" class="video-main-area-content-element-link">{{ i.link }}</a>
                    <div class="video-status-approved" v-if="i.status == 'approved'"></div>
                    <div class="video-status-rejected" v-if="i.status == 'rejected'"></div>
                </div>
                <div class="video-main-area-content-element-date">
                    <p>{{ i.date }}</p>
                    <p>{{ i.time }}</p>
                </div>
            </div> -->
        <button @click="openCloseComponent" id="add-video-button" class="video-main-area-button">Добавить видео</button>
        <addVideoComponent v-if="isOpenComponent"></addVideoComponent>
    </div>
</template>

<style lang="scss">
    .video-main-area-header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 50px;
        border-radius: 10px;
    }

    .video-main-area-header button {
        margin-left: 12px;
    }
    .my-component {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        width: 100px;
        height: 100px;
        border-radius: 10px;
    }
    .video-status-approved {
        position: absolute;
        width:6px;
        height: 100%;
        top: 0px;
        background-color: rgb(81, 231, 81);
        border-radius: 10px;
        margin-left: 100%;
    }

    .video-status-rejected {
        position: absolute;
        width:6px;
        height: 100%;
        top: 0px;
        background-color: rgb(231, 81, 81);
        border-radius: 10px;
        margin-left: 100%;
    }

    .video-status-loaded {
        position: absolute;
        width:6px;
        height: 100%;
        top: 0px;
        background-color: rgb(231, 191, 81);
        border-radius: 10px;
        margin-left: 100%;
    }
    .video-main-area-content-video-text {
        width: 33%;
    }

    .video-main-area-content-video {
        transition: .2s;
        position: relative;
        align-items: center;
        display: flex;
        border: 1px solid #ffffff;
        background-color: #1c1c1c;
        border-radius: 10px;
        padding: 10px;
        padding-top: 20px;
        margin-top: 12px;

        &:hover {
            transform: scale(1.01);
            border: 1px solid #6441a5;
        }
    }
    .video-main-area-content .video-main-area-content-video-text, .video-main-area-content a, .video-main-area-content-video-date, .video-main-area-content-video-time {
        font-family: 'Courier New', Courier, monospace;
        color: #fff;
    }
    
    .video-main-area-content {
        width: 99%;
        scroll-behavior: smooth;
        height: calc(100vh - 220px);
    }
    
    .video-main-area-content a:hover {
        transition: .2s;
        color: #6441a5;
        text-decoration: underline;   
    }
    .video-main-area-content-video-date {
        position: absolute;
        top: 0px;
        right: 0;
        padding: 10px;
        font-size: 14px;
    }
    .video-main-area-content-video-time {
        position: absolute;
        bottom: 0px;
        right: 0;
        padding: 10px;
        font-size: 14px;
    }
    h1 {
        color: #fff;
        font-size: 32px;
        font-family: 'Raleway-SemiBold', sans-serif;
    }

    .video-main-area {
        padding: 10px 20px;
        width: 100%;
        height: 100%;
        position: absolute;
    }
    
    .video-main-area-content-video-id {
        position: absolute;
        top: -6px;
        left: 0;
        padding: 10px;
        font-size: px;
        font-family: 'Courier New', Courier, monospace;
        color: #6d6d6d;
        display: flex;
    }
    .video-main-area-button {
        position: absolute;
        bottom: 8%;
        right: 1% ;
        height: 40px;
        width: 200px;
        border-radius: 5px;
        border: 1px solid #6441a5;
        background-color: #1c1c1c;
        color: #6441a5;
        font-family: 'Raleway-SemiBold', sans-serif;
        transition: .2s;
    }

    .video-main-area-content-video-link {
        margin-left: 2%;
    }

    .video-main-area-button:hover {
        transition: .2s;
        background-color: #6441a5;
        color: #fff;
    }

    .add-video-window {
        z-index: 9999;
        background-color: #e70000;
        width: 100px;
        height: 100px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>