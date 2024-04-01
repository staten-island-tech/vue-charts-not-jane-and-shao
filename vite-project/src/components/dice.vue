<template>
    <div>
<p>{{die}}</p>
    </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';

let timeD = ref(31)//61
let timeTracker = ref(31)//61
const props = defineProps({
        gameInfo: Object,
        selfNumber: Number,
    })  
    let i = 0
 let die = ref({
    d1: 0,
    d2: 0,
    d3: 0,
    sum: 0,
 })

 dUpdate()

 onValue(r(qt, `rooms/${route.params.code}/time`), (snapshot) => {
  timeTracker.value = snapshot.val()
});

onMounted(() => {
      timeD.value = 31 //61
  if(route.params.auth == 'host'){
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
    if(i < 250){
        dUpdate()
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
    update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {health: 'dead'})
  }
  else{
    update(r(qt, `rooms/${route.params.code}/players/${player.pos}`), {health: 'alive'})
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