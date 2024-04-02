<template>
  <div id="cont">
  <h1>POINTS</h1>
    <div v-for="player in gameInfo.players">
        <p v-if="player.health == 'alive'">{{ player.name }}: {{ player.points }}</p>
    </div>
    <button @click.prevent="readyCheck()">Next Round</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
import { useRoute } from 'vue-router'
let playerList = ref([])
const qt = getDatabase()
const route = useRoute()
const props = defineProps({
        selfNumber: Number,
        gameInfo: Object,
    })
console.log(props)
    props.gameInfo.players.forEach(player => {
   playerList.value.push(player)
    })
    console.log(playerList)

    async function readyCheck(){
  let startGame = true
 await update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {ready: true, subPoints: 0})
 let endTimes = true
 await get(child(r(getDatabase()), `rooms/${route.params.code}/players/`)).then((snapshot) => { 
  snapshot.val().forEach(player => {
    if(player.health == 'limbo' || player.health == 'alive'){
      endTimes = false
      if(!player.ready){
        startGame = false
    }
  }
  })  
   if(startGame){
     get(child(r(getDatabase()), `rooms/${route.params.code}/players/`)).then((snapshot) => { 
        snapshot.val().forEach(player =>{
            update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {ready: false})
        })
    })
    console.log(endTimes)
    if(endTimes){
      update(r(qt, `rooms/${route.params.code}/`), {state: 'endResults'})   
    }
    else{
      update(r(qt, `rooms/${route.params.code}/`), {state: 'question'})   
    }
  }
})
}
</script>

<style lang="css" scoped>

p{
  margin: 5px;
}

#cont{
  background-color: azure;
  position: fixed;
  align-items: center;
  top: 50%;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  left: 50%;
  transform: translate(-50%, -50%);
}

body {
    background-color: black;
    color:white;
  }
</style>