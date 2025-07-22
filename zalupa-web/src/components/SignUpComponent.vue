<script setup >
import {useAuthStore} from '../stores/auth'
import { ref } from 'vue'

const authStore = useAuthStore()

const signUp = async () => {
    const userNickname = document.getElementsByClassName('login')[0].value
    // await authStore.signUp({email: email.value, password: password.value})
    document.cookie = "userNickname=" + encodeURIComponent(userNickname) + "; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
}

const checkLogin = () => {
    const userNickname = document.getElementsByClassName('form-input login')[0]
    if (userNickname.value.length < 6) {
        userNickname.style.border = '2px solid #FF695B'
        userNickname.style.transition = '.5s'
    }
    else {
        userNickname.style.border = '2px solid #ACFF9E'
        userNickname.style.transition = '.5s'
    }
}

const email = ref('')
const password = ref('')

const validateEmail = () => {
    const email = document.getElementsByClassName('email')[0]
    if (!email.value.includes('@') || !email.value.includes('.ru') && !email.value.includes('.com')) {
        email.style.border = '2px solid #FF695B'
        email.style.transition = '.5s'
    }
    else {
        email.style.border = '2px solid #ACFF9E'
        email.style.transition = '.5s'
    }
}

const checkPassword = () => {
    const password = document.getElementsByClassName('password')[0]
    if (password.value.length < 8 || !isNaN(password.value) || !/[a-z]/.test(password.value) || !/[0-9]/.test(password.value)) {
        password.style.border = '2px solid #FF695B'
        password.style.transition = '.5s'
    }
    else {
        password.style.border = '2px solid #ACFF9E'
        password.style.transition = '.5s'
    }
    repeatPassword()
}

const repeatPassword = () => {
    const repeatPassword = document.getElementsByClassName('repeat-password')[0]
    const password = document.getElementsByClassName('password')[0]
    if (repeatPassword.value !== password.value) {
        repeatPassword.style.border = '2px solid #FF695B'
        repeatPassword.style.transition = '.5s'
    }
    else {
        repeatPassword.style.border = '2px solid #ACFF9E'
        repeatPassword.style.transition = '.5s'
    }
}
</script>

<template>  
    <div class="main-window">
        <div class="sign-up-window">
        <h1 class="window-title">Регистрация</h1>
        <hr>
        <div class="form-inputs">
            <input class="form-input login" type="text" placeholder="Логин" @input="checkLogin">
            <input class="form-input email" type="e-mail" placeholder="Почта" @input="validateEmail">
            <input class="form-input password" type="password" placeholder="Пароль" @input="checkPassword">
            <input class="form-input repeat-password" v-model="password" type="password" placeholder="Повтор пароля" @input="repeatPassword">
        </div>
        <button @click="signUp" class="sign-up-button">Зарегистрироваться</button>
        <a @click="authStore.isChatOpen = !authStore.isChatOpen" class="sign-up-text">Уже есть аккаунт ? </a>
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
    width: 550px;
    height: 600px;
    background: #1C1C1C;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    border: 2px solid #6F6F6F;
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
    cursor: pointer;
    font-family: 'Raleway-SemiBold', sans-serif;
    color: #6441a5;
    font-size: 14px;
    text-align: center;

    &:hover {
        text-decoration: underline;
    }
}
</style>