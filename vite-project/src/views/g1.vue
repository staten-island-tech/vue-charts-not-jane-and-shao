<template>
  <div v-if="info.name">
<div id="infoBox" v-if="gameInfo.state == 'start'">
  <form>
    <!-- v-if="gameInfo.aop + 2 >= gameInfo.peopleNeeded && role == 'host'" -->
    <loading :game="'Guesspionage'" :gameInfo="gameInfo"></loading>
   <button  v-if="role == 'host'"   @click.prevent="startGame()">start</button>
    <p v-for="player in gameInfo.players">{{ player.name }}</p>
    <p>test</p>
    <p>{{ selfNumber }}</p>
</form>
</div>
<div v-if="gameInfo.state == 'firstGuess'">
<div v-if="selfNumber == gameInfo.up"><p>you are up</p>
<form>
  <p>{{ guessValue }}%</p>
	<input type='range' v-model="guessValue"/>
  <button @click.prevent="valueGuess()">Submit</button>
</form></div>
<div v-else><p>you are not up</p></div></div>
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
let guessValue = ref(50)
let name = info.name
let role = route.params.auth
let reference = r(qt, `rooms/${route.params.code}`);
let gameInfo = ref(false)
let show = ref(false)
let first = true
let orderList = ref([])
let turn = 0
let self = ref(false)
let selfNumber = ref(1000)




function valueGuess(){
  console.log('ea')
  console.log(guessValue.value)
}


if(route.params.auth == 'host'){
   host()
}


if(route.params.auth == 'join' && info.name){
  console.log('ruh roh')
join()

  }



function startGame(){
  let i = 0
   orderList.value = []
  while(i <= gameInfo.value.aop){  
    let ranNum = Math.round(Math.random() * gameInfo.value.aop  )
    console.log(ranNum)
    if(orderList.value.includes(ranNum) == false){
      orderList.value.push(ranNum)
      i++
    }
  }
  console.log(orderList)
  console.log(orderList.value.toString().replaceAll(',',''))
  update(r(qt, `rooms/${route.params.code}`), {
     order: orderList.value.toString().replaceAll(',',''),
     state: 'firstGuess'
  });
  startTurn()
}

function startTurn(){
  console.log(gameInfo.value.order[turn])
  update(r(qt, `rooms/${route.params.code}`), {
     up: gameInfo.value.order[turn]
  });
}

async function host(){
  set(reference, {
      code: route.params.code,
      peopleNeeded: 3,
      aop: 0,
      order: false,
      joinable: true,
      up: false,
      players: {
        '0': {
            pos: 1,
            name: name,
            points: 0,
            turn: false,
        }
      },
      state: 'start'
    })      
    onDisconnect(reference).remove();
    selfNumber.value = 0
    onValue(r(qt, `rooms/${route.params.code}`), (snapshot) => {
  gameInfo.value = snapshot.val()
});
    console.log(gameInfo.value.players)
    gameInfo.value.players.forEach(player => {
      console.log(player.name)
    });
}

  async function join(){
    await onValue(r(qt, `rooms/${route.params.code}/`), (snapshot) => {
  gameInfo.value = snapshot.val()
  if(first){
    first = false
    selfNumber.value = gameInfo.value.aop + 1
    console.log(selfNumber)
    set(r(qt, `rooms/${route.params.code}/players/${gameInfo.value.aop + 1}`), {
            pos: gameInfo.value.aop + 1,
              name: name,
            points: 0,
            turn: false,
  });
  update(r(qt, `rooms/${route.params.code}`), {
     aop: gameInfo.value.aop + 1
  });
  }
});

  }




//     await onValue(r(qt, `rooms/${route.params.code}`), (snapshot) => {
//   gameInfo.value = snapshot.val()
// });

// let newaop = gameInfo.value.aop + 1
// console.log(gameInfo.value)
// update(reference, {aop: newaop})
   


</script>

<style lang="scss" scoped>

</style>