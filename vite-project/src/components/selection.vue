<script setup>
import { ref } from 'vue'
import business from '@/assets/business-idle.png'

const sprites = [
    {
        img: business,
    },
    {
        img: "img link here",
    },
    {
        img: "img link here",
    },
    {
        img: "img link here",
    },
    {
        img: "img link here",
    },
    {
        img: "img link here",
    },
    {
        img: "img link here",
    },
    {
        img: "img link here",
    },
    {
        img: "img link here",
    },
    {
        img: "img link here",
    },
]

const show = ref(0)

function cycleF(){
    show.value++
    if(show.value > sprites.length){
        show.value = 0
    }
}

function cycleB(){
    show.value--
    if(show.value < 0){
        show.value = sprites.length
    }
    console.log(show.value)
}

function setCharacter(){
    const selectedSprite = sprites[show.value].img;
    console.log(selectedSprite)
}
</script>

<template>
    <div id="app">
        <br>
        <div>Select Character!</div>
        <button @click.prevent="cycleB()" >last</button>
        <img class="sprites" :src="sprites[show].img" @click="setCharacter()">
        <button @click.prevent="cycleF()" >next</button>
    </div>
</template>

<style>
.sprites{
    max-height:100px;
}
</style>
