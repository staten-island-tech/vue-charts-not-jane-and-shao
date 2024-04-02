<template>
  <div class="popup-container">
    <div class="popup">
      <button class="exit-button" @click="$emit('close-popup')">X</button>
      <form>
        <button id="hostSelect" v-for="x in ['join','host']" @click.prevent="gameSettings.type = x">{{ x }}</button><br>
        <button id="gameSelect" v-if="gameSettings.type == 'host'" v-for="x in ['guesspionage','chatrooms']"  @click.prevent="gameSettings.mode = games[x]; console.log(games[x])">{{ x }}</button><br> 
        <p>Room Code: <input type="text" v-model="gameSettings.code" maxlength="4" minlength="3"></p>
        <p v-if="gameSettings.type == 'host'">You are hosting: {{ gameSettings.mode }}</p>
        <button @click.prevent="gameStart()">Start Game</button>
        <p>Your room code: {{ gameSettings.code }}</p>
        <p>{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { info } from "@/reactive";
import G2 from "@/views/g2.vue";
import G3 from "@/views/g3.vue";

let games = {
  guesspionage: 'g1',
  TMP: 'g2',
  chatrooms: 'g3',
}

const router = useRouter()
let error = ref('')
const route = useRoute()
let gameSettings = ref({
  mode: 'g1',
  type: 'join',
  code: 'OPE1'
})

async function gameStart(){
  const qt = getDatabase();
  let valid = true
  let joinable = false
  let roomList = []
  await get(r(qt), '/').then((snapshot) => { 
  Object.values(snapshot.val().rooms).forEach((room)=> {
    roomList.push(room)
  })
})
roomList.forEach(room => {
  if(room.code == gameSettings.value.code.toUpperCase()){
      valid = false 
      gameSettings.value.mode = room.game
      joinable = room.joinable
    }
})
// console.log( `room: ${valid} joinable ${joinable}`)
console.log(gameSettings.value)
if(valid && gameSettings.value.type == 'host'){
  // console.log(`hosting game ${gameSettings.value.code}`)
  await set(r(qt, 'players/' + info.name), null)
  info.inLobby == false
  router.replace({ path: `/${gameSettings.value.mode}/${gameSettings.value.code.toUpperCase()}/host` })
}

else if(!valid && gameSettings.value.type == 'join' && joinable){
  await set(r(qt, 'players/' + info.name), null)
  info.inLobby == false
  router.replace({ path: `/${gameSettings.value.mode}/${gameSettings.value.code.toUpperCase()}/join` })
}
else{
  error.value = 'joining/hosting invalid game DEPLOY UPDATE TEST'  
  console.log(`joining/hosting invalid game DEPLOY UPDATE TEST`)
}

}


// async function gameStart(){
//   const qt = getDatabase();
//   await get(r(qt), '/').then((snapshot) => { 
//   Object.keys(snapshot.val().rooms).forEach((player)=> {
//     currentList.push(player)
//   })
// })
// console.log(currentList)
// if(currentList.includes(gameSettings.value.code) && gameSettings.value.type == 'host'){
//   console.log(`hosting game ${gameSettings.value.code}`)
// }
// else if(currentList.includes(gameSettings.value.code) == false && gameSettings.value.type == 'join'){
//   console.log('ea')
//   console.log(`joining game ${gameSettings.value.code}`)
// }
// else{
//   console.log(valid.value)
//   console.log(`joining/hosting invalid game`)
// }
// }




// function gameStart(){
//   const qt = getDatabase();
//   let valid = true
//   onValue(r(qt, 'rooms/'), (snapshot) => {
//   Object.keys(snapshot.val()).forEach((player)=> {
//     if(player == gameSettings.value.code){
//       valid = false
//     }
//   })
// })
// if(valid && gameSettings.value.type == 'host'){
//   console.log(`hosting game ${gameSettings.value.code}`)
// }
// else if(!valid && gameSettings.value.type == 'join'){
//   console.log(`joining game ${gameSettings.value.code}`)
// }
// else{
//   console.log(`joining/hosting invalid game`)
// }
// }
</script>

<style scoped>  
.popup-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* Ensure it's on top of other content */
}

.popup {
  width: 90%; /* Adjusted width */
  max-width: 600px; /* Maximum width */
  background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5); /* Add a shadow effect */
  position: relative; /* Required for positioning the exit button */
}

.exit-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #000; /* Set the color to ensure visibility */
}

form {
  text-align: center;
  font-family: 'VT323', monospace;
}

button {
  margin: 5px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  background-color: #007bff; 
  color: #ffffff;
  text-align: center;
  font-family: 'VT323', monospace;
}

button:hover{
  transform: scale(1.05);
}

#gameSelect {
  background-color: #28a745;
  font-family: 'VT323', monospace;
}

#hostSelect{
  background-color: #007bff;
  font-family: 'VT323', monospace;
}

input {
  padding: 10px;
  font-size: 16px;
  border-radius: 3px; 
  border: 1px solid #ccc;
  margin-top: 10px;
  text-align: center;
  width: 100px;
  font-family: 'VT323', monospace; 
}
</style>