<template>
    <div v-if="info.name">
      <p>{{ message }}</p>
      <div v-for="i in 10">
      <p>bananas!</p></div>
      <form>
        <input type="text" v-model="message">
        <button @click.prevent="sendMessage()">submit</button>
        <p></p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
  import { useRoute } from 'vue-router'
import prompts from "@/components/prompts.vue"
  import { ref } from "vue";
  import loading from "@/components/loading.vue";
  import { info } from "@/reactive"; 

  let gameInfo = ref('false')
  const route = useRoute()
  let message = ref('text')
  console.log(route.params.auth)
  const qt = getDatabase()
  let name = info.name
  let reference = r(qt, `rooms/${route.params.code}`);


  console.log(gameInfo.value)
  

  function sendMessage(){
    update(r(qt, `rooms/${route.params.code}/`), {
   messages:7
  });
}


  
  async function host(){
    console.log('host')
    set(reference, {
        game: 'g3',
        messages: ['test'],
        code: route.params.code,
        joinable: true,
        players: {
          '0': {
              name: name,
          }
        },
        state: 'start'
      })      
      onDisconnect(reference).update({
  state: 'error',
});
onDisconnect(reference).remove()

await get(child(r(getDatabase()), `rooms/${route.params.code}/`)).then((snapshot) => {
  gameInfo.value = snapshot.val()
 })
      onValue(r(qt, `rooms/${route.params.code}`), (snapshot) => {
    gameInfo.value = snapshot.val()
  });
  }
  
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
  
  
  </script>
  
  <style lang="scss" scoped>
  
  </style>