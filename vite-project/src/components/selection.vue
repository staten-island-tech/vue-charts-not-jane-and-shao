<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const sprites = [
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
}

const router = useRouter();

function setCharacter(){
    const selectedSprite = sprites[show.value];
    router.push({ name: 'lobby', params: { sprite: selectedSprite }})
}
</script>

<template>
    <div id="app">
        <br>
        <div>Select Character!</div>
        <button @click.prevent="cycleB()">last</button>
        <img class="sprites" :src="sprites[show].img" @click="setCharacter()">
        <button @click.prevent="cycleF()">next</button>
    </div>
</template>

<style>
.sprites{
    max-height:100px;
}
</style>
