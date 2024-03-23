<template>
  <div>
    <form>
      <button v-for="x in ['join','host']" @click.prevent="gameSettings.type = x">{{ x }}</button><br>
      <button v-if="gameSettings.type == 'host'" v-for="x in ['g1','g2','g3']"  @click.prevent="gameSettings.mode = x">{{ x }}</button><br> 
      <input type="text" v-model="gameSettings.code" maxlength="4" minlength="3">
      <p v-if="gameSettings.type == 'host'">{{ gameSettings.mode }}</p>
      <button @click.prevent="gameStart()">Start Game</button>
      <p>{{ gameSettings.type }}</p>
      <p>{{ gameSettings.code }}</p>
    </form>
  </div>
</template>

<script setup>
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child   } from "firebase/database";
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router'
import { info } from "@/reactive";
const router = useRouter()
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
  if(room.code == gameSettings.value.code){
      valid = false 
      joinable = room.joinable
    }
})
// console.log( `room: ${valid} joinable ${joinable}`)
if(valid && gameSettings.value.type == 'host'){
  console.log(`hosting game ${gameSettings.value.code}`)
  router.replace({ path: `/${gameSettings.value.mode}/${gameSettings.value.code}/host` })
  r(qt, 'players/' + info.name).removeValue();
}
else if(!valid && gameSettings.value.type == 'join' && joinable){
  console.log(`joining game ${gameSettings.value.code}`)
}
else{
  console.log(`joining/hosting invalid game`)
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

<style lang="scss" scoped>  

</style>