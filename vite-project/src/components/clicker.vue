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
let ethicalChoice = ref('pass')
const route = useRoute()
const props = defineProps({
        gameInfo: Object,
        selfNumber: Number,
    })  
    let jackpot = (props.gameInfo.aop + 1) * 850
function ethicsTest(choice){
  ethicalChoice.value = choice
  update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {subPoints: choice})

}


 onValue(r(qt, `rooms/${route.params.code}/time`), (snapshot) => {
  timeTracker.value = snapshot.val()
});

onMounted(() => {
      timeD.value = 21 //61
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
     state: 'sosResults',
     time: 0,
    })}


  else{
    if(props.gameInfo.time >= 1){
     setTimeout(intFunction, 1000)
    } 
  }}
</script>

<style lang="scss" scoped>

</style>