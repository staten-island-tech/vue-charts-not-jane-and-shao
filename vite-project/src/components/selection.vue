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
]


const show = ref(0)
const selectedSprite = ref(null)

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
    selectedSprite.value = sprites[show.value].img;
    console.log(selectedSprite.value)
    disabledButtons()
}

function disabledButtons(){
    const nextButton = document.getElementById('nextButton');
    const lastButton = document.getElementById('lastButton');
    if (selectedSprite.value !== null) {
        nextButton.disabled = true;
        lastButton.disabled = true;
    }
}
</script>

<template>
    <div id="app">
        <br>
        <div>Select Character!</div>
        <button id="lastButton" @click.prevent="cycleB()" >last</button>
        <img class="sprites" :src="sprites[show].img" @click="setCharacter()">
        <button id="nextButton" @click.prevent="cycleF()" >next</button>
    </div>
</template>

<style>
.sprites{
    max-height:300px;
}
</style>
