<script lang="js">
import { API } from '../../services/api'

export default {
    data(){
        return {
            videoList: [],
            isVisible: true,
            isLoading: false,
            errorMessage: ''
        }
    },
    methods: {
        removeComponent() {
            this.isVisible = !this.isVisible
            this.errorMessage = '' // Сбрасываем ошибку при закрытии
        },
        
        async checkVideoExists(link) {
            try {
                // Предполагаем, что у API есть метод для проверки существования видео
                const response = await API.videos.checkVideoExists(link);
                return response.exists;
            } catch (error) {
                console.error('Ошибка при проверке видео:', error);
                return false;
            }
        },

        async notification() {
            const link = document.getElementsByClassName('add-video-module-input')[0].value
            const comment_text = document.getElementsByClassName('add-video-comment-input')[0].value
            
            // Валидация
            if (link === '') {
                this.showError('Вы не ввели ссылку на видео!')
                return
            }
            
            if (link.includes('vkvideo')) {
                this.showError('Видео из VK не поддерживаются')
                return
            }
            
            if (link.length !== 43 || !link.startsWith('https://www.youtube.com/watch?v=')) {
                this.showError('Неверная ссылка на YouTube видео')
                return
            }

            this.isLoading = true;
            this.errorMessage = '';

            try {
                // Проверяем, существует ли видео уже в базе
                const videoExists = await this.checkVideoExists(link);
                
                if (videoExists) {
                    this.showError('Такое видео уже есть в базе!');
                    return;
                }

                // Если видео нет в базе - добавляем
                await API.videos.addVideo(link, comment_text);
                this.removeComponent();
                await API.videos.refreshVideoList();
                
            } catch (error) {
                console.error('Ошибка при добавлении видео:', error);
                this.showError('Произошла ошибка при добавлении видео');
            } finally {
                this.isLoading = false;
            }
        },

        showError(message) {
            this.errorMessage = message;
            // Можно добавить автоматическое скрытие ошибки через 5 секунд
            setTimeout(() => {
                this.errorMessage = '';
            }, 5000);
        },

        changeColorInfo() {
            const link = document.getElementsByClassName('add-video-module-input')[0].value
            if (link.length !== 43 || !link.startsWith('https://www.youtube.com/watch?v=')) {
                document.getElementsByClassName('add-video-module-input')[0].style.border = '1px solid #FF695B'
            }
            else {
                document.getElementsByClassName('add-video-module-input')[0].style.border = '1px solid #ACFF9E'
            }
            this.errorMessage = ''; // Сбрасываем ошибку при изменении ссылки
        }
    }
}
</script>

<template>
    <div class="add-video-module-background" v-if="isVisible">
        <div class="add-video-module">
            <h1>Добавить видео</h1>
            
            <!-- Сообщение об ошибке -->
            <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
            </div>
            
            <input @input="changeColorInfo" class="add-video-module-input" type="text" placeholder="Ссылка на видео">
            <input class="add-video-comment-input" type="text" placeholder="Комментарий (не более 50 символов, не обязательно)">
            
            <button 
                class="add-video-module-button" 
                @click="notification" 
                :disabled="isLoading"
            >
                {{ isLoading ? 'Проверка...' : 'Добавить' }}
            </button>
            
            <img 
                src="../images/close-button.png" 
                alt="Закрыть" 
                class="add-video-module-close-button" 
                @click="removeComponent"
            >
        </div>
    </div>
</template>

<style scoped>
    @import '../assets/base.scss';

    .add-video-module-background {
        z-index: 10;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .add-video-module {
        background-color: #1C1C1C;
        box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
        border-radius: 5px;
        border: 2px solid #6F6F6F;
        padding: 30px;
        display: flex;
        flex-direction: column;
        gap: 15px;
        width: 800px;
        height: 280px; /* Увеличили высоту для сообщения об ошибке */
        position: relative;
    }

    .add-video-module h1 {
        font-family: 'Raleway-SemiBold', sans-serif;
        color: white;
        font-size: 28px;
        letter-spacing: 2px;
        text-align: center;
        margin-bottom: 10px;
    }

    .error-message {
        background: #FF695B;
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-family: 'Raleway-SemiBold', sans-serif;
        font-size: 14px;
        text-align: center;
        animation: slideDown 0.3s ease;
    }

    .add-video-module input {
        width: 100%;
        height: 40px;
        background: #1C1C1C;
        border: 2px solid #6F6F6F;
        border-radius: 5px;
        padding: 5px 15px;
        font-size: 14px;
        font-family: 'RaleWay', sans-serif;
        color: white;
        outline: none;
    }

    .add-video-module button {
        width: 100%;
        height: 40px;
        background: #1c1c1c;
        border-radius: 5px;
        font-family: 'Raleway-SemiBold', sans-serif;
        color: white;
        border: 1px solid #6441a5;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .add-video-module button:hover:not(:disabled) {
        background-color: #6441a5;
        color: #fff;
    }

    .add-video-module button:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        border-color: #6F6F6F;
    }

    .add-video-module-close-button {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 15px;
        right: 15px;
        cursor: pointer;
        transition: all 0.2s ease;
    }

    .add-video-module-close-button:hover {
        transform: scale(1.2);
    }   

    .add-video-module-close-button:active {
        transform: scale(0.9);
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>