<script setup>
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'

const useStore = useAuthStore()

</script>

<template>  
    <div class="main-window">
        <div class="sign-up-window">
        <h1 class="window-title">Вход в аккаунт</h1>
        <hr>
        <div class="form-inputs">
            <input class="form-input" type="text" placeholder="Логин">
            <input class="form-input" type="password" placeholder="Пароль">
        </div>
        <div class="sign-in-buttons">
            <button class="sign-in-button">Войти</button>
                <p class="or-text">или</p>
            <button class="sign-in-twitch-button">
                <p>Войти через</p>
            <img src="../images/twitchLogo.svg" alt="">
        </button>
        </div>

        <div class="question-buttons">
            <a @click="useStore.isChatOpen = !useStore.isChatOpen" href="#" class="sign-up-text">Нет аккаунта ? </a>
            <a href="#" class="sign-up-text">Забыли пароль ? </a>
        </div>
    </div>
    </div>
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
    /* box-shadow: 0px 0px 5px #6441a5; */
    border-radius: 5px;
}

.form-inputs {
    width: 400px;
    margin-top: 40px;
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
}

.sign-up-text {
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
}

.sign-in-twitch-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    height: 40px;
    background: #6441a5;
    border-radius: 5px;
    font-family: 'Raleway-SemiBold', sans-serif;
    color: white;
}

.sign-in-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
}

.or-text {
    font-family: 'Raleway-SemiBold', sans-serif;
    color: white;
    font-size: 14px;
}
</style>