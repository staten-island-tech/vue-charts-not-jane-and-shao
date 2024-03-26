<script setup>
import { ref } from 'vue'
import reactive from '@/reactive'

const sprites = [
    {
        name: "businessMan",
        img: "img link here",
    },
    {
        name: "partyMan",
        img: "img link here",
    },
    {
        name: "surferGirl",
        img: "img link here",
    },
    {
        name: "pokemonTrainer",
        img: "img link here",
    },
    {
        name: "builderMan",
        img: "img link here",
    },
    {
        name: "IzzyMan",
        img: "img link here",
    },
    {
        name: "RylanMan (one pixel)",
        img: "img link here",
    },
    {
        name: "Noah(A)Man",
        img: "img link here",
    },
    {
        name: "gabe&noah(R)Man (poop emoji)",
        img: "img link here",
    },
    {
        name: "mike whalen (bald)",
        img: "img link here",
    },
]

const characterSprite = ref('')
const show = ref(0)

function cycleF(){
    show.value++
    if(show.value > sprites.length){
        show.value = 0
    }
    
}

function setCharacter(){
    characterSprite.value = sprites.img
}


</script>

<template>
    <div id="app">
        <button @click="cycleB()">last</button>
        <img  :src="sprite[show.value].img" @click="setCharacter()">
        <button @click="cycleF()">next</button>
    </div>
</template>
