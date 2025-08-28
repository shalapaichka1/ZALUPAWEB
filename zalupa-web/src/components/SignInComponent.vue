<script setup>
import { API } from '../../services/api'
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const formData = ref({
  username: '',
  password: ''
})

const errorMessage = ref('')
const isLoading = ref(false)

// Функция для установки cookie
const setCookie = (name, value, days = 30) => {
  const date = new Date()
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000))
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${value};${expires};path=/`
}

// Функция авторизации
const authorizationFunc = async (e) => {
  e.preventDefault()
  
  if (!formData.value.username || !formData.value.password) {
    errorMessage.value = 'Заполните все поля'
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    // Проверяем существование пользователя и авторизуем
    const response = await API.videos.authorizationUser(
      formData.value.username, 
      formData.value.password,
    )
    
    if (response.success) {
      // Сохраняем JWT токен и логин
      if (response.token) {
        setCookie('jwt_token', response.token)
      }
      setCookie('username', formData.value.username)
      
      // Обновляем состояние хранилища
      authStore.setUser({
        username: formData.value.username,
        isAuthenticated: true
      })
      
      // Закрываем окно авторизации
      authStore.isChatOpen = false
      
      console.log('Авторизация успешна')
    } else {
      errorMessage.value = response.message || 'Ошибка авторизации'
    }
    
  } catch (error) {
    console.error('Ошибка авторизации:', error)
    errorMessage.value = 'Произошла ошибка при авторизации'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>  
    <form class="main-window" @submit="authorizationFunc">
        <div class="sign-up-window">
        <h1 class="window-title">Вход в аккаунт</h1>
        <hr>
        
        <!-- Сообщение об ошибке -->
        <div v-if="errorMessage" class="error-message">
            {{ errorMessage }}
        </div>
        
        <div class="form-inputs">
            <input 
                v-model="formData.username" 
                class="form-input" 
                type="text" 
                placeholder="Логин"
                :disabled="isLoading"
            >
            <input 
                v-model="formData.password" 
                class="form-input" 
                type="password" 
                placeholder="Пароль"
                :disabled="isLoading"
            >
        </div>
        
        <div class="sign-in-buttons">
            <button 
                type="submit" 
                class="sign-in-button"
                :disabled="isLoading"
            >
                {{ isLoading ? 'Вход...' : 'Войти' }}
            </button>
            
            <p class="or-text">или</p>
            
            <button 
                type="button" 
                class="sign-in-twitch-button"
                :disabled="isLoading"
            >
                <p>Войти через</p>
                <img src="../images/twitchLogo.svg" alt="Twitch">
            </button>
        </div>

        <div class="question-buttons">
            <a 
                @click="authStore.isChatOpen = !authStore.isChatOpen" 
                href="#" 
                class="sign-up-text"
            >
                Нет аккаунта ?
            </a>
            <a href="#" class="sign-up-text">Забыли пароль ?</a>
        </div>
    </div>
</form>
</template>

<style scoped>
@import '../assets/base.scss';

.main-window {  
    display: flex;
    justify-content: center;
    align-items: center;
}

.sign-up-window {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    position: relative;
    top: 120px;
    background: #1C1C1C;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    border: 2px solid #6F6F6F;
    padding: 100px 50px;
    position: relative;
}

.window-title {
    font-family: 'Raleway-SemiBold', sans-serif;
    color: white;
    font-size: 28px;
    letter-spacing: 2px;
    text-align: center;
}

hr {
    border: 1px solid #6441a5;
    width: 80%;
    margin: 0 auto;
    border-radius: 5px;
}

.error-message {
    background: #FF695B;
    color: white;
    padding: 10px 20px;
    border-radius: 5px;
    font-family: 'Raleway-SemiBold', sans-serif;
    font-size: 14px;
    text-align: center;
    animation: slideDown 0.3s ease;
}

.form-inputs {
    width: 400px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.form-input {
    width: 80%;
    height: 30px;
    background: #1C1C1C;
    border: 2px solid #6F6F6F;
    border-radius: 5px;
    color: white;
    font-family: 'Raleway-SemiBold', sans-serif;
    font-size: 14px;
    padding: 20px 15px;
    margin-bottom: 25px;
    outline: none;

    &:focus {
        border: 2px solid #6441a5;
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}

.sign-up-text {
    cursor: pointer;
    font-family: 'Raleway-SemiBold', sans-serif;
    color: #6441a5;
    font-size: 14px;
    text-align: center;

    &:hover {
        text-decoration: underline;
    }
}

.question-buttons {
    display: flex;
    align-items: center;
    gap: 100px;
    margin-top: 20px;
}

.sign-in-twitch-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 40px;
    padding: 0 20px;
    background: #6441a5;
    border: none;
    border-radius: 5px;
    font-family: 'Raleway-SemiBold', sans-serif;
    color: white;
    cursor: pointer;
    transition: opacity 0.3s ease;
    
    &:hover:not(:disabled) {
        opacity: 0.9;
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}

.sign-in-button {
    height: 40px;
    padding: 0 30px;
    background: #1c1c1c;
    border: 1px solid #6441a5;
    border-radius: 5px;
    font-family: 'Raleway-SemiBold', sans-serif;
    color: white;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover:not(:disabled) {
        background-color: #6441a5;
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
        border-color: #6F6F6F;
    }
}

.sign-in-buttons {
    display: flex;
    align-items: center;
    gap: 15px;
}

.or-text {
    font-family: 'Raleway-SemiBold', sans-serif;
    color: white;
    font-size: 14px;
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