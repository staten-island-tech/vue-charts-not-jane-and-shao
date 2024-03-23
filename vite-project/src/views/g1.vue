<template>
    <div>
<p>awesome</p>
    </div>
</template>

<script setup>
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child,  } from "firebase/database";
import { useRoute } from 'vue-router'
import { ref } from "vue";
import { info } from "@/reactive";
const route = useRoute()

const qt = getDatabase()
let gameInfo = ref(false)
let name = info.name
let reference = r(qt, `rooms/${route.params.code}`);

if(route.params.auth == 'host'){
    set(reference, {
      code: route.params.code,
      players: 1,
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
  gameInfo.value = snapshot.val()
  console.log(gameInfo.value)
});
    onDisconnect(reference).remove();
}

if(route.params.auth == 'join'){
    console.log('ea')
    await get(r(qt), `rooms/${route.params.code}/players`).then((snapshot) => { 
        console.log(snapshot.val())
    })
}


</script>

<style lang="scss" scoped>

</style>