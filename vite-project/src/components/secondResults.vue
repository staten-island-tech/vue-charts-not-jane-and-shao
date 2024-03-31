<template>
    <div v-for="player in gameInfo.players">
        <p v-if="player.health == 'alive'">{{ player }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';
let playerList = ref([])
const props = defineProps({
        selfNumber: Number,
        gameInfo: Object,
    })
console.log(props)
    props.gameInfo.players.forEach(player => {
   playerList.value.push(player)
    })
    console.log(playerList)
</script>

<style lang="scss" scoped>

</style>