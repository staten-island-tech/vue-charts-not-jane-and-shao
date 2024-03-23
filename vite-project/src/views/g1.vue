<template>
    <div>
<p>awesome</p>
<button v-if="route.params.auth == 'host'"></button>
    </div>
</template>

<script setup>
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
import { useRoute } from 'vue-router'
import { ref } from "vue";
import { info } from "@/reactive";
const route = useRoute()

const qt = getDatabase()
let name = info.name
let reference = r(qt, `rooms/${route.params.code}`);
let gameInfo = 'test'


if(route.params.auth == 'host'){
    set(reference, {
      code: route.params.code,
      minPlayers: 3,
      aop: 1,
      joinable: true,
      players: {
        '1': {
            pos: 1,
            name: name,
            points: 0,
        }
      },
      state: 'start'
    })      


    onValue(r(qt, `rooms/${route.params.code}`), (snapshot) => {
  gameInfo = snapshot.val()
  console.log(gameInfo)
});

    onDisconnect(reference).remove();
}

if(route.params.auth == 'join'){
    onValue(r(qt, `rooms/${route.params.code}/`), (snapshot) => {
  gameInfo = snapshot.val()
});
console.log(gameInfo)
set(r(qt, `rooms/${route.params.code}/players/${gameInfo.aop + 1}`), {
            pos: gameInfo.aop + 1,
            name: name,
            points: 0,
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