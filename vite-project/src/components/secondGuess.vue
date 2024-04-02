<template>
    <div class="container">
    <div>
    </div>
     <div v-if="gameInfo.state == 'secondGuess' && gameInfo.excluded != selfNumber">
        <div id="ou">
        <h2>"{{ gameInfo.question.prompt }}"</h2>
        <p>{{ gameInfo.players[gameInfo.up].name }} guessed <b>{{ gameInfo.guess }}%</b>. Choose if you think it is over or under.</p>
        <div id="graphC"><graph :guess="gameInfo.guess"></graph></div>
        <div id="buttons">
        <button @click.prevent="$emit('ou','over')">Over</button>
 <button @click.prevent="$emit('ou','under')">Under</button>
</div>
    </div>
     </div>
     <div id="waiting" v-else><h2>Waiting For Other Players...</h2>
    <img id="loading" src="https://cdn.pixabay.com/animation/2023/05/02/04/29/04-29-06-428_512.gif"></div>
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
  display: flex;
  background-color: #4b5057;
  justify-content: center;
  align-items: center;
    color:white;
    font: 'DoTGothic16';
    font-family: 'DotGothic16', sans-serif;
  height: calc(100vh - 20px);
}

#loading{
    margin-top: 50px;
    height: 200px;
}
#graphC{
  height: 20vh;
}

#buttons{
    margin-top: 50px;
}

#ou{
    flex-direction: column;
    height: 500px;
    width: 100%;
    display: flex;
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
  background: #ffffff;
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

#waiting{
align-self: center;
justify-self: center;
flex-direction: column;
}
</style>