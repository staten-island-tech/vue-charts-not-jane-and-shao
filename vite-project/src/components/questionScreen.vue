<template>
    <div>
        <p>{{gameInfo.question.prompt}}</p>
        <p>{{ selfNumber }}</p>
        <p>{{ gameInfo.time }}</p>
          <!-- <p>{{gameInfo.question.a}}</p>
          <p>{{gameInfo.question.b}}</p>
          <p>{{gameInfo.question.c}}</p>
          <p>{{gameInfo.question.d}}</p> -->
        <button v-for="i in potato" @click.prevent="choice(i)">{{gameInfo.question[i]}}</button>
    </div>
</template>

<script setup>
import { info } from "@/reactive";
import { useRoute } from 'vue-router'
import { ref,onMounted } from "vue";
let potato = ["a","b","c","d"]
import { getDatabase, ref as r, set, onDisconnect,onValue, update, get, child  } from "firebase/database";
import { connectFirestoreEmulator } from "firebase/firestore";
const route = useRoute()
const qt = getDatabase()
let timeD = 15
let stopInterval = false  
const props = defineProps({
        gameInfo: Object,
        selfNumber: Number
    })
let interval



async function choice(choice){
  let allChecked = true
 await update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {
     choice: choice,
  });
   await get(child(r(getDatabase()), `rooms/${route.params.code}/players`)).then((snapshot) => {
    console.log(snapshot.val())
    snapshot.val().forEach(player => {
      if(player.choice == false){
        allChecked = false
      } 
    })
    })
    console.log(allChecked)
    if(allChecked == true){
      timeD = 0
      stopInterval = true
      update(r(qt, `rooms/${route.params.code}/`), {
     state: 'firstResults',
  });
    }
}


async function getQuestionInfo(){
  if(route.params.auth == 'host'){
    console.log(route.params.auth)
    let num = Math.floor((Math.random() * 23)); 
  try{
    timeD = 15
  const response = await fetch(`https://theone-hofj.onrender.com/gp/${num}`)
  const data = await response.json(); 
  console.log(data) 
  await update(r(qt, `rooms/${route.params.code}/question`), {
     prompt: data.question,
     a: data.a,
     b: data.b,
     c: data.c,
     d: data.d,
     answer: data.answer,
  });
  intFunction()
}
catch(error){
  console.log(error)
}
}
else{
  console.log('j')
}
}
    onMounted(() => {
      timeD = 15
  console.log('ea')
  getQuestionInfo()
})


async function intFunction(){
  console.log(props.gameInfo.time)
      timeD--
     await update(r(qt, `rooms/${route.params.code}`), {
     time: timeD 
  });
  if(timeD < 1){
    clearTimeout(interval);
    console.log('wajio')
    timeD = 15
    update(r(qt, `rooms/${route.params.code}/`), {
     state: 'firstResults',
     time: 15
    })}
  else{
    if(props.gameInfo.time >= 1){
      console.log(stopInterval)
    interval = setTimeout(intFunction, 1000)
    } 
  }}

// async function timerDecrease(){
  
// }
</script>

<style lang="scss" scoped>

</style>