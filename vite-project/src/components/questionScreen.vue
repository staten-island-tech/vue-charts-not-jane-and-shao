<template>
  <div id="bigBoy" v-if="gameInfo.players[selfNumber].health == 'alive'">
    <div id="cont" >
        <div id="prompt"><h1>{{gameInfo.question.prompt}}</h1>
        <h2>{{ ansChoice }}</h2></div>
        <div id="clock">
        <h2>{{ gameInfo.time }}</h2>
    </div>
    <div id="choices" >
      <div id="buttonBox" v-for="i in potato">
      <button :class="`choicebutt`"  @click.prevent="choice(i)">{{i}}: {{gameInfo.question[i]}}</button>
    </div>
    </div>
    
          <!-- <p>{{gameInfo.question.a}}</p>
          <p>{{gameInfo.question.b}}</p>
          <p>{{gameInfo.question.c}}</p>
          <p>{{gameInfo.question.d}}</p> -->
    </div>

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
let ansChoice = ref('pass')
const qt = getDatabase()
let timeD = 15 //CHANGE
let stopInterval = false  
const props = defineProps({
        gameInfo: Object,
        selfNumber: Number
    })
let interval
let timeTracker = ref(15) //CHANGE

onValue(r(qt, `rooms/${route.params.code}/time`), (snapshot) => {
  timeTracker.value = snapshot.val()
});


async function choice(choice){
  ansChoice.value = `${props.gameInfo.question[choice]}`.toUpperCase()
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
let num = Math.floor((Math.random() * 39)); 

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
    timeD = 15 // CHANGE
  const response = await fetch(`https://sithsbox.onrender.com/gp/${num}`)
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

<style  scoped>

h2{
  text-align: center;
}
#choices{
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 65%;
}

#cont {
  width: 100%;
  justify-self: center;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background-image: radial-gradient(rgba(182,187,196,.75  ), rgba(182,187,196,.55));
}

#left{
  background-color: tan;
}

#clock {
  display: flex;
  border: 2px black solid;
  border-radius: 500px;
  align-items: center;
  justify-content: center;
  width: 10%;
  position: absolute;
  min-height: 10%;
  max-height: 10%;
  max-width: 10%;
  bottom: 0%;
  left: 5%;
  background: rgb(255,234,255); /* Just to visualize the extent */
}
#buttonBox{
  height: 50%;
  width: 50%;
}

#prompt{
  font-family: "JetBrains Mono",monospace;
}
#bigBoy{
  position: absolute;
  border: 2px black solid;
   top: 0;
   right: 0;
   bottom: 0;
   left: 0;
  display: flex;
  justify-content: space-between;
  height: calc(100vh - 15px);
  background-image: url(https://i.pinimg.com/originals/eb/1b/31/eb1b317c006f401887eefc50afcd6e84.gif);
}





.choicebutt {
  align-items: center;
  appearance: none;
  background-image: radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%);
  border: 0;
  border-radius: 6px;
  box-shadow: rgba(45, 35, 66, .4) 0 2px 4px,rgba(45, 35, 66, .3) 0 7px 13px -3px,rgba(58, 65, 111, .5) 0 -3px 0 inset;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  display: inline-flex;
  font-family: "JetBrains Mono",monospace;
  height: 100%;
  width: 100%;
  justify-content: center;
  line-height: 1;
  list-style: none;
  overflow: hidden;
  padding-left: 16px;
  padding-right: 16px;
  position: relative;
  text-align: left;
  text-decoration: none;
  transition: box-shadow .15s,transform .15s;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  white-space: nowrap;
  will-change: box-shadow,transform;
  font-size: 18px;
}

.choicebutt:focus {
  box-shadow: #3c4fe0 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
}

.choicebutt:hover {
  box-shadow: rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #3c4fe0 0 -3px 0 inset;
  transform: translateY(-2px);
}

.choicebutt:active {
  box-shadow: #3c4fe0 0 3px 7px inset;
  transform: translateY(2px);
}
</style>

