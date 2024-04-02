<template>
    <div class="container">
    <div>
    </div>
     <div v-if="gameInfo.state == 'secondGuess' && gameInfo.excluded != selfNumber">
        <p>"{{ gameInfo.question.prompt }}"</p>
        <p>{{ gameInfo.players[gameInfo.up].name }} guessed {{ gameInfo.guess }}%. Choose if you think it is over or under.</p>
        <div id="graphC"><graph :guess="gameInfo.guess"></graph></div>
<button @click.prevent="$emit('ou','over')">Over</button>
 <button @click.prevent="$emit('ou','under')">Under</button>
     </div>
     <div v-else><p>waiting</p></div>
    </div>
</template>

<script setup>
import graph from "@/components/graph.vue";

const props = defineProps({
        selfNumber: Number,
        gameInfo: Object,
    })
</script>

<style scoped>
.container{
  text-align: center;
  margin: 0 auto;
  background-color: #4b5057;;
    color:white;
    font: 'DoTGothic16';
    font-family: 'DotGothic16', sans-serif;
  height: calc(100vh - 20px);
}

#graphC{
  height: 20vh;
}

button{
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  padding: 0 12px;
  line-height: 20px;
  height: 30px;
  max-height: 30px;
  background: #fffff;
  font-weight: 700;
  border: 2px solid #DAE3F3;
  border-radius: 0;
  color: #272C34;
  transition-timing-function: ease-in-out;
  transition-property: box-shadow;
  transition-duration: 150ms;
  font: 'DoTGothic16';
  font-family: 'DotGothic16', sans-serif;
  transform: translateY(150px)
}
</style>