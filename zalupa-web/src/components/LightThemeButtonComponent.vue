<script setup>
import { useAuthStore } from '@/stores/auth';
</script>

<template>
    <div class="switch-body" @click="useAuthStore().isDarkTheme = !useAuthStore().isDarkTheme">
        <img class="switch-img" src="../images/Moon.png" alt="Sun">
        <span>light theme</span>
    </div>
</template>

<style scoped>

.switch-img {
    height: 30px;
}
.switch-body {
    font-size: 12px;
    display: flex;
    align-items: center;
    padding: 15px;
    gap: 15px;
    width: 150px;
    height: 50px;
    border-radius: 50px;
    border: 1px solid #494949;
    color: #000000;
    cursor: pointer;
    user-select: none;
    justify-content: space-between;

    &:hover {
        transform: scale(1.05)
    }

    &:active {
        transform: scale(.95);
    }
}
</style>