<template>
    <div v-if="gameInfo.players[selfNumber].health == 'alive'">
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
let timeTracker = ref(15)

onValue(r(qt, `rooms/${route.params.code}/time`), (snapshot) => {
  timeTracker.value = snapshot.val()
});


async function choice(choice){
 await update(r(qt, `rooms/${route.params.code}/players/${props.selfNumber}`), {
     choice: choice,
  });
  // //  await get(child(r(getDatabase()), `rooms/${route.params.code}/players`)).then((snapshot) => {
  // //   console.log(snapshot.val())
  // //   snapshot.val().forEach(player => {
  // //     if(player.choice == false){
  // //       allChecked = false
  // //     } 
  // //   })
  // //   })
  // //   console.log(allChecked)
  // //   if(allChecked == true){
  // //     timeD = 0
  // //     stopInterval = true
  // //     update(r(qt, `rooms/${route.params.code}/`), {
  // //    state: 'firstResults',
  // // });
  //   }
}
let num = Math.floor((Math.random() * 23)); 

 function getQuestionInfo(){
  if(route.params.auth == 'host'){
    console.log(route.params.auth)
    if(props.gameInfo.qList.includes(num)){
      num = Math.floor((Math.random() * 23)); 
      getQuestionInfo()
    }
    else{
       update(r(qt, `rooms/${route.params.code}/`), {qList: [...props.gameInfo.qList, num]  })
      otherFunction()
    }


  }}  

  async function otherFunction(){
  try{
    console.log('host only')
    timeD = 15
  const response = await fetch(`https://theone-1.onrender.com/gp/${num}`)
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
  get(child(r(getDatabase()), `rooms/${route.params.code}`)).then((snapshot) => {console.log(snapshot.val().qList)})
  // update(r(qt, `rooms/${route.params.code}/`), {
  //   qList: props.gameInfo.qList 
  // });
  intFunction()
}
catch(error){
  console.log(error)
}
}
    onMounted(() => {
      timeD = 15
  console.log('ea')
  if(route.params.auth == 'host'){
    getQuestionInfo()
  }
})


async function intFunction(){
      timeD--
     await update(r(qt, `rooms/${route.params.code}`), {
     time: timeD 
  });
  if(timeD < 1){
    clearTimeout(interval);
    timeD = 15
    update(r(qt, `rooms/${route.params.code}/`), {
     state: 'firstResults',
     time: 15
    })}
  else{
    if(props.gameInfo.time >= 1){
    interval = setTimeout(intFunction, 1000)
    } 
  }}

// async function timerDecrease(){
  
// }
</script>

<style lang="scss" scoped>

</style>