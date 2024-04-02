<script setup>
import { ref } from 'vue'
import { info } from '@/reactive'
import business from '@/assets/business-idle.png'
import construction from '@/assets/construction-idle.png'
import knight from '@/assets/knight.png'
import poop from '@/assets/poop-idle.png'
import soldier from '@/assets/soldier-idle.png'
import trainer from '@/assets/trainer-idle.png'

const sprites = [
    {
        img: business,
    },
    {
        img: construction,
    },
    {
        img: knight,
    },
    {
        img: poop,
    },
    {
        img: soldier,
    },
    {
        img: trainer,
    },
]


const show = ref(0)
const selectedSprite = ref(null)

function cycleF(){
    show.value++
    if(show.value > sprites.length - 1){
        show.value = 0
    }
    console.log(show.value)
}

function cycleB(){
    show.value--
    if(show.value < 0){
        show.value = sprites.length - 1
    }
    console.log(show.value)
}

function setCharacter(){
    selectedSprite.value = sprites[show.value].img;
    disabledButtons()
    info.sprite = selectedSprite.value
    console.log(info.sprite)
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
        <h2>Select Character!</h2>
        <button id="lastButton" @click.prevent="cycleB()" >last</button>
        <img class="sprites" :src="sprites[show].img" @click="setCharacter()">
        <button id="nextButton" @click.prevent="cycleF()" >next</button>
        <h3 v-if="selectedSprite !== null">You've chosen this sprite.</h3>
    </div>
</template>

<style scoped>
#app{
    text-align:center;
}
.sprites{
    max-height:300px;
    padding: 20px;
}
h2, h3 {
    text-align:center;
}
button {
  width: 50px;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4b92db;
  color: #ffffff;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.2);
}

button:hover {
  background-color: #3672b8;
}
</style>