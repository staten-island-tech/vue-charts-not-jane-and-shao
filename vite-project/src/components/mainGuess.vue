<template>
<div v-if="selfNumber == gameInfo.up"><h2>{{gameInfo.question.prompt}}</h2> 
<form>
  <p>{{ guessValue }}%</p>
	<input @input="$emit('valUp',guessValue)" type='range' v-model="guessValue"/>
  <button @click.prevent="$emit('valueGuess')">Submit</button>
</form></div>
<div v-else><p>you are not up</p><p>{{ gameInfo.guess }}</p></div>
<div id="graphC"><graph :guess="gameInfo.guess"></graph></div>
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
  const response = await fetch(`https://theone-hofj.onrender.com/dt/5`)
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
</style>