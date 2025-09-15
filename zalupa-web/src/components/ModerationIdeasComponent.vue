<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { instance } from '../../services/axios/instance';


async function loadIdeas() {
    const res = await instance.get('/ideas')
    useAuthStore().ideaList = res.data.data
}

onMounted(async () => {
    await loadIdeas()
}) 
</script>

<template> 
    <div class="idea-content" v-for="idea in useAuthStore().ideaList">
        <div class="idea-sender-title">
            <label>Отправитель</label>
            <span class="idea-sender"> {{ idea.sender }}</span>
        </div>
        <div class="idea-title-title">
            <label>Заголовок</label>
        <span class="idea-title"> {{ idea.title }}</span>
        </div>
        <div class="idea-description-title">
            <label>Описание</label>
            <span class="idea-description">{{ idea.description }}</span>
        </div>
        <div class="idea-category-title">
            <label>Категория</label>
            <span class="idea-category">{{ idea.category }}</span>
        </div>
        <div class="idea-send-date-title">
            <label>Дата</label>
            <span class="idea-send-date">{{ idea.send_date }}</span>
        </div>
        <div class="idea-status-button">
            <button>Принять</button>
            <button>Отклонить</button>
        </div>
    </div>
</template>

<style scoped>

.idea-content {
    display: flex;
    gap: 15px;
    border: 1px solid #414141;
}
.idea-sender {
    color: white;
    font-size: 18px;
}
</style>