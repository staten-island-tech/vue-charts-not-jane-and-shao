<template>
    <div>
<p>{{ selfNumber }}</p>
    </div>
     <div v-if="gameInfo.state == 'secondGuess' && gameInfo.excluded != selfNumber">
        <p>choose</p>
        <p>The Over Under Is {{ gameInfo.guess }}</p>
<button @click.prevent="$emit('ou','over')">Over</button>
 <button @click.prevent="$emit('ou','under')">Under</button>
     </div>
     <div v-else><p>waiting</p></div>
</template>

<script setup>
import { ref } from "vue";

defineProps({
  selfNumber: Number,
  gameInfo: Object,
})

function ou(choice){
    console.log(choice)
}
</script>

<style scoped>


</style>