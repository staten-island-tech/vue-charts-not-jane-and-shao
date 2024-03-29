<template>
    <div>
<p>{{ info.name }}</p>
<p>{{ selfNumber }}</p>
<div v-for="players in gameInfo.players">{{ players.name }}: {{ players.points }}</div>
    </div>
</template>

<script setup>
import { info } from '@/reactive';
import { ref, onMounted } from 'vue'
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
import { useRoute } from 'vue-router'

const qt = getDatabase()
const route = useRoute()
const props = defineProps({
        selfNumber: Number,
        gameInfo: Object,
    })
onMounted(() => {
  console.log(props.gameInfo.excluded )
  if(props.selfNumber == props.gameInfo.excluded){
    exlAdd()
  }
  else{
    console.log('h or l guy')
  }  
})

async function exlAdd(){
  await get(child(r(getDatabase()), `rooms/${route.params.code}`)).then((snapshot) => { 
    console.log(snapshot.val())
    let pointa = 3000 - ((Math.abs(snapshot.val().question.ans - snapshot.val().guess)) * 100)
    update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {
     points:snapshot.val().players[props.selfNumber].points + pointa
  });
  })
}


</script>

<style scoped>

</style>