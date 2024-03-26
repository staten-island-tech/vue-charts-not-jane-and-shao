<template>
<div v-if="selfNumber == gameInfo.up"><p>you are up</p>
<form>
  <p>{{ guessValue }}%</p>
	<input @input="$emit('valUp',guessValue)" type='range' v-model="guessValue"/>
  <p>{{ gameInfo.question }}</p>
  <button @click.prevent="$emit('valueGuess')">Submit</button>
</form></div>
<div v-else><p>you are not up</p><p>{{ gameInfo.guess }}</p></div>
</template>

<script setup>
import { ref } from "vue";
let guessValue = ref(50)
defineProps({
  selfNumber: Number,
  gameInfo: Object,
})
</script>

<style lang="scss" scoped>

</style>