<template>
    <div>
<p>{{ winner  }}</p>
<p>{{ winnerPoints  }}</p>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
let winner = ref('')
let winnerPoints = ref(0)
const props = defineProps({
        selfNumber: Number,
        gameInfo: Object,
    })

    onMounted(async () => {
    console.log(props.gameInfo.players)
    props.gameInfo.players.forEach(player => {
        if(player.points > winnerPoints.value){
            winnerPoints.value = player.points
            winner.value = player.name
        }
        else if(player.points == winnerPoints.value){
            winnerPoints.value = player.points
            winner.value = `${winner.value} and ${player.name}`
        }
    });
})
</script>

<style lang="scss" scoped>

</style>