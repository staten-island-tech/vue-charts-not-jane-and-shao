<template>
    <div v-if="info.name">
      <loading :game="'Trivia Murder Party'" :role="route.params.auth" :gameInfo="gameInfo" @startGame="startGame()"></loading>
    </div>
    <question v-if="gameInfo.state == 'question'" :gameInfo="gameInfo" :selfNumber="selfNumber"></question>
    <results v-if="gameInfo.state == 'firstResults'" :gameInfo="gameInfo" :selfNumber="selfNumber"></results>
    <mathgame v-if="gameInfo.state == 'math'" :gameInfo="gameInfo" :selfNumber="selfNumber"></mathgame>
    <p v-if="gameInfo.state == 'math'">ea</p>
    <secondResults v-if="gameInfo.state == 'secondResults'" :gameInfo="gameInfo" :selfNumber="selfNumber"></secondResults>
    <endScreen v-if="gameInfo.state == 'endResults'" :gameInfo="gameInfo" :selfNumber="selfNumber"></endScreen>
    <diceGame v-if="gameInfo.state == 'dice'" :gameInfo="gameInfo" :selfNumber="selfNumber"></diceGame>
    <spOrSt v-if="gameInfo.state == 'sos'" :gameInfo="gameInfo" :selfNumber="selfNumber"></spOrSt>
    <sosResults v-if="gameInfo.state == 'sosResults'" :gameInfo="gameInfo" :selfNumber="selfNumber"></sosResults>
  </template>
  
  <script setup>
  import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
  import { useRoute } from 'vue-router'
  import sosResults from "@/components/sosResults.vue";
  import diceGame from "@/components/dice.vue"
  import { ref } from "vue";
  import loading from "@/components/loading.vue";
  import { info } from "@/reactive"; 
  import spOrSt from "@/components/sos.vue"
  import question from "@/components/questionScreen.vue";
  import results from "@/components/results.vue"
 import mathgame from "@/components/math.vue";
 import secondResults from "@/components/secondResults.vue"
import endScreen from "@/components/endScreen.vue"

  const route = useRoute()
  console.log(route.params.auth)
  const qt = getDatabase()
  let name = info.name
  let reference = r(qt, `rooms/${route.params.code}`);
  let gameInfo = ref(false)
  let first = true
  let selfNumber = ref(1000)
  
  
  if(!info.name){
    window.location = "http://localhost:5173/";
  }
  else{
    console.log(info.name)
  }
  
  
  if(route.params.auth == 'host'){
     host()
  }
  
  
  if(route.params.auth == 'join'){
  join()
  
    }
  
function startGame(){
    update(r(qt, `rooms/${route.params.code}`), {
     state: 'question',
     joinable: false,
  });
}


  
  async function host(){
    console.log('host')
    set(reference, {
        game: 'g2',
        qList: [69],
        code: route.params.code,
        aop: 0,
        question: 'What are the odds Noah Abbas cries himself to sleep tonight?',
        joinable: true,
        time: 0,
        players: {
          '0': {
              name: name,
              pos: 0,
              subPoints: 0,
              health: 'alive',
              points: 0,
              ready: false,
              choice: false,
          }
        },
        state: 'start'
      })      
      onDisconnect(reference).update({
  state: 'error',
});
onDisconnect(reference).remove()
      selfNumber.value = 0
      onValue(r(qt, `rooms/${route.params.code}`), (snapshot) => {
    gameInfo.value = snapshot.val()
  });
  }
  
    async function join(){
      console.log('join')
      await onValue(r(qt, `rooms/${route.params.code}/`), (snapshot) => {
    gameInfo.value = snapshot.val()
    if(first){
      first = false
      selfNumber.value = gameInfo.value.aop + 1
      set(r(qt, `rooms/${route.params.code}/players/${gameInfo.value.aop + 1}`), {
        pos: gameInfo.value.aop + 1,
                name: name,
              points: 0,
              health: 'alive',
              ready: false,
              subPoints: 0,
              choice: false
    });
    update(r(qt, `rooms/${route.params.code}`), {
       aop: gameInfo.value.aop + 1
    });
    }
  });
  
  onDisconnect(reference).update({
  state: 'error',
});
onDisconnect(reference).remove()
    }
  
  
  </script>
  
  <style lang="scss" scoped>
  
  </style>