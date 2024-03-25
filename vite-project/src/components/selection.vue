<script setup>
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
</script>

<template>
    <div id="app">
        <div v-for="sprite in sprites">
            <div img ></div>
        </div>
    </div>
</template>