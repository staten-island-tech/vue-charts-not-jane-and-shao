<template>
<div id="infoBox">
  <form>
    <h2>Login</h2>
    <p v-for="player in gameInfo.players">{{ player.name }}</p>
    <p>test</p>
</form>
</div>
</template>
""
<script setup>
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
import { useRoute } from 'vue-router'
import { ref } from "vue";
import { info } from "@/reactive";

const route = useRoute()
const qt = getDatabase()
let name = info.name
let reference = r(qt, `rooms/${route.params.code}`);
let gameInfo = ref(false)
let show = ref(false)
let first = true

if(route.params.auth == 'host'){
   host()
}


if(route.params.auth == 'join'){
  console.log('ruh roh')
join()

  }


async function host(){
  set(reference, {
      code: route.params.code,
      peopleNeeded: 3,
      aop: 0,
      joinable: true,
      players: {
        '0': {
            pos: 1,
            name: name,
            points: 0,
        }
      },
      state: 'start'
    })      
    onDisconnect(reference).remove();

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
    set(r(qt, `rooms/${route.params.code}/players/${gameInfo.value.aop + 1}`), {
            pos: gameInfo.value.aop + 1,
              name: name,
            points: 0,
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