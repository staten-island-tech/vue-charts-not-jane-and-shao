<template>
  <div class="container">
    <br>
<div v-if="selfNumber == gameInfo.up"><h2>{{gameInfo.question.prompt}}</h2> 
<form>
  <p>{{ guessValue }}%</p>
	<input @input="$emit('valUp',guessValue)" type='range' v-model="guessValue"/>
  <div id="graphC"><graph :guess="gameInfo.guess"></graph></div>
  <button class="btn" @click.prevent="$emit('valueGuess')">Submit</button>
</form></div>
<div v-else><p>you are not up</p><p>{{ gameInfo.guess }}</p></div>
</div>
</template>

<script setup>
import { info } from "@/reactive";
import graph from "@/components/graph.vue";
import { useRoute } from 'vue-router'
import { ref,onMounted } from "vue";
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
const route = useRoute()
const qt = getDatabase()

async function getQuestionInfo(){
  if(route.params.auth == 'host'){
    let num = Math.floor((Math.random() * 55)); 
  try{
  const response = await fetch(`https://theone-1.onrender.com/dt/${num}`)
  const data = await response.json(); 
  console.log(data) 
  update(r(qt, `rooms/${route.params.code}/question`), {
     prompt: data.question,
     ans: data.percent,
  });

}

catch(error){
  console.log(error)
}
}
}

onMounted(() => {
  console.log('ea')
  getQuestionInfo()
})

let guessValue = ref(50)
defineProps({
  selfNumber: Number,
  gameInfo: Object,
})
</script>

<style  scoped>
#graphC{
  height: 20vh;
}
.container{
  text-align: center;
  margin: 0 auto;
  background-color: #4b5057;;
    color:white;
    font: 'DoTGothic16';
    font-family: 'DotGothic16', sans-serif;
  height: calc(100vh - 20px);
}

h2 {
  font-size: 28px;
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