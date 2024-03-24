<template>
    <div>
<p>awesome</p>
<button v-if="route.params.auth == 'host' ">gaming</button>
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
let first = true

if(route.params.auth == 'host'){
    set(reference, {
      code: route.params.code,
      peopleNeeded: 3,
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
    console.log(gameInfo)
}

if(route.params.auth == 'join'){
await onValue(r(qt, `rooms/${route.params.code}/`), (snapshot) => {
  gameInfo = snapshot.val()
  if(first){
    first = false
    set(r(qt, `rooms/${route.params.code}/players/${gameInfo.aop + 1}`), {
            pos: gameInfo.aop + 1,
            name: name,
            points: 0,
  });
  update(r(qt, `rooms/${route.params.code}`), {
     aop: gameInfo.aop + 1
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