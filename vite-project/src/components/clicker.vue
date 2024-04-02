<template>
  <div v-if="gameInfo.players[selfNumber].health == 'limbo'">
  <p>{{ timeTracker }}</p>
  <p>{{ gameInfo.players[selfNumber].subPoints }}</p>
    <div v-if="gameInfo.players[selfNumber].health == 'limbo'">
        <button class="red-button" @click.prevent="clickingTime()"></button>
        <p>Click me!</p>
    </div>
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
let timeD = ref(11)//61
let timeTracker = ref(11)//61
const qt = getDatabase()
const route = useRoute()
const props = defineProps({
        gameInfo: Object,
        selfNumber: Number,
    })  
    let clacks = ref(0)
    let cutoff = (Math.floor(props.gameInfo.qList.length ** 1.45)) + 80
    function clickingTime(){
      clacks.value++; 
      console.log(clacks.value)
       update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {subPoints: clacks.value})
    }

 onValue(r(qt, `rooms/${route.params.code}/time`), (snapshot) => {
  timeTracker.value = snapshot.val()
});

onMounted(() => {
      timeD.value = 1100 //61
  if(route.params.auth == 'host'){
    console.log('uncomment this')
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
    update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {health: 'dead'})
  }
  else{
    update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {health: 'alive', points: props.gameInfo.players[player.pos].points + (clacks.value * 5)})
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

<style scoped>

.red-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
.red-button:hover {
  background-color: darkred;
}
</style>