<template>
    <button class="is-not-checked-button">Не просмотренно</button>
</template>

<style>
.is-not-checked-button {
    display: flex;
    align-items: center;
    gap: 15px;
    color: #fff;
    background: #1c1c1c;
    width: 140px;
    &:hover{
        cursor: pointer;
        background: #303030
    }

    &:active{
        transform: scale(0.99);
    }
}
</style>