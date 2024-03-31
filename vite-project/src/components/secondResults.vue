<template>
    <div v-for="player in gameInfo.players">
        <p v-if="player.health == 'alive'">{{ player }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
        selfNumber: Number,
        gameInfo: Object,
    })
console.log(props)
    props.gameInfo.players.forEach(player => console.log(player))
</script>

<style lang="scss" scoped>

</style>