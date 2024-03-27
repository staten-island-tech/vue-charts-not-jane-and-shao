<template>
  <div v-if="info.name">
    <!-- v-if="gameInfo.aop + 2 >= gameInfo.peopleNeeded && role == 'host'" -->
    <loading :game="'Guesspionage'" :role="route.params.auth" :gameInfo="gameInfo" @startGame="startGame()"></loading>


    <secondGuess v-if="gameInfo.state == 'secondGuess'" :selfNumber="selfNumber" :gameInfo="gameInfo" @ou="(i) => ou(i)"></secondGuess>


<div v-if="gameInfo.state == 'firstGuess'">
  <mainGuess :selfNumber="selfNumber" :gameInfo="gameInfo" @valueGuess="valueGuess()" @valUp="(i) => update(r(qt, `rooms/${route.params.code}`), {guess: i,})"></mainGuess>
</div>
</div>
</template>

<script setup>
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
import { useRoute } from 'vue-router'
import { ref } from "vue";
import loading from "@/components/loading.vue";
import secondGuess from "@/components/secondGuess.vue"
import { info } from "@/reactive"; 
import mainGuess from "@/components/mainGuess.vue"
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

if(!info.name){
  window.location = "http://localhost:5173/";
}


async function ou(choice){
  update(r(qt, `rooms/${route.params.code}/players/${selfNumber.value}`), {
     ou: choice,
  });
  await get(child(r(getDatabase()), `rooms/${route.params.code}/players`)).then((snapshot) => { 
  console.log(snapshot.val())
  let i = 0
  snapshot.val().forEach(player => {
    if(player.ou == 'skip' || player.ou == 'under'|| player.ou == 'over'){
      i++
    }
  })
  if(i > gameInfo.value.aop){
    update(r(qt, `rooms/${route.params.code}`), {
     state: 'roundResults',
  });
  }
})
}

function valueGuess(){
  console.log('ea')
  console.log(guessValue.value)
  update(r(qt, `rooms/${route.params.code}`), {
     guess: guessValue.value,
     state: 'secondGuess',
     excluded: selfNumber.value
  });
  update(r(qt, `rooms/${route.params.code}/players/${selfNumber.value}`), {
     ou: 'skip',
  });
}


if(route.params.auth == 'host'){
   host()
}


if(route.params.auth == 'join'){
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
    joinable: false,
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
      guess: 50,
      excluded: false,
      question: 'What are the odds Noah Abbas cries himself to sleep tonight?',
      joinable: true,
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
  // console.log(snapshot.val().players)
  // snapshot.val().players.forEach(player => console.log(player.guess))
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
              name: name,
            points: 0,
            ou: false,
  });
  update(r(qt, `rooms/${route.params.code}`), {
     aop: gameInfo.value.aop + 1
  });
  }
});

// let potato = firebase.database()
onDisconnect(reference).remove();
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