<template>
    <div class="container">
<h1>{{ gameInfo.question.prompt }}</h1>
<p>The guesser chose {{ gameInfo.guess }}%.</p>
<p>The real answer is {{ gameInfo.question.ans }}%.</p>
<div v-for="players in gameInfo.players">{{ players.name }}: {{ players.points }}</div>
    <button v-if="route.params.auth == 'host'" @click.prevent="$emit('newRound')">Next!</button>
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
    hlAdd()
  }  
})



async function hlAdd(){
  await get(child(r(getDatabase()), `rooms/${route.params.code}`)).then((snapshot) => { 
    if(parseInt(snapshot.val().guess) < snapshot.val().question.ans && snapshot.val().players[props.selfNumber].ou == 'over' || parseInt(snapshot.val().guess) > snapshot.val().question.ans && snapshot.val().players[props.selfNumber].ou == 'under'){
      update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {
        points:snapshot.val().players[props.selfNumber].points + 1000
  });
    }
  })  
}


async function exlAdd(){
  await get(child(r(getDatabase()), `rooms/${route.params.code}`)).then((snapshot) => { 
    console.log(snapshot.val())
    let pointa = 3000 - ((Math.abs(snapshot.val().question.ans - snapshot.val().guess)) * 100)
    if(pointa > 0){
      update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {
     points:snapshot.val().players[props.selfNumber].points + pointa
  });
    }
  })
}


</script>

<style scoped>
.container{
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin: 0 auto;
  background-color: #5468ff;;
    color:white;
    border: 6px black solid;
    font: 'DoTGothic16';
    font-family: 'DotGothic16', sans-serif;
  height: calc(100vh - 20px);
}

button{
  width: 20%;
  display: inline-block;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  padding: 0 12px;
  line-height: 20px;
  height: 30px;
  max-height: 30px;
  background: #ffffff;
  font-weight: 700;
  border: 2px solid #DAE3F3;
  border-radius: 0;
  color: #272C34;
  transition-timing-function: ease-in-out;
  transition-property: box-shadow;
  transition-duration: 150ms;
  font: 'DoTGothic16';
  font-family: 'DotGothic16', sans-serif;
  transform: translateY(20px)
}
</style>