<template>
    <div v-if="gameInfo.players[selfNumber].health == 'limbo'" class="container">
      <p>The jackpot to be won is {{ jackpot }} points!</p>
        <p class="timeTracker">{{ timeTracker }}</p>
        <p>You've chosen: {{ ethicalChoice }}</p>
        <p>Split Or Steal?</p>
        <button v-for="i in ['defend','steal']" @click.prevent="ethicsTest(i)">{{ i }}</button>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
let timeD = ref(11)//61
let timeTracker = ref(11)//61
const qt = getDatabase()
let ethicalChoice = ref('pass')
const route = useRoute()
const props = defineProps({
        gameInfo: Object,
        selfNumber: Number,
    })  
    let jackpot = (props.gameInfo.aop + 1) * 850
function ethicsTest(choice){
  ethicalChoice.value = choice
  update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {subPoints: choice})

}


 onValue(r(qt, `rooms/${route.params.code}/time`), (snapshot) => {
  timeTracker.value = snapshot.val()
});

onMounted(() => {
      timeD.value = 21 //61
  if(route.params.auth == 'host'){
    console.log('uncomment this')
    setTimeout(intFunction, 1000)
  }
})



async function intFunction(){
      timeD.value--
     await update(r(qt, `rooms/${route.params.code}`), {
     time: timeD.value
  });
  if(timeD.value < 1){
    update(r(qt, `rooms/${route.params.code}/`), {
     state: 'sosResults',
     time: 0,
    })}


  else{
    if(props.gameInfo.time >= 1){
     setTimeout(intFunction, 1000)
    } 
  }}
</script>

<style scoped>
.container{
  text-align: center;
  margin: 0 auto;
  background-color: #4b5057;;
    color:white;
    font: 'DoTGothic16';
    font-family: 'DotGothic16', sans-serif;
  height: calc(100vh - 30px);
}

.timeTracker{
  font-size: 24px;
}

button{
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