<template>
    <div v-if="info.name">
      <loading :game="'Trivia Murder Party'" :role="route.params.auth" :gameInfo="gameInfo" @startGame="startGame()"></loading>
    </div>
  </template>
  
  <script setup>
  import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
  import { useRoute } from 'vue-router'
  import { ref } from "vue";
  import loading from "@/components/loading.vue";
  import { info } from "@/reactive"; 
  const route = useRoute()
  const qt = getDatabase()
  let name = info.name
  let reference = r(qt, `rooms/${route.params.code}`);
  let gameInfo = ref(false)
  let first = true
  let orderList = ref([])
  let turn = 0
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
  
  
  
  async function host(){
    set(reference, {
        code: route.params.code,
        peopleNeeded: 3,
        aop: 0,
        order: false,
        guess: 50,
        excluded: false,
        question: 'What are the odds Noah Abbas cries himself to sleep tonight?',
        joinable: true,
        question: {
          prompt: 'loading',
          ans: 'loading'
        },
        up: false,
        players: {
          '0': {
              name: name,
              points: 0,
              guess: 'NG', 
              ou: false,
          }
        },
        state: 'start'
      })      
      onDisconnect(reference).remove();
      selfNumber.value = 0
      onValue(r(qt, `rooms/${route.params.code}`), (snapshot) => {
    gameInfo.value = snapshot.val()
  });
  }
  
    async function join(){
      await onValue(r(qt, `rooms/${route.params.code}/`), (snapshot) => {
    gameInfo.value = snapshot.val()
    if(first){
      first = false
      selfNumber.value = gameInfo.value.aop + 1
      set(r(qt, `rooms/${route.params.code}/players/${gameInfo.value.aop + 1}`), {
                name: name,
              points: 0,
              ou: false,
    });
    update(r(qt, `rooms/${route.params.code}`), {
       aop: gameInfo.value.aop + 1
    });
    }
  });
  
  onDisconnect(reference).remove();
    }
  
  
  </script>
  
  <style lang="scss" scoped>
  
  </style>