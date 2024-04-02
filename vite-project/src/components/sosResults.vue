<template>
    <div class="container">
<p v-for="player in gameInfo.players">{{player.name}}: {{ player.subPoints }}</p>
    </div>
</template>

<script setup>
import { ref,onMounted } from "vue";
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
import { useRoute } from 'vue-router'
const qt = getDatabase()
const route = useRoute()
let text = ref('lorbum isupo')
const props = defineProps({
        gameInfo: Object,
        selfNumber: Number,
    })  

let choices = ref({
    steal:0,
    defend:0,
})

setTimeout(potato, 5000)


function potato(){
    update(r(qt, `rooms/${route.params.code}/`), {state: 'secondResults'})
}
get(child(r(getDatabase()), `rooms/${route.params.code}/players`)).then((snapshot) => {
    snapshot.val().forEach(player => {
        console.log(player.subPoints)
        if(player.subPoints != 'steal' && player.subPoints != 'defend'){
            update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {health: 'dead'}) 
        }
        else{
            console.log('eawe')
            choices.value[player.subPoints]++
            console.log(choices.value[player.subPoints])
        }
    });
        get(child(r(getDatabase()), `rooms/${route.params.code}/players`)).then((snapshot) => {
    snapshot.val().forEach(player => {
        if(player.health == 'limbo' && player.subPoints != 'steal' || player.subPoints != 'defend'){
            update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {health: 'dead'}) 
        }
        else{
            update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {health: 'alive'}) 
        }
        if(choices.value.steal == 1){
        if(player.subPoints == 'steal'){
            update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {points: props.gameInfo.players[player.pos].points + ((props.gameInfo.aop + 1) * 850)}) }
        else if(player.subPoints == 'defend'){
            update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {points: props.gameInfo.players[player.pos].points - 550}) 
        }        }
        if(choices.value.steal == 2){
        if(player.subPoints == 'steal'){
            update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {health: 'dead'}) 
        }
    }
    })})
    
    console.log(choices)
    console.log(props.gameInfo.aop)
})
//     get(child(r(getDatabase()), `rooms/${route.params.code}/players`)).then((snapshot) => {
// snapshot.val().forEach(player => {  
//   if(player.subPoints < 1 && player.health == 'limbo' ||player.health == 'dead'){
//     update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {health: 'dead',})
//   }
//   else{
//     update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {health: 'alive', points: props.gameInfo.players[player.pos].points + (Math.abs(otherDie.value.sum - die.value.sum) * 150)})
//   } 
// })
// update(r(qt, `rooms/${route.params.code}`), {state: 'secondResults'})
//      })
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