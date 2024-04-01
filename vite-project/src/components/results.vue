<template>
    <div>
      <p>the correct answer was choice {{ gameInfo.question.answer }}, {{ gameInfo.question[gameInfo.question.answer] }}</p>
      
      <div v-for="players in gameInfo.players">{{ players.name }}: {{ players.points }}</div>
    </div>
    <button @click.prevent="readyCheck()">OYASUMI</button>
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
let gameArray = ['math','dice']
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
          if(nextState.value != 'secondResults'){
            gameArray = [...gameArray, 'chance']
          }
          nextState.value = gameArray[Math.floor(Math.random() * gameArray.length)]
        }
        else{
          console.log('alive' + player.health)
        }
      })
    })
    console.log(nextState.value)
    await update(r(qt, `rooms/${route.params.code}`), {state: nextState.value})
}
</script>


<style lang="scss" scoped>

</style>