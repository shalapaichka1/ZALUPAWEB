<script setup>
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { instance } from '../../services/axios/instance';
import toast from 'vue3-hot-toast';

const statusesList = {
    0: ['moderation', 'На модерации', '#00000000'],
    1: ['accepted', 'Принято', '#ACFF9E'],
    2: ['mb', 'Отклонено', '#FFD28F'],
}
const buttonsInfo = {
    1: ['Принять'],
    2: ['Отклонить']
}

async function loadIdeas() {
    const res = await instance.get('/ideas?sort[title]=asc')
    useAuthStore().ideaList = res.data.data
}

onMounted(async () => {
    await loadIdeas()
}) 

async function getIdeaStatus(el, status) {
    try {
        const updateData = {
            data: {
                agreement_status: status
            }
        };

        const response = await instance.put(`ideas/${el.documentId}`, updateData);
        
        if (response.data) {
            console.log('Успешно обновлено:', response.data);
            toast.success(`Успешно`)
            loadIdeas()
            return response.data;
        }
        
    } catch (error) {
        console.error('Ошибка:', error.response?.data || error.message);
        throw error;
    }
}
</script>

<template>
    <div class="ideas-cointainer">
        <div class="idea-elements" v-for="element in useAuthStore().ideaList">
            <div class="idea-description idea-area">
                <div class="idea-headers">
                    <label class="idea-description headers" for="">Описание:</label>
                </div>
                <div class="idea-body">
                    <span>{{ element.description }}</span>
                </div>
                
            </div>
            <div class="idea-info idea-area">

                <div class="idea-headers">
                    <div class="idea-id ">
                        <label for="">Идея №: {{ element.id }}</label>
                    </div>
                </div>
                <div class="idea-body">
                    <div class="idea-title">
                        <label for="">Заголовок: </label>
                        <span>{{ element.title }}</span>
                    </div>
                    <div class="idea-sender">
                        <label for="">Отправил: </label>
                        <span>{{ element.sender }}</span>
                    </div>
                    <div class="idea-category">
                        <label for="">Категория: </label>
                        <span>{{ element.category }}</span>
                    </div>
                    <div class="idea-status">
                        <label for="">Статус: </label>
                        <span>{{ statusesList[element.agreement_status][1] }}</span>

                    </div>
                    <div class="idea-date">
                        <label for="">Дата: </label>
                        <span>{{ element.send_date }}</span>
                    </div>
                    <div class="idea-telegram">
                        <label for="">Telegram: </label>
                        <span>{{ element.telegram_link }}</span>
                    </div>
                    <div class="idea-buttons">
                        <button v-for="el in 2" style="" @click="getIdeaStatus(element, el)">
                            {{ buttonsInfo[el][0] }}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>

</template>

<style lang="scss">
.idea-info {
    display: flex;
}
.idea-buttons {
    display: flex;
    gap: 15px;
}
.idea-id {
    display: flex;
    justify-content: center;
    margin-bottom: 1rem;    
}
.ideas-cointainer {
    padding: 5% 2%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    justify-items: center;
    height: 100vh;
    overflow-y: auto;
}
.idea-elements {
    width: 30vw;
    height: 30vh;
    display: flex;
    margin-bottom: 4vh;
    border: 1px solid white;
    background-color: #E1D0AE;
    border-radius: 15px;
}
.idea-area {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    background-color: #E1D0AE;
    border-radius: 15px;
}

</style>