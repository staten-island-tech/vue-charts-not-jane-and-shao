<template>
    <div class="container">
      <br>
      <p>The correct answer was choice {{ gameInfo.question.answer.toUpperCase() }}, {{ gameInfo.question[gameInfo.question.answer] }}.</p>
      <p>The minigame will be {{ gameInfo.nextGame }}!</p>
      <div v-for="players in gameInfo.players">{{ players.name }}: {{ players.points }}</div>
      <button @click.prevent="readyCheck()">Continue!</button>
    </div>
</template>

<script setup>
import { info } from "@/reactive";  
import { useRoute } from 'vue-router'
import { ref,onMounted } from "vue";
let potato = ["a","b","c","d"]
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
import { connectFirestoreEmulator } from "firebase/firestore";
const route = useRoute()
const qt = getDatabase()
let nextState = ref('secondResults')
let people = ref(0)
let gameArray = ['math','dice','clicker']
const props = defineProps({
        gameInfo: Object, 
        selfNumber: Number,
    })


  onMounted(async () =>{
      await get(child(r(getDatabase()), `rooms/${route.params.code}/players/${props.selfNumber}`)).then((snapshot) => {
        if(snapshot.val().choice == props.gameInfo.question.answer){
          console.log(snapshot.val())
           update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {
            points: props.gameInfo.players[props.selfNumber].points + 1500,
            choice: false,
            ready: false,
          })
        }
        else if (snapshot.val().health == 'alive'){
          update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {
            health: 'limbo',
            choice: false,
            ready: false,
          })
        }
      })
      gameSelector()
  })


async function readyCheck(){
  let startGame = true
 await update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {ready: true})
 await get(child(r(getDatabase()), `rooms/${route.params.code}/players/`)).then((snapshot) => { 
  snapshot.val().forEach(player => {
    if(player.health == 'limbo' || player.health == 'alive')
      if(!player.ready){
        startGame = false
    }
  })  
   if(startGame){
    nextGameTest()
  }
})
}

async function nextGameTest(){
  console.log(nextState.value)
     await get(child(r(getDatabase()), `rooms/${route.params.code}/players/`)).then((snapshot) => {
      snapshot.val().forEach(player => {
        update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {ready: false})
        console.log('player')
        if(player.health == 'limbo'){
          console.log(player.health)
        }
        else{
          console.log('alive' + player.health)
        }
      })
    })
    console.log(nextState.value)
    await update(r(qt, `rooms/${route.params.code}`), {state: props.gameInfo.nextGame})
}

async function gameSelector(){
  if(route.params.auth == 'host'){
     await get(child(r(getDatabase()), `rooms/${route.params.code}/players/`)).then((snapshot) => {
      snapshot.val().forEach(player => {
        console.log(player)
        if(player.health == 'limbo'){
          console.log(player)
          people.value = people.value + 1
          console.log(people.value)
          if(people.value > 1){
            gameArray = [...gameArray, 'sos']
          }
        }
      })
    })
    console.log(people.value)
    if(people.value > 0){
      nextState.value = gameArray[Math.floor(Math.random() * gameArray.length)]
    }
    update(r(qt, `rooms/${route.params.code}`), {nextGame: nextState.value})
    console.log(nextState.value)
}
}
</script>


<style scoped>
.container{
  text-align: center;
  margin: 0 auto;
  background-color: #4b5057;;
    color:white;
    font: 'DoTGothic16';
    font-family: 'DotGothic16', sans-serif;
  height: calc(100vh - 30px);
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
  transform: translateY(20px)
}
</style>