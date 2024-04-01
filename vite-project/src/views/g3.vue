<template>
    <div v-if="info.name">
      <loading :game="'Quiplash'" :role="route.params.auth" :gameInfo="gameInfo" @startGame="startGame()"></loading>
      <prompts v-if="gameInfo.state == 'prompts'" :gameInfo="gameInfo" :selfNumber="selfNumber"></prompts>
    </div>
  </template>
  
  <script setup>
  import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
  import { useRoute } from 'vue-router'
import prompts from "@/components/prompts.vue"
  import { ref } from "vue";
  import loading from "@/components/loading.vue";
  import { info } from "@/reactive"; 


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
  
async function startGame(){
  
    update(r(qt, `rooms/${route.params.code}`), {
     state: 'prompts',  
     joinable: false,
  });
}


  
  async function host(){
    console.log('host')
    set(reference, {
        game: 'g3',
        code: route.params.code,
        aop: 0,
        joinable: true,
        time: 0,
        qList: [999],
        players: {
          '0': {
              name: name,
              pos: 0,
              points: 0,
              ready: false,
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