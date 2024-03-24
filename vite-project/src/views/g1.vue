<template><div id="infoBox">
  <form>
    <h2>Login</h2>
</form>
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
let gameInfo = ref('test')
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
    onDisconnect(reference).remove();

    onValue(r(qt, `rooms/${route.params.code}`), (snapshot) => {
  gameInfo.value = snapshot.val()
});
    console.log(gameInfo.value)
}

if(route.params.auth == 'join'){
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