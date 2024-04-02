<template>
    <div id="cont" v-if="info.name && gameInfo != null">
      <div id="chatBox">
        <h2 id="title">Chat Room {{ gameInfo.code }}</h2>
      <div v-for="i in gameInfo.messages">
      <p class="msg">{{ i }}</p></div></div>
      <form>
        <input id="formInput" type="text" v-model="message">
        <button v-if="gameInfo" @click.prevent="sendMessage()">Send</button>
        <button @click.prevent="returnToLobby" class="return-button">Return To Login</button>
        <p></p>
      </form>
    </div>
    <p v-else>Host has disconnected. I'm going to do something with my life in the time I saved from not making this end screen</p>
    <h6>jk im just going to code || play pokemon </h6>
    <h6>-Noah Abbas</h6>
    <button @click.prevent="returnToLobby" class="return-button">Return To Lobby</button>
  </template>
  
  <script setup>
  import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
  import { useRoute } from 'vue-router'
import prompts from "@/components/prompts.vue"
  import { ref,onMounted, onBeforeUnmount } from "vue";
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
   messages: [ `${info.name}: ${message.value}`, ...gameInfo.value.messages]
  });
  message.value = ''
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
  
  const returnToLobby = () => {
    window.location = `http://localhost:5173/`;
  };

  </script>
  
  <style  scoped>

 h6{
font-size: 4px;
 }
  #cont{  
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    position: absolute;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
   display: flex;
   justify-content: center;
   flex-direction: column;
   align-items: center;
    background-color: #171e27;
  }
  #chatBox{
    margin: 1%;
    padding: 1%;
    width: 75%;
    overflow: auto;
    background: rgba(243,243,243,0.9);
    height: 90%;  
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border: 5px solid black
  }

  #title{
    text-align: center;
  }
  .msg{
border-bottom: 1px black solid;
  }


  form{
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  #formInput{

    font-size: 14px;
                border-radius: 6px;
                padding: 5px 10px;
                border: 2px solid #b4b4b4;
                color: rgb(14, 14, 16);
                background: #dee1e2;
                display: block;
                height: 20px;
                :hover {
                    border-color: #ccc;
                }
                :focus{
                    border-color: #9147ff;
                    background: #fff;
                }
                
  }
  </style>