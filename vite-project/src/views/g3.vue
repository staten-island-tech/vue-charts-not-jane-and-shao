<template>
    <div v-if="info.name && gameInfo != null">
      <div v-for="i in gameInfo.messages">
      <p>{{ i }}</p></div>
      <form>
        <input type="text" v-model="message">
        <button v-if="gameInfo" @click.prevent="sendMessage()">submit</button>
        <p></p>
      </form>
    </div>
    <p v-else>L</p>
  </template>
  
  <script setup>
  import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
  import { useRoute } from 'vue-router'
import prompts from "@/components/prompts.vue"
  import { ref } from "vue";
  import loading from "@/components/loading.vue";
  import { info } from "@/reactive"; 

  let gameInfo = ref({
    messages: 'izzy is cool'
  })
  const route = useRoute()
  let message = ref('text')
  console.log(route.params.auth)
  const qt = getDatabase()
  let name = info.name
  let reference = r(qt, `rooms/${route.params.code}/`);

      onValue(r(qt, `rooms/${route.params.code}`), (snapshot) => {
        if(gameInfo.value == null && route.params.auth != 'host'){
          console.log('host left')
    location.replace(`https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_loc_reload`);
  }
    gameInfo.value = snapshot.val()
  });
  console.log(gameInfo.value)
  

  function sendMessage(){
    update(r(qt, `rooms/${route.params.code}/`), {
   messages: [...gameInfo.value.messages, `${info.name}: ${message.value}`]
  });
}


  
  async function host(){
    console.log('host')
    set(r(qt, `rooms/${route.params.code}`), {
        game: 'g3',
        messages: ['Console: Lobby Created. Waiting On Player To Join To Send Messages'],
        code: route.params.code,
        joinable: true,
        players: {
          '0': {
              name: name,
          }
        },
      })    
       onDisconnect(r(qt, `rooms/${route.params.code}`)).remove();

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
  
  
  // if(route.params.auth == 'join'){
  // join()
  
  //   }
  
  
  </script>
  
  <style lang="scss" scoped>
  
  </style>