<template>
    <div v-if="gameInfo.players[selfNumber].health == 'limbo'">
        <button @click.prevent="clickingTime()">Click Me Quick!</button>
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

    function clickingTime(){
        update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {subPoints: props.gameInfo.players[props.selfNumber].subPoints++})
    }

 onValue(r(qt, `rooms/${route.params.code}/time`), (snapshot) => {
  timeTracker.value = snapshot.val()
});

onMounted(() => {
      timeD.value = 11 //61
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
  if(player.subPoints < 35 && player.health == 'limbo' ||player.health == 'dead'){
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

<style lang="scss" scoped>

</style>