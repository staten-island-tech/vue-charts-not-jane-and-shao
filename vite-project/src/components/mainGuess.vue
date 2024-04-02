<template>
  <div class="container">

<div id="myTurn" v-if="selfNumber == gameInfo.up">
  <h4>You're Up!</h4>
      <h2>{{gameInfo.question.prompt}}</h2>
      <form id="bottom">
  <h2>{{ guessValue }}%</h2>
	<input @input="$emit('valUp',guessValue)" type='range' id="range" v-model="guessValue"/>
  <button class="btn" @click.prevent="$emit('valueGuess')">Submit</button>
</form>
    <graph :guess="gameInfo.guess" id="graph2 "></graph>
 
        </div>
    <div v-else id="yourTurn">
      <h4>{{ gameInfo.players[gameInfo.up].name}} is currently guessing.</h4>
      <h2>{{gameInfo.question.prompt}}</h2>
    <h3 id="otherPercent"><p>{{ gameInfo.guess }}%</p></h3>
    <graph :guess="gameInfo.guess" id="graph2 "></graph></div>
    
<!-- 
    <div id="myTurn" v-if="selfNumber == gameInfo.up">
      <div class="left"><h2>{{gameInfo.question.prompt}}</h2> 
    <form>
  <p>{{ guessValue }}%</p>
	<input @input="$emit('valUp',guessValue)" type='range' v-model="guessValue"/>
  <button class="btn" @click.prevent="$emit('valueGuess')">Submit</button>
</form>
  </div>
      <div id="right"><graph :guess="gameInfo.guess" id="graph"></graph></div>
</div>


 <div v-else><p>you are not up</p><p>{{ gameInfo.guess }}</p></div> -->
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
const props = defineProps({
  selfNumber: Number,
  gameInfo: Object,
})
</script>

<style  scoped>

#imTired{
  display: flex;
}

#align{
  display: flex;
  height: 33%;
  width: 100%;
}
#yourTurn{
  width: 100%;
  display: flex;
  align-items: center;
flex-direction: column;
}

.left{
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
}

#scallion{
  width: 50%;
  display: flex;
  align-items: center;
}

#myTurn{
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
}


#range{
  width: 70%;
}

#other{
  height: 100%;
  width: 50%;
  justify-self: left;
}
#otherPercent{
  font-size: 25px;
  margin: 1%;
}

#graph{
  justify-content: center;
  display: flex;
  width: auto;
}
#graph2{
max-width: 50%;
}
.container{
  display: flex;
  text-align: left;
  margin: 0 auto;
  background-color: #4b5057;;
    color:white;
    font: 'DoTGothic16';
    font-family:'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
  height: calc(100vh - 20px);
}

#top{
  margin-left: 1%;
  height: 25%;
  font-size: 38 px;
}
h4{
  font-size: 20px;
  margin: 0px;
  margin-top: 1%;
}

h2{
  font-size: 35px
}

button{
color:black
  }

  form{
    display: flex;
    text-align: center;
    align-items: center;
    width: 50%;
    flex-direction: column;
  }
</style>