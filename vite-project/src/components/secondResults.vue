<template>
    <div>
        <p>{{ gameInfo }}</p>
<p>second results test</p>
<p>ea</p>
    </div>
</template>

<script setup>
const props = defineProps({
        selfNumber: Number,
        gameInfo: Object,
    })

    props.gameInfo.players.forEach(player => console.log('player'))
</script>

<style lang="scss" scoped>

</style>