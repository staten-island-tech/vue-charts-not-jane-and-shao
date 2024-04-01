<template>
    <div>
        <p>{{ timeTracker }}</p>
<p>{{die}}</p>
<p>{{ otherDie }}</p>
<button v-if="showButtons" v-for="x in ['over','under']" @click.prevent="i = 0; choice = x; ou()">{{ x }}</button>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import { useRoute } from 'vue-router'
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
let timeD = ref(21)//61
let timeTracker = ref(21)//61
const qt = getDatabase()
let choice = ref(false)
let showButtons = ref(false)
const route = useRoute()
const props = defineProps({
        gameInfo: Object,
        selfNumber: Number,
    })  
    let i = 0
    console.log('eaea')
 let die = ref({
    d1: 0,
    d2: 0,
    d3: 0,
    sum: 0,
 })

 let otherDie = ref({
    d1: 0,
    d2: 0,
    d3: 0,
    sum: 0,
 })

 dUpdate()

function ou(){
    if(i < 150){
        console.log(i)
        otherDie.value[`d${i%3 + 1}`] = Math.floor(Math.random() * 6) + 1
    otherDie.value.sum = otherDie.value.d1 + otherDie.value.d2 + otherDie.value.d3
    i++
    setTimeout(ou, 10);
    }
    else{
        console.log(die.value.sum)
        console.log(otherDie.value.sum)
        console.log(choice.value)
        console.log(choice.value == 'under')
        console.log(die.value.sum > otherDie.value.sum)
        if(choice.value == 'over' && die.value.sum <= otherDie.value.sum || choice.value == 'under' && die.value.sum >= otherDie.value.sum){
            console.log('give point')
            update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {subPoints: 1})
        }   
        else{
            console.log('lmao you suck  ')
        }
    }
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


 function dUpdate(){
    i++
    setTimeout(increment, 10);
 }

 function increment(){
    console.log(i)
    die.value[`d${i%3 + 1}`] = Math.floor(Math.random() * 6) + 1
    die.value.sum = die.value.d1 + die.value.d2 + die.value.d3
    if(i < 150){
        dUpdate()
    }
    else{
         showButtons.value = true
    }
 }
async function intFunction(){
      timeD.value--
     await update(r(qt, `rooms/${route.params.code}`), {
     time: timeD.value
  });
  if(timeD.value < 1){
    update(r(qt, `rooms/${route.params.code}/`), {
     state: 'wajio',
     time: 0
    })
    get(child(r(getDatabase()), `rooms/${route.params.code}/players`)).then((snapshot) => {
snapshot.val().forEach(player => {  
  if(player.subPoints < 1 && player.health == 'limbo' ||player.health == 'dead'){
    update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {health: 'dead',})
  }
  else{
    update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {health: 'alive', points: props.gameInfo.players[player.pos].points + (Math.abs(otherDie.value.sum - die.value.sum) * 150)})
  } 
})
update(r(qt, `rooms/${route.params.code}`), {state: 'secondResults'})
     })}


  else{
    if(props.gameInfo.time >= 1){
     setTimeout(intFunction, 1000)
    } 
  }}
</script>

<style lang="scss" scoped>

</style>