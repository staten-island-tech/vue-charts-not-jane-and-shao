<template>
  <form v-if="gameInfo.players[selfNumber].health == 'limbo'" id="container">  
    <h1>Goal: {{ cutoff }} | Points: {{ points }}</h1>
     <h1 id="equation">{{ num }} {{ valuesArray[sign] }} {{ num2 }}</h1>
     <input type='text' v-model="guess" v-on:keydown.enter.prevent="choiceCheck" />
    </form>
    <div id="clock">    <p>{{ timeTracker }}</p></div>
</template>

<script setup>
import { info } from "@/reactive";
import { useRoute } from 'vue-router'
import { ref,onMounted } from "vue";
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
import { connectFirestoreEmulator } from "firebase/firestore";
const route = useRoute()
const qt = getDatabase()
let nextState = ref('question') 
let valuesArray = ["*","+","-"]
let points = ref(0)
const props = defineProps({
        gameInfo: Object,
        selfNumber: Number,
    })  
let timeD = ref(61)//61
    let num = ref('')
let num2 = ref('')
let cutoff = (Math.floor(props.gameInfo.qList.length ** 1.45)) + 30
let ans = ref('')
let sign = ref('')
let timeTracker = ref(61)//61
    let guess = ref('')
function choiceCheck(){
  if(ans.value == guess.value){
    numShuffle()
    guess.value = ''
    points.value++
     update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {subPoints: points.value})
  }
  
}


function numShuffle(){
  num.value = Math.floor(Math.random() * 12) + 1
 num2.value = Math.floor(Math.random() * 10) + 3
 sign.value = Math.floor(Math.random() * 3)
if(sign.value == 0){
    ans.value = (num.value * num2.value)
}
if(sign.value == 2){
    ans.value = (num.value - num2.value)
}
if(sign.value == 1){
    ans.value = (num.value + num2.value)
}
}
numShuffle()

onValue(r(qt, `rooms/${route.params.code}/time`), (snapshot) => {
  timeTracker.value = snapshot.val()
});

onMounted(() => {
      timeD.value = 61 //61
  if(route.params.auth == 'host'){
    setTimeout(intFunction, 1000)
  }
})


async function intFunction(){
      timeD.value--
     await update(r(qt, `rooms/${route.params.code}`), {
     time: timeD.value
  });
  if(timeD.value < 1){
    update(r(qt, `rooms/${route.params.code}/`), {
     state: 'wajio',
     time: 0
    })
    get(child(r(getDatabase()), `rooms/${route.params.code}/players`)).then((snapshot) => {
snapshot.val().forEach(player => {
  if(player.subPoints < cutoff && player.health == 'limbo' ||player.health == 'dead'){
    console.log( props.gameInfo.players[player.pos].points)
    update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {health: 'dead'})
  }
  else{
    update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {health: 'alive'})
  } 
})
update(r(qt, `rooms/${route.params.code}`), {state: 'secondResults'})
     })}


  else{
    if(props.gameInfo.time >= 1){
     setTimeout(intFunction, 1000)
    } 
  }}
</script>


<style  scoped>
text{
  margin: 0px;
}

input{
  font-size: 50px;
  text-align: center;
  font: 'DoTGothic16';
    font-family: 'DotGothic16', sans-serif;
  height: 10%;
  width: 20%;
}
#clock {
  display: flex;
  border: 2px black solid;
  border-radius: 500px;
  align-items: center;
  justify-content: center;
  width: 10%;
  position: absolute;
  min-height: 10%;
  max-height: 10%;
  font-size: 50px;
  max-width: 10%;
  bottom: 95%;
  left: 50%;
  transform: translate(-50%, 50%);
  background: rgb(255,255,255); /* Just to visualize the extent */
}

#container{
  margin: 0px;
  text-align: center;
  display: flex;
  background-color: #4b5057;
  justify-content: center;
  flex-direction: column;
  align-items: center;
    color:white;
    font: 'DoTGothic16';
    font-family: 'DotGothic16', sans-serif;
    position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: auto;
}

#equation{
  margin: 5%;
  font-size: 150px;
}
</style>